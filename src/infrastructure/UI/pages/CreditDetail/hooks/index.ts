/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Actions
import { updatePayments } from '../../../../redux/actions/paymentActions'

// utils
import { arrayRemove } from '../../../components/GlobalFuntions/globalFunction'
import { validateIsInto } from '../../../utils/formsUtils'

// hooks
import { useGetDetailForm } from '../../../hooks'
import { useCreditDetailState } from './useCreditDetail'

export const useCreditDetail = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { detail, isLoading, number } = useGetDetailForm()

    const [showRefund, setShowRefund] = useState(false)
    const [{ show }, setShow] = useCreditDetailState()
    const [{ showInput }, setShowInput] = useCreditDetailState()

    const { products } = useSelector((store: any) => store.products)

    const redirection = (url: string): void => {
        history.push(url)
    }

    // Modals
    const handleCloseRefund = (): void => setShowRefund(false)

    const handleClose = (): void => {
        setShow((s) => ({ ...s, show: false }))
    }
    const handleContinue = (): void => {
        if (products) {
            const result = arrayRemove(products, number)
            dispatch(updatePayments(result))
            validateIsInto(products, number)
            setShow((s) => ({ ...s, show: false }))
        }
    }

    const prevStep = (): void => {
        setShowInput((s) => ({ ...s, showInput: true }))
    }

    // miga de pan
    const breadcrumbs = [
        {
            text: 'Inicio',
            active: false,
            onClick: () => {
                redirection('/home-wallet')
            },
        },
        {
            text: 'Productos de Crédito',
            active: false,
            onClick: () => {
                redirection('/credits-group')
            },
        },
        {
            text: `Crédito ${number}`,
            active: true,
        },
    ]

    return {
        breadcrumbs,
        detail,
        isLoading,
        showInput,
        show,
        showRefund,
        handleClose,
        setShow,
        handleContinue,
        handleCloseRefund,
        setShowRefund,
        prevStep,
        redirection,
    }
}
