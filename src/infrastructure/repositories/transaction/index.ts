import { RequestStates } from '../../http/typings/api'
import { fetchCreator, storeCreator } from '../../http/creators'

const path = '/Transaction'

export const transactionRepository = {
    getTransaction: (types: RequestStates, id: string) =>
        fetchCreator(types, `${path}/GetTransaction/${id}`),
    getStatusTransactionsByUser: (types: RequestStates) =>
        fetchCreator(types, `${path}/GetStatusTransactionsByUser`),
    createTransaction: (types: RequestStates) => storeCreator(types, `${path}/CreateTransaction`),
    sendTransaction: (types: RequestStates) => storeCreator(types, `${path}/SendTransaction`),
    sendAttachmentPayment: (types: RequestStates) =>
        storeCreator(types, `${path}/SendAttachmentPayment`),
}
