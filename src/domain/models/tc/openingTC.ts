/* eslint-disable @typescript-eslint/ban-types */
import { InitialStateGeneric, ErrorResponse } from '../../../infrastructure/http/typings/api'
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
} from '../../../infrastructure/redux/openingTC/openingTC.types'

/**
 * Typings for ValidateCRM
 */

export interface ValidateCRMState extends InitialStateGeneric {
    response: string | null
    message: string | null
    isSuccess: boolean | null
    data: {
        validData: boolean
    } | null
}

export type ValidateCRMActionShape =
    | {
          type: typeof VALIDATE_CRM.REQUEST
      }
    | {
          type: typeof VALIDATE_CRM.SUCCESS
          payload: {
              response: string | null
              message: string | null
              isSuccess: boolean | null
              data: {
                  validData: boolean
              } | null
          }
      }
    | {
          type: typeof VALIDATE_CRM.FAILURE
          payload: ErrorResponse
      }
    | {
          type: typeof VALIDATE_CRM.RESET
      }

/**
 * Typings for Validate User State
 */

export interface ValidateUserStateState extends InitialStateGeneric {
    response: string | null
    message: string | null
    isSuccess: boolean | null
    data: ValidateUserResponse | null
}

export interface ValidateUserResponse {
    id: number
    userDocument: string
    requestStep: string
    state: number
    expirationDate: string
    requestDate: string
    phone: string
    address: string
    city: string
    department: string
    neighborhood: string
    authorize: boolean
    civilStates: string
    economyActivity: string
    mainIncome: number
    hasOtherIncome: boolean
    otherIncome: number
    minLimitCredit: number
    maxLimitCredit: number
    assignedFee: number | null
    creditCardCategory: string
    autoFee: number
    autoCategory: string | null
    autoInsurability: boolean
}

export type ValidateUserStateActionShape =
    | {
          type: typeof VALIDATE_USER_STATE.REQUEST
      }
    | {
          type: typeof VALIDATE_USER_STATE.SUCCESS
          payload: {
              response: string | null
              message: string | null
              isSuccess: boolean | null
              data: ValidateUserResponse | null
          }
      }
    | {
          type: typeof VALIDATE_USER_STATE.FAILURE
          payload: ErrorResponse
      }
    | {
          type: typeof VALIDATE_USER_STATE.FILL
          payload: ValidateUserResponse
      }

/**
 * Typings for CreateCreditCardState
 */

export interface CreateCreditCardState extends InitialStateGeneric {
    createCreditCard: CreateCreditCard
}

export type CreateCreditCard = {
    currentStep: number | null
    firstStep: FirstStep
    secondStep: SecondStep
    fourthStep: FourthStep
    fifthStep: FifthStep
    sixthStep: SixthStep
    seventhStep: SeventhStep
    eighthStep: EighthStep
    twelfthStep: TwelfthStep
    fifteenthStep: FifteenthStep
    sixteenthStep: SixteenthStep
}

export interface FirstStep {
    identification: string | null
    expeditionDocumentDay: string | null
    expeditionDocumentMonth: string | null
    expeditionDocumentYear: string | null
    dispatchCity: string | null
}

export interface SecondStep {
    cellPhone: string | null
    email: string | null
}

export interface FourthStep {
    phone?: string | null
    state: string | null
    city: string | null
    address1: string | null
    address2: string | null
    address3: string | null
    additionalIndications?: string | null
    checkTyC: boolean | null
    neighborhood: string | null
}

export interface FifthStep {
    civilStatus: string | null
}

export interface SixthStep {
    economicActivity: string | null
    mainIncome: string | null
    haveAdditionalIncome: string | null
    additionalIncome: string | null
}

export interface SeventhStep {
    cardQuote: number | null
    minQuote: number | null
    maxQuote: number | null
    cardImage: string | null
}

export interface EighthStep {
    checkCardQuote: string | null
    cardImage: string | null
    cardAlternativeImage: string | null
    autoFee: number | null
}

export interface TwelfthStep {
    billingDays: string | null
    placeToReceiveCard: string | null
    extractCreditCardReceive: string | null
    checkTyC: boolean
    officeState: string | null
    officeCity: string | null
    officePlace: string | null
    state: string | null
    city: string | null
    address1: string | null
    address2: string | null
    address3: string | null
    additionalData?: string | null
    neighborhood: string | null
    indications?: string | null
}

export interface FifteenthStep {
    buyWallet: string | null
    amountOfFees: string | null
}

export interface SixteenthStep {
    nameBank: string | null
    otherNameBank: string | null
    creditCardNumber: string | null
    amountBuy: string | null
    formatFile: string | null
}

export type CreateCreditCardActionShape =
    | {
          type: typeof GET_DATA_PER_STEP.REQUEST
      }
    | {
          type: typeof GET_DATA_PER_STEP.SUCCESS
          payload: {
              response: string | null
              message: string | null
              data: CreateCreditCard
          }
      }
    | {
          type: typeof GET_DATA_PER_STEP.FAILURE
          payload: ErrorResponse
      }
    | {
          type: typeof GET_DATA_PER_STEP.FILL
          payload: CreateCreditCard
      }
    | {
          type: typeof GET_DATA_PER_STEP.CLEAN
      }

/**
 * Typings for SendCodeOtpCreditCard
 */

export interface SendCodeOtpCreditCardState extends InitialStateGeneric {
    response: string | null
    message: string | null
    isSuccess: boolean | null
    data: null
}

export type SendCodeOtpCreditCardActionShape =
    | {
          type: typeof SEND_CODE_OTP_CREDIT_CARD.REQUEST
      }
    | {
          type: typeof SEND_CODE_OTP_CREDIT_CARD.SUCCESS
          payload: {
              response: string | null
              message: string | null
              isSuccess: boolean | null
              data: null
          }
      }
    | {
          type: typeof SEND_CODE_OTP_CREDIT_CARD.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings for ValidateCodeOtpCreditCard
 */

export interface ValidateCodeOtpCreditCardState extends InitialStateGeneric {
    response: string | null
    message: string | null
    isSuccess: boolean | null
    data: null
}

export type ValidateCodeOtpCreditCardStateShape =
    | {
          type: typeof VALIDATE_CODE_OTP_CREDIT_CARD.REQUEST
      }
    | {
          type: typeof VALIDATE_CODE_OTP_CREDIT_CARD.SUCCESS
          payload: {
              response: string | null
              message: string | null
              isSuccess: boolean | null
              data: null
          }
      }
    | {
          type: typeof VALIDATE_CODE_OTP_CREDIT_CARD.FAILURE
          payload: ErrorResponse
      }
    | {
          type: typeof VALIDATE_CODE_OTP_CREDIT_CARD.RESET
      }

/**
 * Typings for GetClientValidationCCRequestState
 */

export interface GetClientValidationCCRequestState extends InitialStateGeneric {
    response: string | null
    message: string | null
    isSuccess: boolean | null
    data: {
        validationIsOk: boolean
        state: 1 | 2 | 3 | 4 | 5 | 6
        validationData: MoraRequest | IsSuccessValidation | null
    } | null
}

export interface MoraRequest {
    totalArrearsDays: number
    defaultBalance: number
    mortgageCredits: number
    mortgageSavings: number
}

export interface IsSuccessValidation {
    id: number
    userDocument: string
    requestStep: string
    state: number
    expirationDate: string | null
    requestDate: string
    phone: string | null
    address: string | null
    city: string | null
    department: string | null
    neighborhood: string | null
    authorize: boolean | null
    civilStates: string | null
    economyActivity: string | null
    mainIncome: string | null
    hasOtherIncome: string | null
    otherIncome: string | null
    minLimitCredit: string | null
    maxLimitCredit: string | null
    assignedFee: string | null
    creditCardCategory: string | null
    autoFee: number
    autoCategory: null
    autoInsurability: boolean
}

export type GetClientValidationCCRequestShape =
    | {
          type: typeof CLIENT_VALIDATION_CREDIT_CARD_REQUEST.REQUEST
      }
    | {
          type: typeof CLIENT_VALIDATION_CREDIT_CARD_REQUEST.SUCCESS
          payload: {
              response: string | null
              message: string | null
              isSuccess: boolean | null
              data: null
          }
      }
    | {
          type: typeof CLIENT_VALIDATION_CREDIT_CARD_REQUEST.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings for SaveTCContactState
 */

export interface SaveTCContactState extends InitialStateGeneric {
    response: string | null
    message: string | null
    isSuccess: boolean | null
    data: SaveTCContact | null
}

export interface SaveTCContact {
    id: number
    userDocument: string
    requestStep: string
    state: number
    expirationDate: string | null
    requestDate: string
    phone: string | null
    address: string | null
    city: string | null
    department: string | null
    neighborhood: string | null
    authorize: boolean | null
    civilStates: string | null
    economyActivity: string | null
    mainIncome: string | null
    hasOtherIncome: string | null
    otherIncome: string | null
    minLimitCredit: number | null
    maxLimitCredit: number | null
    assignedFee: string | null
    creditCardCategory: string | null
    autoFee: number
    autoCategory: string | null
    autoInsurability: boolean
}

export type SaveTCContactShape =
    | {
          type: typeof SAVE_TC_CONTACT.REQUEST
      }
    | {
          type: typeof SAVE_TC_CONTACT.SUCCESS
          payload: {
              response: string | null
              message: string | null
              isSuccess: boolean | null
              data: SaveTCContact | null
          }
      }
    | {
          type: typeof SAVE_TC_CONTACT.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings for SaveTCCivilStatusState
 */

export interface SaveTCCivilStatusState extends InitialStateGeneric {
    response: string | null
    message: string | null
    isSuccess: boolean | null
    data: SaveTCContact | null
}

export type SaveTCCivilStatusShape =
    | {
          type: typeof SAVE_TC_CIVIL_STATUS.REQUEST
      }
    | {
          type: typeof SAVE_TC_CIVIL_STATUS.SUCCESS
          payload: {
              response: string | null
              message: string | null
              isSuccess: boolean | null
              data: SaveTCContact | null
          }
      }
    | {
          type: typeof SAVE_TC_CIVIL_STATUS.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings for getAllOffices
 */

export interface OfficeData {
    oFCDepartment: string
    oFCCity: string
    oFCAddress: string
    oFCPhone: string
    oFCAttentionHours: string
}

export interface GetAllOfficesState extends InitialStateGeneric {
    response: string | null
    message: string | null
    isSuccess: boolean | null
    data: OfficeData[] | null
}

export type GetAllOfficesShape =
    | {
          type: typeof GET_ALL_OFFICES.REQUEST
      }
    | {
          type: typeof GET_ALL_OFFICES.SUCCESS
          payload: {
              response: string | null
              message: string | null
              isSuccess: boolean | null
              data: OfficeData[] | null
          }
      }
    | {
          type: typeof GET_ALL_OFFICES.FAILURE
          payload: ErrorResponse
      }
