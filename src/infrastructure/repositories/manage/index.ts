import { RequestStates } from '../../http/typings/api'
import { fetchCreator } from '../../http/creators'

const path = '/ManagedContent'

export const manageRepository = {
    getMessages: (types: RequestStates) => fetchCreator(types, `${path}/GetStaticMesagges`),
}
