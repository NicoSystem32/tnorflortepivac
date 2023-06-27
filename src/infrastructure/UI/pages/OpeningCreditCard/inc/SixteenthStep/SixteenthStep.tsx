import { ReactElement, useCallback, useRef, useEffect, useState, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormState } from 'react-hook-form'
import { FileRejection } from 'react-dropzone'
import * as yup from 'yup'

// components
import { ControlsButtons, FileAndProgressBar, HeadStep, NavigationStep, SaveSuccessModal } from '..'
import {
    Form,
    FormControl,
    FormMessage,
    InputGroup,
    InputGroupText,
    InputMask,
    InputSelectGroup,
    UploadFile,
} from '../../../../components'

// hooks
import {
    useSixteenthStepForm,
    sixteenthStepSchema,
    SixteenthStepType,
} from '../../hooks/useSixteenthStepForm'
import { useReducerStep } from '../../hooks'

// styles
import {
    SixteenthStepWrapper,
    SixteenthStepContent,
    UploadLabel,
    UploadInput,
    UploadSpan,
    CtrRowField,
} from './sixteenthStep-styles'
import {
    FormGroup,
    FormLabel,
    FormMessageSelect,
    FormOption,
    FormSelect,
    Image,
    ParagraphStep,
} from '../../openingCreditCard-styles'

// actions
import { getAllBanksAction } from '../../../../../redux/tc'
import {
    createBuyWalletAction,
    updateWalletAction,
    getPurchaseExtractFileAction,
} from '../../../../../redux/portfolioPurchaseTC'
import { fillDataPerStepAction } from '../../../../../redux/openingTC'

// Icons
import { BankSVG, MiniCardSVG, MoneySVG } from '../../../../utils/getIcons'

// utils
import { encryptKey, decryptKey, getBase64 } from '../../../../utils/misc'
import { formatValue } from '../../../../components/GlobalFuntions/globalFunction'

// selectors
import {
    useSelector,
    getAllBanksSelector,
    createBuyWalletSelector,
    getCreditCardDataPerStepSelector,
    getAllBuyWalletSelector,
} from '../../../../../selectors'

const SixteenthStep = (): ReactElement => {
    const dispatch = useDispatch()
    const [{ feedback }, dispatchStep] = useReducerStep()
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false)
    const [filesToSend, setFilesToSend] = useState<{ name: string; base64: string }[]>([])

    const MAX_SIZE = 15000000

    // selectors
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { buyWallet, count } = useSelector(getAllBuyWalletSelector)
    const { banks } = useSelector(getAllBanksSelector)
    const { loading: loadingSave } = useSelector(createBuyWalletSelector)
    const { sixteenthStep, seventhStep } = createCreditCard

    const QUOTE_AVAILABLE = seventhStep.cardQuote ? seventhStep.cardQuote : 0

    const defaultNameBank = sixteenthStep.nameBank
        ? banks.find((item) => item.tcbId.toString() === sixteenthStep.nameBank)?.tcbNombre
        : ''

    const creditCardNumber = sixteenthStep.creditCardNumber
        ? decryptKey(sixteenthStep.creditCardNumber)
        : ''

    const newSixteenthStepSchema = sixteenthStepSchema.concat(
        yup.object({
            amountBuy: yup
                .string()
                .test(
                    'lessThan',
                    `Debe ser menor a $${
                        feedback.isEditBuyWallet
                            ? formatValue(
                                  QUOTE_AVAILABLE -
                                      (count - parseInt(sixteenthStep.amountBuy ?? '0')),
                                  1
                              )
                            : formatValue(QUOTE_AVAILABLE - count, 1)
                    }`,
                    (v) => {
                        if (feedback.isEditBuyWallet) {
                            return (
                                parseInt(v ?? '') <=
                                QUOTE_AVAILABLE - (count - parseInt(sixteenthStep.amountBuy ?? '0'))
                            )
                        }
                        return parseInt(v ?? '') <= QUOTE_AVAILABLE - count
                    }
                )
                .required('Campo obligatorio'),
        })
    )

    const defaultValuesRef = useRef({
        nameBank: defaultNameBank ?? '',
        otherNameBank: sixteenthStep.otherNameBank ?? '',
        creditCardNumber: creditCardNumber,
        amountBuy: sixteenthStep.amountBuy ?? '',
        formatFile: sixteenthStep.formatFile ?? null,
    })

    // hooks
    const {
        handleSubmit,
        watch,
        control,
        register,
        setValue,
        getValues,
        formatFileToSend,
        formatFile,
    } = useSixteenthStepForm({
        validationSchema: yupResolver(newSixteenthStepSchema),
        defaultValues: defaultValuesRef.current,
    })
    const { isValid, errors } = useFormState({ control })
    watch()
    const { name, onBlur } = register('formatFile')

    const onDrop = useCallback((accFiles: File[], _: FileRejection[]) => {
        onDropOrChangeInputFile(accFiles)
    }, [])

    // listeners
    useEffect(() => {
        dispatch(getAllBanksAction())
        setResponseData()
        return () => {
            dispatchStep({
                type: 'SET_FEEDBACK',
                payload: {
                    code: '',
                    message: '',
                    isEditBuyWallet: false,
                },
            })
            dispatch(
                fillDataPerStepAction({
                    ...createCreditCard,
                    sixteenthStep: {
                        nameBank: null,
                        otherNameBank: null,
                        creditCardNumber: null,
                        amountBuy: null,
                        formatFile: null,
                    },
                })
            )
        }
    }, [])

    // handlers
    const onSubmit = async (dataToSend: SixteenthStepType): Promise<void> => {
        const idBank = banks.find((bank) => bank.tcbNombre === dataToSend.nameBank)?.tcbId
        const fileToSend = await formatFileToSend(dataToSend)

        if (fileToSend && idBank) {
            if (!feedback.isEditBuyWallet) {
                await preparedToCreateDataToSend(dataToSend, fileToSend, idBank)
            } else {
                await preparedToEditDataToSend(dataToSend, fileToSend, idBank)
            }
        }
    }

    const onDeleteFile = (nameToDelete: string): void => {
        setValue('formatFile', null, { shouldValidate: true })
        setFilesToSend((prevState) => prevState.filter((file) => file.name !== nameToDelete))
    }

    const onCloseSuccessModal = (): void => {
        setShowSuccessModal(false)
        dispatchStep({
            type: 'GO_TO_STEP',
            payload: {
                step: 15,
            },
        })
    }

    const onDropOrChangeInputFile = (accFiles: File[]): void => {
        formatFile(accFiles)
            .then((resp) => {
                setValue('formatFile', accFiles, {
                    shouldValidate: true,
                })
                setFilesToSend([
                    {
                        name: accFiles[0].name,
                        base64: resp ?? '',
                    },
                ])
            })
            .catch((err) => console.error(err))
    }

    const onLoadingCheck = (): boolean =>
        !feedback.isEditBuyWallet ? loadingSave : isLoadingUpdate

    const setResponseData = (): void => {
        if (feedback.isEditBuyWallet && buyWallet) {
            const file = buyWallet.find((i) => i.cardNumber === sixteenthStep.creditCardNumber)
            const fileName = file?.debtCertificateUrl
                ? file.debtCertificateUrl.split('/')[4]
                : 'fileName'
            const containerName = file?.debtCertificateUrl
                ? file.debtCertificateUrl.split('/')[3]
                : 'debtpurchases'

            dispatch(
                getPurchaseExtractFileAction(fileName, containerName, (resp) => {
                    const blob = new Blob([resp], { type: 'application/pdf' })
                    getBase64(blob).then((fileBlob) => {
                        const pdfFile = new File([blob], fileName, { type: 'application/pdf' })

                        const base64File = fileBlob
                            ?.toString()
                            .replace('data:image/png;base64,', '')
                            .replace('data:text/html;base64,', '')
                            .replace('data:application/pdf;base64,', '')

                        setValue('formatFile', pdfFile, {
                            shouldValidate: true,
                        })

                        setFilesToSend([
                            {
                                name: fileName,
                                base64: base64File ?? '',
                            },
                        ])
                    })
                })
            )
        }
    }

    const preparedToEditDataToSend = async (
        dataToSend: SixteenthStepType,
        fileToSend: string,
        idBank: number
    ): Promise<void> => {
        if (feedback.idPurchase) {
            setIsLoadingUpdate(true)
            await dispatch(
                updateWalletAction(
                    {
                        CardNumber: encryptKey(dataToSend.creditCardNumber),
                        PurchaseAmount: parseInt(dataToSend.amountBuy),
                        AlternativeBankName: dataToSend.otherNameBank
                            ? dataToSend.otherNameBank
                            : '',
                        DebtCertificate: fileToSend,
                        BankEntityId: idBank.toString(),
                        Id: feedback.idPurchase,
                        DebtCertificateUrl: '',
                        CreditCardRequestId: 'string',
                    },
                    () => {
                        setShowSuccessModal(true)
                        setIsLoadingUpdate(false)
                    }
                )
            )
        }
    }

    const preparedToCreateDataToSend = async (
        dataToSend: SixteenthStepType,
        fileToSend: string,
        idBank: number
    ): Promise<void> => {
        await dispatch(
            createBuyWalletAction(
                {
                    CardNumber: encryptKey(dataToSend.creditCardNumber),
                    PurchaseAmount: parseInt(dataToSend.amountBuy),
                    AlternativeBankName: dataToSend.otherNameBank ? dataToSend.otherNameBank : '',
                    DebtCertificate: fileToSend,
                    BankEntityId: idBank.toString(),
                    CreditCardRequestId: 'string',
                },
                (res) => {
                    if (res.response === 'Added Successfully') {
                        setShowSuccessModal(true)
                    }
                }
            )
        )
    }

    const isValidForm = (): boolean => {
        if (!feedback.isEditBuyWallet) {
            return !isValid
        }

        const validForm =
            errors.amountBuy || errors.creditCardNumber || errors.nameBank || errors.otherNameBank

        if (getValues('nameBank') === 'OTROS') {
            return validForm === undefined &&
                filesToSend.length > 0 &&
                getValues('otherNameBank') !== ''
                ? false
                : true
        }
        return validForm === undefined && filesToSend.length > 0 ? false : true
    }

    return (
        <>
            <NavigationStep />
            <SixteenthStepWrapper>
                <SixteenthStepContent>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <HeadStep
                            title="Solicitud / Compra de cartera"
                            paragraph="Agrega la información de la tarjeta de crédito que deseas comprar"
                        />

                        <FormGroup $heightSize="105px">
                            <FormLabel>Banco de destino</FormLabel>
                            <InputSelectGroup $isError={!!errors.nameBank} $haveImg>
                                <Image src={BankSVG} alt="clave" />
                                <FormSelect size="lg" {...register('nameBank')}>
                                    <FormOption disabled value="" show>
                                        Selecciona una opción
                                    </FormOption>
                                    {banks.map((bank) => (
                                        <FormOption key={bank.tcbId}>{bank.tcbNombre}</FormOption>
                                    ))}
                                </FormSelect>
                            </InputSelectGroup>
                            <FormMessageSelect>
                                {errors.nameBank && errors.nameBank.message}
                            </FormMessageSelect>
                        </FormGroup>

                        {getValues('nameBank') === 'OTROS' && (
                            <FormGroup>
                                <FormLabel>Especifica que banco</FormLabel>
                                <InputGroup hasValidation>
                                    <InputGroupText $inputError={!!errors.otherNameBank}>
                                        <Image src={BankSVG} alt="clave" />
                                    </InputGroupText>
                                    <FormControl
                                        placeholder="Ej. Cavipetrol"
                                        isInvalid={!!errors.otherNameBank}
                                        {...register('otherNameBank')}
                                    />
                                    <FormMessage type="invalid">
                                        {errors.otherNameBank && errors.otherNameBank.message}
                                    </FormMessage>
                                </InputGroup>
                            </FormGroup>
                        )}

                        <ParagraphStep>Datos de la tarjeta a comprar</ParagraphStep>

                        <CtrRowField>
                            <FormGroup>
                                <FormLabel>Numero de tarjeta</FormLabel>
                                <InputGroup hasValidation>
                                    <InputGroupText $inputError={!!errors.creditCardNumber}>
                                        <Image src={MiniCardSVG} alt="icono" />
                                    </InputGroupText>
                                    <InputMask
                                        {...register('creditCardNumber')}
                                        mask="num"
                                        blocks={{
                                            num: {
                                                mask: '0000  0000  0000  0000',
                                            },
                                        }}
                                        unmask={true}
                                        onAccept={(value) => {
                                            setValue('creditCardNumber', value.toString(), {
                                                shouldValidate: true,
                                            })
                                        }}
                                        defaultValue={defaultValuesRef.current.creditCardNumber}
                                        placeholder="Ej. 1234 5678 9101 1234"
                                        isInvalid={!!errors.creditCardNumber}
                                    />
                                    <FormMessage type="invalid">
                                        {errors.creditCardNumber && errors.creditCardNumber.message}
                                    </FormMessage>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Valor a comprar</FormLabel>
                                <InputGroup hasValidation>
                                    <InputGroupText $inputError={!!errors.amountBuy}>
                                        <Image src={MoneySVG} alt="icono" />
                                    </InputGroupText>
                                    <InputMask
                                        {...register('amountBuy')}
                                        mask="num"
                                        blocks={{
                                            num: {
                                                mask: Number,
                                                thousandsSeparator: '.',
                                                signed: false,
                                                scale: 0,
                                            },
                                        }}
                                        unmask={true}
                                        onAccept={(value) => {
                                            setValue('amountBuy', value.toString(), {
                                                shouldValidate: true,
                                            })
                                        }}
                                        defaultValue={defaultValuesRef.current.amountBuy}
                                        placeholder="Ej. $1.500.000"
                                        isInvalid={!!errors.amountBuy}
                                    />
                                    <FormMessage type="invalid">
                                        {errors.amountBuy && errors.amountBuy.message}
                                    </FormMessage>
                                </InputGroup>
                            </FormGroup>
                        </CtrRowField>

                        {filesToSend.length > 0 && (
                            <>
                                {filesToSend.map((file) => (
                                    <FileAndProgressBar
                                        key={file.base64}
                                        fileName={file.name}
                                        onDelete={onDeleteFile}
                                    />
                                ))}
                            </>
                        )}

                        <FormGroup>
                            <FormLabel>Extracto o certificado de deuda no mayor a 8 días</FormLabel>
                            <UploadFile
                                fieldTexts={{
                                    titleDnD:
                                        'Arrastra y suelta los archivos sobre esta área delimitada',
                                    textExtension: 'JPG, PNG, PDF de máximo 15mb',
                                    instructionText:
                                        'O si prefieres busca tus archivos desde tu dispositivo',
                                }}
                                accept={{
                                    'application/pdf': [],
                                    'image/jpeg': ['.jpeg', '.png'],
                                }}
                                multiple={false}
                                maxSize={MAX_SIZE}
                                onDrop={onDrop}
                            >
                                <UploadLabel htmlFor="upload">
                                    <UploadInput
                                        type="file"
                                        id="upload"
                                        accept=".pdf,.jpeg,.jpg,.png"
                                        multiple={false}
                                        name={name}
                                        onBlur={onBlur}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            const { files } = e.target
                                            const accFiles = files as unknown as File[]
                                            if (accFiles[0].size < MAX_SIZE) {
                                                onDropOrChangeInputFile(accFiles)
                                            }
                                        }}
                                    />
                                    <UploadSpan>Elegir archivo</UploadSpan>
                                </UploadLabel>
                            </UploadFile>
                        </FormGroup>

                        <ControlsButtons
                            disable={isValidForm()}
                            nextText="Guardar"
                            isSave={false}
                            isLoading={onLoadingCheck()}
                        />
                    </Form>
                </SixteenthStepContent>
            </SixteenthStepWrapper>
            <SaveSuccessModal show={showSuccessModal} onClose={onCloseSuccessModal} />
        </>
    )
}

export default SixteenthStep
