import { InitialStateGeneric, ErrorResponse } from '../../../infrastructure/http/typings/api'
import {
    VERIFY_USER_AUTH,
    LOGIN_AUTH,
    REFRESH_TOKEN_AUTH,
    VALID_IVR,
    SEND_CODE_OTP,
    VALID_OTP,
} from '../../../infrastructure/redux/auth/auth.types'

/**
 * Interfaces for the auth responses EP
 */

export interface AuthResponse {
    Response: string
    Message: string | null
    Data: Data | null
}

export interface Data {
    Token: string
    Refresh: string
}

export interface VerifyUserResponse {
    Response: string
    Message: string
    Data: string
}

/**
 *  Types for the auth parameters EP
 */

export type LoginTypes = {
    password: string
    user: string
}

export type RefreshTokenTypes = {
    Token: string
    Refresh: string
}

/**
 * Typings definition reducers
 */

export interface LoginState extends InitialStateGeneric {
    auth: {
        status: string | null
        message: string | null
        token: string | null
        refreshToken: string | null
    }
}

export type LoginActionShape =
    | {
          type: typeof LOGIN_AUTH.REQUEST
      }
    | {
          type: typeof LOGIN_AUTH.SUCCESS
          payload: {
              response: string
              message: string
              data: {
                  token: string
                  refresh: string
              }
          }
      }
    | {
          type: typeof LOGIN_AUTH.FAILURE
          payload: ErrorResponse
      }

export interface RefreshTokenState extends InitialStateGeneric {
    refreshToken: {
        response: string
        message: string | null
        data: {
            token: string | null
            refresh: string | null
        } | null
    }
}

export type RefreshTokenActionShape =
    | {
          type: typeof REFRESH_TOKEN_AUTH.REQUEST
      }
    | {
          type: typeof REFRESH_TOKEN_AUTH.SUCCESS
          payload: {
              response: string
              message: string
              data: {
                  token: string
                  refresh: string
              }
          }
      }
    | {
          type: typeof REFRESH_TOKEN_AUTH.FAILURE
          payload: ErrorResponse
      }

export interface VerifyUserState extends InitialStateGeneric {
    userVerify: {
        response: string | null
        message: string | null
        data: string | null
    }
}

export type VerifyActionShape =
    | {
          type: typeof VERIFY_USER_AUTH.REQUEST
      }
    | {
          type: typeof VERIFY_USER_AUTH.SUCCESS
          payload: {
              response: string
              message: string
              data: string
          }
      }
    | {
          type: typeof VERIFY_USER_AUTH.FAILURE
          payload: ErrorResponse
      }

export interface ValidateIVRState extends InitialStateGeneric {
    validateIVR: {
        response: Response
        message: null | string
        data: string | null
    } | null
}

export type Response = null | number | string

export type ValidateIVRActionShape =
    | {
          type: typeof VALID_IVR.REQUEST
      }
    | {
          type: typeof VALID_IVR.SUCCESS
          payload: {
              response: string
              message: string
              data: string
          }
      }
    | {
          type: typeof VALID_IVR.FAILURE
          payload: ErrorResponse
      }

export interface SendCodeOtpState extends InitialStateGeneric {
    sendCodeOtp: {
        response: Response
        message: null | string
        data: string | null
    } | null
}

export type SendCodeOtpActionShape =
    | {
          type: typeof SEND_CODE_OTP.REQUEST
      }
    | {
          type: typeof SEND_CODE_OTP.SUCCESS
          payload: {
              response: string
              message: string
              data: string
          }
      }
    | {
          type: typeof SEND_CODE_OTP.FAILURE
          payload: ErrorResponse
      }
    | {
          type: typeof SEND_CODE_OTP.RESET
      }

export interface ValidateOtpState extends InitialStateGeneric {
    validateOtp: {
        response: Response
        message: null | string
        data: string | null
    } | null
}

export type ValidateOtpActionShape =
    | {
          type: typeof VALID_OTP.REQUEST
      }
    | {
          type: typeof VALID_OTP.SUCCESS
          payload: {
              response: string
              message: string
              data: string
          }
      }
    | {
          type: typeof VALID_OTP.FAILURE
          payload: ErrorResponse
      }
    | {
          type: typeof VALID_OTP.RESET
      }
