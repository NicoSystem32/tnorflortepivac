// TDC model
import {
    CreditCardPaymentActionShape,
    CreditCardPaymentState,
    GetCreditCardsActionShape,
    GetCreditCardsState,
    StatusChangeTCState,
    StatusChangeTCActionShape,
    SendCodeOtpTCState,
    SendCodeOtpTCActionShape,
    ValidateCodeOtpTCState,
    ValidateCodeOtpTCActionShape,
    GetAllBanksState,
    GetAllBanksShape,
    GetAllNomenclatorState,
    GetAllNomenclatorShape,
} from '../../../domain/models'
import {
    GET_NOMENCLATORS,
    GET_ALL_BANKS,
    GET_CREDIT_CARDS,
    CREDIT_CARDS_PAYMENTS,
    STATUS_CHANGE_TC,
    SEND_CODE_OTP_TC,
    VALIDATE_CODE_OTP_TC,
} from './tc.types'

const initialGetAllBanksState: GetAllBanksState = {
    isSuccess: false,
    response: null,
    message: null,
    data: null,
    loading: false,
    error: {},
}

export const getAllBanksReducer = (
    state = initialGetAllBanksState,
    action: GetAllBanksShape
): GetAllBanksState => {
    switch (action.type) {
        case GET_ALL_BANKS.REQUEST:
            return { ...state, loading: true, error: {} }
        case GET_ALL_BANKS.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                data: action.payload.data,
                loading: false,
                error: {},
            }
        case GET_ALL_BANKS.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialNomenclatorState: GetAllNomenclatorState = {
    isSuccess: false,
    response: null,
    message: null,
    data: [],
    loading: false,
    error: {},
}

export const getNomenclatorReducer = (
    state = initialNomenclatorState,
    action: GetAllNomenclatorShape
): GetAllNomenclatorState => {
    switch (action.type) {
        case GET_NOMENCLATORS.REQUEST:
            return { ...state, loading: true, error: {} }
        case GET_NOMENCLATORS.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                data: action.payload.data,
                loading: false,
                error: {},
            }
        case GET_NOMENCLATORS.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialGetCreditCardsState: GetCreditCardsState = {
    data: null,
    status: null,
    message: null,
    loading: false,
    error: {},
}

export const getCreditCardsReducer = (
    state = initialGetCreditCardsState,
    action: GetCreditCardsActionShape
): GetCreditCardsState => {
    switch (action.type) {
        case GET_CREDIT_CARDS.REQUEST:
            return { ...state, loading: true, error: {} }
        case GET_CREDIT_CARDS.SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
                status: action.payload.response,
                error: {},
            }
        case GET_CREDIT_CARDS.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialCreditCardPaymentState: CreditCardPaymentState = {
    dataPayment: null,
    loading: false,
    error: {},
}

export const creditCardPaymentReducer = (
    state = initialCreditCardPaymentState,
    action: CreditCardPaymentActionShape
): CreditCardPaymentState => {
    switch (action.type) {
        case CREDIT_CARDS_PAYMENTS.FILL:
            return {
                ...state,
                dataPayment: action.payload,
            }
        case CREDIT_CARDS_PAYMENTS.FAILURE:
            return {
                ...state,
            }
        default:
            return state
    }
}

//StatusChangeTC

const initialStatusChangeTC: StatusChangeTCState = {
    data: null,
    status: null,
    message: null,
    loading: false,
    error: {},
}

export const statusChangeTCReducer = (
    state = initialStatusChangeTC,
    action: StatusChangeTCActionShape
): StatusChangeTCState => {
    switch (action.type) {
        case STATUS_CHANGE_TC.REQUEST:
            return { ...state, loading: true, error: {} }
        case STATUS_CHANGE_TC.SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                status: action.payload.response,
                message: action.payload.message,
                loading: false,
                error: {},
            }
        case STATUS_CHANGE_TC.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case STATUS_CHANGE_TC.CLEAN:
            return {
                ...initialStatusChangeTC,
            }
        default:
            return state
    }
}

/**
 * send OTP
 */

const initialSendCodeOtpTC: SendCodeOtpTCState = {
    data: null,
    status: null,
    message: null,
    loading: false,
    error: {},
}

export const sendCodeOtpTCReducer = (
    state = initialSendCodeOtpTC,
    action: SendCodeOtpTCActionShape
): SendCodeOtpTCState => {
    switch (action.type) {
        case SEND_CODE_OTP_TC.REQUEST:
            return { ...state, loading: true, error: {} }
        case SEND_CODE_OTP_TC.SUCCESS:
            return {
                ...state,
                status: action.payload.response,
                data: action.payload.data,
                message: action.payload.message,
                loading: false,
                error: {},
            }
        case SEND_CODE_OTP_TC.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case SEND_CODE_OTP_TC.CLEAN:
            return {
                ...initialSendCodeOtpTC,
            }
        default:
            return state
    }
}

const initialValidateCodeOtpTC: ValidateCodeOtpTCState = {
    data: null,
    status: null,
    message: null,
    loading: false,
    error: {},
}

/**
 * validate OTP
 */

export const validateCodeOtpTCReducer = (
    state = initialValidateCodeOtpTC,
    action: ValidateCodeOtpTCActionShape
): ValidateCodeOtpTCState => {
    switch (action.type) {
        case VALIDATE_CODE_OTP_TC.REQUEST:
            return { ...state, loading: true, error: {} }
        case VALIDATE_CODE_OTP_TC.SUCCESS:
            return {
                ...state,
                status: action.payload.response,
                data: action.payload.data,
                message: action.payload.message,
                loading: false,
                error: {},
            }
        case VALIDATE_CODE_OTP_TC.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case VALIDATE_CODE_OTP_TC.CLEAN:
            return {
                ...initialValidateCodeOtpTC,
            }
        default:
            return state
    }
}
