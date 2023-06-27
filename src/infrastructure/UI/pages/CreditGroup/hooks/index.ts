/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getCreditsAvailableAction } from '../../../../redux/products'

import { difference } from '../../../components/GlobalFuntions/globalFunction'
import { creditGroupSelector } from '../../../../selectors/products'

export const useCreditGroup = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { listCards, loading, error } = useSelector(creditGroupSelector)

    const validateDateCreditGroup = (date: string | Date): boolean => {
        const dateReceived = new Date(date)
        const time_difference = difference(new Date(), dateReceived)
        if (time_difference < 6 && time_difference > 0) {
            return true
        } else {
            return false
        }
    }

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

    const breadcrumbs = [
        {
            text: 'Inicio',
            active: false,
            onClick: () => {
                redirection('/home-wallet')
            },
        },
        {
            text: 'Productos de Inversión',
            active: true,
        },
    ]

    useEffect(() => {
        dispatch(getCreditsAvailableAction())
    }, [])

    return {
        listCards,
        error,
        history,
        loading,
        breadcrumbs,
        validateDateCreditGroup,
        redirectionWithInfo,
        redirection,
    }
}
