/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

// selectors
import {
    parametersTDCSelector,
    sendCodeOTPSelector,
    transactionPSESelector,
    validateOTPSelector,
} from '../../../../selectors'

// hooks
import { useReducerStep } from '.'
import { IProduct, useAuth, useFormatSendData, useTimer } from '../../../hooks'

// actions
import { validateOtpAction, resetValidOTPStateAction, sendOtpAction } from '../../../../redux/auth'
import { cleanCreateTransactionAction, createTransaction } from '../../../../redux/transaction'

// utils
import { calPercentage } from '../../../utils/misc'

// models
import { PaymentTransaction } from '../../../../../domain/models'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useSecondStep = () => {
    // definitions
    const history = useHistory()
    const dispatch = useDispatch()
    const { callToRefreshToken, logout } = useAuth()

    // initial state
    const startMinutes = 5
    const [showConfirmPayment, setShowConfirmPayment] = useState<boolean>(false)
    const [disablePaymentBtn, setDisablePaymentBtn] = useState<boolean>(false)
    const [showModalError, setShowModalError] = useState<boolean>(false)
    const [dynamicKey, setDynamicKey] = useState<string>('')
    const [showRetrySendOtp, setShowRetrySendOtp] = useState<boolean>(true)
    const [percentage, setPercentage] = useState<number>(90)
    const [
        {
            feedback: { amountFAI, amountPSE, message },
        },
        dispatchStep,
    ] = useReducerStep()

    // selectors
    const { sendCodeOtp, loading: loadingOtp, error: errorOtp } = useSelector(sendCodeOTPSelector)
    const { loading: loadingValidOtp, error } = useSelector(validateOTPSelector)
    const parameters = useSelector(parametersTDCSelector)
    const { message: messageError } = useSelector(transactionPSESelector)

    // hooks
    const { formatTransactionData } = useFormatSendData()
    const { minutes, seconds, startTimer, resetTimer } = useTimer(startMinutes)

    // listeners
    useEffect(() => {
        startTimer()
    })

    useEffect(() => {
        refreshTimer()
    }, [minutes, seconds])

    useEffect(() => {
        dispatch(resetValidOTPStateAction())
    }, [])

    useEffect(() => {
        return () => {
            dispatch(cleanCreateTransactionAction())
        }
    }, [])

    // events handlers
    const handlePayment = (): void => {
        setShowConfirmPayment(true)
    }

    const handleCloseErrorModal = (): void => {
        setShowModalError(false)
    }

    const refreshTimer = (): void => {
        if (minutes === 4 && seconds === 0) {
            setShowRetrySendOtp(false)
        }
        refreshPercentage(minutes, seconds)
    }

    const handleErrorMessage = (): string => {
        if (message === 'isError' && Object.keys(errorOtp).length > 0)
            return errorOtp?.errorData.message || ''
        if (Object.keys(error).length > 0) return error?.errorData.message || ''
        return ''
    }

    const captureDynamicKey = (key: string): void => {
        setDisablePaymentBtn(true)
        setDynamicKey(key)
    }

    const onChangeDynamicKey = (): void => {
        setDisablePaymentBtn(false)
    }

    const refreshPercentage = (minsPerc: number, secsPerc: number): void => {
        setPercentage(calPercentage(startMinutes, minsPerc + secsPerc / 60))
    }

    const validateOtpKey = (OtpKey: string): void => {
        dispatch(
            validateOtpAction(OtpKey, ({ response }) => {
                if (response === '200') {
                    handlePayment()
                }
            })
        )
    }

    const retrySendCodeOTP = (): void => {
        dispatch(resetValidOTPStateAction())
        dispatch(
            sendOtpAction(({ response }) => {
                if (response === '200') {
                    resetTimer()
                    setShowRetrySendOtp(true)
                } else {
                    dispatchStep({ type: 'PREV_STEP' })
                }
            })
        )
    }

    const validateStatus = (status: string | null, url: string): void => {
        if (status === '200') {
            setShowConfirmPayment(false)
            dispatch(cleanCreateTransactionAction())
            window.location.href = url
        } else {
            setShowConfirmPayment(false)
            setShowModalError(true)
        }
    }

    const createListMethods = ({
        totalValuePSE,
        totalValueFAI,
    }: {
        totalValuePSE: number
        totalValueFAI: number
    }): IProduct[] => {
        let itemTdcFAI: IProduct = {
            value: totalValueFAI,
            paymentMethodTdc: 'FAI',
            typeDocument: '',
            finishedNumber: '0',
            document: '0',
            description: 'tdc constitution',
            typePay: 1,
            isTdc: 1,
            nameDocument: 'tdc',
        }

        let itemTdcPSE: IProduct = {
            value: totalValuePSE,
            paymentMethodTdc: 'PSE',
            typeDocument: '',
            finishedNumber: '0',
            document: '0',
            description: 'tdc constitution',
            typePay: 1,
            isTdc: 1,
            nameDocument: 'tdc',
        }

        if (parameters !== null) {
            itemTdcFAI = {
                ...itemTdcFAI,
                term: parameters.term,
                rate: parameters.rate,
                normaTdc: parameters.normaTdc,
                isExpiration: parameters.isExpiration,
                modality: parameters.modality,
                paymentsNumber: parameters.paymentsNumber,
                yieldBeforeRetention: parameters.yieldBeforeRetention,
                periodRetention: parameters.periodRetention,
                yieldAfterRetention: parameters.yieldAfterRetention,
                netYield: parameters.netYield,
                modalityDays: parameters.modalityDays,
                ratePeriod: parameters.ratePeriod,
            }

            itemTdcPSE = {
                ...itemTdcPSE,
                term: parameters.term,
                rate: parameters.rate,
                normaTdc: parameters.normaTdc,
                isExpiration: parameters.isExpiration,
                modality: parameters.modality,
                paymentsNumber: parameters.paymentsNumber,
                yieldBeforeRetention: parameters.yieldBeforeRetention,
                periodRetention: parameters.periodRetention,
                yieldAfterRetention: parameters.yieldAfterRetention,
                netYield: parameters.netYield,
                modalityDays: parameters.modalityDays,
                ratePeriod: parameters.ratePeriod,
            }
        }

        return [itemTdcFAI, itemTdcPSE]
    }

    const createBodyTransaction = (): PaymentTransaction => {
        const totalValue = parseInt(amountFAI.toString()) + parseInt(amountPSE.toString())
        const totalValuePSE = parseInt(amountPSE.toString())
        const totalValueFAI = parseInt(amountFAI.toString())
        const paymentMethod = 0

        const productsList = createListMethods({ totalValuePSE, totalValueFAI })
        return formatTransactionData({
            totalValue,
            paymentMethod,
            totalValueFAI,
            totalValuePSE,
            productsList,
        })
    }

    const onCreateTransaction = (): void => {
        const data = createBodyTransaction()
        callToRefreshToken(() => {
            dispatch(
                createTransaction(data, (res) => {
                    validateStatus(res.response, res.data)
                })
            )
        }, logout)
    }

    return {
        message: sendCodeOtp?.message ?? '',
        sendCodeOtp,
        loadingOtp,
        showConfirmPayment,
        dispatchStep,
        history,

        dynamicKey,
        captureDynamicKey,

        minutes,
        seconds,
        percentage,

        errorMessage: handleErrorMessage(),
        loadingValidOtp,

        validateOtpKey,
        retrySendCodeOTP,
        disablePaymentBtn,
        onChangeDynamicKey,
        showRetrySendOtp,
        onCreateTransaction,
        showModalError,
        messageError,
        handleCloseErrorModal,
    }
}

export default useSecondStep
