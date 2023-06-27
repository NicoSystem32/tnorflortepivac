/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { Action, AnyAction, Dispatch, MiddlewareAPI } from 'redux'
import { camelizeKeys } from 'humps'

import { callApi, CALL_API, interceptors } from '../api'

/**
 * A Redux middleware that interprets actions with CALL_API info specified.
 * Performs the call and promises when such actions are dispatched.
 */

interface HandleCallApiError {
    error: any
    next: Dispatch
    actionWith: (newAction: AnyAction) => AnyAction
    failureType: string
}

const handleCallApiError = ({ error, next, actionWith, failureType }: HandleCallApiError): any => {
    if (axios.isCancel(error)) {
        return error
    }

    // handle error
    if (axios.isAxiosError(error) && error.response) {
        next(
            actionWith({
                type: failureType,
                payload: {
                    error: (error.message && error) || new Error('Something bad happened'),
                    errorData: (error.response && camelizeKeys(error.response.data)) || {},
                },
            })
        )
    }

    return error
}

const middlewareApi =
    (store: MiddlewareAPI) =>
    (next: Dispatch) =>
    (action: AnyAction): Promise<Action> | Action => {
        const callApiAction = action[CALL_API]

        if (typeof callApiAction === 'undefined') {
            return next(action)
        }

        let { endpoint } = callApiAction
        const { data, meta, schema, types } = callApiAction
        const { auth } = store.getState()

        // set default base url that come from preload state session
        interceptors({ token: auth.token })

        if (typeof endpoint === 'function') {
            endpoint = endpoint(store.getState())
        }

        if (typeof endpoint !== 'string') {
            throw new Error('Specify a string endpoint URL.')
        }

        if (!Array.isArray(types) || types.length !== 3) {
            throw new Error('Expected an array of three action types.')
        }

        /**
         * function that build a new action, based on action called
         * @param { Object } action
         * @return { Object } new action
         */
        const actionWith = (newAction: AnyAction): AnyAction => {
            const finalAction = Object.assign({}, action, newAction)
            delete finalAction[CALL_API]
            return finalAction
        }

        const [requestType, successType, failureType] = types
        next(actionWith({ type: requestType }))

        return callApi({ endpoint, schema, data, meta })
            .then((response) => {
                next(
                    actionWith({
                        type: successType,
                        payload: response,
                    })
                )
                return response
            })
            .catch((error) => handleCallApiError({ error, next, actionWith, failureType }))
    }

export default middlewareApi
