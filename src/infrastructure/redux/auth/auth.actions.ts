// services
import { authServices } from '../../../domain/services'

// models & interfaces
import { LoginTypes, RefreshTokenTypes } from '../../../domain/models'
import { AppDispatch } from '../store/store'

// redux types
import {
    LOGIN_AUTH,
    REFRESH_TOKEN_AUTH,
    VERIFY_USER_AUTH,
    LOGOUT,
    SEND_CODE_OTP,
    VALID_IVR,
    VALID_OTP,
} from './auth.types'

export const loginAction = (data: LoginTypes) => (dispatch: AppDispatch) => {
    dispatch(authServices.login([LOGIN_AUTH.REQUEST, LOGIN_AUTH.SUCCESS, LOGIN_AUTH.FAILURE])(data))
}

export const refreshTokenAction = (data: RefreshTokenTypes) => (dispatch: AppDispatch) => {
    dispatch(
        authServices.refreshToken([
            REFRESH_TOKEN_AUTH.REQUEST,
            REFRESH_TOKEN_AUTH.SUCCESS,
            REFRESH_TOKEN_AUTH.FAILURE,
        ])(data)
    )
}

export const userVerifyAction = (username: string) => (dispatch: AppDispatch) => {
    dispatch(
        authServices.userVerify([
            VERIFY_USER_AUTH.REQUEST,
            VERIFY_USER_AUTH.SUCCESS,
            VERIFY_USER_AUTH.FAILURE,
        ])(username)
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logoutAction = (data: any) => (dispatch: AppDispatch) => {
    dispatch(authServices.logout([LOGOUT.REQUEST, LOGOUT.SUCCESS, LOGOUT.FAILURE])(data))
}

export const validateOtpAction =
    (
        data: string,
        onSuccess?: (response: {
            data: null
            message: string | null
            response: string | null
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const response = (await dispatch(
                authServices.validOtp([VALID_OTP.REQUEST, VALID_OTP.SUCCESS, VALID_OTP.FAILURE])(
                    data
                )
            )) as {
                data: null
                message: string | null
                response: string | null
            }

            if (onSuccess) onSuccess(response)
        } catch (error) {
            if (onError) onError(error)
        }
    }

export const validIVRAction =
    (
        data: string,
        onSuccess?: (response: {
            data: null
            message: string | null
            response: string | null
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const response = await dispatch(
                authServices.validIVR([VALID_IVR.REQUEST, VALID_IVR.SUCCESS, VALID_IVR.FAILURE])(
                    data
                )
            )

            if (onSuccess)
                onSuccess(
                    response as {
                        data: null
                        message: string | null
                        response: string | null
                    }
                )
        } catch (error) {
            if (onError) onError(error)
        }
    }

export const sendOtpAction =
    (
        onSuccess?: (response: {
            data: null
            message: string | null
            response: string | null
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const response = await dispatch(
                authServices.sendOtp([
                    SEND_CODE_OTP.REQUEST,
                    SEND_CODE_OTP.SUCCESS,
                    SEND_CODE_OTP.FAILURE,
                ])()
            )

            if (onSuccess) {
                onSuccess(
                    response as {
                        data: null
                        message: string | null
                        response: string | null
                    }
                )
            }
        } catch (error) {
            if (onError) {
                onError(error)
            }
        }
    }

/* create actions */
export const resetValidOTPStateAction = (): {
    type: typeof VALID_OTP.RESET
} => ({
    type: VALID_OTP.RESET,
})
