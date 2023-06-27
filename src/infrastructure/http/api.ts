/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosRequestConfig } from 'axios'
import { ApiCallProps } from './typings/api'
import { camelizeKeys } from 'humps'
/**
 *  Environment variables
 */

const CALL_API = 'CALL_API'
const API_ROOT = process.env.REACT_APP_API_URL
const X_API_KEY = process.env.API_KEY || ''

/**
 *  Create Axios instance
 */

const AxiosInstance = axios.create({
    baseURL: `${API_ROOT}/api`,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': X_API_KEY,
    },
})

let requestInterceptor: number

/**
 * Create a source cancel token from axios and export it
 */

const CancelToken = axios.CancelToken
const source = CancelToken.source()
const sourceCancel = source.cancel

const callApi = ({ endpoint: fullUrl, data, meta }: ApiCallProps): Promise<{}> => {
    const setConfig: AxiosRequestConfig = {
        cancelToken: (meta && meta?.cancelToken) || source.token,
        method: (meta && meta?.method) || 'get',
        responseType: (meta && meta?.responseType) || 'json',
    }

    if (setConfig.method) {
        if (/^(PUT|POST|PATCH)$/i.test(setConfig.method)) {
            setConfig['data'] = data
        } else {
            setConfig['params'] = data
        }
    }

    AxiosInstance.defaults.headers.post['Content-Type'] =
        'application/x-www-form-urlencoded; charset=UTF-8'

    return AxiosInstance(fullUrl, setConfig)
}

AxiosInstance.interceptors.response.use(
    ({ data: dataResp, ...res }) => {
        if (res.config.responseType !== 'json') {
            return dataResp
        }
        return camelizeKeys(dataResp)
    },
    (error) => {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem('cavApp/v1')
                window.location.reload()
            }
        }
        return Promise.reject(error)
    }
)

const interceptors = ({ token }: { token: string | null }): void => {
    if (typeof requestInterceptor !== 'undefined') {
        AxiosInstance.interceptors.request.eject(requestInterceptor)
    }
    requestInterceptor = AxiosInstance.interceptors.request.use(
        (config) => {
            if (token && config.headers) {
                config.headers.authorization = `Bearer ${token}`
            }

            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

export {
    interceptors,
    AxiosInstance,
    callApi,
    CALL_API,
    API_ROOT,
    X_API_KEY,
    CancelToken,
    sourceCancel,
}
