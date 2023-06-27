/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FormEvent, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string'

// models
import { Detail } from '../../../../../../../domain/models'

// hooks
import { useCreditDetailState } from '../../../hooks/useCreditDetail'

// actions
import { updatePayments } from '../../../../../../redux/actions/paymentActions'

// utils
import {
    formatDateComplete,
    formatValue,
} from '../../../../../components/GlobalFuntions/globalFunction'

export const useCreditForm = (detail: Detail) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { search } = useLocation()

    const { products } = useSelector((store: any) => store.products)
    const { finishedNumber } = queryString.parse(search)

    const [messageError, setMessageError] = useState('')
    const [{ isDisable }, setIsDisable] = useCreditDetailState()
    const [{ item }, setItem] = useCreditDetailState()
    const [{ otherValue }, setOtherValue] = useCreditDetailState()
    const [{ isBigger }, setIsBigger] = useCreditDetailState()

    const redirection = (url: string): void => {
        history.push(url)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.persist()
        setItem((s) => ({
            ...s,
            item: {
                ...item,
                kindOfStand: e.target.value,
            },
        }))

        if (e.target.value === 'otro' && otherValue === '') {
            setIsDisable((s) => ({ ...s, isDisable: false }))
        } else {
            setIsDisable((s) => ({ ...s, isDisable: true }))
        }
    }

    const onChangeOther = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setOtherValue((s) => ({ ...s, otherValue: event.target.value }))
        setIsBigger((s) => ({ ...s, isBigger: false }))
        let otherVal = event.target.value.replaceAll('.', '')
        otherVal = otherVal.replace('´', '')
        otherVal = otherVal.replace(',', '.')
        event.target.value = formatValue(otherVal, 1)

        if (parseFloat(otherVal) < 100) {
            setMessageError('El valor mínimo de pago son $ 100')
            setIsDisable((s) => ({ ...s, isDisable: false }))
        } else if (parseFloat(otherVal) > detail.balanceTotal) {
            setMessageError(`El valor máximo de pago son $ ${formatValue(detail.balanceTotal, 1)}`)
            setIsBigger((s) => ({ ...s, isBigger: false }))
            setIsDisable((s) => ({ ...s, isDisable: false }))
        } else if (parseFloat(otherVal) > detail.nextFeeValue) {
            setMessageError('')
            setIsBigger((s) => ({ ...s, isBigger: true }))
            setIsDisable((s) => ({ ...s, isDisable: true }))
        } else if (otherVal === '') {
            setMessageError('')
            setIsDisable((s) => ({ ...s, isDisable: false }))
        } else {
            setMessageError('')
            setIsDisable((s) => ({ ...s, isDisable: true }))
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        if (`${item.kindOfStand}` === 'otro' && otherValue === '') {
            setIsDisable((s) => ({ ...s, isDisable: true }))
            return
        }
        let valueToPay = ''
        if (`${item.kindOfStand}` === 'cuota' && !detail.isRefund) {
            valueToPay = detail.nextFeeValue.toString()
        } else if (`${item.kindOfStand}` === 'cuota' && detail.isRefund) {
            valueToPay = detail.valueRefund.toString()
        } else if (`${item.kindOfStand}` === 'mora') {
            valueToPay = detail.delinquentBalance.toString()
        } else if (`${item.kindOfStand}` === 'total') {
            valueToPay = detail.balanceTotal.toString()
        } else {
            valueToPay = otherValue.replaceAll('´', '').replaceAll('.', '').replaceAll(',', '.')
        }
        dispatch(
            updatePayments([
                ...products,
                {
                    name: detail.creditLineName,
                    number: detail.documentNumber,
                    date: formatDateComplete(detail.nextPaymentDate),
                    value: valueToPay,
                    finishedNumber: finishedNumber,
                    typeDocument: detail.typeDocumentProduct,
                    optionSelected: `${item.kindOfStand}`,
                    idProduct: detail.idProduct,
                },
            ])
        )
        redirection('/payments')
    }

    return {
        handleChange,
        handleSubmit,
        onChangeOther,
        messageError,
        isBigger,
        isDisable,
        kindOfStand: item.kindOfStand,
    }
}
