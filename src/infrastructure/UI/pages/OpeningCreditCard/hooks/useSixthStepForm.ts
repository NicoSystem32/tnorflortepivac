/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import { AxiosResponse } from 'axios'
import * as yup from 'yup'

// selectors
import {
    getCreditCardDataPerStepSelector,
    useSelector,
    getClientValidationCCRequestSelector,
    validateUserStateSelector,
} from '../../../../selectors'

// hooks
import { useReducerStep } from '.'

// actions
import { fillDataPerStepAction, saveTcEconomicAction } from '../../../../redux/openingTC'

// models
import { SaveTCContact } from '../../../../../domain/models'

// validation schema
export const sixthStepSchema = yup
    .object({
        economicActivity: yup.string().required('Campo obligatorio'),
        haveAdditionalIncome: yup.string().required('Campo obligatorio'),
        mainIncome: yup.string().required('Campo obligatorio'),
        additionalIncome: yup.string().when('haveAdditionalIncome', {
            is: 'yes',
            then: yup.string().required('Campo obligatorio'),
        }),
    })
    .required()

// type definitions
export type SixthStepType = yup.InferType<typeof sixthStepSchema>

interface IUseSixthStepArgs<F extends FieldValues = SixthStepType> {
    defaultValues: DeepPartial<F | SixthStepType>
    validationSchema?: Resolver<F | SixthStepType>
}

export const useSixthStepForm = <TFieldValues extends FieldValues = SixthStepType>({
    defaultValues,
    validationSchema,
}: IUseSixthStepArgs<TFieldValues>) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [showLoadingView, setShowLoadingView] = useState(false)
    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [{ currentStep }, dispatchStep] = useReducerStep()

    const { clientValidation } = useSelector(getClientValidationCCRequestSelector)
    const { validateUser } = useSelector(validateUserStateSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { sixthStep, seventhStep } = createCreditCard

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | SixthStepType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    const preparedToSend = ({ additionalIncome, ...rest }: SixthStepType): void => {
        setShowLoadingView(true)

        saveTcEconomicActivity('6', (resp) => {
            if (resp.isSuccess) {
                setShowLoadingView(false)
                dispatchStep({
                    type: 'SET_FEEDBACK',
                    payload: {
                        code: '',
                        message: '',
                        minRange: resp.data.minLimitCredit ?? 0,
                        maxRange: resp.data.maxLimitCredit ?? 10,
                    },
                })
                dispatchStep({
                    type: 'GO_TO_STEP',
                    payload: {
                        step: 7,
                    },
                })
                dispatch(
                    fillDataPerStepAction({
                        ...createCreditCard,
                        sixthStep: {
                            ...sixthStep,
                            ...rest,
                            additionalIncome: additionalIncome
                                ? additionalIncome
                                : resp.data.otherIncome,
                        },
                        seventhStep: {
                            ...seventhStep,
                            maxQuote: resp.data.maxLimitCredit ?? 10,
                            minQuote: resp.data.minLimitCredit ?? 0,
                            cardImage: resp.data.creditCardCategory,
                        },
                    })
                )
                return
            }

            const { data, status } = resp.response as unknown as AxiosResponse

            if ([400].includes(status)) {
                dispatchStep({
                    type: 'SET_FEEDBACK',
                    payload: {
                        code: '400',
                        message: data.Message,
                    },
                })
                return dispatchStep({
                    type: 'GO_TO_STEP',
                    payload: {
                        step: 19,
                    },
                })
            }

            if ([500].includes(status)) {
                dispatchStep({
                    type: 'SET_FEEDBACK',
                    payload: {
                        code: '500',
                        message: data.Message,
                    },
                })
                dispatchStep({
                    type: 'GO_TO_STEP',
                    payload: {
                        step: 18,
                    },
                })
            }
        })
    }

    const preparedToSave = (): void => {
        setIsLoadingSave(true)
        saveTcEconomicActivity('5', ({ isSuccess, data }) => {
            if (isSuccess) {
                dispatch(
                    fillDataPerStepAction({
                        ...createCreditCard,
                        currentStep,
                        sixthStep: {
                            economicActivity: data.economyActivity,
                            mainIncome: data.mainIncome,
                            haveAdditionalIncome: data.hasOtherIncome,
                            additionalIncome: data.otherIncome,
                        },
                    })
                )
                setIsLoadingSave(false)
            }
            redirection('/home-wallet')
        })
    }

    const saveTcEconomicActivity = (
        requestStep: string,
        callback?: (response: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact
        }) => void
    ): void => {
        if (clientValidation?.validationData) {
            const id =
                'id' in clientValidation.validationData ? clientValidation?.validationData.id : 0
            dispatchTcEconomicActivity(id, requestStep, callback)
        } else {
            dispatchTcEconomicActivity(validateUser?.id ?? 0, requestStep, callback)
        }
    }

    const dispatchTcEconomicActivity = (
        id: number,
        requestStep: string,
        callback?: (response: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact
        }) => void
    ) => {
        dispatch(
            saveTcEconomicAction(
                {
                    Id: id,
                    RequestStep: requestStep,
                    EconomyActivity: getValues('economicActivity'),
                    MainIncome: parseInt(getValues('mainIncome') ?? '0'),
                    HasOtherIncome: getValues('haveAdditionalIncome') === 'yes' ? true : false,
                    OtherIncome: getValues('additionalIncome')
                        ? parseInt(getValues('additionalIncome') ?? '0')
                        : 0,
                },
                (resp) => {
                    if (callback) {
                        callback(resp)
                    }
                }
            )
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
        preparedToSave,
        preparedToSend,
        showLoadingView,
        isLoadingSave,
    }
}
