import { userRepository } from '../../infrastructure/repositories/user.repository'

export const userService = {
    getUsers: (endpoint: string) => {
        return userRepository.useGetUser(endpoint)
    },
}

export const authenticationService = {
    getLogin: (endpoint: string, body: any) => {
        return userRepository.usePost(endpoint, body).then()
    },
    getRefresh: (endpoint: string, token: string, body: any) => {
        return userRepository.getTransaction(endpoint, token, body).then()
    },
    getCode: (endpoint: string) => {
        return userRepository.getCode(endpoint).then()
    },
}
export const paymentService = {
    getHomePay: (endpoint: string, token: string) => {
        return userRepository.useGetSecurity(endpoint, token)
    },
}
export const transactionService = {
    getTransaction: (endpoint: string, token: string, body: any) => {
        return userRepository.getTransaction(endpoint, token, body)
    },
    getStatus: (endpoint: string, token: string) => {
        return userRepository.useGetSecurity(endpoint, token)
    },
    postTransaction: (endpoint: string, token: string) => {
        return userRepository.usePostSecurity(endpoint, token)
    },
    postInfoTransaction: (endpoint: string, token: string, body: any) => {
        return userRepository.getTransaction(endpoint, token, body)
    },
    postTransactionPublic: (endpoint: string, body: any) => {
        return userRepository.usePost(endpoint, body)
    },
    putTransaction: (endpoint: string, token: string, body: any) => {
        return userRepository.putTransaction(endpoint, token, body)
    },
    deleteTransaction: (endpoint: string, token: string) => {
        return userRepository.deleteTransaction(endpoint, token)
    },
}
