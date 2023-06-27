import { RequestStates } from '../../http/typings/api'
import { fetchCreator, storeCreator } from '../../http/creators'

const path = '/Products'

export const productsRepository = {
    getConsolidated: (types: RequestStates) =>
        fetchCreator(types, `${path}/GetCardsConsolidated/Consolidated`),
    getCardsConsolidated: (types: RequestStates) =>
        fetchCreator(types, `${path}/GetCardsConsolidated/GetCardsConsolidated`),
    getCreditsConsolidated: (types: RequestStates) =>
        fetchCreator(types, `${path}/GetCreditsConsolidated/GetCreditsConsolidated`),
    getCreditsAvailable: (types: RequestStates) =>
        fetchCreator(types, `${path}/GetCreditsAvailable/GetCreditsAvailable`),
    getSavingAvailable: (types: RequestStates) =>
        fetchCreator(types, `${path}/GetSavingsAvailable/GetSavingsAvailable`),
    getDetail: (types: RequestStates) => fetchCreator(types, `${path}/GetDetail/Detail`),
    getFaiAccountBalance: (types: RequestStates) =>
        fetchCreator(types, `${path}/GetFaiAccountBalance/GetFaiAccountBalance`),
    getSettingTdc: (types: RequestStates) =>
        fetchCreator(types, `${path}/GetSettingTdc/GetSettingTdc`),
    sendSimulateTdc: (types: RequestStates) =>
        storeCreator(types, `${path}/SendSimulateTdc/SendSimulateTdc`),
    getMovements: (types: RequestStates) =>
        storeCreator(types, `${path}/GetMovements/GetMovements`),
    getMovementDetail: (types: RequestStates) =>
        fetchCreator(types, `${path}/GetMovementDetail/MovementDetail`),
}
