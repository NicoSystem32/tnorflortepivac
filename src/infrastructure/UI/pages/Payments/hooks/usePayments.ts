/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// hooks
import { useReducerPayments } from './'
import { useAppTour } from '../../../hooks'

// selectors
import { transactionPSESelector } from '../../../../selectors'
import { cleanCreateTransactionAction } from '../../../../redux/transaction'

// actions
import { getFaiAccountBalanceAction } from '../../../../redux/products'

export const UsePayments = () => {
    const [{ currentStep }, setPaymentState] = useReducerPayments()
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const handleClose = (): void => {
        dispatch(cleanCreateTransactionAction())
        setShow(false)
    }

    const {
        message: modalMessage,
        status,
        urlPayment,
        isLoading,
    } = useSelector(transactionPSESelector)

    useAppTour()

    const validateStatus = (response: string | null, data: string): void => {
        if (response === '200') {
            setShow(false)
            dispatch(cleanCreateTransactionAction())
            window.location.href = data
        } else if (response !== null) {
            setShow(true)
        }
    }
    useEffect(() => {
        return () => {
            dispatch(cleanCreateTransactionAction())
        }
    }, [])

    useEffect(() => {
        if (isLoading === false) validateStatus(status, urlPayment)
    }, [status, urlPayment, isLoading])

    useEffect(() => {
        dispatch(getFaiAccountBalanceAction())
    }, [dispatch])

    useEffect(() => {
        if ((location.state?.type === 'TDC' || location.state?.type === 'TC') && currentStep) {
            setPaymentState({ type: 'GO_TO_STEP', payload: { step: 2 } })
        }
    }, [currentStep, location.state?.type, setPaymentState])

    const prevStep = (): void => {
        setPaymentState({ type: 'PREV_STEP' })
    }

    const _onBack = () => {
        if (location.state?.type === 'TDC') {
            history.push('/tdc-opening')
        } else if (location.state?.type === 'TC') {
            history.push('/home-wallet')
        } else {
            currentStep === 1 ? history.push('/home-wallet') : prevStep()
        }
    }

    const breadcrumbs = [
        {
            text: 'Inicio',
            active: false,
            onClick: () => {
                history.push('/home-wallet')
            },
        },
        {
            text: 'Solicitud de productos',
            active: false,
            onClick: () => {
                history.push('/product-opening')
            },
        },
    ]

    return {
        currentStep,
        history,
        dispatch,
        show,
        setShow,
        handleClose,
        modalMessage,
        validateStatus,
        prevStep,
        breadcrumbs,
        location,
        _onBack,
    }
}
