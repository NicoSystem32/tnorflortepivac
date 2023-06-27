import { InitialStateGeneric, ErrorResponse } from '../../../infrastructure/http/typings/api'
import { actionTypes } from '../../../infrastructure/redux/tdc'

const { SETTING_TDC, SIMULATE_TDC } = actionTypes

/**
 * TDC setting reducer typings definition
 */
export interface TDCSettingState extends InitialStateGeneric {
    retentionPercentage: number
    exponentYear: number
    exponentDay: number
    parametersList: IParams[]
}

export interface IParams {
    amountMinimum: number
    amountMaximum: number
    term: number
    rate: number
    modality: string
    modalityDays: number
    lsModality: string | null
    normaTdc: string
    periodicityRate: number
}

export interface TDCSettingResponse {
    response: boolean
    message: string | null
    data: {
        retentionPercentage: number
        exponentYear: number
        exponentDay: number
        parametersTdcDto: IParams[]
    }
}

/* TDC setting action shape */
export type TDCSettingActionShape =
    | {
          type: typeof SETTING_TDC.REQUEST
      }
    | {
          type: typeof SETTING_TDC.SUCCESS
          payload: TDCSettingResponse
      }
    | {
          type: typeof SETTING_TDC.FAILURE
          payload: ErrorResponse
      }

/**
 * TDC simulate reducer typings definition
 */
export interface TDCSimulateState extends InitialStateGeneric {
    parameters: SendTDCParameters | null
}

export interface SendTDCParameters {
    isExpiration: number // 0 al vencimiento del tdc y 1 para pagos periódicos
    modality: string
    modalityDays: number
    value: number // monto de inversión
    paymentsNumber: number // numero de pagos
    rate: string // tasa de interés
    term: number // termino
    normaTdc: string //lo que viene del lector de termino
    yieldBeforeRetention: number
    periodRetention: number
    yieldAfterRetention: number
    netYield: number
    ratePeriod: number
}

/* TDC simulate action shape */
export type TDCSimulateActionShape =
    | {
          type: typeof SIMULATE_TDC.REQUEST
      }
    | {
          type: typeof SIMULATE_TDC.SUCCESS
          payload: {
              response: boolean
              message: string | null
              data: any // Define data typing
          }
      }
    | {
          type: typeof SIMULATE_TDC.FAILURE
          payload: ErrorResponse
      }
    | {
          type: typeof SIMULATE_TDC.FILL
          payload: SendTDCParameters
      }
