import { RequestStates } from '../../http/typings/api'
import { fetchCreator, storeCreator } from '../../http/creators'

const path = '/Onboarding'

export const onboardingRepository = {
    getOnboarding: (types: RequestStates) => fetchCreator(types, `${path}/GetOnboardingState`),
    saveOnboardingTour: (types: RequestStates) =>
        storeCreator(types, `${path}/SaveOnboardingState`),
}
