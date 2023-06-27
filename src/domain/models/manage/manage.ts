import { InitialStateGeneric, ErrorResponse } from '../../../infrastructure/http/typings/api'
import { MANAGE_MESSAGES } from '../../../infrastructure/redux/manage'

/**
 * Typings definition reducers
 */

export interface ManageState extends InitialStateGeneric {
    messages: Message[]
}

export interface Message {
    title: string | null
    name: string
    text: string
}

export type ManageActionShape =
    | {
          type: typeof MANAGE_MESSAGES.REQUEST
      }
    | {
          type: typeof MANAGE_MESSAGES.SUCCESS
          payload: {
              isSuccess: boolean
              message: string | null
              data: Message[]
          }
      }
    | {
          type: typeof MANAGE_MESSAGES.FAILURE
          payload: ErrorResponse
      }
