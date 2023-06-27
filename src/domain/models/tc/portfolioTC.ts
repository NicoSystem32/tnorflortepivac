/* eslint-disable @typescript-eslint/ban-types */
import { InitialStateGeneric, ErrorResponse } from '../../../infrastructure/http/typings/api'
import {
    GET_CREDIT_CARD_FEES,
    GET_QUOTE_FEES_SAVED,
    GET_ALL_BUY_WALLET,
    DELETE_BUY_WALLET_BY_ID,
    CREATE_BUY_WALLET,
    GET_PORTFOLIO_PURCHASE,
} from '../../../infrastructure/redux/portfolioPurchaseTC/portfolioPurchaseTC.types'

/**
 * Typings for CreditCardFeesState
 */

export interface CreditCardFeesState extends InitialStateGeneric {
    isSuccess: boolean
    response: null
    message: string | null
    data: CreditCardFees[] | null
}

export interface CreditCardFees {
    id: number
    installmentsCount: number
}

export type CreditCardFeesActionShape =
    | {
          type: typeof GET_CREDIT_CARD_FEES.REQUEST
      }
    | {
          type: typeof GET_CREDIT_CARD_FEES.SUCCESS
          payload: {
              isSuccess: boolean
              response: null
              message: string | null
              data: CreditCardFees[]
          }
      }
    | {
          type: typeof GET_CREDIT_CARD_FEES.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings for GetQuotesFeesSavedState
 */

export interface GetQuotesFeesSavedState extends InitialStateGeneric {
    isSuccess: boolean
    response: null
    message: string | null
    data: QuotesFees | null
}

export interface QuotesFees {
    installmentId: number
    userDocument?: string
}

export type GetQuotesFeesSavedShape =
    | {
          type: typeof GET_QUOTE_FEES_SAVED.REQUEST
      }
    | {
          type: typeof GET_QUOTE_FEES_SAVED.SUCCESS
          payload: {
              isSuccess: boolean
              response: null
              message: string | null
              data: QuotesFees
          }
      }
    | {
          type: typeof GET_QUOTE_FEES_SAVED.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings for GetAllBuyWalletState
 */

export interface GetAllBuyWalletState extends InitialStateGeneric {
    isSuccess: boolean
    response: null
    message: string | null
    data: BuyWallet[] | null
}

export interface BuyWallet {
    id: number
    debtCertificateUrl: null | string
    cardNumber: string
    purchaseAmount: number
    bankEntityId: number
    alternativeBankName: string
    creditCardRequestId: string
}

export type GetAllBuyWalletStateShape =
    | {
          type: typeof GET_ALL_BUY_WALLET.REQUEST
      }
    | {
          type: typeof GET_ALL_BUY_WALLET.SUCCESS
          payload: {
              isSuccess: boolean
              response: null
              message: string | null
              data: BuyWallet[]
          }
      }
    | {
          type: typeof GET_ALL_BUY_WALLET.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings for DeleteBuyWalletByIdState
 */

export interface DeleteBuyWalletByIdState extends InitialStateGeneric {
    isSuccess: boolean
    response: null
    message: string | null
    data: BuyWallet | null
}

export type DeleteBuyWalletByIdShape =
    | {
          type: typeof DELETE_BUY_WALLET_BY_ID.REQUEST
      }
    | {
          type: typeof DELETE_BUY_WALLET_BY_ID.SUCCESS
          payload: {
              isSuccess: boolean
              response: null
              message: string | null
              data: BuyWallet
          }
      }
    | {
          type: typeof DELETE_BUY_WALLET_BY_ID.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings for CreateBuyWalletByIdState
 */

export interface CreateBuyWalletState extends InitialStateGeneric {
    isSuccess: boolean
    response: null
    message: string | null
    data: BuyWallet | null
}

export type CreateBuyWalletShape =
    | {
          type: typeof CREATE_BUY_WALLET.REQUEST
      }
    | {
          type: typeof CREATE_BUY_WALLET.SUCCESS
          payload: {
              isSuccess: boolean
              response: null
              message: string | null
              data: BuyWallet
          }
      }
    | {
          type: typeof CREATE_BUY_WALLET.FAILURE
          payload: ErrorResponse
      }
/**
 * Typings for PortfolioPurchase
 */
export interface PortfolioPurchaseProcess {
    id: number
    installmentId: number
    userDocument: string
    isInCore: boolean
    isCompletedInCore: boolean
    cavipetrolConsecutive: string
}

export interface PortfolioPurchaseProcessState extends InitialStateGeneric {
    isSuccess: boolean
    response: string
    message: string
    data: PortfolioPurchaseProcess[] | null
}

export type PortfolioPurchaseProcessActionShape =
    | {
          type: typeof GET_PORTFOLIO_PURCHASE.REQUEST
      }
    | {
          type: typeof GET_PORTFOLIO_PURCHASE.SUCCESS
          payload: {
              isSuccess: boolean
              response: string
              message: string
              data: PortfolioPurchaseProcess[] | null
          }
      }
    | {
          type: typeof GET_PORTFOLIO_PURCHASE.FAILURE
          payload: ErrorResponse
      }
