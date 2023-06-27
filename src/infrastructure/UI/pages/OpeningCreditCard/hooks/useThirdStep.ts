/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { useDispatch, useSelector } from 'react-redux'

// hooks
import { useReducerStep } from '.'
import { useTimer } from '../../../hooks'

// actions
import {
    validateCodeOtpCreditCardAction,
    sendCodeOtpCreditCardAction,
    resetValidateCodeOtpCreditCardAction,
    getClientValidationCCRequestAction,
    fillDataPerStepAction,
} from '../../../../redux/openingTC'

// utils
import { calPercentage } from '../../../utils/misc'

// selectors
import {
    getCreditCardDataPerStepSelector,
    sendCodeOtpCreditCardSelector,
    validateCodeOtpCreditCardSelector,
} from '../../../../selectors'

// models
import { IsSuccessValidation } from '../../../../../domain/models'

const useThirdStep = () => {
    const dispatch = useDispatch()

    // initial state
    const startMinutes = 5

    const [
        {
            feedback: { message, code },
        },
        dispatchStep,
    ] = useReducerStep()

    const [percentage, setPercentage] = useState<number>(90)
    const [showRetrySendOtp, setShowRetrySendOtp] = useState<boolean>(true)
    const [disablePaymentBtn, setDisablePaymentBtn] = useState<boolean>(false)
    const [dynamicKey, setDynamicKey] = useState<string>('')
    const [exceptionType, setExceptionType] = useState<1 | 2 | 3 | 4 | 5 | 6 | undefined>(undefined)

    const typesUserProfile: Record<number, () => void> = {
        1: (): void => {
            setExceptionType(undefined)
            dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 4,
                },
            })
        },
        2: () => setExceptionType(1),
        3: () => setExceptionType(2),
        4: () => setExceptionType(3),
        5: () => setExceptionType(4),
        6: () => setExceptionType(5),
    }

    // selectors
    const {
        message: messageOtp,
        loading: loadingOtp,
        error: errorOtp,
    } = useSelector(sendCodeOtpCreditCardSelector)
    const { loading: loadingValidOtp, error } = useSelector(validateCodeOtpCreditCardSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { fourthStep, twelfthStep } = createCreditCard

    // hooks
    const { minutes, seconds, startTimer, resetTimer } = useTimer(startMinutes)

    // listeners
    useEffect(() => {
        startTimer()
    })

    useEffect(() => {
        if (minutes === 4 && seconds === 0) {
            setShowRetrySendOtp(false)
        }
        refreshPercentage(minutes, seconds)
    }, [minutes, seconds])

    useEffect(() => {
        dispatch(resetValidateCodeOtpCreditCardAction())
    }, [])

    // events handlers
    const handleContinue = (): void => {
        dispatch(
            getClientValidationCCRequestAction((resp) => {
                if (resp.response === '500') {
                    return dispatchStep({
                        type: 'GO_TO_STEP',
                        payload: {
                            step: 18,
                        },
                    })
                }
                if (resp.data && !resp.data.validationIsOk) {
                    if (resp.data.validationData && 'id' in resp.data.validationData) {
                        setContactCoreInformation(resp.data.state, resp.data.validationData)
                    }
                    return typesUserProfile[resp.data.state]()
                }

                const { status, data } = resp.response as unknown as AxiosResponse

                if (status === 500) {
                    dispatchStep({
                        type: 'SET_FEEDBACK',
                        payload: {
                            code: 500,
                            message: data.Message,
                        },
                    })
                    return dispatchStep({
                        type: 'GO_TO_STEP',
                        payload: {
                            step: 18,
                        },
                    })
                }
            })
        )
    }

    const refreshPercentage = (minsPerc: number, secsPerc: number): void => {
        setPercentage(calPercentage(startMinutes, minsPerc + secsPerc / 60))
    }

    const captureDynamicKey = (key: string): void => {
        setDisablePaymentBtn(true)
        setDynamicKey(key)
    }

    const onChangeDynamicKey = (): void => {
        setDisablePaymentBtn(false)
    }

    const handleErrorMessage = (): string => {
        if (code === '400' && Object.keys(errorOtp).length > 0) {
            return message
        }
        if (Object.keys(error).length > 0) {
            return error?.errorData.message || ''
        }
        return ''
    }

    const validateOtpKey = (otpKey: string): void => {
        dispatch(
            validateCodeOtpCreditCardAction(otpKey, '5', (resp) => {
                if (resp.response === '200') {
                    handleContinue()
                    return
                }

                const { data, status } = resp.response as unknown as AxiosResponse

                if (status === 400) {
                    dispatchStep({
                        type: 'SET_FEEDBACK',
                        payload: {
                            code: '400',
                            message: data.Message,
                        },
                    })
                }
            })
        )
    }

    const retrySendCodeOTP = (): void => {
        dispatch(resetValidateCodeOtpCreditCardAction())
        dispatch(
            sendCodeOtpCreditCardAction('5', ({ response }) => {
                if (response === '200') {
                    resetTimer()
                    setShowRetrySendOtp(true)
                }
            })
        )
    }

    const setContactCoreInformation = (
        state: 2 | 3 | 1 | 4 | 5 | 6,
        validationData: IsSuccessValidation
    ) => {
        if (state === 1) {
            dispatch(
                fillDataPerStepAction({
                    ...createCreditCard,
                    currentStep: 4,
                    fourthStep: {
                        ...fourthStep,
                        phone: validationData.phone,
                        state: validationData.department,
                        city: validationData.city,
                        neighborhood: validationData.neighborhood,
                    },
                    twelfthStep: {
                        ...twelfthStep,
                        state: validationData.department,
                        city: validationData.city,
                        neighborhood: validationData.neighborhood,
                    },
                })
            )
            dispatchStep({
                type: 'SET_FEEDBACK',
                payload: {
                    code: 200,
                    message: validationData.address ?? '',
                },
            })
        }
    }

    return {
        // states
        percentage,
        showRetrySendOtp,
        disablePaymentBtn,
        dynamicKey,

        // timer
        minutes,
        seconds,
        startTimer,
        resetTimer,

        // handlers
        handleContinue,
        refreshPercentage,
        captureDynamicKey,
        onChangeDynamicKey,
        handleErrorMessage,
        validateOtpKey,
        retrySendCodeOTP,

        // selectorData
        loadingValidOtp,
        loadingOtp,
        messageOtp,

        // context
        message,
        code,
        exceptionType,
    }
}

export default useThirdStep
