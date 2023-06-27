/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
    getCardsConsolidatedAction,
    getCreditsConsolidatedAction,
} from '../../../../redux/products'

import { homeWalletSelector } from '../../../../selectors/products'

export const useHomeWallet = () => {
    const dispatch = useDispatch()

    const { cards, loadingCards, errorCards, credits, errorCredits, loadingCredits } =
        useSelector(homeWalletSelector)

    const history = useHistory()

    useEffect(() => {
        dispatch(getCardsConsolidatedAction())
        dispatch(getCreditsConsolidatedAction())
    }, [])

    const redirects = (url: string): void => {
        history.push(url)
    }

    return {
        redirects,
        credits,
        cards,
        loadingCards,
        loadingCredits,
        errorCredits,
        errorCards,
    }
}
