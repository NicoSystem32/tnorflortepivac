/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { updatePayments } from '../../../../redux/actions/paymentActions'
import { formatDateComplete } from '../../../components/GlobalFuntions/globalFunction'
import { validateIsInto } from '../../../utils/formsUtils'

import { getSavingAvailableAction, getDetailAction } from '../../../../redux/products'
import { savingGroupSelector } from '../../../../selectors/products'

export const useSavingGroup = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { listCards, loadingIn, errorSaving } = useSelector(savingGroupSelector)
    const { products } = useSelector((store: any) => store.products)

    useEffect(() => {
        dispatch(getSavingAvailableAction())
    }, [])

    const redirection = (url: string): void => {
        history.push(url)
    }

    const redirectionWithInfo = (url: string, data: string): void => {
        history.push({
            pathname: url,
            search: data,
            state: { detail: 'some_value' },
        })
    }

    const addPayment = (
        name: string,
        number: string | number,
        date: string,
        finishedNumber: string | number,
        typeDocument: string
    ): void => {
        dispatch(
            getDetailAction(
                {
                    typeDocument,
                    finishedNumber,
                    document: number.toString(),
                },
                ({ data: detail }) => {
                    dispatch(
                        updatePayments([
                            ...products,
                            {
                                name: name,
                                number: number,
                                date: formatDateComplete(date),
                                value: detail[0].nextFeeValue,
                                finishedNumber: finishedNumber,
                                typeDocument: typeDocument,
                                optionSelected: 'cuota',
                                idProduct: detail[0].idProduct,
                            },
                        ])
                    )
                    redirection('/payments')
                }
            )
        )
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
            active: true,
        },
    ]

    return {
        redirection,
        redirectionWithInfo,
        addPayment,
        listCards,
        loadingIn,
        validateExistence: (index: string | (string | null)[] | null): boolean =>
            validateIsInto(products, index),
        products,
        errorSaving,
        breadcrumbs,
    }
}
