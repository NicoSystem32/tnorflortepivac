/* eslint-disable @typescript-eslint/ban-types */
import { InitialStateGeneric, ErrorResponse } from '../../../infrastructure/http/typings/api'
import {
    CARDS_CONSOLIDATED,
    CREDITS_CONSOLIDATED,
    SAVING_AVAILABLE,
    CREDITS_AVAILABLE,
    DETAIL,
    MOVEMENTS,
    MOVEMENTS_DETAIL,
    // CONSOLIDATED,
    FAI_ACCOUNT_BALANCE,
    // SETTING_TDC,
    // SIMULATE_TDC,
} from '../../../infrastructure/redux/products'

/**
 *  Types for the auth parameters EP
 */

export type DetailTypes = {
    typeDocument: string | number
    document: string | number
    finishedNumber: string | number
}

/**
 * ===========================
 * Typings definition reducers
 * ===========================
 */

/**
 * Typings CardsConsolidatedState
 */

export interface CardsConsolidatedState extends InitialStateGeneric {
    cards: CardsConsolidate[]
}

export interface CardsConsolidate {
    title: string
    description: string
    productType: string | number
    quotaspayable: string | number
}

export type CardsConsolidatedActionShape =
    | {
          type: typeof CARDS_CONSOLIDATED.REQUEST
      }
    | {
          type: typeof CARDS_CONSOLIDATED.SUCCESS
          payload: {
              response: string | null
              message: string | null
              data: CardsConsolidate[]
          }
      }
    | {
          type: typeof CARDS_CONSOLIDATED.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings CreditsConsolidatedState
 */

export interface CreditsConsolidatedState extends InitialStateGeneric {
    credits: CreditsConsolidate[]
}

export interface CreditsConsolidate {
    creditName: string
    creditNumber: string
    balanceTotal: number
    feesToPay: number
    nextPaymentDate: string
    numberInstallmentsArrears: number
    creditLineName: string
    expirationDate: null
    finishedNumber: string
    typeDocumentProduct: string
    idProduct: string | null
    urlImageProduct: string
}

export type CreditConsolidatedActionShape =
    | {
          type: typeof CREDITS_CONSOLIDATED.REQUEST
      }
    | {
          type: typeof CREDITS_CONSOLIDATED.SUCCESS
          payload: {
              response: string | null
              message: string | null
              data: CreditsConsolidate[]
          }
      }
    | {
          type: typeof CREDITS_CONSOLIDATED.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings SavingAvailableState
 */

export interface SavingAvailableState extends InitialStateGeneric {
    saving: SavingAvailable[]
}
export interface SavingAvailable {
    creditName: string
    creditNumber: string
    balanceTotal: number
    feesToPay: number
    nextPaymentDate: string
    numberInstallmentsArrears: number
    creditLineName: string
    expirationDate: string
    finishedNumber: string
    typeDocumentProduct: string
    idProduct: null | string | number
    urlImageProduct: string
    delinquentBalance: number
}

export type SavingAvailableActionShape =
    | {
          type: typeof SAVING_AVAILABLE.REQUEST
      }
    | {
          type: typeof SAVING_AVAILABLE.SUCCESS
          payload: {
              response: string | null
              message: string | null
              data: SavingAvailable[]
          }
      }
    | {
          type: typeof SAVING_AVAILABLE.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings DetailState
 */

export interface DetailState extends InitialStateGeneric {
    detail: Detail[]
}
export interface Detail {
    creditName: string
    creditLineName: string
    documentNumber: string
    balanceTotal: number
    nextFeeValue: number
    nextPaymentDate: string
    delinquentBalance: number
    quotasPayable: number
    totalFeeValue: number
    dueDate: string
    finishedNumber: string
    typeDocumentProduct: string
    capital: number
    currentBankInterest: number
    frozenBankInterest: number
    frozenInsurance: number
    refund: number
    tradedInterests: number
    insurance: number
    defaultInterest: number
    otherAccountsPayable: number
    quotaValue: number
    idProduct: string
    isRefund: boolean
    valueRefund: number
}

export type DetailActionShape =
    | {
          type: typeof DETAIL.REQUEST
      }
    | {
          type: typeof DETAIL.SUCCESS
          payload: {
              response: string | null
              message: string | null
              data: Detail[]
          }
      }
    | {
          type: typeof DETAIL.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings CreditsAvailable
 */

export interface CreditsAvailableState extends InitialStateGeneric {
    credits: CreditsAvailable[]
}

export interface CreditsAvailable {
    creditName: string
    creditNumber: string
    balanceTotal: number
    feesToPay: number
    nextPaymentDate: string
    numberInstallmentsArrears: number
    creditLineName: string
    expirationDate: null | string
    finishedNumber: string
    typeDocumentProduct: string
    idProduct: null | string | number
    urlImageProduct: string
    delinquentBalance: number
}

export type CreditsAvailableActionShape =
    | {
          type: typeof CREDITS_AVAILABLE.REQUEST
      }
    | {
          type: typeof CREDITS_AVAILABLE.SUCCESS
          payload: {
              response: string | null
              message: string | null
              data: CreditsAvailable[]
          }
      }
    | {
          type: typeof CREDITS_AVAILABLE.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings Movements
 */

export interface MovementState extends InitialStateGeneric {
    movements: Movement[]
}

export interface Movement {
    dateMovement: string
    officeMovement: string
    voucherMovement: string
    classMovement: string
    valueMovement: number
}

export type MovementActionShape =
    | {
          type: typeof MOVEMENTS.REQUEST
      }
    | {
          type: typeof MOVEMENTS.SUCCESS
          payload: {
              response: string | null
              message: string | null
              data: Movement[]
          }
      }
    | {
          type: typeof MOVEMENTS.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings MovementsDetail
 */

export interface MovementDetailState extends InitialStateGeneric {
    details: MovementDetail[]
}

export interface MovementDetail {
    creditStartDate: string
    creditPeriod: string
    creditQuotasAgreed: number
    creditFeesMissing: number
    creditValueQuota: number
    creditRate: string
    savingValueProgrammed: number
    savingsValue: number
    savingsRate: string
    savingsInstallmentsScheduled: number
    savingInstallmentsEffective: number
    savingsDateFirstDiscount: string
    savingsDateLastDiscount: string
    uniqueDocument: string
    contributionCavDateFirstPayment: string
    permanentCavSavingsContribution: null
    contributionCavContributionSocial: null
    contributionCavPerformance: null
    contributionCavRevaluation: null
}

export type MovementDetailActionShape =
    | {
          type: typeof MOVEMENTS_DETAIL.REQUEST
      }
    | {
          type: typeof MOVEMENTS_DETAIL.SUCCESS
          payload: {
              response: string | null
              message: string | null
              data: MovementDetail[]
          }
      }
    | {
          type: typeof MOVEMENTS_DETAIL.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings FaiAccountBalance
 */

export interface FaiAccountBalanceState extends InitialStateGeneric {
    faiAccount: GetFaiAccountBalance
}

export interface GetFaiAccountBalance {
    creditName: string
    creditLineName: string
    productDocumentNumber: string
    finishedNumber: number
    balanceTotal: number
    typeDocumentProduct: string
    idProduct: string
    urlImageProduct: string
}

export type FaiAccountBalanceActionShape =
    | {
          type: typeof FAI_ACCOUNT_BALANCE.REQUEST
      }
    | {
          type: typeof FAI_ACCOUNT_BALANCE.SUCCESS
          payload: {
              response: string | null
              message: string | null
              data: GetFaiAccountBalance
          }
      }
    | {
          type: typeof FAI_ACCOUNT_BALANCE.FAILURE
          payload: ErrorResponse
      }
