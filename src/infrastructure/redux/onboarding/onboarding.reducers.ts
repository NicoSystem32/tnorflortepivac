import { Reducer } from 'redux'
import { ONBOARDING_GET, ONBOARDING_TOUR_POST } from './onboarding.types'

import type { OnboardingState, OnboardingActionShape } from '../../../domain/models'
import type { ErrorResponse } from '../../http/typings/api'

const initialState: OnboardingState = {
    onboarding: [
        {
            tour: 'overview',
            state: false,
        },
        {
            tour: 'savings',
            state: false,
        },
        {
            tour: 'credits',
            state: false,
        },
        {
            tour: 'multipayment',
            state: false,
        },
        {
            tour: 'productsOpening',
            state: false,
        },
    ],
    loading: true,
    error: {},
}

const buildErrorState = (state: OnboardingState, error: ErrorResponse): OnboardingState => ({
    ...state,
    loading: false,
    error: error,
})

export const onboardingReducer: Reducer<OnboardingState, OnboardingActionShape> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        /* get onboarding */
        case ONBOARDING_GET.REQUEST:
            return { ...state, loading: true, error: {} }
        case ONBOARDING_GET.SUCCESS:
            return {
                ...state,
                onboarding: state.onboarding.map(
                    (t) => action.payload.data.find((d) => d.tour === t.tour) ?? t
                ),
                loading: false,
                error: {},
            }
        case ONBOARDING_GET.FAILURE:
            return buildErrorState(state, action.payload)
        /* save onboarding tour */
        case ONBOARDING_TOUR_POST.REQUEST:
            return { ...state, loading: true, error: {} }
        case ONBOARDING_TOUR_POST.SUCCESS:
            return {
                ...state,
                error: {},
            }
        case ONBOARDING_TOUR_POST.FAILURE:
            return buildErrorState(state, action.payload)
        case ONBOARDING_TOUR_POST.FILL:
            return {
                ...state,
                loading: false,
                onboarding: state.onboarding.map((t) =>
                    t.tour === action.payload.data.tour ? action.payload.data : t
                ),
            }
        default:
            return state
    }
}
