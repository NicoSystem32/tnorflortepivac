// custom hooks
import { createStateCtx } from '../../../../hooks'
import { Message, OnboardingTour } from '../../../../../../domain/models'

// types definition
export type ManageStateTypes = {
    messages: Message[]
    onboarding: OnboardingTour[]
}

const [ctx, Provider] = createStateCtx<ManageStateTypes>({
    messages: [],
    onboarding: [],
})
export const ManageContext = ctx
export const ManageProvider = Provider
