import { RequestStates } from '../../../infrastructure/http/typings/api'
import { onboardingRepository } from '../../../infrastructure/repositories'

export const onboardingServices = {
    getOnboarding: (types: RequestStates) => onboardingRepository.getOnboarding(types),
    saveOnboardingTour: (types: RequestStates) => onboardingRepository.saveOnboardingTour(types),
}
