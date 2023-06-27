// services
import { productsServices } from '../../../domain/services'

// models & interfaces
import { AppDispatch } from '../store/store'
import { Detail, DetailTypes } from '../../../domain/models'

// redux types
import {
    CARDS_CONSOLIDATED,
    CREDITS_CONSOLIDATED,
    CREDITS_AVAILABLE,
    SAVING_AVAILABLE,
    DETAIL,
    FAI_ACCOUNT_BALANCE,
    MOVEMENTS,
    MOVEMENTS_DETAIL,
} from './products.types'

export const getCardsConsolidatedAction = () => (dispatch: AppDispatch) => {
    dispatch(
        productsServices.getCardsConsolidated([
            CARDS_CONSOLIDATED.REQUEST,
            CARDS_CONSOLIDATED.SUCCESS,
            CARDS_CONSOLIDATED.FAILURE,
        ])()
    )
}

export const getCreditsConsolidatedAction = () => (dispatch: AppDispatch) => {
    dispatch(
        productsServices.getCreditsConsolidated([
            CREDITS_CONSOLIDATED.REQUEST,
            CREDITS_CONSOLIDATED.SUCCESS,
            CREDITS_CONSOLIDATED.FAILURE,
        ])()
    )
}

export const getCreditsAvailableAction = () => (dispatch: AppDispatch) => {
    dispatch(
        productsServices.getCreditsAvailable([
            CREDITS_AVAILABLE.REQUEST,
            CREDITS_AVAILABLE.SUCCESS,
            CREDITS_AVAILABLE.FAILURE,
        ])()
    )
}

export const getSavingAvailableAction = () => (dispatch: AppDispatch) => {
    dispatch(
        productsServices.getSavingAvailable([
            SAVING_AVAILABLE.REQUEST,
            SAVING_AVAILABLE.SUCCESS,
            SAVING_AVAILABLE.FAILURE,
        ])()
    )
}

export const getDetailAction =
    (
        data: DetailTypes,
        onSuccess?: (response: {
            data: Detail[]
            message: string | null
            response: string | null
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const response = await dispatch(
                productsServices.getDetail([DETAIL.REQUEST, DETAIL.SUCCESS, DETAIL.FAILURE])(data)
            )

            if (onSuccess)
                onSuccess(
                    response as {
                        data: Detail[]
                        message: string | null
                        response: string | null
                    }
                )
        } catch (error) {
            if (onError) onError(error)
        }
    }

export const getFaiAccountBalanceAction = () => (dispatch: AppDispatch) => {
    dispatch(
        productsServices.getFaiAccountBalance([
            FAI_ACCOUNT_BALANCE.REQUEST,
            FAI_ACCOUNT_BALANCE.SUCCESS,
            FAI_ACCOUNT_BALANCE.FAILURE,
        ])()
    )
}

export const getMovementsAction = (data: DetailTypes) => (dispatch: AppDispatch) => {
    dispatch(
        productsServices.getMovements([MOVEMENTS.REQUEST, MOVEMENTS.SUCCESS, MOVEMENTS.FAILURE])(
            data
        )
    )
}

export const getMovementsDetailAction = (data: DetailTypes) => (dispatch: AppDispatch) => {
    dispatch(
        productsServices.getMovementDetail([
            MOVEMENTS_DETAIL.REQUEST,
            MOVEMENTS_DETAIL.SUCCESS,
            MOVEMENTS_DETAIL.FAILURE,
        ])(data)
    )
}
