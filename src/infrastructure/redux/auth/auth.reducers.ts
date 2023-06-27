import {
    LOGIN_AUTH,
    REFRESH_TOKEN_AUTH,
    VERIFY_USER_AUTH,
    VALID_IVR,
    SEND_CODE_OTP,
    VALID_OTP,
} from './auth.types'

import {
    LoginState,
    RefreshTokenState,
    VerifyUserState,
    ValidateIVRState,
    LoginActionShape,
    RefreshTokenActionShape,
    ValidateIVRActionShape,
    VerifyActionShape,
    SendCodeOtpState,
    SendCodeOtpActionShape,
    ValidateOtpActionShape,
    ValidateOtpState,
} from '../../../domain/models'

const initialLoginState: LoginState = {
    auth: {
        status: null,
        message: null,
        token: null,
        refreshToken: null,
    },
    loading: false,
    error: {},
}

export const loginReducer = (state = initialLoginState, action: LoginActionShape): LoginState => {
    switch (action.type) {
        case LOGIN_AUTH.SUCCESS:
            return {
                ...state,
                auth: {
                    status: action.payload.response,
                    message: action.payload.message,
                    token: action.payload.data.token,
                    refreshToken: action.payload.data.refresh,
                },
                loading: false,
                error: {},
            }
        case LOGIN_AUTH.REQUEST:
            return { ...state, loading: true, error: {} }
        case LOGIN_AUTH.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialRefreshTokenState: RefreshTokenState = {
    refreshToken: {
        response: '',
        message: null,
        data: {
            token: null,
            refresh: null,
        },
    },
    loading: false,
    error: {},
}

export const refreshTokenReducer = (
    state = initialRefreshTokenState,
    action: RefreshTokenActionShape
): RefreshTokenState => {
    switch (action.type) {
        case REFRESH_TOKEN_AUTH.SUCCESS:
            return {
                ...state,
                refreshToken: action.payload,
                loading: false,
                error: {},
            }
        case REFRESH_TOKEN_AUTH.REQUEST:
            return { ...state, loading: true, error: {} }
        case REFRESH_TOKEN_AUTH.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialVerifyUserState: VerifyUserState = {
    userVerify: {
        response: null,
        message: null,
        data: null,
    },
    loading: false,
    error: {},
}

export const verifyUserReducer = (
    state = initialVerifyUserState,
    action: VerifyActionShape
): VerifyUserState => {
    switch (action.type) {
        case VERIFY_USER_AUTH.SUCCESS:
            return {
                ...state,
                userVerify: {
                    response: action.payload.response,
                    message: action.payload.message,
                    data: action.payload.data,
                },
                loading: false,
                error: {},
            }
        case VERIFY_USER_AUTH.REQUEST:
            return { ...state, loading: true, error: {} }
        case VERIFY_USER_AUTH.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialValidateIVRState: ValidateIVRState = {
    validateIVR: null,
    loading: false,
    error: {},
}

export const validateIVRReducer = (
    state = initialValidateIVRState,
    action: ValidateIVRActionShape
): ValidateIVRState => {
    switch (action.type) {
        case VALID_IVR.SUCCESS:
            return {
                ...state,
                validateIVR: {
                    response: action.payload.response,
                    message: action.payload.message,
                    data: action.payload.data,
                },
                loading: false,
                error: {},
            }
        case VALID_IVR.REQUEST:
            return { ...state, loading: true, error: {} }
        case VALID_IVR.FAILURE:
            return {
                ...state,
                loading: false,
                validateIVR: null,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialSendCodeOtpState: SendCodeOtpState = {
    sendCodeOtp: null,
    loading: false,
    error: {},
}

export const sendCodeOtpReducer = (
    state = initialSendCodeOtpState,
    action: SendCodeOtpActionShape
): SendCodeOtpState => {
    switch (action.type) {
        case SEND_CODE_OTP.SUCCESS:
            return {
                ...state,
                sendCodeOtp: {
                    response: action.payload.response,
                    message: action.payload.message,
                    data: action.payload.data,
                },
                loading: false,
                error: {},
            }
        case SEND_CODE_OTP.REQUEST:
            return { ...state, loading: true, error: {} }
        case SEND_CODE_OTP.FAILURE:
            return {
                ...state,
                loading: false,
                sendCodeOtp: null,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialValidateOtpState: ValidateOtpState = {
    validateOtp: null,
    loading: false,
    error: {},
}

export const validateOtpReducer = (
    state = initialValidateOtpState,
    action: ValidateOtpActionShape
): ValidateOtpState => {
    switch (action.type) {
        case VALID_OTP.SUCCESS:
            return {
                ...state,
                validateOtp: {
                    response: action.payload.response,
                    message: action.payload.message,
                    data: action.payload.data,
                },
                loading: false,
                error: {},
            }
        case VALID_OTP.REQUEST:
            return { ...state, loading: true, error: {} }
        case VALID_OTP.FAILURE:
            return {
                ...state,
                loading: false,
                validateOtp: null,
                error: action.payload,
            }
        case VALID_OTP.RESET:
            return {
                ...initialValidateOtpState,
            }
        default:
            return state
    }
}
