/* eslint-disable @typescript-eslint/ban-types */
import { InitialStateGeneric, ErrorResponse } from '../../../infrastructure/http/typings/api'
import {
    CREATE_TRANSACTION,
    GET_TRANSACTION,
    SEND_ATTACHMENT_TRANSACTION,
} from '../../../infrastructure/redux/transaction'

/**
 * Typings for GetTransaction
 */

export interface TransactionState extends InitialStateGeneric {
    transaction: Transaction
    status: string | null
    message: string | null
}

export type Transaction = {
    vtaAmount: number
    amount: number
    trazabilityCode: string
    solicitedDate: string
    cycleNumber: number
    bankName: string
    serviceCode: string
    paymentID: string
    state: string
    message: string
    pyments: Payment[]
    ipAddress: string
    accountFai: string

    //tdc
    paymentMethod: number
    externalTransactionId?: string
} | null

export interface Payment {
    typeDocumentProduct: string
    document: string
    finishedNumber: string
    value: number
    status: string
    externalTransactionId: string
    numberTransaction: number | null | string
    nameDocument: string | null
    idProduct: string | null
    urlImage: string | null

    //tdc
    id: number | null
    paymentMethodTdc: string | null
    term: number | null
    rate: string
    modality: string | null
    isTdc: number
    tdcNumber: number | null
    physicalNumber: number | null
    paymentsNumber: number | null
}

export type TransactionActionShape =
    | {
          type: typeof GET_TRANSACTION.REQUEST
      }
    | {
          type: typeof GET_TRANSACTION.SUCCESS
          payload: {
              response: string | null
              message: string | null
              data: Transaction
          }
      }
    | {
          type: typeof GET_TRANSACTION.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings for CreateTransaction
 */

export interface TransactionFAIResponse {
    resultFaiPayments: {
        methodPayment: string
        paymentMethod?: number
        numberCount: string
        transaction: string
        ipAddress: string
        externalTransactionId: string
        pyments: Payment[]
    }
    message: string
    response: string
}

export interface CreateTransactionState extends InitialStateGeneric {
    urlPayment: string
    status: string | null
    message: string | null
    transaction: TransactionFAIResponse['resultFaiPayments'] | null
}

export type CreateTransactionActionShape =
    | {
          type: typeof CREATE_TRANSACTION.REQUEST
      }
    | {
          type: typeof CREATE_TRANSACTION.SUCCESS
          payload: {
              response: string | null
              message: string | null
              data: string
          }
      }
    | {
          type: typeof CREATE_TRANSACTION.FAILURE
          payload: ErrorResponse
      }
    | {
          type: typeof CREATE_TRANSACTION.FILL
          payload: TransactionFAIResponse
      }
    | {
          type: typeof CREATE_TRANSACTION.CLEAN
      }

/**
 * Typings SendAttachmentPayment
 */
export interface SendAttachmentPaymentState extends InitialStateGeneric {
    status: string | null
    message: string | null
    data: null
}

export type SendAttachmentPaymentActionShape =
    | {
          type: typeof SEND_ATTACHMENT_TRANSACTION.REQUEST
      }
    | {
          type: typeof SEND_ATTACHMENT_TRANSACTION.SUCCESS
          payload: {
              response: string | null
              message: string | null
              data: string
          }
      }
    | {
          type: typeof SEND_ATTACHMENT_TRANSACTION.FAILURE
          payload: ErrorResponse
      }
    | {
          type: typeof SEND_ATTACHMENT_TRANSACTION.FILL
          payload: TransactionFAIResponse
      }

/**
 * Typings for Transaction payment
 */

export interface PaymentTransaction {
    totalValue: number
    totalValuePSE: number
    totalValueFAI: number
    paymentMethod: number
    IsTdc: boolean
    pays: Pay[]
    NormaTdc: string
    IsExpiration: boolean
}

export interface Pay {
    TypeDocument: string
    FinishedNumber: string
    document: string
    description: string
    value: string
    typePay: number
    origenPayment: number
    Term: number
    Rate: string
    PaymentMethod?: string
    // FAI
    Number?: string
    NameDocument?: string

    //nuevo

    PaymentMethodTdc?: string
    NormaTdc?: string
    IsTdc?: number
    // NameDocument: string
    IdProduct?: string
    IsExpiration?: number
    Modality?: string
    PaymentsNumber?: number
    yieldBeforeRetention?: number
    periodRetention?: number
    yieldAfterRetention?: number
    netYield?: number
    modalityDays?: number
    ratePeriod?: number
}

// pasar a tc ini

// pasar a tc fin
