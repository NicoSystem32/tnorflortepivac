/* eslint-disable @typescript-eslint/explicit-function-return-type */
import createSelector from '../createSelector'
import type { StoreApp } from '../../redux/store/store.interface'

export const getCreditCardDataPerStepSelector = createSelector(
    (state: StoreApp) => state.getDataPerStepReducer,
    (data) => data
)

export const getCRMResponseSelector = createSelector(
    (state: StoreApp) => state.validateCRMReducer,
    (data) => data
)

export const getNomenclatorSelector = createSelector(
    (state: StoreApp) => state.getNomenclatorReducer,
    ({ data, loading, error }) => ({
        loading,
        error,
        documentTypes: data.filter((item) => item.type === 1),
        peoplesTypes: data.filter((item) => item.type === 1),
        sexos: data.filter((item) => item.type === 2),
        civilStatus: data.filter((item) => item.type === 3),
        states: data.filter((item) => item.type === 4),
        cities: data.filter((item) => item.type === 5),
        economicActivity: data.filter((item) => item.type === 6),
        banks: data.filter((item) => item.type === 7),
        address: data.filter((item) => item.type === 9),
    })
)

export const getCreditCardFeesSelector = createSelector(
    (state: StoreApp) => state.getCreditCardFeesReducer,
    ({ data, isSuccess, response, message, loading, error }) => ({
        data,
        isSuccess,
        response,
        message,
        loading,
        error,
    })
)

export const getAllBuyWalletSelector = createSelector(
    (state: StoreApp) => state.getAllBuyWalletReducer,
    ({ data: buyWallet, isSuccess, response, message, loading, error }) => {
        let count = 0
        buyWallet?.forEach((buy) => {
            count = count + buy.purchaseAmount
        })
        return {
            count,
            buyWallet,
            isSuccess,
            response,
            message,
            loading,
            error,
        }
    }
)

export const deleteBuyWalletByIdSelector = createSelector(
    (state: StoreApp) => state.deleteBuyWalletByIdReducer,
    ({ data: buyWalletDeleted, isSuccess, response, message, loading, error }) => ({
        buyWalletDeleted,
        isSuccess,
        response,
        message,
        loading,
        error,
    })
)

export const createBuyWalletSelector = createSelector(
    (state: StoreApp) => state.createBuyWalletStateReducer,
    ({ data, isSuccess, response, message, loading, error }) => ({
        data,
        isSuccess,
        response,
        message,
        loading,
        error,
    })
)

export const currentQuotesFeesSaveSelector = createSelector(
    (state: StoreApp) => state.getQuotesFeesSavedReducer,
    ({ data, isSuccess, response, message, loading, error }) => ({
        data,
        isSuccess,
        response,
        message,
        loading,
        error,
    })
)

export const CreditCardsSelector = createSelector(
    (state: StoreApp) => state.getCreditCardsReducer,
    ({ loading, error, data, status }) => ({ loading, error, data, status })
)

export const CreditCardPaymentSelector = createSelector(
    (state: StoreApp) => state.creditCardPaymentReducer,
    ({ dataPayment }) => ({ dataPayment })
)
export const CreditCardSelector = createSelector(
    (state: StoreApp) => state.getCreditCardsReducer,
    (state: StoreApp, cardId: string) => cardId,
    ({ loading, error, data }, cardId: string) => {
        const card = data?.cards.find(
            (cardSelected) => cardSelected.lastFourDigitsEncryptedCC === cardId
        )
        return {
            cardData: card,
            movements: card && card.movementsCard ? card.movementsCard : [],
            loading,
            error,
        }
    }
)

export const SendCodeOtpTCSelector = createSelector(
    (state: StoreApp) => state.sendCodeOtpTCReducer,
    ({ data, message, status, loading, error }) => ({ data, message, status, loading, error })
)

export const ValidateCodeOtpTCSelector = createSelector(
    (state: StoreApp) => state.validateCodeOtpTCReducer,
    ({ data, message, status, loading, error }) => ({ data, message, status, loading, error })
)

export const StatusChangeTCSelector = createSelector(
    (state: StoreApp) => state.statusChangeTCReducer,
    ({ data, message, status, loading, error }) => ({ data, message, status, loading, error })
)

export const getAllBanksSelector = createSelector(
    (state: StoreApp) => state.getAllBanksReducer,
    ({ data: banks, isSuccess, response, message, loading, error }) => ({
        banks: banks ?? [],
        isSuccess,
        response,
        message,
        loading,
        error,
    })
)

export const sendCodeOtpCreditCardSelector = createSelector(
    (state: StoreApp) => state.sendCodeOtpCreditCardReducer,
    ({ data, message, response, isSuccess, loading, error }) => ({
        data,
        message,
        response,
        isSuccess,
        loading,
        error,
    })
)

export const validateCodeOtpCreditCardSelector = createSelector(
    (state: StoreApp) => state.validateCodeOtpCreditCardReducer,
    ({ data, message, response, isSuccess, loading, error }) => ({
        data,
        message,
        response,
        isSuccess,
        loading,
        error,
    })
)

export const getClientValidationCCRequestSelector = createSelector(
    (state: StoreApp) => state.getClientValidationCCRequestReducer,
    ({ data: clientValidation, message, response, isSuccess, loading, error }) => ({
        clientValidation,
        message,
        response,
        isSuccess,
        loading,
        error,
    })
)

export const validateUserStateSelector = createSelector(
    (state: StoreApp) => state.validateUserStateReducer,
    ({ data: validateUser, message, response, isSuccess, loading, error }) => ({
        validateUser,
        message,
        response,
        isSuccess,
        loading,
        error,
    })
)

export const saveTCContactSelector = createSelector(
    (state: StoreApp) => state.saveTCContactReducer,
    ({ data: contactResp, message, response, isSuccess, loading, error }) => ({
        contactResp,
        message,
        response,
        isSuccess,
        loading,
        error,
    })
)

export const saveTCCivilStatusSelector = createSelector(
    (state: StoreApp) => state.saveTCCivilStatusReducer,
    ({ data: civilStatus, message, response, isSuccess, loading, error }) => ({
        civilStatus,
        message,
        response,
        isSuccess,
        loading,
        error,
    })
)

export const getAllOfficesSelector = createSelector(
    (state: StoreApp) => state.getAllOfficesReducer,
    ({ data, message, response, isSuccess, loading, error }) => ({
        data: data ?? [],
        message,
        response,
        isSuccess,
        loading,
        error,
    })
)
