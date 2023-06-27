/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// include types definition from axios's http calls library
import { Method, CancelToken, ResponseType, Canceler } from 'axios'

//
// Set interface/type definition for api middleware
//

// Constants
// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'CALL_API'

// Types
export type ApiMethods = Method
export type RequestStates = [string, string, string]

export type ApiMetadata = {
    method?: ApiMethods
    cancelToken?: CancelToken
    csrftoken?: string
    responseType?: ResponseType
}

export type CreatorFuncMeta = {
    responseType?: ResponseType
    cancelRequest?: Canceler
}

export type ApiCallProps = {
    endpoint: string
    data?: {} | string
    meta?: ApiMetadata
    schema?: {}
}

export type UrlParam = {
    key: string
    value: string
}

export type Response = {
    status?: number
    data?: any
}

export type Error = {
    response?: Response
    message?: string
    error?: any
    request?: XMLHttpRequest
}

export type ApiReturnData = {
    status?: number
    data?: any
    message?: string
    error?: {}
    success: boolean
}

export interface ApiAction<
    T = typeof CALL_API,
    TS = RequestStates,
    A extends ApiCallProps = ApiCallProps
> {
    [T]: {
        types: TS
    } & A
}

export interface CallMethod<TS = RequestStates, E = string | Function, T = any[]> {
    (types: TS, endpoint: E, ...args: T): (data?: {}, params?: {}) => ApiAction<typeof CALL_API, TS>
}

/**
 * Redux typing
 */

export interface InitialStateGeneric {
    loading: boolean
    error: Record<string | number | symbol, any>
}

/**
 * Types of ErrorResponse
 */
export interface ErrorResponse {
    error: Error
    errorData: ErrorData
}

export interface Error {
    message: string
    name: string
    stack: string
    config: Config
    status: number
}

export interface Config {
    transitional: Transitional
    transformRequest: null[]
    transformResponse: null[]
    timeout: number
    xsrfCookieName: string
    xsrfHeaderName: string
    maxContentLength: number
    maxBodyLength: number
    headers: Headers
    baseURL: string
    cancelToken: CancelToken
    method: string
    data: string
    url: string
}

export interface CancelToken {
    promise: Promise
    _listeners: any[]
}

export interface Promise {}

export interface Headers {
    Accept: string
    'Content-Type': string
    'X-Api-Key': string
}

export interface Transitional {
    silentJSONParsing: boolean
    forcedJSONParsing: boolean
    clarifyTimeoutError: boolean
}

export interface ErrorData {
    response: string
    message: string
    data: null
}
