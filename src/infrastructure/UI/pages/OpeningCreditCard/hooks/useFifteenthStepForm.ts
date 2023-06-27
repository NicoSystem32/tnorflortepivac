/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import * as yup from 'yup'

// hooks
import { useReducerStep } from '.'

// selectors
import {
    getCreditCardDataPerStepSelector,
    getCreditCardFeesSelector,
    useSelector,
} from '../../../../selectors'

// actions
import { saveQuotesFeesAction } from '../../../../redux/portfolioPurchaseTC'
import { fillDataPerStepAction } from '../../../../redux/openingTC'

// models
import { BuyWallet } from '../../../../../domain/models'

// validation schema
export const fifteenthStepSchema = yup
    .object({
        buyWallet: yup.string().required('Campo obligatorio'),
    })
    .required()

// type definitions
export type FifteenthStepType = yup.InferType<typeof fifteenthStepSchema> & { amountOfFees: string }

interface IUseFifthStepArgs<F extends FieldValues = FifteenthStepType> {
    defaultValues: DeepPartial<F | FifteenthStepType>
    validationSchema?: Resolver<F | FifteenthStepType>
}

export const useFifteenthStepForm = <TFieldValues extends FieldValues = FifteenthStepType>({
    defaultValues,
    validationSchema,
}: IUseFifthStepArgs<TFieldValues>) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isSavingLoading, setIsSavingLoading] = useState(false)
    const dispatchStep = useReducerStep()[1]

    // selectors
    const { data: quotes } = useSelector(getCreditCardFeesSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { fifteenthStep } = createCreditCard

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | FifteenthStepType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    const preparedDataToSend = ({ buyWallet, amountOfFees }: FifteenthStepType): void => {
        const idQuote = quotes?.find(
            (quote) => quote.installmentsCount.toString() === getValues('amountOfFees')
        )?.id

        dispatch(
            fillDataPerStepAction({
                ...createCreditCard,
                fifteenthStep: {
                    ...fifteenthStep,
                    buyWallet: buyWallet ?? 'not',
                    amountOfFees: amountOfFees ?? '',
                },
            })
        )

        if (buyWallet === 'not') {
            return dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 13,
                },
            })
        }

        if (idQuote) {
            dispatch(
                saveQuotesFeesAction(idQuote, () => {
                    dispatchStep({
                        type: 'GO_TO_STEP',
                        payload: {
                            step: 13,
                        },
                    })
                })
            )
        }
    }

    const preparedToSave = (): void => {
        onSetFifteenStepState()
        const idQuote = quotes?.find(
            (quote) => quote.installmentsCount.toString() === getValues('amountOfFees')
        )?.id

        if (idQuote) {
            setIsSavingLoading(true)
            dispatch(
                saveQuotesFeesAction(idQuote, () => {
                    setIsSavingLoading(false)
                })
            )
        }

        redirection('/home-wallet')
    }

    const preparedToEditBuyWallet = (bank: BuyWallet): void => {
        dispatchStep({
            type: 'SET_FEEDBACK',
            payload: {
                code: '',
                message: '',
                isEditBuyWallet: true,
                idPurchase: bank.id,
            },
        })
        dispatch(
            fillDataPerStepAction({
                ...createCreditCard,
                sixteenthStep: {
                    nameBank: bank.bankEntityId.toString() ?? '',
                    otherNameBank: bank.alternativeBankName ?? '',
                    creditCardNumber: bank.cardNumber ?? '',
                    amountBuy: bank.purchaseAmount.toString() ?? '',
                    formatFile: null,
                },
            })
        )
        dispatchStep({
            type: 'GO_TO_STEP',
            payload: {
                step: 16,
            },
        })
    }

    const onSetFifteenStepState = (): void => {
        dispatch(
            fillDataPerStepAction({
                ...createCreditCard,
                fifteenthStep: {
                    ...fifteenthStep,
                    buyWallet: getValues('buyWallet') ?? 'not',
                    amountOfFees: getValues('amountOfFees') ?? '',
                },
            })
        )
    }

    const redirection = (url: string, state?: Record<string, string | number>): void => {
        history.push(url, state)
    }

    return {
        handleSubmit,
        register,
        getValues,
        setValue,
        setError,
        clearErrors,
        control,
        watch,

        // other props
        preparedDataToSend,
        preparedToSave,
        preparedToEditBuyWallet,
        onSetFifteenStepState,
        isSavingLoading,
    }
}
