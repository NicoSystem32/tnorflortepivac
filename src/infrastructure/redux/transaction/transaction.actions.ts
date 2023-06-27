// services
import { transactionServices } from '../../../domain/services'

// models & interfaces
import { AppDispatch } from '../store/store'

// action types
import { GET_TRANSACTION, CREATE_TRANSACTION, SEND_ATTACHMENT_TRANSACTION } from '.'
import {
    CreateTransactionActionShape,
    PaymentTransaction,
    TransactionFAIResponse,
} from '../../../domain/models'

export const getTransactionAction = (id: string) => (dispatch: AppDispatch) => {
    dispatch(
        transactionServices.getTransaction(
            [GET_TRANSACTION.REQUEST, GET_TRANSACTION.SUCCESS, GET_TRANSACTION.FAILURE],
            id
        )()
    )
}

export const createTransaction =
    (
        data: PaymentTransaction,
        onSuccess?: (res: TransactionFAIResponse & { data: string }) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        const saveData = transactionServices.createTransaction([
            CREATE_TRANSACTION.REQUEST,
            CREATE_TRANSACTION.SUCCESS,
            CREATE_TRANSACTION.FAILURE,
        ])

        try {
            const resp = (await dispatch(saveData(data))) as TransactionFAIResponse

            // only for payment FAI
            if (
                /20\d/.test(resp.response) &&
                (data.paymentMethod === 1 || data.paymentMethod === 4)
            ) {
                dispatch<CreateTransactionActionShape>({
                    type: CREATE_TRANSACTION.FILL,
                    payload: resp,
                })
            }

            if (onSuccess) {
                onSuccess(resp as TransactionFAIResponse & { data: string })
            }
            return resp
        } catch (error) {
            if (onError) {
                onError(error)
            }
            return Promise.reject(error)
        }
    }

export const sendAttachmentPayment =
    (data: { Attachment: string | undefined; AttachmentName: string }) =>
    (dispatch: AppDispatch) => {
        dispatch(
            transactionServices.sendAttachmentPayment([
                SEND_ATTACHMENT_TRANSACTION.REQUEST,
                SEND_ATTACHMENT_TRANSACTION.SUCCESS,
                SEND_ATTACHMENT_TRANSACTION.FAILURE,
            ])(data)
        )
    }

export const cleanCreateTransactionAction = (): { type: string } => ({
    type: CREATE_TRANSACTION.CLEAN,
})
