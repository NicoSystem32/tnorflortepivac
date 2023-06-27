import { RequestStates } from '../../http/typings/api'
import { storeCreator } from '../../http/creators'

const path = '/Authorization'

export const authRepository = {
    login: (types: RequestStates) => storeCreator(types, `${path}/Authentication`),
    userVerify: (types: RequestStates) => storeCreator(types, `${path}/UserVerification`),
    refreshToken: (types: RequestStates) => storeCreator(types, `${path}/RefreshAuthentication`),
    logout: (types: RequestStates) => storeCreator(types, `${path}/LogOut`),
    validIVR: (types: RequestStates) => storeCreator(types, `${path}/ValidIVR`),
    sendOtp: (types: RequestStates) => storeCreator(types, `${path}/SendCodeOtp`),
    validOtp: (types: RequestStates) => storeCreator(types, `${path}/ValidOtp`),
}
