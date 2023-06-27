/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import * as yup from 'yup'

// hooks
import { useReducerState } from '.'

// models
import { BuyWallet } from '../../../../../domain/models'

// actions
import { saveQuotesFeesAction, notifyCompletionAction } from '../../../../redux/portfolioPurchaseTC'

// selectors
import { getCreditCardFeesSelector } from '../../../../selectors'

// validation schema
export const firstStepSchema = yup
    .object({
        amountOfFees: yup.string().required('Campo obligatorio'),
    })
    .required()

// type definitions
export type FirstStepType = yup.InferType<typeof firstStepSchema>

export interface IUseFirstStepArgs<F extends FieldValues = FirstStepType> {
    defaultValues: DeepPartial<F | FirstStepType>
    validationSchema?: Resolver<F | FirstStepType>
}

export const useFirstStepForm = <TFieldValues extends FieldValues = FirstStepType>({
    validationSchema,
    defaultValues,
}: IUseFirstStepArgs<TFieldValues>) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isSavingLoading, setIsSavingLoading] = useState(false)
    const [{ secondStep }, dispatchStep] = useReducerState()

    // selectors
    const { data: quotes } = useSelector(getCreditCardFeesSelector)

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | FirstStepType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    const preparedDataToSend = ({ amountOfFees }: FirstStepType): void => {
        if (amountOfFees) {
            preparedToSave()
            dispatch(notifyCompletionAction())
        }
        history.push('/home-wallet')
    }

    const preparedToSave = (): void => {
        const idQuote = quotes?.find(
            (quote) => quote.installmentsCount.toString() === getValues('amountOfFees')
        )?.id

        if (idQuote) {
            setIsSavingLoading(true)
            dispatchStep({
                type: 'SET_FIRST_STEP',
                payload: {
                    amountOfFees: getValues('amountOfFees'),
                },
            })
            dispatch(
                saveQuotesFeesAction(idQuote, () => {
                    setIsSavingLoading(false)
                })
            )
        }
        history.push('/home-wallet')
    }
    const preparedDataQuotes = (idQuote: any): void => {
        if (idQuote) {
            dispatch(
                saveQuotesFeesAction(idQuote, () => {
                    setIsSavingLoading(false)
                })
            )
        }
    }

    const preparedToEditBuyWallet = (bank: BuyWallet): void => {
        dispatchStep({
            type: 'SET_SECOND_STEP',
            payload: {
                ...secondStep,
                nameBank: bank.bankEntityId.toString() ?? '',
                otherNameBank: bank.alternativeBankName ?? '',
                creditCardNumber: bank.cardNumber ?? '',
                amountBuy: bank.purchaseAmount.toString() ?? '',
            },
        })
        dispatchStep({
            type: 'GO_TO_STEP',
            payload: {
                step: 2,
            },
        })
        dispatchStep({
            type: 'SET_IS_EDIT',
            payload: {
                isEdit: true,
            },
        })
        dispatchStep({
            type: 'SET_ID_PORTFOLIO',
            payload: {
                idPurchase: bank.id,
            },
        })
    }
    return {
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        clearErrors,
        control,
        watch,

        // other props
        preparedDataToSend,
        preparedDataQuotes,
        preparedToSave,
        preparedToEditBuyWallet,
        isSavingLoading,
    }
}
