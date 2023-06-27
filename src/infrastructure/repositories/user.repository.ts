import React, { useEffect } from 'react'
import { http } from '../http/axiosHttp'
import { APIResponse } from '../../domain/models/User'

const useGetUser = (endpoint: string) => {
    const [data, setData] = React.useState(<APIResponse | undefined>{})
    const [loading, setLoading] = React.useState(false)

    const getUsers = async (url: string): Promise<APIResponse | undefined> => {
        return http.get(url)
    }

    useEffect(() => {
        setLoading(true)

        getUsers(endpoint).then((info) => {
            setData(info)
            setLoading(false)
        })
    }, [])

    return {
        data,
        loading,
    }
}

const getCode = async (endpoint: string) => {
    return http
        .postLight(endpoint)
        .then((res) => {
            return res
        })
        .catch((error) => {
            return error
        })
}

const useGetSecurity = (endpoint: string, token: string) => {
    return http
        .getSecurity(endpoint, token)
        .then((res) => {
            return res
        })
        .catch((error) => {
            return error
        })
}

const getTransaction = (endpoint: string, token: string, body: any) => {
    return http
        .postSecurity(endpoint, token, body)
        .then((res) => {
            return res
        })
        .catch((error) => {
            return error
        })
}

const usePost = (endpoint: string, body: any) => {
    return http
        .post(endpoint, body)
        .then((res) => {
            return res
        })
        .catch((error) => {
            return error
        })
}

const usePostSecurity = (endpoint: string, token: string) => {
    return http
        .postSecurityLigth(endpoint, token)
        .then((res) => {
            return res
        })
        .catch((error) => {
            return error
        })
}

const putTransaction = (endpoint: string, token: string, body: any) => {
    return http
        .putSecurity(endpoint, token, body)
        .then((res) => {
            return res
        })
        .catch((error) => {
            return error
        })
}

const deleteTransaction = (endpoint: string, token: string) => {
    return http
        .deleteSecurity(endpoint, token)
        .then((res) => {
            return res
        })
        .catch((error) => {
            return error
        })
}

export const userRepository = {
    useGetUser,
    useGetSecurity,
    getTransaction,
    usePost,
    usePostSecurity,
    getCode,
    putTransaction,
    deleteTransaction,
}
