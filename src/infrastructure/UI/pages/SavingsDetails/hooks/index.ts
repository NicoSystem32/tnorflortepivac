/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// actions
import { updatePayments } from '../../../../redux/actions/paymentActions'

// utils
import { validateIsInto } from '../../../utils/formsUtils'
import {
    arrayRemove,
    formatDateComplete,
    formatValue,
} from '../../../components/GlobalFuntions/globalFunction'
import { parseStringToBoolean } from '../../../utils/misc'

// custom hooks
import { useAppTour, useGetDetailForm } from '../../../hooks'

const enableSavingsPayment = process.env.REACT_APP_SAVINGS_PAYMENT_ENABLE as 'false' | 'true'

export const useSavingsDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { rideStep } = useAppTour()
    const { detail, isLoading: loading, number, finishedNumber } = useGetDetailForm()

    // New
    const breadcrumbs = [
        {
            text: 'Inicio',
            active: false,
            onClick: () => {
                redirection('/home-wallet')
            },
        },
        {
            text: 'Productos de captaciones',
            active: false,
            onClick: () => {
                redirection('/savings-group')
            },
        },
        {
            text: `Aportes ${number}`,
            active: true,
        },
    ]

    const [showInputs, setShowInputs] = useState(true)
    const [errorText, setErrorText] = useState('')
    const [showErrors, setShowErrors] = useState(false)
    const [isDisable, setIsDisable] = useState(false)
    const [isDisableForm] = useState(parseStringToBoolean(enableSavingsPayment)) // Disable form for the first release

    // Old
    const [show, setShow] = useState(false)
    const [isOther, setIsOther] = useState(false)
    const [item, setItem] = useState({ kindOfStand: '', another: 'another' })
    const [otherValue, setOtherValue] = useState('')

    const { products } = useSelector((store: any) => store.products)

    const redirection = (url: string): void => {
        history.push(url)
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

    const nextStep = (): void => {
        setShowInputs(false)
    }

    const prevStep = (): void => {
        setShowInputs(true)
    }

    const onChangeOther = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setOtherValue(event.target.value)
        let otherVal = event.target.value.replaceAll('.', '')
        otherVal = otherVal.replace('´', '')
        otherVal = otherVal.replace(',', '.')
        event.target.value = formatValue(otherVal, 1)

        if (parseFloat(otherVal) < 10000) {
            setIsDisable(false)
            setShowErrors(true)
            setErrorText('El valor mínimo de pago son $ 10.000')
        } else if (parseFloat(otherVal) > 8000000) {
            setIsDisable(false)
            setShowErrors(true)
            setErrorText('El valor máximo de pago son $ 8.000.000')
        } else if (event.target.value === '') {
            setIsDisable(false)
            setErrorText('')
        } else {
            setShowErrors(false)
            setIsDisable(true)
            setErrorText('')
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        if (`${item.kindOfStand}` === 'otro' && otherValue === '') {
            setShowErrors(true)
            setIsDisable(true)
            return
        }

        let valueToPay = ''
        if (`${item.kindOfStand}` === 'cuota') {
            valueToPay = detail[0].nextFeeValue.toString()
        } else if (`${item.kindOfStand}` === 'mora') {
            valueToPay = detail[0].delinquentBalance.toString()
        } else if (`${item.kindOfStand}` === 'total') {
            valueToPay = detail[0].balanceTotal.toString()
        } else {
            valueToPay = otherValue.replaceAll('´', '').replaceAll('.', '').replaceAll(',', '.')
        }

        dispatch(
            updatePayments([
                ...products,
                {
                    name: detail[0].creditLineName,
                    date: formatDateComplete(detail[0].nextPaymentDate),
                    value: valueToPay,
                    finishedNumber,
                    typeDocument: detail[0].typeDocumentProduct,
                    optionSelected: `${item.kindOfStand}`,
                    number,
                    idProduct: detail[0].idProduct,
                },
            ])
        )
        redirection('/payments')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.persist()
        setIsDisable(false)

        setItem((prevState) => ({
            ...prevState,
            kindOfStand: e.target.value,
        }))
        if (e.target.value === 'otro') {
            setIsOther(true)
        } else {
            setIsDisable(true)
            setIsOther(false)
            rideStep(3)
        }
    }

    return {
        // states
        show,
        setShow,
        isOther,
        item,
        breadcrumbs,
        loading,

        // handlers
        handleClose,
        handleContinue,
        redirection,
        nextStep,
        prevStep,
        onChangeOther,
        handleSubmit,
        handleChange,

        // New
        detail,
        showInputs,
        showErrors,
        errorText,
        isDisable,
        isDisableForm,
    }
}
