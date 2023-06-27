/* eslint-disable @typescript-eslint/ban-types */
import { InitialStateGeneric, ErrorResponse } from '../../../infrastructure/http/typings/api'
import {
    GET_CREDIT_CARDS,
    CREDIT_CARDS_PAYMENTS,
    STATUS_CHANGE_TC,
    SEND_CODE_OTP_TC,
    VALIDATE_CODE_OTP_TC,
} from '../../../infrastructure/redux/tc/tc.types'

/**
 * Typings for GetCreditCardsState
 */

export interface GetCreditCardsState extends InitialStateGeneric {
    data: { cards: CreditCard[] } | null
    status: string | null
    message: string | null
}

export interface CreditCard {
    nameCard: string
    idProduct: string
    cardNumber: string
    dateExpiredCard: string
    quotaAvailable: number
    totalLimit: number
    availableWingDate: number
    availableShopping: number
    availablePreviews: number
    dateNextPayment: string
    cutoffDate: string
    valuePay: number
    typeCard: string
    lastEightDigits: string
    lastFourDigits: string
    lastFourDigitsEncryptedCC: string
    minimumPayment: number
    totalPayment: number
    lockType: string
    movementsCard: MovementCard[]
    lockTypeCoopCentral: string
}

export interface MovementCard {
    dateMovement: string
    description: string
    amount: string
    establishment: null | string
}

export type GetCreditCardsActionShape =
    | {
          type: typeof GET_CREDIT_CARDS.REQUEST
      }
    | {
          type: typeof GET_CREDIT_CARDS.SUCCESS
          payload: {
              response: string | null
              isSuccess: boolean | null
              message: string | null
              data: { cards: CreditCard[] }
          }
      }
    | {
          type: typeof GET_CREDIT_CARDS.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings for CreditCardPaymentState
 */
export interface CreditCardPaymentState extends InitialStateGeneric {
    dataPayment: CreditCardPayment | null
}
export interface CreditCardPayment {
    idProduct: string
    value: number
    lastFourDigits: string
    nameDocument: string
    typePay: number
}

export type CreditCardPaymentActionShape =
    | {
          type: typeof CREDIT_CARDS_PAYMENTS.FILL
          payload: CreditCardPayment
      }
    | {
          type: typeof CREDIT_CARDS_PAYMENTS.FAILURE
          payload: CreditCardPayment
      }

export enum CardStates {
    ACTIVA = 'ACTIVA',
    POR_ACTIVAR = 'POR ACTIVAR',
    BLOQUEO_TEMPORAL = 'BLOQUEO TEMPORAL',
    BLOQUEO_TEMPORAL_POR_MORA = 'BLOQUEO TEMPORAL POR MORA',
    BLOQUEO_PERDIDA_O_HURTO = 'BLOQUEO PERDIDA O HURTO',
    EN_MORA = 'EN MORA',
}

/**
 * Activate credit card
 */
export interface StatusChange {
    TransactionDate: string
    TransactionTime: string
    EffectiveDate: string
    Consecutive: string
    NumberCard: string
    Filler1: string
    Filler2: string
    Status: string
}

export interface StatusChangeTCState extends InitialStateGeneric {
    data: null
    status: string | null
    message: string | null
}

export type StatusChangeTCActionShape =
    | {
          type: typeof STATUS_CHANGE_TC.REQUEST
      }
    | {
          type: typeof STATUS_CHANGE_TC.SUCCESS
          payload: {
              response: string | null
              isSuccess: boolean | null
              message: string | null
              data: null
          }
      }
    | {
          type: typeof STATUS_CHANGE_TC.FAILURE
          payload: ErrorResponse
      }
    | {
          type: typeof STATUS_CHANGE_TC.CLEAN
      }

export interface SendCodeOtpTCState extends InitialStateGeneric {
    data: null
    status: string | null
    message: string | null
}

export type SendCodeOtpTCActionShape =
    | {
          type: typeof SEND_CODE_OTP_TC.REQUEST
      }
    | {
          type: typeof SEND_CODE_OTP_TC.SUCCESS
          payload: {
              response: string | null
              isSuccess: boolean | null
              message: string | null
              data: null
          }
      }
    | {
          type: typeof SEND_CODE_OTP_TC.FAILURE
          payload: ErrorResponse
      }
    | {
          type: typeof SEND_CODE_OTP_TC.CLEAN
      }

export interface ValidateCodeOtpTCState extends InitialStateGeneric {
    data: null
    status: string | null
    message: string | null
}

export type ValidateCodeOtpTCActionShape =
    | {
          type: typeof VALIDATE_CODE_OTP_TC.REQUEST
      }
    | {
          type: typeof VALIDATE_CODE_OTP_TC.SUCCESS
          payload: {
              response: string | null
              isSuccess: boolean | null
              message: string | null
              data: null
          }
      }
    | {
          type: typeof VALIDATE_CODE_OTP_TC.FAILURE
          payload: ErrorResponse
      }
    | {
          type: typeof VALIDATE_CODE_OTP_TC.CLEAN
      }
