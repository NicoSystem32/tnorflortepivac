import {
    TransactionState,
    TransactionActionShape,
    CreateTransactionState,
    CreateTransactionActionShape,
    SendAttachmentPaymentState,
    SendAttachmentPaymentActionShape,
} from '../../../domain/models'
import {
    CREATE_TRANSACTION,
    GET_TRANSACTION,
    SEND_ATTACHMENT_TRANSACTION,
} from './transaction.types'

const initialTransactionState: TransactionState = {
    transaction: null,
    loading: false,
    status: null,
    message: null,
    error: {},
}

export const getTransactionReducer = (
    state = initialTransactionState,
    action: TransactionActionShape
): TransactionState => {
    switch (action.type) {
        case GET_TRANSACTION.REQUEST:
            return { ...state, loading: true, error: {} }
        case GET_TRANSACTION.SUCCESS:
            return {
                ...state,
                transaction: action.payload.data,
                status: action.payload.response,
                message: action.payload.message,
                loading: false,
                error: {},
            }
        case GET_TRANSACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                transaction: action.payload.errorData.data,
                status: action.payload.errorData.response,
                message: action.payload.errorData.message,
            }
        default:
            return state
    }
}

const initialCreateTransactionState: CreateTransactionState = {
    urlPayment: '',
    status: null,
    message: null,
    loading: false,
    transaction: null,
    error: {},
}

export const createTransactionReducer = (
    state = initialCreateTransactionState,
    action: CreateTransactionActionShape
): CreateTransactionState => {
    switch (action.type) {
        case CREATE_TRANSACTION.REQUEST:
            return { ...state, loading: true, error: {} }
        case CREATE_TRANSACTION.SUCCESS:
            return {
                ...state,
                urlPayment: action.payload.data,
                status: action.payload.response,
                message: action.payload.message,
                loading: false,
                error: {},
            }
        case CREATE_TRANSACTION.FAILURE:
            return {
                ...state,
                status: action.payload.errorData.response,
                message: action.payload.errorData.message,
                loading: false,
                error: action.payload,
            }
        case CREATE_TRANSACTION.FILL:
            return {
                ...state,
                transaction: action.payload.resultFaiPayments,
                status: action.payload.response,
                message: action.payload.message,
            }
        case CREATE_TRANSACTION.CLEAN:
            return {
                ...initialCreateTransactionState,
            }
        default:
            return state
    }
}

const initialSendAttachmentPaymentState: SendAttachmentPaymentState = {
    loading: false,
    status: '',
    message: '',
    error: {},
    data: null,
}

export const sendAttachmentPaymentReducer = (
    state = initialSendAttachmentPaymentState,
    action: SendAttachmentPaymentActionShape
): SendAttachmentPaymentState => {
    switch (action.type) {
        case SEND_ATTACHMENT_TRANSACTION.REQUEST:
            return { ...state, loading: true, error: {} }
        case SEND_ATTACHMENT_TRANSACTION.SUCCESS:
            return {
                ...state,
                status: action.payload.response,
                message: action.payload.message,
                loading: false,
                error: {},
            }
        case SEND_ATTACHMENT_TRANSACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: action.payload.errorData.response,
                message: action.payload.errorData.message,
            }
        default:
            return state
    }
}
