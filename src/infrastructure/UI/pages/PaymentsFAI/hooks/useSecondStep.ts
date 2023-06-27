import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

// resources
import { PaymentTransaction, CreateTransactionState } from '../../../../../domain/models'
import { transactionService } from '../../../../../domain/services/User.service'
import { CreditCardPaymentSelector, parametersTDCSelector } from '../../../../selectors'

// custom hooks
import { useFormatSendData, IProduct, useTimer } from '../../../hooks'
import { useReducerStep } from '../hooks'

// helpers
import { calPercentage } from '../../../utils/misc'
import { cleanPayments } from '../../../../redux/actions/paymentActions'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useSecondStep = () => {
    // initial declarations
    const state = useSelector((stateRef: any) => stateRef)
    const { formatTransactionData } = useFormatSendData()
    const tokenSave = state.auth.token
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const startMinutes = 5

    const listProducts: IProduct[] = state.products.products ?? []
    const tdcParameters = useSelector(parametersTDCSelector)
    const { dataPayment } = useSelector(CreditCardPaymentSelector)

    // states definition
    const [{ feedback, receivingOTP }, dispatchState] = useReducerStep()
    const [showModalPayment, setShowModalPayment] = useState(false)
    const [percentage, setPercentage] = useState(90)
    const [keyInvalid, setKeyInvalid] = useState(false)
    const [valueKey, setValueKey] = useState('')
    const [msgErrorKey, setMsgErrorKey] = useState('')
    const [message, setMessage] = useState('')
    const [requiredKey, setRequiredKey] = useState(false)

    const { minutes, seconds, startTimer, resetTimer } = useTimer(startMinutes)

    const requestKey = useCallback(
        (onSuccess?: (retrieveData: any) => void, onError?: (resp: any) => void) => {
            setRequiredKey(true)

            transactionService
                .postTransaction('/api/Authorization/SendCodeOtp', tokenSave)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resetTimer()
                        dispatchState({
                            type: 'RECEIVING_OTP',
                            payload: true,
                        })
                        dispatchState({
                            type: 'SET_FEEDBACK',
                            payload: {
                                code: '200',
                                message: response.data.Message,
                            },
                        })
                        if (typeof onSuccess === 'function') onSuccess(response.data)
                    } else if (response.Response) {
                        dispatchState({
                            type: 'SET_FEEDBACK',
                            payload: {
                                code: response.Response,
                                message: response.Message,
                            },
                        })
                        if (typeof onError === 'function') onError(response)
                    }
                })
                .finally(() => {
                    setRequiredKey(false)
                })
        },
        [tokenSave]
    )

    useEffect(() => {
        if ([200, '200'].includes(feedback.code)) {
            setMessage(feedback.message)
            setMsgErrorKey('')
        } else {
            setMsgErrorKey(feedback.message)
        }
    }, [feedback.code, feedback.message])

    useEffect(() => {
        if (receivingOTP) {
            startTimer()
        }
    }, [receivingOTP, startTimer])

    useEffect(() => {
        if (minutes === 4 && seconds === 0) {
            dispatchState({
                type: 'RECEIVING_OTP',
                payload: false,
            })
        }
        refreshPercentage(minutes, seconds)
    }, [dispatchState, minutes, seconds])

    const refreshPercentage = (minsPerc: number, secsPerc: number): void => {
        setPercentage(calPercentage(startMinutes, minsPerc + secsPerc / 60))
    }

    const validateKey = (): void => {
        setKeyInvalid(true)

        transactionService
            .getTransaction('/api/Authorization/ValidOtp', tokenSave, valueKey)
            .then((response: any) => {
                if (response.status === 200) {
                    setShowModalPayment(true)
                    setKeyInvalid(false)
                    dispatchState({
                        type: 'SET_FEEDBACK',
                        payload: {
                            code: '200',
                            message: response.data.Message,
                        },
                    })
                } else if (['403', '429', '410'].includes(response.Response)) {
                    dispatchState({
                        type: 'SET_FEEDBACK',
                        payload: {
                            code: response.Response,
                            message: response.Message,
                        },
                    })
                } else {
                    dispatchState({
                        type: 'SET_FEEDBACK',
                        payload: {
                            code: response.Response,
                            message: 'Algo inesperado ha pasado, vuelve a intentarlo',
                        },
                    })
                }
            })
    }

    const formatSendData = (productsList = listProducts): PaymentTransaction => {
        if (location?.state?.from === 'TDC') {
            let itemTDC: IProduct = {
                typeDocument: '',
                finishedNumber: '0',
                document: '0',
                description: 'tdc constitution',
                typePay: 1,
                paymentMethodTdc: 'FAI',
                isTdc: 1,
                nameDocument: 'tdc',
                value: tdcParameters !== null ? tdcParameters.value : 0,
            }

            if (tdcParameters !== null) {
                itemTDC = {
                    ...itemTDC,
                    term: tdcParameters.term,
                    rate: tdcParameters.rate,
                    normaTdc: tdcParameters.normaTdc,
                    isExpiration: tdcParameters.isExpiration,
                    modality: tdcParameters.modality,
                    paymentsNumber: tdcParameters.paymentsNumber,
                    yieldBeforeRetention: tdcParameters.yieldBeforeRetention,
                    periodRetention: tdcParameters.periodRetention,
                    yieldAfterRetention: tdcParameters.yieldAfterRetention,
                    netYield: tdcParameters.netYield,
                    modalityDays: tdcParameters.modalityDays,
                    ratePeriod: tdcParameters.ratePeriod,
                }
            }

            return formatTransactionData({
                productsList: [itemTDC],
                paymentMethod: 1,
                totalValue: tdcParameters !== null ? tdcParameters.value : 0,
            })
        }

        if (location?.state?.from === 'TC' && dataPayment !== null) {
            const itemTDC: IProduct = {
                typeDocument: dataPayment.idProduct,
                finishedNumber: dataPayment.lastFourDigits,
                document: '0',
                description: 'tc payment',
                typePay: dataPayment.typePay,
                paymentMethod: 'FAI',
                isTdc: 0,
                nameDocument: dataPayment.nameDocument,
                value: dataPayment.value,
                idProduct: dataPayment.idProduct,
                number: '1',
            }

            return formatTransactionData({
                productsList: [itemTDC],
                paymentMethod: 4,
                totalValue: dataPayment !== null ? dataPayment.value : 0,
            })
        }

        return formatTransactionData({
            productsList,
            paymentMethod: 1,
            totalValue: state.products.total,
        })
    }

    const validateStatus = (
        status: string | null,
        data: Omit<CreateTransactionState, 'urlPayment'>
    ): void => {
        if (status === '200') {
            dispatch(cleanPayments())
            if (location.state.from === 'TDC' || location.state.from === 'TC') {
                history.push('/payments-result', { paymentType: 'FAI' })
            } else {
                history.push('/paymentsfai-result', location.state)
            }
        } else {
            setShowModalPayment(true)
            if (location.state.from === 'TDC' || location.state.from === 'TC') {
                history.push('/payments-result', { paymentType: 'FAI' })
            } else {
                history.push('/paymentsfai-result', location.state)
            }
        }
    }

    return {
        percentage,
        msgErrorKey,
        setMsgErrorKey,
        message,
        keyInvalid,
        setKeyInvalid,
        setValueKey,
        showModalPayment,
        setShowModalPayment,
        minutes,
        seconds,

        listProducts,
        requestKey,
        validateKey,
        validateStatus,
        formatSendData,
        requiredKey,
    }
}

export default useSecondStep
