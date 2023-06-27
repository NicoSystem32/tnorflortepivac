import { RequestStates } from '../../../infrastructure/http/typings/api'
import { transactionRepository } from '../../../infrastructure/repositories'

export const transactionServices = {
    getTransaction: (types: RequestStates, id: string) =>
        transactionRepository.getTransaction(types, id),
    getStatusTransactionsByUser: (types: RequestStates) =>
        transactionRepository.getStatusTransactionsByUser(types),
    createTransaction: (types: RequestStates) => transactionRepository.createTransaction(types),
    sendTransaction: (types: RequestStates) => transactionRepository.sendTransaction(types),
    sendAttachmentPayment: (types: RequestStates) =>
        transactionRepository.sendAttachmentPayment(types),
}
