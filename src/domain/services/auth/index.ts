import { RequestStates } from '../../../infrastructure/http/typings/api'
import { authRepository } from '../../../infrastructure/repositories'

export const authServices = {
    login: (types: RequestStates) => authRepository.login(types),
    refreshToken: (types: RequestStates) => authRepository.refreshToken(types),
    userVerify: (types: RequestStates) => authRepository.userVerify(types),
    logout: (types: RequestStates) => authRepository.logout(types),
    validIVR: (types: RequestStates) => authRepository.validIVR(types),
    sendOtp: (types: RequestStates) => authRepository.sendOtp(types),
    validOtp: (types: RequestStates) => authRepository.validOtp(types),
}
