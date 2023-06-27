/* eslint-disable @typescript-eslint/explicit-function-return-type */
import createSelector from '../createSelector'
import type { StoreApp } from '../../redux/store/store.interface'

export const settingTDCSelector = createSelector(
    (state: StoreApp) => state.settingTDCReducer,
    (TDCsetting) => TDCsetting
)

export const parametersTDCSelector = createSelector(
    (state: StoreApp) => state.simulateTDCReducer,
    ({ parameters }) => parameters
)

export const parametersAndTermsSelector = createSelector(
    (state: StoreApp) => state.settingTDCReducer,
    ({ parametersList }) => {
        const terms: number[] = []
        parametersList.forEach((params) => {
            if (!terms.includes(params.term)) {
                terms.push(params.term)
            }
        })

        return {
            termsOrdered: [...terms].sort((a, b) => a - b),
            parametersListOrdered: parametersList.sort((a, b) => a.modalityDays - b.modalityDays),
        }
    }
)

export const sendCodeOTPSelector = createSelector(
    (state: StoreApp) => state.sendCodeOtpReducer,
    ({ loading, error, sendCodeOtp }) => ({ loading, error, sendCodeOtp })
)

export const validateIVRSelector = createSelector(
    (state: StoreApp) => state.validateIVRReducer,
    ({ loading, error, validateIVR }) => ({ loading, error, validateIVR })
)

export const validateOTPSelector = createSelector(
    (state: StoreApp) => state.validateOtpReducer,
    ({ loading, error, validateOtp }) => ({ loading, error, validateOtp })
)
