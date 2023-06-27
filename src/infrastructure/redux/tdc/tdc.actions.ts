// services
import { SendTDCParameters } from '../../../domain/models'
import { productsServices } from '../../../domain/services'

// action types
import { AppDispatch } from '../store/store'
import { SETTING_TDC, SIMULATE_TDC } from './tdc.types'

/* async actions */
export const getSettingTdcAction = () => (dispatch: AppDispatch) => {
    dispatch(
        productsServices.getSettingTdc([
            SETTING_TDC.REQUEST,
            SETTING_TDC.SUCCESS,
            SETTING_TDC.FAILURE,
        ])()
    )
}

export const sendSimulateTdcAction = (data: SendTDCParameters) => (dispatch: AppDispatch) => {
    dispatch(
        productsServices.sendSimulateTdc([
            SIMULATE_TDC.REQUEST,
            SIMULATE_TDC.SUCCESS,
            SIMULATE_TDC.FAILURE,
        ])(data)
    )
}

/* create actions */
export const fillSimulateTDCAction = (
    data: SendTDCParameters
): {
    type: typeof SIMULATE_TDC.FILL
    payload: SendTDCParameters
} => ({
    type: SIMULATE_TDC.FILL,
    payload: data,
})
