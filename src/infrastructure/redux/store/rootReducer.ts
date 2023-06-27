/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CombinedState, combineReducers } from 'redux'

import { loginReducer as auth } from '../reducers/loginReducer'
import { paymentsReducer as products } from '../reducers/paymentReducer'

import {
    loginReducer,
    refreshTokenReducer,
    verifyUserReducer,
    validateIVRReducer,
    sendCodeOtpReducer,
    validateOtpReducer,
} from '../auth'
import { manageContentReducer } from '../manage'
import {
    cardsConsolidatedReducer,
    creditsConsolidatedReducer,
    creditsAvailableReducer,
    savingAvailableReducer,
    detailReducer,
    faiAccountBalanceReducer,
    movementsReducer,
    movementsDetailReducer,
} from '../products'

import {
    getTransactionReducer,
    createTransactionReducer,
    sendAttachmentPaymentReducer,
} from '../transaction'

import { themeReducer } from '../ui'

import { reducers as onboardingReducers } from '../onboarding'
import { reducers as tdcReducers } from '../tdc'
import {
    validateCRMReducer,
    validateUserStateReducer,
    getDataPerStepReducer,
    sendCodeOtpCreditCardReducer,
    validateCodeOtpCreditCardReducer,
    getClientValidationCCRequestReducer,
    saveTCContactReducer,
    getAllOfficesReducer,
    saveTCCivilStatusReducer,
} from '../openingTC'

import {
    getCreditCardFeesReducer,
    getAllBuyWalletReducer,
    deleteBuyWalletByIdReducer,
    createBuyWalletStateReducer,
    getQuotesFeesSavedReducer,
    portfolioPurchaseProcessReducer,
} from '../portfolioPurchaseTC'
import {
    creditCardPaymentReducer,
    sendCodeOtpTCReducer,
    validateCodeOtpTCReducer,
    statusChangeTCReducer,
    getAllBanksReducer,
    getNomenclatorReducer,
    getCreditCardsReducer,
} from '../tc'
import { StoreApp } from './store.interface'

// types old
import { types } from '../types/loginType'

const rootReducer = combineReducers({
    auth,
    products,

    loginReducer,
    refreshTokenReducer,
    verifyUserReducer,
    validateIVRReducer,
    sendCodeOtpReducer,
    validateOtpReducer,

    manageContentReducer,

    cardsConsolidatedReducer,
    creditsConsolidatedReducer,
    creditsAvailableReducer,
    savingAvailableReducer,
    detailReducer,
    faiAccountBalanceReducer,

    themeReducer,

    movementsReducer,
    movementsDetailReducer,

    getTransactionReducer,
    createTransactionReducer,
    sendAttachmentPaymentReducer,

    validateCRMReducer,
    validateUserStateReducer,
    getDataPerStepReducer,
    sendCodeOtpCreditCardReducer,
    validateCodeOtpCreditCardReducer,
    getClientValidationCCRequestReducer,
    saveTCContactReducer,
    saveTCCivilStatusReducer,

    getCreditCardFeesReducer,
    getAllBuyWalletReducer,
    deleteBuyWalletByIdReducer,
    createBuyWalletStateReducer,
    getQuotesFeesSavedReducer,

    getCreditCardsReducer,
    creditCardPaymentReducer,
    sendCodeOtpTCReducer,
    validateCodeOtpTCReducer,
    statusChangeTCReducer,
    getAllBanksReducer,
    getNomenclatorReducer,

    getAllOfficesReducer,
    portfolioPurchaseProcessReducer,

    ...onboardingReducers,
    ...tdcReducers,
})

export const appReducer = (
    state: CombinedState<StoreApp> | undefined,
    action: { type: string; payload: never }
) => {
    if (action.type === types.logout) {
        localStorage.removeItem('cavApp/v1')

        return rootReducer(undefined, action)
    }

    return rootReducer(state, action)
}

export default rootReducer
