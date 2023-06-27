/* eslint-disable @typescript-eslint/explicit-function-return-type */
import createSelector from '../createSelector'
import type { StoreApp } from '../../redux/store/store.interface'

export const portfolioPurchaseProcessSelector = createSelector(
    (state: StoreApp) => state.portfolioPurchaseProcessReducer.data,
    (state: StoreApp) => state.portfolioPurchaseProcessReducer.loading,
    (portfolioPurchaseProcess, isLoading) => ({
        portfolioPurchaseProcess,
        isLoading,
    })
)
