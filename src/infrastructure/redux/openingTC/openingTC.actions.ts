// services
import { tcServices } from '../../../domain/services'

// action types
import {
    VALIDATE_CRM,
    VALIDATE_USER_STATE,
    GET_DATA_PER_STEP,
    SEND_CODE_OTP_CREDIT_CARD,
    VALIDATE_CODE_OTP_CREDIT_CARD,
    CLIENT_VALIDATION_CREDIT_CARD_REQUEST,
    SAVE_TC_CONTACT,
    SAVE_TC_CIVIL_STATUS,
    SAVE_TC_ECONOMIC,
    SAVE_TC_INSURE_POLICE,
    GET_ALL_OFFICES,
    SAVE_TC_SELECTED_FEE,
    SAVE_TC_SELECTED_ALTERNATIVE_FEE,
    SAVE_TC_CONFIG,
    SAVE_PDF_ID,
} from './openingTC.types'

// models
import { AppDispatch } from '../store/store'
import {
    ValidateUserStateState,
    CreateCreditCard,
    ValidateCRMState,
    SaveTCContact,
    ValidateUserResponse,
    MoraRequest,
    IsSuccessValidation,
} from '../../../domain/models'

/* async actions */

export interface ValidateCRMRequest {
    StepDataValidation: number
    Document?: string
    DocumentExpeditionDate?: string
    DocumentExpeditionCity?: string
    Phone?: string
    Email?: string
}

export const validateCRMAction =
    (
        data: ValidateCRMRequest,
        onSuccess?: (response: Omit<ValidateCRMState, 'loading' | 'error'>) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.validateCRM([
                    VALIDATE_CRM.REQUEST,
                    VALIDATE_CRM.SUCCESS,
                    VALIDATE_CRM.FAILURE,
                ])(data)
            )

            if (onSuccess) {
                onSuccess(resp as Omit<ValidateCRMState, 'loading' | 'error'>)
            }

            return resp
        } catch (error) {
            if (onError) {
                onError(error)
            }
            return Promise.reject(error)
        }
    }

export const validateUserStateAction =
    (onSuccess?: (response: ValidateUserStateState) => void, onError?: (e: unknown) => void) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.validateUserState([
                    VALIDATE_USER_STATE.REQUEST,
                    VALIDATE_USER_STATE.SUCCESS,
                    VALIDATE_USER_STATE.FAILURE,
                ])()
            )

            if (onSuccess) {
                onSuccess(resp as ValidateUserStateState)
            }

            return resp
        } catch (error) {
            if (onError) {
                onError(error)
            }
            return Promise.reject(error)
        }
    }

export const getDataPerStepAction = () => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.getDataPerStepQuoteTC([
            GET_DATA_PER_STEP.REQUEST,
            GET_DATA_PER_STEP.SUCCESS,
            GET_DATA_PER_STEP.FAILURE,
        ])()
    )
}

/* create actions */
export const fillDataPerStepAction = (
    data: CreateCreditCard
): Record<string, string | CreateCreditCard> => ({
    type: GET_DATA_PER_STEP.FILL,
    payload: data,
})

export const cleanDataPerStepAction = (): Record<string, string | CreateCreditCard> => ({
    type: GET_DATA_PER_STEP.CLEAN,
})

export const fillValidationUserStateAction = (
    data: ValidateUserResponse
): Record<string, string | ValidateUserResponse> => ({
    type: VALIDATE_USER_STATE.FILL,
    payload: data,
})

/**
 * send OTP Credit Card
 */

export const sendCodeOtpCreditCardAction =
    (
        data: string | number,
        onSuccess?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: null
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.sendCodeOtpCreditCard([
                    SEND_CODE_OTP_CREDIT_CARD.REQUEST,
                    SEND_CODE_OTP_CREDIT_CARD.SUCCESS,
                    SEND_CODE_OTP_CREDIT_CARD.FAILURE,
                ])(data)
            )

            if (onSuccess)
                onSuccess(
                    resp as {
                        isSuccess: boolean
                        message: string | null
                        response: string | null
                        data: null
                    }
                )
        } catch (error) {
            if (onError) onError(error)
        }
    }

/**
 * validate OPT Credit Card
 */

export const validateCodeOtpCreditCardAction =
    (
        data: string,
        typeCode: string,
        onSuccess?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: null
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.validateCodeOtpCreditCard(
                    [
                        VALIDATE_CODE_OTP_CREDIT_CARD.REQUEST,
                        VALIDATE_CODE_OTP_CREDIT_CARD.SUCCESS,
                        VALIDATE_CODE_OTP_CREDIT_CARD.FAILURE,
                    ],
                    typeCode
                )(data)
            )
            if (onSuccess)
                onSuccess(
                    resp as {
                        isSuccess: boolean
                        message: string | null
                        response: string | null
                        data: null
                    }
                )
        } catch (error) {
            if (onError) onError(error)
        }
    }

/* create actions */
export const resetValidateCodeOtpCreditCardAction = (): {
    type: typeof VALIDATE_CODE_OTP_CREDIT_CARD.RESET
} => ({
    type: VALIDATE_CODE_OTP_CREDIT_CARD.RESET,
})

export const resetValidateCRMAction = (): {
    type: typeof VALIDATE_CRM.RESET
} => ({
    type: VALIDATE_CRM.RESET,
})

/**
 * Get Cliente Validation Request
 */

export const getClientValidationCCRequestAction =
    (
        onSuccess?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: {
                validationIsOk: boolean
                state: 1 | 2 | 3 | 4 | 5 | 6
                validationData: MoraRequest | IsSuccessValidation | null
            } | null
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.getClientValidationCCRequest([
                    CLIENT_VALIDATION_CREDIT_CARD_REQUEST.REQUEST,
                    CLIENT_VALIDATION_CREDIT_CARD_REQUEST.SUCCESS,
                    CLIENT_VALIDATION_CREDIT_CARD_REQUEST.FAILURE,
                ])()
            )
            if (onSuccess)
                onSuccess(
                    resp as {
                        isSuccess: boolean
                        message: string | null
                        response: string | null
                        data: {
                            validationIsOk: boolean
                            state: 1 | 2 | 3 | 4 | 5 | 6
                            validationData: MoraRequest | IsSuccessValidation | null
                        } | null
                    }
                )
        } catch (error) {
            if (onError) onError(error)
        }
    }

/**
 * Save Tc Contact
 */

export interface SaveTcContactPost {
    RequestStep: string
    Id: number
    Phone: string
    City: string
    Department: string
    Neighborhood: string
    Address: string
    Authorize: boolean
}

export const saveTcContactAction =
    (
        data: SaveTcContactPost,
        onSuccess?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.saveTcContactInfo([
                    SAVE_TC_CONTACT.REQUEST,
                    SAVE_TC_CONTACT.SUCCESS,
                    SAVE_TC_CONTACT.FAILURE,
                ])(data)
            )

            if (onSuccess)
                onSuccess(
                    resp as {
                        isSuccess: boolean
                        message: string | null
                        response: string | null
                        data: SaveTCContact
                    }
                )
            return resp
        } catch (error) {
            if (onError) onError(error)
        }
    }

/**
 * Save Tc Civil Status
 */

export interface SaveTcCivilStatusPost {
    RequestStep: string
    Id: number
    CivilStatus: string
}

export const saveTcCivilStatusAction =
    (
        data: SaveTcCivilStatusPost,
        onSuccess?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.saveTcCivilStatusInfo([
                    SAVE_TC_CIVIL_STATUS.REQUEST,
                    SAVE_TC_CIVIL_STATUS.SUCCESS,
                    SAVE_TC_CIVIL_STATUS.FAILURE,
                ])(data)
            )
            if (onSuccess)
                onSuccess(
                    resp as {
                        isSuccess: boolean
                        message: string | null
                        response: string | null
                        data: SaveTCContact
                    }
                )
            return resp
        } catch (error) {
            if (onError) onError(error)
        }
    }

/**
 * Save Tc Economic
 */

export interface SaveTcEconomicPost {
    RequestStep: string
    Id: number
    EconomyActivity: string
    MainIncome: number
    HasOtherIncome: boolean
    OtherIncome: number
}

export const saveTcEconomicAction =
    (
        data: SaveTcEconomicPost,
        onSuccess?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.saveTcEconomicInfo([
                    SAVE_TC_ECONOMIC.REQUEST,
                    SAVE_TC_ECONOMIC.SUCCESS,
                    SAVE_TC_ECONOMIC.FAILURE,
                ])(data)
            )
            if (onSuccess)
                onSuccess(
                    resp as {
                        isSuccess: boolean
                        message: string | null
                        response: string | null
                        data: SaveTCContact
                    }
                )
            return resp
        } catch (error) {
            if (onError) onError(error)
        }
    }

/**
 * Save Tc Selected Fee
 */

export const saveTcSelectedFeeAction =
    (
        data: {
            RequestStep: string
            Id: number
            SelectedFee: number
        },
        onSuccess?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact | null
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.saveTcSelectedFee([
                    SAVE_TC_SELECTED_FEE.REQUEST,
                    SAVE_TC_SELECTED_FEE.SUCCESS,
                    SAVE_TC_SELECTED_FEE.FAILURE,
                ])(data)
            )
            if (onSuccess)
                onSuccess(
                    resp as {
                        isSuccess: boolean
                        message: string | null
                        response: string | null
                        data: SaveTCContact | null
                    }
                )
            return resp
        } catch (error) {
            if (onError) onError(error)
        }
    }

/**
 * Save Tc Selected Fee Insurability
 */

export const saveTcSelectedFeeInsurabilityAction =
    (
        data: {
            RequestStep: string
            Id: number
            SelectedOption: number
        },
        onSuccess?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact | null
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.saveTcSelectedFeeInsurability([
                    SAVE_TC_SELECTED_ALTERNATIVE_FEE.REQUEST,
                    SAVE_TC_SELECTED_ALTERNATIVE_FEE.SUCCESS,
                    SAVE_TC_SELECTED_ALTERNATIVE_FEE.FAILURE,
                ])(data)
            )
            if (onSuccess)
                onSuccess(
                    resp as {
                        isSuccess: boolean
                        message: string | null
                        response: string | null
                        data: SaveTCContact | null
                    }
                )
            return resp
        } catch (error) {
            if (onError) onError(error)
        }
    }

/**
 * Save Tc Selected config Fee
 */

export const saveTcConfigAction =
    (
        data: {
            RequestStep: string
            IdCreditCardRequest: number
            BillingDay: number
            CardDeliveryAddress: string
            ExtractCardDelivery: number
            TermsCondition: boolean
        },
        onSuccess?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact | null
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.saveTcConfig([
                    SAVE_TC_CONFIG.REQUEST,
                    SAVE_TC_CONFIG.SUCCESS,
                    SAVE_TC_CONFIG.FAILURE,
                ])(data)
            )
            if (onSuccess)
                onSuccess(
                    resp as {
                        isSuccess: boolean
                        message: string | null
                        response: string | null
                        data: SaveTCContact | null
                    }
                )
            return resp
        } catch (error) {
            if (onError) onError(error)
        }
    }

/**
 * Save Tc Insurance Police
 */

export const saveTcInsurancePoliceAction =
    (
        data: { Base64File: string; IdCreditCardRequest: number },
        onSuccess?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact | null
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.saveInsurePolice([
                    SAVE_TC_INSURE_POLICE.REQUEST,
                    SAVE_TC_INSURE_POLICE.SUCCESS,
                    SAVE_TC_INSURE_POLICE.FAILURE,
                ])(data)
            )
            if (onSuccess)
                onSuccess(
                    resp as {
                        isSuccess: boolean
                        message: string | null
                        response: string | null
                        data: SaveTCContact | null
                    }
                )
            return resp
        } catch (error) {
            if (onError) onError(error)
        }
    }

/**
 * get all offices
 */

export const getAllOfficesAction = () => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.getAllOffices([
            GET_ALL_OFFICES.REQUEST,
            GET_ALL_OFFICES.SUCCESS,
            GET_ALL_OFFICES.FAILURE,
        ])()
    )
}

/**
 * save PDF ID
 */

export const savePdfIdAction =
    (
        data: { RequestStep: string; Base64File: string[]; IdCreditCardRequest: number },
        onSuccess?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact | null
        }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.saveTcIdentificationPdf([
                    SAVE_PDF_ID.REQUEST,
                    SAVE_PDF_ID.SUCCESS,
                    SAVE_PDF_ID.FAILURE,
                ])(data)
            )

            if (onSuccess)
                onSuccess(
                    resp as {
                        isSuccess: boolean
                        message: string | null
                        response: string | null
                        data: SaveTCContact | null
                    }
                )
            return resp
        } catch (error) {
            if (onError) onError(error)
        }
    }
