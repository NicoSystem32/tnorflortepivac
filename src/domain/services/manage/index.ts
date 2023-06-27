import { RequestStates } from '../../../infrastructure/http/typings/api'
import { manageRepository } from '../../../infrastructure/repositories'

export const manageServices = {
    getMessages: (types: RequestStates) => manageRepository.getMessages(types),
}
