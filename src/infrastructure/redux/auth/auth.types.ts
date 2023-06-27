/**
 * Action types
 */

export const LOGIN_AUTH = {
    SUCCESS: 'LOGIN_AUTH/success',
    REQUEST: 'LOGIN_AUTH/request',
    FAILURE: 'LOGIN_AUTH/failure',
} as const

export const REFRESH_TOKEN_AUTH = {
    SUCCESS: 'REFRESH_TOKEN_AUTH/success',
    REQUEST: 'REFRESH_TOKEN_AUTH/request',
    FAILURE: 'REFRESH_TOKEN_AUTH/failure',
} as const

export const VERIFY_USER_AUTH = {
    SUCCESS: 'VERIFY_USER_AUTH/success',
    REQUEST: 'VERIFY_USER_AUTH/request',
    FAILURE: 'VERIFY_USER_AUTH/failure',
} as const

export const LOGOUT = {
    SUCCESS: 'LOGOUT/success',
    REQUEST: 'LOGOUT/request',
    FAILURE: 'LOGOUT/failure',
} as const

export const VALID_IVR = {
    SUCCESS: 'VALID_IVR/success',
    REQUEST: 'VALID_IVR/request',
    FAILURE: 'VALID_IVR/failure',
} as const

export const SEND_CODE_OTP = {
    SUCCESS: 'SEND_CODE_OTP/success',
    REQUEST: 'SEND_CODE_OTP/request',
    FAILURE: 'SEND_CODE_OTP/failure',
    RESET: 'SEND_CODE_OTP/clean',
} as const

export const VALID_OTP = {
    SUCCESS: 'VALID_OTP/success',
    REQUEST: 'VALID_OTP/request',
    FAILURE: 'VALID_OTP/failure',
    RESET: 'VALID_OTP/reset',
} as const
