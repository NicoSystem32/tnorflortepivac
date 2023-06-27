/* eslint-disable @typescript-eslint/explicit-function-return-type */
import createSelector from '../createSelector'
import type { StoreApp } from '../../redux/store/store.interface'
import { Transaction } from '../../../domain/models'

export const transactionPSESelector = createSelector(
    (state: StoreApp) => state.createTransactionReducer,
    ({ urlPayment, message, transaction, status, loading, error }) => ({
        urlPayment,
        message,
        transaction,
        status,
        isLoading: loading,
        error,
    })
)

export const getTransactionPSESelector = createSelector(
    (state: StoreApp) => state.getTransactionReducer,
    ({ message, transaction, status, loading, error }) => ({
        message,
        transaction,
        status,
        isLoading: loading,
        error,
    })
)

export const getTransactionMultiSelector = createSelector(
    (state: StoreApp) => state.getTransactionReducer,
    ({ message, transaction, status, loading, error }) => {
        const isMultipayment = transaction?.paymentMethod === 0
        const payPSE = transaction
            ? transaction.pyments.find((item) => item.paymentMethodTdc === 'PSE')
            : null
        const payFai = transaction
            ? transaction.pyments.find((item) => item.paymentMethodTdc === 'FAI')
            : null
        const returnTransaction: Transaction | null = transaction
            ? {
                  ...transaction,
                  pyments: [
                      transaction.pyments.reduce(
                          (acum, current) => ({
                              ...current,
                              value: current.value + acum.value,
                          }),
                          { ...transaction.pyments[0], value: 0 }
                      ),
                  ],
              }
            : null

        return {
            message,
            transaction: returnTransaction,
            status,
            isLoading: loading,
            error,
            isMultipayment,
            payFai,
            payPSE,
        }
    }
)

export const transactionFAISelector = createSelector(
    (state: StoreApp) => state.createTransactionReducer,
    ({ loading, error, status, message, transaction }) => ({
        isLoading: loading,
        transaction,
        status,
        message,
        error,
    })
)

export const transactionErrorSelector = createSelector(
    (state: StoreApp) => state.createTransactionReducer.error,
    (error) => error
)

export const createTransactionSelector = createSelector(
    (state: StoreApp) => state.createTransactionReducer,
    ({ loading, urlPayment, error }) => ({ loadingTransaction: loading, urlPayment, error })
)

export const sendAttachmentPaymentSelector = createSelector(
    (state: StoreApp) => state.sendAttachmentPaymentReducer,
    ({ message, status, loading, error }) => ({
        message,
        status,
        isLoading: loading,
        error,
    })
)
