// TDC model
import {
    TDCSettingState,
    TDCSettingActionShape,
    TDCSimulateState,
    TDCSimulateActionShape,
} from '../../../domain/models'
import { SETTING_TDC, SIMULATE_TDC } from './tdc.types'

const initialSettingTDCState: TDCSettingState = {
    retentionPercentage: 0,
    exponentYear: 360,
    exponentDay: 1,
    parametersList: [],
    loading: false,
    error: {},
}

export const settingTDCReducer = (
    state = initialSettingTDCState,
    action: TDCSettingActionShape
): TDCSettingState => {
    switch (action.type) {
        case SETTING_TDC.REQUEST:
            return { ...state, loading: true, error: {} }
        case SETTING_TDC.SUCCESS:
            return {
                ...state,
                retentionPercentage: action.payload.data.retentionPercentage,
                exponentYear: action.payload.data.exponentYear,
                exponentDay: action.payload.data.exponentDay,
                parametersList: action.payload.data.parametersTdcDto,
                loading: false,
                error: {},
            }
        case SETTING_TDC.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialSimulateTDCState: TDCSimulateState = {
    parameters: null,
    loading: false,
    error: {},
}

export const simulateTDCReducer = (
    state = initialSimulateTDCState,
    action: TDCSimulateActionShape
): TDCSimulateState => {
    switch (action.type) {
        case SIMULATE_TDC.SUCCESS:
            return {
                ...state,
                parameters: action.payload.data,
                loading: false,
                error: {},
            }
        case SIMULATE_TDC.REQUEST:
            return { ...state, loading: true, error: {} }
        case SIMULATE_TDC.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case SIMULATE_TDC.FILL:
            return {
                ...state,
                parameters: action.payload,
            }
        default:
            return state
    }
}
