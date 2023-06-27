import { InitialStateGeneric, ErrorResponse } from '../../../infrastructure/http/typings/api'
import { actionTypes } from '../../../infrastructure/redux/onboarding'

const { ONBOARDING_GET, ONBOARDING_TOUR_POST } = actionTypes

/**
 * reducer typings definition
 */
export interface OnboardingState extends InitialStateGeneric {
    onboarding: OnboardingTour[]
}

export interface OnboardingTour {
    tour: 'overview' | 'savings' | 'credits' | 'multipayment' | 'productsOpening'
    state: boolean
}

/* action shape */
export type OnboardingActionShape =
    | {
          type: typeof ONBOARDING_GET.REQUEST
      }
    | {
          type: typeof ONBOARDING_GET.SUCCESS
          payload: {
              isSuccess: boolean
              message: string | null
              data: OnboardingTour[]
          }
      }
    | {
          type: typeof ONBOARDING_GET.FAILURE
          payload: ErrorResponse
      }
    | {
          type: typeof ONBOARDING_TOUR_POST.REQUEST
      }
    | {
          type: typeof ONBOARDING_TOUR_POST.SUCCESS
          payload: {
              isSuccess: boolean
              message: string | null
              data: boolean
          }
      }
    | {
          type: typeof ONBOARDING_TOUR_POST.FAILURE
          payload: ErrorResponse
      }
    | {
          type: typeof ONBOARDING_TOUR_POST.FILL
          payload: { data: OnboardingTour }
      }
