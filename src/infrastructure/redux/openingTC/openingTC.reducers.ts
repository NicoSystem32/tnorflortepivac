// TDC model
import {
    CreateCreditCardState,
    CreateCreditCardActionShape,
    ValidateCRMState,
    ValidateUserStateState,
    ValidateUserStateActionShape,
    ValidateCRMActionShape,
    SendCodeOtpCreditCardState,
    SendCodeOtpCreditCardActionShape,
    ValidateCodeOtpCreditCardState,
    ValidateCodeOtpCreditCardStateShape,
    GetClientValidationCCRequestState,
    GetClientValidationCCRequestShape,
    SaveTCContactState,
    SaveTCContactShape,
    GetAllOfficesState,
    GetAllOfficesShape,
    SaveTCCivilStatusShape,
    SaveTCCivilStatusState,
} from '../../../domain/models'
import {
    VALIDATE_CRM,
    VALIDATE_USER_STATE,
    GET_DATA_PER_STEP,
    SEND_CODE_OTP_CREDIT_CARD,
    VALIDATE_CODE_OTP_CREDIT_CARD,
    CLIENT_VALIDATION_CREDIT_CARD_REQUEST,
    SAVE_TC_CONTACT,
    GET_ALL_OFFICES,
    SAVE_TC_CIVIL_STATUS,
} from './openingTC.types'

const initialValidateCRMState: ValidateCRMState = {
    response: null,
    message: null,
    isSuccess: null,
    data: null,
    loading: false,
    error: {},
}

export const validateCRMReducer = (
    state = initialValidateCRMState,
    action: ValidateCRMActionShape
): ValidateCRMState => {
    switch (action.type) {
        case VALIDATE_CRM.REQUEST:
            return { ...state, loading: true, error: {} }
        case VALIDATE_CRM.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                data: action.payload.data,
                loading: false,
                error: {},
            }
        case VALIDATE_CRM.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case VALIDATE_CRM.RESET:
            return {
                ...initialValidateCRMState,
            }
        default:
            return state
    }
}

const initialValidateUserStateState: ValidateUserStateState = {
    response: null,
    message: null,
    isSuccess: null,
    data: null,
    loading: false,
    error: {},
}

export const validateUserStateReducer = (
    state = initialValidateUserStateState,
    action: ValidateUserStateActionShape
): ValidateUserStateState => {
    switch (action.type) {
        case VALIDATE_USER_STATE.REQUEST:
            return { ...state, loading: true, error: {} }
        case VALIDATE_USER_STATE.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                data: action.payload.data,
                loading: false,
                error: {},
            }
        case VALIDATE_USER_STATE.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case VALIDATE_USER_STATE.FILL:
            return {
                ...state,
                data: action.payload,
            }
        default:
            return state
    }
}

const initialGetDataPerStepState: CreateCreditCardState = {
    createCreditCard: {
        currentStep: null,
        firstStep: {
            identification: null,
            expeditionDocumentDay: null,
            expeditionDocumentMonth: null,
            expeditionDocumentYear: null,
            dispatchCity: null,
        },
        secondStep: {
            cellPhone: null,
            email: null,
        },
        fourthStep: {
            phone: null,
            state: null,
            city: null,
            address1: null,
            address2: null,
            address3: null,
            additionalIndications: null,
            checkTyC: false,
            neighborhood: null,
        },
        fifthStep: {
            civilStatus: null,
        },
        sixthStep: {
            economicActivity: null,
            mainIncome: null,
            haveAdditionalIncome: null,
            additionalIncome: null,
        },
        seventhStep: {
            cardQuote: null,
            minQuote: null,
            maxQuote: null,
            cardImage: null,
        },
        eighthStep: {
            checkCardQuote: null,
            cardImage: null,
            cardAlternativeImage: null,
            autoFee: null,
        },
        twelfthStep: {
            billingDays: null,
            placeToReceiveCard: null,
            extractCreditCardReceive: null,
            checkTyC: false,
            officeState: null,
            officeCity: null,
            officePlace: null,
            state: null,
            city: null,
            address1: null,
            address2: null,
            address3: null,
            additionalData: null,
            neighborhood: null,
            indications: null,
        },
        fifteenthStep: {
            buyWallet: null,
            amountOfFees: null,
        },
        sixteenthStep: {
            nameBank: null,
            otherNameBank: null,
            creditCardNumber: null,
            amountBuy: null,
            formatFile: null,
        },
    },
    loading: false,
    error: {},
}

export const getDataPerStepReducer = (
    state = initialGetDataPerStepState,
    action: CreateCreditCardActionShape
): CreateCreditCardState => {
    switch (action.type) {
        case GET_DATA_PER_STEP.REQUEST:
            return { ...state, loading: true, error: {} }
        case GET_DATA_PER_STEP.SUCCESS:
            return {
                ...state,
                createCreditCard: action.payload.data,
                loading: false,
                error: {},
            }
        case GET_DATA_PER_STEP.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case GET_DATA_PER_STEP.FILL:
            return {
                ...state,
                loading: false,
                createCreditCard: action.payload,
            }
        case GET_DATA_PER_STEP.CLEAN:
            return {
                ...initialGetDataPerStepState,
            }
        default:
            return state
    }
}

/**
 * send OTP
 */

const initialSendCodeOtpCreditCard: SendCodeOtpCreditCardState = {
    data: null,
    response: null,
    isSuccess: null,
    message: null,
    loading: false,
    error: {},
}

export const sendCodeOtpCreditCardReducer = (
    state = initialSendCodeOtpCreditCard,
    action: SendCodeOtpCreditCardActionShape
): SendCodeOtpCreditCardState => {
    switch (action.type) {
        case SEND_CODE_OTP_CREDIT_CARD.REQUEST:
            return { ...state, loading: true, error: {} }
        case SEND_CODE_OTP_CREDIT_CARD.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                data: action.payload.data,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                loading: false,
                error: {},
            }
        case SEND_CODE_OTP_CREDIT_CARD.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

/**
 * validate OTP
 */

const initialValidateCodeOtpCreditCard: ValidateCodeOtpCreditCardState = {
    data: null,
    response: null,
    message: null,
    isSuccess: false,
    loading: false,
    error: {},
}

export const validateCodeOtpCreditCardReducer = (
    state = initialValidateCodeOtpCreditCard,
    action: ValidateCodeOtpCreditCardStateShape
): ValidateCodeOtpCreditCardState => {
    switch (action.type) {
        case VALIDATE_CODE_OTP_CREDIT_CARD.REQUEST:
            return { ...state, loading: true, error: {} }
        case VALIDATE_CODE_OTP_CREDIT_CARD.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                data: action.payload.data,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                loading: false,
                error: {},
            }
        case VALIDATE_CODE_OTP_CREDIT_CARD.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case VALIDATE_CODE_OTP_CREDIT_CARD.RESET:
            return {
                ...initialValidateCodeOtpCreditCard,
            }
        default:
            return state
    }
}

/**
 * validate GetClientValidationCCRequest
 */

const initialGetClientValidationCCRequest: GetClientValidationCCRequestState = {
    data: null,
    response: null,
    message: null,
    isSuccess: false,
    loading: false,
    error: {},
}

export const getClientValidationCCRequestReducer = (
    state = initialGetClientValidationCCRequest,
    action: GetClientValidationCCRequestShape
): GetClientValidationCCRequestState => {
    switch (action.type) {
        case CLIENT_VALIDATION_CREDIT_CARD_REQUEST.REQUEST:
            return { ...state, loading: true, error: {} }
        case CLIENT_VALIDATION_CREDIT_CARD_REQUEST.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                data: action.payload.data,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                loading: false,
                error: {},
            }
        case CLIENT_VALIDATION_CREDIT_CARD_REQUEST.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

/**
 * validate Save TC Contact
 */

const initialSaveTCContact: SaveTCContactState = {
    data: null,
    response: null,
    message: null,
    isSuccess: false,
    loading: false,
    error: {},
}

export const saveTCContactReducer = (
    state = initialSaveTCContact,
    action: SaveTCContactShape
): SaveTCContactState => {
    switch (action.type) {
        case SAVE_TC_CONTACT.REQUEST:
            return { ...state, loading: true, error: {} }
        case SAVE_TC_CONTACT.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                data: action.payload.data,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                loading: false,
                error: {},
            }
        case SAVE_TC_CONTACT.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

/**
 * validate Save Civil Status TC Contact
 */

const initialSaveTCCivilStatus: SaveTCCivilStatusState = {
    data: null,
    response: null,
    message: null,
    isSuccess: false,
    loading: false,
    error: {},
}

export const saveTCCivilStatusReducer = (
    state = initialSaveTCCivilStatus,
    action: SaveTCCivilStatusShape
): SaveTCCivilStatusState => {
    switch (action.type) {
        case SAVE_TC_CIVIL_STATUS.REQUEST:
            return { ...state, loading: true, error: {} }
        case SAVE_TC_CIVIL_STATUS.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                data: action.payload.data,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                loading: false,
                error: {},
            }
        case SAVE_TC_CIVIL_STATUS.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

/**
 * get all offices
 */

const initialGetAllOffices: GetAllOfficesState = {
    data: [],
    response: null,
    message: null,
    isSuccess: false,
    loading: false,
    error: {},
}

export const getAllOfficesReducer = (
    state = initialGetAllOffices,
    action: GetAllOfficesShape
): GetAllOfficesState => {
    switch (action.type) {
        case GET_ALL_OFFICES.REQUEST:
            return { ...state, loading: true, error: {} }
        case GET_ALL_OFFICES.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                data: action.payload.data,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                loading: false,
                error: {},
            }
        case GET_ALL_OFFICES.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
