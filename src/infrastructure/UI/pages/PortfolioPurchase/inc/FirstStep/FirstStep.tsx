import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormState } from 'react-hook-form'

// components
import { Form, InputSelectGroup } from '../../../../components'
import {
    BankCard,
    HeadStep,
    ControlsButtons,
    DeleteBankModal,
} from '../../../OpeningCreditCard/inc'
import { NavigationStep, TitleModule, AlertBuy } from '..'

// styles
import {
    FirstStepWrapper,
    FirstStepContent,
    AddCreditCardBtn,
    ImageAdd,
    FieldCtr,
    BankCardList,
} from './firstStep-styles'
import {
    TitleStep,
    FormGroup,
    FormLabel,
    ParagraphStep,
    Image,
    FormSelect,
    FormOption,
    FormMessageSelect,
} from '../../porfolioPurchase-styles'

// icons
import { MiniAddPlusSVG, ExclusionSVG } from '../../../../utils/getIcons'

// actions
import { getAllBanksAction } from '../../../../../redux/tc'
import {
    deleteBuyWalletByIdAction,
    getAllBuyWalletAction,
    getCreditCardFeesAction,
    getQuotesFeesSavedAction,
    getCleanPortfolioPurchaseAction,
} from '../../../../../redux/portfolioPurchaseTC'

// hooks
import { useFirstStepForm, firstStepSchema, FirstStepType } from '../../hooks/useFirstStepForm'
import { useReducerState } from '../../hooks'

// selectors
import {
    getAllBuyWalletSelector,
    getCreditCardFeesSelector,
    deleteBuyWalletByIdSelector,
    currentQuotesFeesSaveSelector,
} from '../../../../../selectors'

// models
import { BuyWallet } from '../../../../../../domain/models'
import EditConfirmationModal from '../EditConfirmationModal'

const FirstStep = (): ReactElement => {
    const dispatch = useDispatch()
    const history = useHistory()
    const state = useLocation().state as { lastFrom: string; quotaAvailable: number }
    const [{ currentStep, firstStep }, dispatchStep] = useReducerState()

    const QUOTE_AVAILABLE = state?.quotaAvailable ? state?.quotaAvailable : 0

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [bankSelect, setBankSelect] = useState<BuyWallet | null>(null)

    // selectors
    const { data: quoteNumberSelect } = useSelector(getCreditCardFeesSelector)
    const { data: quoteFeesSaved } = useSelector(currentQuotesFeesSaveSelector)
    const { buyWallet, count } = useSelector(getAllBuyWalletSelector)
    const { buyWalletDeleted } = useSelector(deleteBuyWalletByIdSelector)

    const defaultValues = useRef({
        amountOfFees: firstStep.amountOfFees ?? '',
    })

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        preparedDataToSend,
        preparedDataQuotes,
        preparedToSave,
        preparedToEditBuyWallet,
        isSavingLoading,
    } = useFirstStepForm({
        defaultValues: defaultValues.current,
        validationSchema: yupResolver(firstStepSchema),
    })
    const { isValid, errors } = useFormState({ control })
    watch()

    // listeners
    useEffect(() => {
        dispatch(getQuotesFeesSavedAction())
        dispatch(getCreditCardFeesAction())
    }, [])

    useEffect(() => {
        if (!state) {
            history.push('/home-wallet')
        }
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
    }, [quoteFeesSaved?.installmentId, quoteNumberSelect, setValue])

    useEffect(() => {
        dispatch(getAllBanksAction())
    }, [currentStep])

    useEffect(() => {
        dispatch(getAllBuyWalletAction())
    }, [buyWalletDeleted])

    // handlers
    const onSubmit = (dataToSend: FirstStepType): void => {
        preparedDataToSend(dataToSend)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        preparedDataQuotes(e.target.value)
    }

    const onSave = (): void => {
        preparedToSave()
    }

    const onCancel = (): void => {
        dispatch(getCleanPortfolioPurchaseAction())
        history.push('/home-wallet')
    }

    const onAddCreditCard = (): void => {
        if (QUOTE_AVAILABLE - count > 1) {
            dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 2,
                },
            })
        }
    }

    const onConfirmationFinish = (): void => {
        if (QUOTE_AVAILABLE - count > 1) {
            dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 3,
                },
            })
        }
    }

    const onDeleteBuyWallet = (bank: BuyWallet): void => {
        setShowDeleteModal(true)
        setBankSelect(bank)
    }

    const onEditBuyWallet = (bank: BuyWallet): void => {
        //preparedToEditBuyWallet(bank)
        setShowEditModal(true)
        setBankSelect(bank)
    }

    return (
        <>
            <NavigationStep onSave={onCancel} />
            <TitleModule />
            <FirstStepWrapper>
                <FirstStepContent>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <HeadStep
                            title={`Paso ${buyWallet && buyWallet?.length > 0 ? '3' : '1'} de 3`}
                            paragraph="Compra la cartera de tus tarjetas de crédito de otros bancos, puedes agregar una o más tarjetas de crédito"
                        />

                        {buyWallet && buyWallet.length > 0 && (
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

                        <AddCreditCardBtn
                            active={QUOTE_AVAILABLE - count > 1}
                            onClick={onAddCreditCard}
                        >
                            <ImageAdd src={MiniAddPlusSVG} alt="Logo" />
                            <TitleStep>Agregar tarjeta</TitleStep>
                        </AddCreditCardBtn>

                        {QUOTE_AVAILABLE - count < 1 && <AlertBuy />}

                        {buyWallet && buyWallet.length > 0 && (
                            <>
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
                                            <FormSelect
                                                size="lg"
                                                {...register('amountOfFees')}
                                                onChange={onChange}
                                            >
                                                <FormOption disabled value="" show>
                                                    Selecciona una opción
                                                </FormOption>
                                                {quoteNumberSelect?.map((quote) => (
                                                    <FormOption key={quote.id} value={quote.id}>
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
                            disable={!isValid}
                            isLoadingSave={isSavingLoading}
                            onSave={onSave}
                            onNext={onConfirmationFinish}
                            onCancel={onCancel}
                        />
                    </Form>
                </FirstStepContent>
            </FirstStepWrapper>
            {bankSelect && (
                <>
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
                    <EditConfirmationModal
                        show={showEditModal}
                        onClose={() => {
                            setShowEditModal(false)
                        }}
                        onEdit={() => {
                            if (bankSelect) {
                                dispatch(preparedToEditBuyWallet(bankSelect))
                                setShowEditModal(false)
                            }
                        }}
                        bank={bankSelect}
                    />
                </>
            )}
        </>
    )
}

export default FirstStep
