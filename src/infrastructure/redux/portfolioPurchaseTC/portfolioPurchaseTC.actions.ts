// services
import { tcServices } from '../../../domain/services'

// action types
import {
    GET_ALL_BUY_WALLET,
    GET_CREDIT_CARD_FEES,
    DELETE_BUY_WALLET_BY_ID,
    CREATE_BUY_WALLET,
    UPDATE_BUY_WALLET,
    SAVE_QUOTES_FEES,
    GET_QUOTE_FEES_SAVED,
    NOTIFY_COMPLETION,
    GET_PURCHASE_EXTRACT_FILE,
    GET_PORTFOLIO_PURCHASE,
    GET_CLEAN_PORTFOLIO_PURCHASE,
} from './portfolioPurchaseTC.types'

// models
import { AppDispatch } from '../store/store'
import { DeleteBuyWalletByIdState } from '../../../domain/models'

/* async actions */

export const getCreditCardFeesAction = () => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.getCreditCardFees([
            GET_CREDIT_CARD_FEES.REQUEST,
            GET_CREDIT_CARD_FEES.SUCCESS,
            GET_CREDIT_CARD_FEES.FAILURE,
        ])()
    )
}

export const getAllBuyWalletAction = () => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.getAllBuyWallet([
            GET_ALL_BUY_WALLET.REQUEST,
            GET_ALL_BUY_WALLET.SUCCESS,
            GET_ALL_BUY_WALLET.FAILURE,
        ])()
    )
}

export const deleteBuyWalletByIdAction = (id: string | number) => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.deleteBuyWalletById(
            [
                DELETE_BUY_WALLET_BY_ID.REQUEST,
                DELETE_BUY_WALLET_BY_ID.SUCCESS,
                DELETE_BUY_WALLET_BY_ID.FAILURE,
            ],
            id
        )()
    )
}

export const saveQuotesFeesAction =
    (
        installmentId: string | number,
        onSuccess?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: {
                installmentId: number
            }
        }) => void,
        onError?: () => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.saveQuoteFees(
                    [SAVE_QUOTES_FEES.REQUEST, SAVE_QUOTES_FEES.SUCCESS, SAVE_QUOTES_FEES.FAILURE],
                    installmentId
                )()
            )

            if (onSuccess)
                onSuccess(
                    resp as {
                        isSuccess: boolean
                        message: string | null
                        response: string | null
                        data: {
                            installmentId: number
                        }
                    }
                )
        } catch (error) {
            if (onError) onError()
        }
    }

export const getQuotesFeesSavedAction = () => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.getQuoteFeesSave([
            GET_QUOTE_FEES_SAVED.REQUEST,
            GET_QUOTE_FEES_SAVED.SUCCESS,
            GET_QUOTE_FEES_SAVED.FAILURE,
        ])()
    )
}

export const getCleanPortfolioPurchaseAction = () => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.getCleanPortfolioPurchase([
            GET_CLEAN_PORTFOLIO_PURCHASE.REQUEST,
            GET_CLEAN_PORTFOLIO_PURCHASE.SUCCESS,
            GET_CLEAN_PORTFOLIO_PURCHASE.FAILURE,
        ])()
    )
}

export interface CreateBuyWallet {
    CardNumber: string
    PurchaseAmount: number
    BankEntityId: string
    AlternativeBankName: string
    DebtCertificate: string
    CreditCardRequestId: 'string'
}

export const createBuyWalletAction =
    (
        data: CreateBuyWallet,
        onSuccess?: (res: DeleteBuyWalletByIdState) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.createBuyWallet([
                    CREATE_BUY_WALLET.REQUEST,
                    CREATE_BUY_WALLET.SUCCESS,
                    CREATE_BUY_WALLET.FAILURE,
                ])(data)
            )

            if (onSuccess) onSuccess(resp as DeleteBuyWalletByIdState)
        } catch (error) {
            if (onError) onError(error)
        }
    }

export interface UpdateBuyWallet extends CreateBuyWallet {
    Id: number
    DebtCertificateUrl: string
}

export const updateWalletAction =
    (
        data: UpdateBuyWallet,
        onSuccess?: (res: DeleteBuyWalletByIdState) => void,
        onError?: (e: unknown) => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.updateBuyWallet([
                    UPDATE_BUY_WALLET.REQUEST,
                    UPDATE_BUY_WALLET.SUCCESS,
                    UPDATE_BUY_WALLET.FAILURE,
                ])(data)
            )
            if (onSuccess) onSuccess(resp as DeleteBuyWalletByIdState)
        } catch (error) {
            if (onError) onError(error)
        }
    }

export const notifyCompletionAction = () => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.notifyCompletion([
            NOTIFY_COMPLETION.REQUEST,
            NOTIFY_COMPLETION.SUCCESS,
            NOTIFY_COMPLETION.FAILURE,
        ])()
    )
}

export const getPurchaseExtractFileAction =
    (
        filename: string,
        container: string,
        onSuccess?: (resp: string) => void,
        onError?: () => void
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            const resp = await dispatch(
                tcServices.getPurchaseExtractFile(
                    [
                        GET_PURCHASE_EXTRACT_FILE.REQUEST,
                        GET_PURCHASE_EXTRACT_FILE.SUCCESS,
                        GET_PURCHASE_EXTRACT_FILE.FAILURE,
                    ],
                    filename,
                    container
                )()
            )

            if (onSuccess) {
                onSuccess(resp as string)
            }

            return resp
        } catch (error) {
            if (onError) {
                onError()
            }
        }
    }

export const portfolioPurchaseAction = () => (dispatch: AppDispatch) => {
    dispatch(
        tcServices.getPortfolioPurchase([
            GET_PORTFOLIO_PURCHASE.REQUEST,
            GET_PORTFOLIO_PURCHASE.SUCCESS,
            GET_PORTFOLIO_PURCHASE.FAILURE,
        ])()
    )
}
