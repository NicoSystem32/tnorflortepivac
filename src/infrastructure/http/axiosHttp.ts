import axios from 'axios'
import SaveLog from '../UI/libraries/saveLog'

export const Axios = axios.create({
    headers: { 'Content-Type': 'application/json' },
    baseURL: process.env.REACT_APP_API_URL,
})

const get = async <T>(endpoint: string) => {
    try {
        const { data } = await Axios.get(endpoint)
        return data as unknown as T
    } catch (error) {
        SaveLog(error)
    }
}

const getSecurity = async <T>(endpoint: string, token: string) => {
    try {
        const AxiosGet = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
                //IpAddressUser: ip.address(),
            },
            baseURL: process.env.REACT_APP_API_URL,
        })
        const { data } = await AxiosGet.get(endpoint)
        return data as unknown as T
    } catch (error) {
        SaveLog(error)
    }
}

const post = async <T>(endpoint: string, body: any) => {
    const data = await Axios.post(endpoint, body)
        .then((res) => {
            return res as unknown as T
        })
        .catch((error) => {
            if (error.response) {
                return error.response.data as unknown as T
            } else if (error.request) {
                console.log('console desde el CATCH request')
            } else if (error.message) {
                console.log('console desde el CATCH message')
            }
        })
    return data as unknown as T
}

const postSecurity = async <T>(endpoint: string, token: string, body: any) => {
    const AxiosSecurity = axios.create({
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        baseURL: process.env.REACT_APP_API_URL,
    })
    const data = await AxiosSecurity.post(endpoint, body)
        .then((res) => {
            return res as unknown as T
        })
        .catch((error) => {
            if (error.response) {
                return error.response.data as unknown as T
            } else if (error.request) {
                console.log('console desde el CATCH request')
            } else if (error.message) {
                console.log('console desde el CATCH message')
            }
        })
    return data as unknown as T
}

const postSecurityLigth = async <T>(endpoint: string, token: string) => {
    const AxiosSecLight = axios.create({
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        baseURL: process.env.REACT_APP_API_URL,
    })
    const data = await AxiosSecLight.post(endpoint, '')
        .then((res) => {
            return res as unknown as T
        })
        .catch((error) => {
            if (error.response) {
                return error.response.data as unknown as T
            } else if (error.request) {
                console.log('console desde el CATCH request')
            } else if (error.message) {
                console.log('console desde el CATCH message')
            }
        })
    return data as unknown as T
}
const postLight = async <T>(endpoint: string) => {
    const data = await Axios.post(endpoint, '')
        .then((res) => {
            return res as unknown as T
        })
        .catch((error) => {
            if (error.response) {
                return error.response.data as unknown as T
            } else if (error.request) {
                console.log('console desde el CATCH request')
            } else if (error.message) {
                console.log('console desde el CATCH message')
            }
        })
    return data as unknown as T
}

const putSecurity = async <T>(endpoint: string, token: string, body: any) => {
    const AxiosPut = axios.create({
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        baseURL: process.env.REACT_APP_API_URL,
    })
    const data = await AxiosPut.put(endpoint, body)
        .then((res) => {
            return res as unknown as T
        })
        .catch((error) => {
            if (error.response) {
                return error.response.data as unknown as T
            } else if (error.request) {
                console.log('console desde el CATCH request')
            } else if (error.message) {
                console.log('console desde el CATCH message')
            }
        })
    return data as unknown as T
}

const deleteSecurity = async <T>(endpoint: string, token: string) => {
    const AxiosDelete = axios.create({
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        baseURL: process.env.REACT_APP_API_URL,
    })
    const data = await AxiosDelete.delete(endpoint)
        .then((res) => {
            return res as unknown as T
        })
        .catch((error) => {
            if (error.response) {
                return error.response.data as unknown as T
            } else if (error.request) {
                console.log('console desde el CATCH request')
            } else if (error.message) {
                console.log('console desde el CATCH message')
            }
        })
    return data as unknown as T
}

export const http = {
    get,
    post,
    getSecurity,
    postSecurity,
    postSecurityLigth,
    postLight,
    putSecurity,
    deleteSecurity,
}
