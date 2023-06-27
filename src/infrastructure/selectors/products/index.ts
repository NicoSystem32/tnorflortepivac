/* eslint-disable @typescript-eslint/explicit-function-return-type */
import createSelector from '../createSelector'
import moment from 'moment'
import type { StoreApp } from '../../redux/store/store.interface'

export const savingGroupSelector = createSelector(
    (state: StoreApp) => state.savingAvailableReducer,
    ({ saving, loading, error }) => {
        return {
            listCards: saving,
            loadingIn: loading,
            errorSaving: error,
        }
    }
)

export const creditGroupSelector = createSelector(
    (state: StoreApp) => state.creditsAvailableReducer,
    ({ credits, loading, error }) => {
        return {
            listCards: credits,
            loading,
            error,
        }
    }
)

export const savingDetailImagesSelector = (creditNumber: string | number) => {
    return createSelector(
        (state: StoreApp) => state.savingAvailableReducer,
        ({ saving }) => {
            const array = saving.filter((item) => item.creditNumber === creditNumber)
            const image = array.length > 0 ? array[0].urlImageProduct : ''

            return {
                image,
            }
        }
    )
}

export const creditDetailImagesSelector = (creditNumber: string, finishedNumber: string) => {
    return createSelector(
        (state: StoreApp) => state.creditsAvailableReducer,
        ({ credits }) => {
            const array = credits.filter(
                (credit) =>
                    credit.creditNumber === creditNumber && credit.finishedNumber === finishedNumber
            )
            const image = array.length > 0 ? array[0].urlImageProduct : ''

            return {
                image,
            }
        }
    )
}

export const homeWalletSelector = createSelector(
    (state: StoreApp) => state.cardsConsolidatedReducer,
    (state: StoreApp) => state.creditsConsolidatedReducer,
    (cards, credits) => {
        return {
            cards: cards.cards,
            loadingCards: cards.loading,
            errorCards: cards.error,
            credits: credits.credits,
            errorCredits: credits.error,
            loadingCredits: credits.loading,
        }
    }
)

export const movementsDetailsSelector = createSelector(
    (state: StoreApp) => state.movementsReducer,
    (state: StoreApp) => state.movementsDetailReducer,
    (movements, detail) => {
        const movementsOrden = movements.movements.sort(
            (a, b) => new Date(b.dateMovement).getTime() - new Date(a.dateMovement).getTime()
        )
        const cutOffDate = moment(movementsOrden[0]?.dateMovement).subtract(12, 'months')

        return {
            movementsData: movementsOrden.filter(
                (move) => moment(cutOffDate) <= moment(move.dateMovement)
            ),
            movementLoading: movements.loading,
            movementsError: movements.error,
            detailData: detail.details,
            detailLoading: detail.loading,
            detailError: detail.error,
        }
    }
)

export const faiAccountExistSelector = createSelector(
    (state: StoreApp) => state.faiAccountBalanceReducer,
    ({ faiAccount, loading, error }) => {
        return {
            isAccountFai: faiAccount.balanceTotal !== null ? true : false,
            faiAccount,
            loading,
            error,
        }
    }
)
