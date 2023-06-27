// TDC model
import {
    CreditCardFeesState,
    CreditCardFeesActionShape,
    GetAllBuyWalletStateShape,
    GetAllBuyWalletState,
    DeleteBuyWalletByIdState,
    DeleteBuyWalletByIdShape,
    CreateBuyWalletState,
    CreateBuyWalletShape,
    GetQuotesFeesSavedState,
    GetQuotesFeesSavedShape,
    PortfolioPurchaseProcessState,
    PortfolioPurchaseProcessActionShape,
} from '../../../domain/models'
import {
    GET_ALL_BUY_WALLET,
    GET_CREDIT_CARD_FEES,
    DELETE_BUY_WALLET_BY_ID,
    CREATE_BUY_WALLET,
    GET_QUOTE_FEES_SAVED,
    GET_PORTFOLIO_PURCHASE,
} from './portfolioPurchaseTC.types'

const initialCreditCardFeesState: CreditCardFeesState = {
    response: null,
    message: null,
    isSuccess: false,
    data: [],
    loading: false,
    error: {},
}

export const getCreditCardFeesReducer = (
    state = initialCreditCardFeesState,
    action: CreditCardFeesActionShape
): CreditCardFeesState => {
    switch (action.type) {
        case GET_CREDIT_CARD_FEES.REQUEST:
            return { ...state, loading: true, error: {} }
        case GET_CREDIT_CARD_FEES.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                data: action.payload.data,
                loading: false,
                error: {},
            }
        case GET_CREDIT_CARD_FEES.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialGetAllBuyWalletState: GetAllBuyWalletState = {
    response: null,
    message: null,
    isSuccess: false,
    data: [],
    loading: false,
    error: {},
}

export const getAllBuyWalletReducer = (
    state = initialGetAllBuyWalletState,
    action: GetAllBuyWalletStateShape
): GetAllBuyWalletState => {
    switch (action.type) {
        case GET_ALL_BUY_WALLET.REQUEST:
            return { ...state, loading: true, error: {} }
        case GET_ALL_BUY_WALLET.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                data: action.payload.data,
                loading: false,
                error: {},
            }
        case GET_ALL_BUY_WALLET.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialDeleteBuyWalletByIdState: DeleteBuyWalletByIdState = {
    response: null,
    message: null,
    isSuccess: false,
    data: null,
    loading: false,
    error: {},
}

export const deleteBuyWalletByIdReducer = (
    state = initialDeleteBuyWalletByIdState,
    action: DeleteBuyWalletByIdShape
): DeleteBuyWalletByIdState => {
    switch (action.type) {
        case DELETE_BUY_WALLET_BY_ID.REQUEST:
            return { ...state, loading: true, error: {} }
        case DELETE_BUY_WALLET_BY_ID.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                data: action.payload.data,
                loading: false,
                error: {},
            }
        case DELETE_BUY_WALLET_BY_ID.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialCreateBuyWalletState: CreateBuyWalletState = {
    isSuccess: false,
    response: null,
    message: null,
    data: null,
    loading: false,
    error: {},
}

export const createBuyWalletStateReducer = (
    state = initialCreateBuyWalletState,
    action: CreateBuyWalletShape
): CreateBuyWalletState => {
    switch (action.type) {
        case CREATE_BUY_WALLET.REQUEST:
            return { ...state, loading: true, error: {} }
        case CREATE_BUY_WALLET.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                data: action.payload.data,
                loading: false,
                error: {},
            }
        case CREATE_BUY_WALLET.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialGetQuotesFeesSavedState: GetQuotesFeesSavedState = {
    isSuccess: false,
    response: null,
    message: null,
    data: null,
    loading: false,
    error: {},
}

export const getQuotesFeesSavedReducer = (
    state = initialGetQuotesFeesSavedState,
    action: GetQuotesFeesSavedShape
): GetQuotesFeesSavedState => {
    switch (action.type) {
        case GET_QUOTE_FEES_SAVED.REQUEST:
            return { ...state, loading: true, error: {} }
        case GET_QUOTE_FEES_SAVED.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                data: action.payload.data,
                loading: false,
                error: {},
            }
        case GET_QUOTE_FEES_SAVED.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialPortfolioPurchaseProcessState: PortfolioPurchaseProcessState = {
    response: '',
    message: '',
    isSuccess: false,
    data: [],
    loading: false,
    error: {},
}

export const portfolioPurchaseProcessReducer = (
    state = initialPortfolioPurchaseProcessState,
    action: PortfolioPurchaseProcessActionShape
): PortfolioPurchaseProcessState => {
    switch (action.type) {
        case GET_PORTFOLIO_PURCHASE.REQUEST:
            return { ...state, loading: true, error: {} }
        case GET_PORTFOLIO_PURCHASE.SUCCESS:
            return {
                ...state,
                response: action.payload.response,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                data: action.payload.data,
                loading: false,
                error: {},
            }
        case GET_PORTFOLIO_PURCHASE.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
