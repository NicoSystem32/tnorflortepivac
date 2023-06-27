import { types } from '../types/loginType'

interface LoginProps {
    token: any
    refreshToken: any
    name: any
    gender: any
    lastconection: any
    isLoggin: any
    duration: any
    dateToCall: any
    multisesion: any
    paymentPSE: boolean
}
export const login = ({
    token,
    refreshToken,
    name,
    gender,
    lastconection,
    isLoggin,
    duration,
    dateToCall,
    multisesion,
    paymentPSE,
}: LoginProps) => {
    return {
        type: types.login,
        payload: {
            token,
            refreshToken,
            name,
            gender,
            lastconection,
            isLoggin,
            duration,
            dateToCall,
            multisesion,
            paymentPSE,
        },
    }
}

export const logout = () => {
    return {
        type: types.logout,
    }
}
