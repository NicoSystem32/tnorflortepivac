/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'
import moment from 'moment'

// redux resources
import { logout as logoutAction, login } from '../../redux/actions/loginActions'
import { authenticationService } from '../../../domain/services/User.service'

// helpers
import { parseStringToBoolean } from '../utils/misc'

// types definitions
export type InfoUserType = {
    name: string
    gender: string
    lastEntry: string
    paymentPSE: boolean
}

export type TokenDurationType = {
    duration: number
    dateToCall: string
    decoded: unknown
    tokenHash: {
        nbf: number
        exp: number
        document: string | number
    } & InfoUserType
}

let tokenNew = ''

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAuth = () => {
    const dispatch = useDispatch()

    // initial states
    const { auth } = useSelector((stateRef: any) => stateRef)

    const buildTokenDuration = (tokenSetter: string): TokenDurationType => {
        const decoded = jwt_decode(tokenSetter)
        const tokenHash = JSON.parse(JSON.stringify(decoded))

        let timestampNFB = tokenHash.nbf.toString()
        if (timestampNFB.length < 13) timestampNFB += '000'

        let timestampEXP = tokenHash.exp.toString()
        if (timestampEXP.length < 13) timestampEXP += '000'

        const m1 = moment(parseInt(timestampNFB))
        const m2 = moment(parseInt(timestampEXP))

        const duration = m1.diff(m2)
        const dateToCall = moment().format('YYYY-MM-DD HH:mm:ss')

        return {
            duration,
            dateToCall,
            decoded,
            tokenHash,
        }
    }

    const callToRefreshToken = (
        onSuccess?: () => void,
        onError?: (e?: any) => void
    ): Promise<any> => {
        const body = {
            Token: tokenNew || auth.token,
            Refresh: auth.refreshToken,
            Code: '0',
        }
        const token = tokenNew || auth.token

        return authenticationService
            .getRefresh('/api/Authorization/RefreshAuthentication', token, body)
            .then((response: any) => {
                if (response.status === 200) {
                    tokenNew = response.data.Data.Token
                    const { duration, dateToCall } = buildTokenDuration(tokenNew)

                    dispatch(
                        login({
                            token: response.data.Data.Token,
                            refreshToken: response.data.Data.Refresh,
                            name: auth.name,
                            gender: auth.gender,
                            lastconection: auth.lastconection,
                            isLoggin: true,
                            duration: duration,
                            dateToCall: dateToCall,
                            multisesion: auth.multisesion,
                            paymentPSE: auth.paymentPSE,
                        })
                    )
                    if (typeof onSuccess === 'function') onSuccess()
                } else {
                    if (typeof onError === 'function') onError()
                }

                return response
            })
            .catch(function (err) {
                if (typeof onError === 'function') onError(err)
                console.log(err) // "oh, no!"
                return err
            })
    }

    const setInfoUser = (tokenSetter: string, refreshToken: string): InfoUserType => {
        const infoUser: InfoUserType = {
            name: '',
            gender: '',
            lastEntry: '',
            paymentPSE: true,
        }

        const { tokenHash, duration, dateToCall } = buildTokenDuration(tokenSetter)

        infoUser.gender = tokenHash.gender
        const nameComplete = tokenHash.name.split(' ')
        infoUser.name = nameComplete[0].charAt(0).toUpperCase() + nameComplete[0].slice(1)
        infoUser.lastEntry = tokenHash.lastEntry
        infoUser.paymentPSE = parseStringToBoolean(
            ((!!tokenHash.paymentPSE).toString() as 'false' | 'true') ?? 'true'
        )
        let multisesion = tokenHash.document
        multisesion = multisesion.toString()
        const isLogin = true

        dispatch(
            login({
                token: tokenSetter,
                refreshToken: refreshToken,
                name: infoUser.name,
                gender: infoUser.gender,
                lastconection: infoUser.lastEntry,
                isLoggin: isLogin,
                duration: duration,
                dateToCall: dateToCall,
                multisesion: multisesion,
                paymentPSE: infoUser.paymentPSE,
            })
        )

        return infoUser
    }

    const checkExpirationToken = useCallback(
        (onRefreshFail?: () => void): void => {
            const duration = auth.duration + 60000
            const dateToCall = auth.dateToCall
            const m1 = moment(dateToCall)
            const m2 = moment()
            const diffMilliseconds = m1.diff(m2)

            if (diffMilliseconds < duration) {
                callToRefreshToken().then((response) => {
                    if (response.status !== 200) {
                        if (typeof onRefreshFail === 'function') onRefreshFail()
                    }
                })
            }
        },
        [auth.dateToCall, auth.duration]
    )

    const logout = useCallback(
        (onLogout?: () => void): Promise<any> => {
            const tokenSave = auth.token
            return authenticationService
                .getLogin('/api/Authorization/LogOut', tokenSave)
                .then((response) => {
                    if (response) {
                        dispatch(logoutAction())
                        if (typeof onLogout === 'function') onLogout()
                    }

                    return response
                })
        },
        [auth.token]
    )

    return {
        setInfoUser,
        callToRefreshToken,
        checkExpirationToken,
        buildTokenDuration,
        logout,
    }
}

export default useAuth
