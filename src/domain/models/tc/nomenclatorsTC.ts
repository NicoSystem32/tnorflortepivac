/* eslint-disable @typescript-eslint/ban-types */
import { InitialStateGeneric, ErrorResponse } from '../../../infrastructure/http/typings/api'
import { GET_ALL_BANKS, GET_NOMENCLATORS } from '../../../infrastructure/redux/tc/tc.types'

/**
 * Typings for GetAllBanksState
 */

export interface GetAllBanksState extends InitialStateGeneric {
    isSuccess: boolean
    response: null
    message: string | null
    data: Bank[] | null
}

export interface Bank {
    tcbId: number
    tcbConsecutivo: string
    tcbNombre: string
    tcbIdInterno: string
    tcbCiudad: string
    tcbPais: string
}

export type GetAllBanksShape =
    | {
          type: typeof GET_ALL_BANKS.REQUEST
      }
    | {
          type: typeof GET_ALL_BANKS.SUCCESS
          payload: {
              isSuccess: boolean
              response: null
              message: string | null
              data: Bank[]
          }
      }
    | {
          type: typeof GET_ALL_BANKS.FAILURE
          payload: ErrorResponse
      }

/**
 * Typings for GetAllNomenclatorState
 */

export interface GetAllNomenclatorState extends InitialStateGeneric {
    isSuccess: boolean
    response: null
    message: string | null
    data: Nomenclator[]
}

export interface Nomenclator {
    id: number
    type: number
    name: string
    value: string
    parent: number
    coopcentralValue: string
}

export type GetAllNomenclatorShape =
    | {
          type: typeof GET_NOMENCLATORS.REQUEST
      }
    | {
          type: typeof GET_NOMENCLATORS.SUCCESS
          payload: {
              isSuccess: boolean
              response: null
              message: string | null
              data: Nomenclator[]
          }
      }
    | {
          type: typeof GET_NOMENCLATORS.FAILURE
          payload: ErrorResponse
      }
