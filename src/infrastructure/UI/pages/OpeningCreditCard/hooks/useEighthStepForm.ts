/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import * as yup from 'yup'

// hooks
import { useReducerStep } from '.'

// actions
import {
    fillDataPerStepAction,
    saveTcSelectedFeeInsurabilityAction,
} from '../../../../redux/openingTC'

// selectors
import {
    getClientValidationCCRequestSelector,
    getCreditCardDataPerStepSelector,
    validateUserStateSelector,
} from '../../../../selectors'
import { SaveTCContact } from '../../../../../domain/models'

// validation schema
export const eighthStepSchema = yup
    .object({
        quoteSelected: yup.string().required('Campo obligatorio'),
    })
    .required()

// type definitions
export type EighthStepType = yup.InferType<typeof eighthStepSchema>

interface IUseEighthStepArgs<F extends FieldValues = EighthStepType> {
    defaultValues: DeepPartial<F | EighthStepType>
    validationSchema?: Resolver<F | EighthStepType>
}

export const useEighthStepForm = <TFieldValues extends FieldValues = EighthStepType>({
    defaultValues,
    validationSchema,
}: IUseEighthStepArgs<TFieldValues>) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const dispatchStep = useReducerStep()[1]

    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [isLoadingContinue, setIsLoadingContinue] = useState(false)

    // selectors
    const { clientValidation } = useSelector(getClientValidationCCRequestSelector)
    const { validateUser } = useSelector(validateUserStateSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { eighthStep } = createCreditCard

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | EighthStepType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    const preparedToSend = ({ quoteSelected }: EighthStepType): void => {
        setIsLoadingContinue(true)
        saveTcSelectedFeeInsurabilityData('6', () => {
            dispatch(
                fillDataPerStepAction({
                    ...createCreditCard,
                    eighthStep: {
                        ...eighthStep,
                        checkCardQuote: quoteSelected,
                    },
                })
            )
            onNextNavigate({ quoteSelected })
            setIsLoadingContinue(false)
        })
    }

    const preparedToSave = (): void => {
        setIsLoadingSave(true)

        saveTcSelectedFeeInsurabilityData('6', () => {
            dispatch(
                fillDataPerStepAction({
                    ...createCreditCard,
                    eighthStep: {
                        ...eighthStep,
                        checkCardQuote: getValues('quoteSelected'),
                    },
                })
            )
            setIsLoadingSave(false)
            redirection('/home-wallet')
        })
    }

    const saveTcSelectedFeeInsurabilityData = (
        requestStep: string,
        onCallback?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact | null
        }) => void
    ): void => {
        if (clientValidation?.validationData) {
            const id =
                'id' in clientValidation.validationData ? clientValidation?.validationData.id : 0
            dispatchTcSelectedFeeInsurability(id, requestStep, onCallback)
        } else {
            dispatchTcSelectedFeeInsurability(validateUser?.id ?? 0, requestStep, onCallback)
        }
    }

    const dispatchTcSelectedFeeInsurability = (
        id: number,
        requestStep: string,
        onCallback?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact | null
        }) => void
    ) => {
        dispatch(
            saveTcSelectedFeeInsurabilityAction(
                {
                    RequestStep: requestStep,
                    Id: id,
                    SelectedOption: getValues('quoteSelected') === 'createQuote' ? 1 : 2,
                },
                onCallback
            )
        )
    }

    const onNextNavigate = ({ quoteSelected }: EighthStepType) => {
        if (quoteSelected === 'createQuote') {
            dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 9,
                },
            })
        } else {
            dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 12,
                },
            })
        }
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
        preparedToSend,
        preparedToSave,
        isLoadingSave,
        isLoadingContinue,
    }
}
