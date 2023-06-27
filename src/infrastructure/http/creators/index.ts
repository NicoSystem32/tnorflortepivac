/* eslint-disable @typescript-eslint/no-explicit-any */
import { CALL_API, CancelToken } from '../api'
import { CallMethod, CreatorFuncMeta } from '../typings/api'

/**
 * Creator fetch data to consume the api
 */
export const fetchCreator: CallMethod =
    (types, endpoint, { cancelRequest, responseType }: CreatorFuncMeta = {}) =>
    (data?: Record<string | symbol, any>, params?: Record<string | symbol, any>) => {
        const restData = data

        return {
            [CALL_API]: {
                types,
                endpoint: typeof endpoint === 'function' ? endpoint(params) : endpoint,
                data: restData,
                meta: {
                    cancelToken: new CancelToken((c): void => {
                        cancelRequest || (cancelRequest = c)
                    }),
                    responseType,
                },
            },
        }
    }

/**
 * creator to store a new entry to the server
 */

export const storeCreator: CallMethod =
    (types, endpoint) =>
    (data?: Record<string | symbol, any> | string, params?: Record<string | symbol, any>) => {
        const restData = data

        return {
            [CALL_API]: {
                types,
                endpoint: typeof endpoint === 'function' ? endpoint(params) : endpoint,
                data: restData,
                meta: {
                    method: 'post',
                },
            },
        }
    }

/**
 * creator to update a new entry to the server
 */

export const updateCreator: CallMethod =
    (types, endpoint, patch) =>
    (data?: Record<string | symbol, any>, params?: Record<string | symbol, any>) => {
        const restData = data

        return {
            [CALL_API]: {
                types,
                endpoint: typeof endpoint === 'function' ? endpoint(params) : endpoint,
                data: restData,
                meta: {
                    method: patch ? 'patch' : 'put',
                },
            },
        }
    }

/**
 * creator to delete an item to the server
 */

export const deleteCreator: CallMethod =
    (types, endpoint) =>
    (params?: Record<string | symbol, any>, data?: Record<string | symbol, any>) => {
        const restData = data

        return {
            [CALL_API]: {
                types,
                endpoint: typeof endpoint === 'function' ? endpoint(params) : endpoint,
                data: restData,
                meta: {
                    method: 'delete',
                },
            },
        }
    }
