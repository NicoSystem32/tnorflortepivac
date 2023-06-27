// services
import { tcServices } from '../../../domain/services'

// action types
import {
    GET_NOMENCLATORS,
    GET_ALL_BANKS,
    GET_CREDIT_CARDS,
    CREDIT_CARDS_PAYMENTS,
    STATUS_CHANGE_TC,
    SEND_CODE_OTP_TC,
    VALIDATE_CODE_OTP_TC,
} from './tc.types'

// models
import { AppDispatch } from '../store/store'
import {
    CreditCardPayment,
    CreditCardPaymentActionShape,
    StatusChange,
} from '../../../domain/models'

/* async actions */

export const getNomenclatorAction = () => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.getNomenclator([
            GET_NOMENCLATORS.REQUEST,
            GET_NOMENCLATORS.SUCCESS,
            GET_NOMENCLATORS.FAILURE,
        ])()
    )
}

export const getAllBanksAction = () => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.getAllBanks([
            GET_ALL_BANKS.REQUEST,
            GET_ALL_BANKS.SUCCESS,
            GET_ALL_BANKS.FAILURE,
        ])()
    )
}

export const getCreditCardsAction = () => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.SearchProductByIdentityNumber([
            GET_CREDIT_CARDS.REQUEST,
            GET_CREDIT_CARDS.SUCCESS,
            GET_CREDIT_CARDS.FAILURE,
        ])()
    )
}

export const creditCardPaymentAction = (data: CreditCardPayment): CreditCardPaymentActionShape => ({
    type: CREDIT_CARDS_PAYMENTS.FILL,
    payload: data,
})

/**
 * status change tc
 */

export const statusChangeTCAction = (data: StatusChange) => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.PostStatusChangeTC([
            STATUS_CHANGE_TC.REQUEST,
            STATUS_CHANGE_TC.SUCCESS,
            STATUS_CHANGE_TC.FAILURE,
        ])(data)
    )
}

export const cleanStatusChangeTCAction = (): { type: string } => ({ type: STATUS_CHANGE_TC.CLEAN })

/**
 * send OTP TC
 */

export const sendCodeOtpTCAction = () => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.PostSendCodeOtpTC([
            SEND_CODE_OTP_TC.REQUEST,
            SEND_CODE_OTP_TC.SUCCESS,
            SEND_CODE_OTP_TC.FAILURE,
        ])()
    )
}

export const cleanSendCodeOtpTCAction = (): { type: string } => ({ type: SEND_CODE_OTP_TC.CLEAN })

/**
 * validate OPT TC
 */

export const validateCodeOtpTCAction = (data: string) => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.PostValidateCodeOtpTC([
            VALIDATE_CODE_OTP_TC.REQUEST,
            VALIDATE_CODE_OTP_TC.SUCCESS,
            VALIDATE_CODE_OTP_TC.FAILURE,
        ])(data)
    )
}

export const cleanValidateCodeOtpTCAction = (): { type: string } => ({
    type: VALIDATE_CODE_OTP_TC.CLEAN,
})
