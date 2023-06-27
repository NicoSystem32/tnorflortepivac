import { RequestStates } from '../../../infrastructure/http/typings/api'
import { productsRepository } from '../../../infrastructure/repositories'

export const productsServices = {
    getConsolidated: (types: RequestStates) => productsRepository.getConsolidated(types),
    getCardsConsolidated: (types: RequestStates) => productsRepository.getCardsConsolidated(types),
    getCreditsConsolidated: (types: RequestStates) =>
        productsRepository.getCreditsConsolidated(types),
    getCreditsAvailable: (types: RequestStates) => productsRepository.getCreditsAvailable(types),
    getSavingAvailable: (types: RequestStates) => productsRepository.getSavingAvailable(types),
    getDetail: (types: RequestStates) => productsRepository.getDetail(types),
    getFaiAccountBalance: (types: RequestStates) => productsRepository.getFaiAccountBalance(types),
    getSettingTdc: (types: RequestStates) => productsRepository.getSettingTdc(types),
    sendSimulateTdc: (types: RequestStates) => productsRepository.sendSimulateTdc(types),
    getMovements: (types: RequestStates) => productsRepository.getMovements(types),
    getMovementDetail: (types: RequestStates) => productsRepository.getMovementDetail(types),
}
