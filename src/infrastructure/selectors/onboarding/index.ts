import createSelector from '../createSelector'
import type { StoreApp } from '../../redux/store/store.interface'

export const onboardingSelector = createSelector(
    (state: StoreApp) => state.onboardingReducer.onboarding,
    (state: StoreApp) => state.onboardingReducer.loading,
    (onboarding, isLoading) => ({ onboarding, isLoading })
)
