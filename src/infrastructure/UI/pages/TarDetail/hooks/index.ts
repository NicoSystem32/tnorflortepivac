/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// actions
import { updatePayments } from '../../../../redux/actions/paymentActions'

// utils
import { validateIsInto } from '../../../utils/formsUtils'
import { arrayRemove, formatDateComplete } from '../../../components/GlobalFuntions/globalFunction'

// hooks
import { useGetDetailForm } from '../../../hooks'

export const useTarDetail = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [isDisable, setIsDisable] = useState(false)

    const [show, setShow] = useState(false)
    const [item, setItem] = useState({ kindOfStand: '', another: 'another' })
    const { kindOfStand } = item

    const { detail: info, isLoading: loading, number, finishedNumber } = useGetDetailForm()
    const { products } = useSelector((store: any) => store.products)

    const redirection = (url: string): void => {
        history.push(url)
    }

    const breadcrumbs = [
        {
            text: 'Inicio',
            active: false,
            onClick: () => {
                redirection('/home-wallet')
            },
        },
        {
            text: 'Productos de Ahorro',
            active: false,
            onClick: () => {
                redirection('/credit-group')
            },
        },
        {
            text: `TAR ${number}`,
            active: true,
        },
    ]

    const prevStep = (): void => {
        redirection('/savings-group')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.persist()
        setIsDisable(true)

        setItem((prevState) => ({
            ...prevState,
            kindOfStand: e.target.value,
        }))
    }

    const handleClose = (): void => setShow(false)
    const handleContinue = (): void => {
        if (products) {
            const result = arrayRemove(products, number)
            dispatch(updatePayments(result))
            validateIsInto(products, number)
            setShow(false)
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        let valueToPay = ''
        if (`${kindOfStand}` === 'cuota') {
            valueToPay = info[0].nextFeeValue.toString()
        } else if (`${kindOfStand}` === 'mora') {
            valueToPay = info[0].delinquentBalance.toString()
        } else if (`${kindOfStand}` === 'total') {
            valueToPay = info[0].totalFeeValue.toString()
        }

        dispatch(
            updatePayments([
                ...products,
                {
                    name: info[0].creditLineName,
                    number: info[0].documentNumber,
                    date: formatDateComplete(info[0].nextPaymentDate),
                    value: valueToPay,
                    finishedNumber: finishedNumber,
                    typeDocument: info[0].typeDocumentProduct,
                    optionSelected: `${kindOfStand}`,
                    idProduct: info[0].idProduct,
                },
            ])
        )
        redirection('/payments')
    }

    return {
        prevStep,
        breadcrumbs,
        redirection,
        info,
        handleClose,
        show,
        setShow,
        item,
        kindOfStand,
        handleChange,
        handleContinue,
        handleSubmit,
        loading,
        isDisable,
    }
}
