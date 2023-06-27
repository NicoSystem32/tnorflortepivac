import { types } from '../types/loginType'

const initialState = {
    token: null,
    refreshToken: null,
    name: '',
    gender: '',
    lastconection: '',
    isLoggin: false,
    duration: null,
    dateToCall: null,
    multisesion: '',
    paymentPSE: true,
}
export const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                name: action.payload.name,
                gender: action.payload.gender,
                lastconection: action.payload.lastconection,
                isLoggin: true,
                duration: action.payload.duration,
                dateToCall: action.payload.dateToCall,
                multisesion: action.payload.multisesion,
                paymentPSE: action.payload.paymentPSE,
            }
        case types.logout:
            return {
                ...state,
                token: null,
                refreshToken: null,
                name: '',
                gender: '',
                lastconection: '',
                isLoggin: false,
                duration: null,
                dateToCall: null,
                multisesion: '',
                paymentPSE: true,
            }

        default:
            return state
    }
}
