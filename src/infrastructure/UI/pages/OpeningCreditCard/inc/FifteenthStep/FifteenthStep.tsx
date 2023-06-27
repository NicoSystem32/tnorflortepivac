import { ReactElement, useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormState } from 'react-hook-form'
import * as yup from 'yup'

// components
import { ControlsButtons, HeadStep, NavigationStep, BankCard, DeleteBankModal, AlertBuy } from '..'
import { Form, InputSelectGroup } from '../../../../components'

// hooks
import {
    useFifteenthStepForm,
    fifteenthStepSchema,
    FifteenthStepType,
} from '../../hooks/useFifteenthStepForm'
import { useReducerStep } from '../../hooks'

// styles
import {
    FifteenthStepWrapper,
    FifteenthStepContent,
    InputGroupCheck,
    FormCheck,
    AddCreditCardBtn,
    ImageAdd,
    FieldCtr,
    BankCardList,
} from './fifteenthStep-styles'
import {
    TitleStep,
    FormGroup,
    FormLabel,
    ParagraphStep,
    Image,
    FormSelect,
    FormOption,
    FormMessageSelect,
    SpaceStep,
} from '../../openingCreditCard-styles'

// icons
import { MiniAddPlusSVG, ExclusionSVG } from '../../../../utils/getIcons'

// actions
import { getAllBanksAction } from '../../../../../redux/tc'
import {
    deleteBuyWalletByIdAction,
    getAllBuyWalletAction,
    getCreditCardFeesAction,
    getQuotesFeesSavedAction,
} from '../../../../../redux/portfolioPurchaseTC'

// selectors
import {
    useSelector,
    getAllBuyWalletSelector,
    getCreditCardFeesSelector,
    deleteBuyWalletByIdSelector,
    getCreditCardDataPerStepSelector,
    currentQuotesFeesSaveSelector,
} from '../../../../../selectors'

// models
import { BuyWallet } from '../../../../../../domain/models'

const FifteenthStep = (): ReactElement => {
    const dispatch = useDispatch()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [bankSelect, setBankSelect] = useState<BuyWallet | null>(null)
    const [{ currentStep }, dispatchStep] = useReducerStep()

    const QUOTE_AVAILABLE = 10000000

    // selectors
    const { data: quoteNumberSelect } = useSelector(getCreditCardFeesSelector)
    const { data: quoteFeesSaved } = useSelector(currentQuotesFeesSaveSelector)
    const { buyWallet, count } = useSelector(getAllBuyWalletSelector)
    const { buyWalletDeleted } = useSelector(deleteBuyWalletByIdSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { fifteenthStep } = createCreditCard

    // definitions
    const defaultValuesRef = useRef({
        buyWallet: fifteenthStep.buyWallet ?? 'not',
        amountOfFees: fifteenthStep.amountOfFees ?? '',
    })

    const newFifteenthStepSchema = fifteenthStepSchema.concat(
        yup.object({
            amountOfFees: yup.string().when('buyWallet', {
                is: (value: string) => {
                    if (value === 'yes' && buyWallet && buyWallet.length > 0) {
                        return true
                    }
                    return false
                },
                then: yup.string().required('Campo obligatorio'),
            }),
        })
    )

    // hooks
    const {
        handleSubmit,
        register,
        watch,
        control,
        setValue,
        getValues,
        preparedDataToSend,
        preparedToSave,
        preparedToEditBuyWallet,
        onSetFifteenStepState,
        isSavingLoading,
    } = useFifteenthStepForm({
        validationSchema: yupResolver(newFifteenthStepSchema),
        defaultValues: defaultValuesRef.current,
    })
    const { isValid, errors } = useFormState({ control })
    watch()

    // listeners
    useEffect(() => {
        dispatch(getCreditCardFeesAction())
        dispatch(getQuotesFeesSavedAction())
    }, [])

    useEffect(() => {
        if (quoteFeesSaved !== null) {
            setValue(
                'amountOfFees',
                quoteNumberSelect
                    ?.find((quote) => quote.id === quoteFeesSaved.installmentId)
                    ?.installmentsCount.toString() ?? '',
                { shouldValidate: true }
            )
        }
    }, [quoteFeesSaved, quoteNumberSelect, setValue])

    useEffect(() => {
        dispatch(getAllBanksAction())
    }, [currentStep])

    useEffect(() => {
        dispatch(getAllBuyWalletAction())
    }, [buyWalletDeleted])

    // handlers
    const onSubmit = (dataToSend: FifteenthStepType): void => {
        preparedDataToSend(dataToSend)
    }

    const onSave = (): void => {
        preparedToSave()
    }

    const onDeleteBuyWallet = (bank: BuyWallet): void => {
        setShowDeleteModal(true)
        setBankSelect(bank)
    }

    const onEditBuyWallet = (bank: BuyWallet): void => {
        preparedToEditBuyWallet(bank)
    }

    const onAddCreditCard = (): void => {
        if (QUOTE_AVAILABLE - count > 1) {
            onSetFifteenStepState()
            dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 16,
                },
            })
        }
    }

    const isValidControl = (): boolean => {
        if (getValues('buyWallet') === 'not') {
            return !isValid
        }
        if (buyWallet) {
            return !(isValid && buyWallet.length > 0) ? true : false
        }
        return false
    }

    return (
        <>
            <NavigationStep saveAndExit onSave={onSave} />
            <FifteenthStepWrapper>
                <FifteenthStepContent>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <HeadStep
                            title="Solicitud"
                            paragraph="¿Desea comprar cartera? puedes agregar una o más tarjetas de crédito para realizar la compra de cartera"
                        />

                        <FormGroup>
                            <InputGroupCheck>
                                <FormCheck
                                    label="Si"
                                    value="yes"
                                    type="radio"
                                    id="buyWallet-yes"
                                    {...register('buyWallet')}
                                />
                                <FormCheck
                                    label="No"
                                    value="not"
                                    type="radio"
                                    id="buyWallet-not"
                                    {...register('buyWallet')}
                                />
                            </InputGroupCheck>
                        </FormGroup>
                        <SpaceStep />

                        {buyWallet && buyWallet.length > 0 && getValues('buyWallet') === 'yes' && (
                            <BankCardList>
                                {buyWallet.map((bank) => (
                                    <BankCard
                                        key={bank.id}
                                        bank={bank}
                                        onDelete={onDeleteBuyWallet}
                                        onEdit={onEditBuyWallet}
                                    />
                                ))}
                            </BankCardList>
                        )}

                        {getValues('buyWallet') === 'yes' && (
                            <AddCreditCardBtn
                                active={QUOTE_AVAILABLE - count > 1}
                                onClick={onAddCreditCard}
                            >
                                <ImageAdd src={MiniAddPlusSVG} alt="Logo" />
                                <TitleStep>Agregar tarjeta</TitleStep>
                            </AddCreditCardBtn>
                        )}

                        {buyWallet && buyWallet.length > 0 && getValues('buyWallet') === 'yes' && (
                            <>
                                {QUOTE_AVAILABLE - count < 1 && <AlertBuy />}
                                <ParagraphStep>
                                    Tu compra de cartera será definida como una sola compra,
                                    especifica la cantidad de cuotas a la que deseas diferir tu
                                    compra de cartera.
                                </ParagraphStep>

                                <FieldCtr>
                                    <FormGroup $heightSize="105px">
                                        <FormLabel>Cantidad de cuotas</FormLabel>
                                        <InputSelectGroup $isError={!!errors.amountOfFees} $haveImg>
                                            <Image src={ExclusionSVG} alt="clave" />
                                            <FormSelect size="lg" {...register('amountOfFees')}>
                                                <FormOption disabled value="" show>
                                                    Selecciona una opción
                                                </FormOption>
                                                {quoteNumberSelect?.map((quote) => (
                                                    <FormOption key={quote.id}>
                                                        {quote.installmentsCount}
                                                    </FormOption>
                                                ))}
                                            </FormSelect>
                                        </InputSelectGroup>
                                        <FormMessageSelect>
                                            {errors.amountOfFees && errors.amountOfFees.message}
                                        </FormMessageSelect>
                                    </FormGroup>
                                </FieldCtr>
                            </>
                        )}

                        <ControlsButtons
                            disable={isValidControl()}
                            isLoadingSave={isSavingLoading}
                            onSave={onSave}
                        />
                    </Form>
                </FifteenthStepContent>
            </FifteenthStepWrapper>
            {bankSelect && (
                <DeleteBankModal
                    show={showDeleteModal}
                    onClose={() => {
                        setShowDeleteModal(false)
                    }}
                    onDelete={() => {
                        if (bankSelect) {
                            dispatch(deleteBuyWalletByIdAction(bankSelect.id))
                            setShowDeleteModal(false)
                        }
                    }}
                    bank={bankSelect}
                />
            )}
        </>
    )
}

export default FifteenthStep
