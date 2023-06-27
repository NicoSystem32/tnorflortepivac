/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import { AxiosResponse } from 'axios'
import * as yup from 'yup'

// selectors
import {
    getClientValidationCCRequestSelector,
    getCreditCardDataPerStepSelector,
    validateUserStateSelector,
} from '../../../../selectors'

// hooks
import { useReducerStep } from '.'

// actions
import {
    fillDataPerStepAction,
    saveTcSelectedFeeAction,
    fillValidationUserStateAction,
} from '../../../../redux/openingTC'

// models
import { SaveTCContact, ValidateUserResponse } from '../../../../../domain/models'

// validation schema
export const seventhStepSchema = yup
    .object({
        cardQuote: yup.number().required('Campo obligatorio'),
    })
    .required()

// type definitions
export type SeventhStepType = yup.InferType<typeof seventhStepSchema>

interface IUseSeventhStepArgs<F extends FieldValues = SeventhStepType> {
    defaultValues: DeepPartial<F | SeventhStepType>
    validationSchema?: Resolver<F | SeventhStepType>
    rangeMax: number
    rangeMin: number
}

export const useSeventhStepForm = <TFieldValues extends FieldValues = SeventhStepType>({
    defaultValues,
    validationSchema,
    rangeMax,
    rangeMin,
}: IUseSeventhStepArgs<TFieldValues>) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const dispatchStep = useReducerStep()[1]
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingContinue, setIsLoadingContinue] = useState(false)
    const range = rangeMax - rangeMin

    const { clientValidation } = useSelector(getClientValidationCCRequestSelector)
    const { validateUser } = useSelector(validateUserStateSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { seventhStep, eighthStep } = createCreditCard

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | SeventhStepType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    const initPercentage = ((getValues('cardQuote') - (rangeMin - 1)) * 100) / range

    const preparedToSend = ({ cardQuote }: SeventhStepType): void => {
        setIsLoadingContinue(true)
        saveTcSelectedFee('7', (resp) => {
            setIsLoadingContinue(false)
            if (!resp.data) {
                const { data, status } = resp.response as unknown as AxiosResponse
                errorHandler(status, data.Message)
                return
            }

            dispatch(
                fillDataPerStepAction({
                    ...createCreditCard,
                    seventhStep: {
                        ...seventhStep,
                        cardQuote: cardQuote,
                        maxQuote: resp.data.maxLimitCredit ?? 10,
                        minQuote: resp.data.minLimitCredit ?? 0,
                        cardImage: resp.data.creditCardCategory,
                    },
                    eighthStep: {
                        ...eighthStep,
                        cardAlternativeImage: resp.data.autoCategory,
                        cardImage: resp.data.creditCardCategory,
                        autoFee: resp.data.autoFee,
                    },
                })
            )
            dispatchStep({
                type: 'SET_FEEDBACK',
                payload: {
                    code: '',
                    message: '',
                    minRange: resp.data.minLimitCredit ?? 0,
                    maxRange: resp.data.maxLimitCredit ?? 10,
                },
            })

            validateUserResp(validateUser, resp.data)

            if (resp.data.autoInsurability) {
                return dispatchStep({
                    type: 'GO_TO_STEP',
                    payload: {
                        step: 8,
                    },
                })
            }

            if (!resp.data.autoInsurability) {
                return dispatchStep({
                    type: 'GO_TO_STEP',
                    payload: {
                        step: 12,
                    },
                })
            }
        })
    }

    const preparedToSave = (): void => {
        setIsLoading(true)
        saveTcSelectedFee('6', () => {
            setIsLoading(false)
            dispatch(
                fillDataPerStepAction({
                    ...createCreditCard,
                    seventhStep: {
                        ...seventhStep,
                        cardQuote: getValues('cardQuote'),
                    },
                })
            )
            redirection('/home-wallet')
        })
    }

    const saveTcSelectedFee = (
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
            dispatchTcSelectedFee(id, requestStep, onCallback)
        } else {
            dispatchTcSelectedFee(validateUser?.id ?? 0, requestStep, onCallback)
        }
    }

    const dispatchTcSelectedFee = (
        id: number,
        requestStep: string,
        onCallback?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact | null
        }) => void
    ) => {
        const selectFee = getValues('cardQuote') as string

        dispatch(
            saveTcSelectedFeeAction(
                {
                    Id: id,
                    RequestStep: requestStep,
                    SelectedFee:
                        getValues('cardQuote') === rangeMax.toString()
                            ? getValues('cardQuote')
                            : parseInt(selectFee) + 1,
                },
                onCallback
            )
        )
    }

    const redirection = (url: string, state?: Record<string, string | number>): void => {
        history.push(url, state)
    }

    const errorHandler = (status: number, message: string): void => {
        if (status === 500) {
            dispatchStep({
                type: 'SET_FEEDBACK',
                payload: {
                    code: '500',
                    message,
                },
            })
            dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 18,
                },
            })
        }
    }

    const validateUserResp = (validate: ValidateUserResponse | null, data: SaveTCContact): void => {
        if (validate) {
            dispatch(
                fillValidationUserStateAction({
                    ...validate,
                    assignedFee: data.assignedFee ? parseInt(data.assignedFee) : null,
                    autoFee: data.autoFee,
                    autoInsurability: data.autoInsurability,
                    autoCategory: data.autoCategory,
                })
            )
        }
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

        // new
        initPercentage,
        preparedToSend,
        preparedToSave,
        isLoading,
        isLoadingContinue,
    }
}
