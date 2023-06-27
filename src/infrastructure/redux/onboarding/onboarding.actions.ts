import { Dispatch } from 'redux'
import { OnboardingTour, OnboardingActionShape } from '../../../domain/models'

// services
import { onboardingServices } from '../../../domain/services'

// models & interfaces
import { AppDispatch } from '../store/store'

// action types
import { ONBOARDING_GET, ONBOARDING_TOUR_POST } from './onboarding.types'

// typings onboarding
type OnboardingPostResponse = {
    isSuccess: boolean
    message: string | null
    data: boolean
}

export const getOnboardingAction = () => (dispatch: AppDispatch) => {
    dispatch(
        onboardingServices.getOnboarding([
            ONBOARDING_GET.REQUEST,
            ONBOARDING_GET.SUCCESS,
            ONBOARDING_GET.FAILURE,
        ])()
    )
}

export const saveTourAction =
    (data: { Tour: OnboardingTour['tour']; State: boolean }) => async (dispatch: Dispatch) => {
        const saveTour = onboardingServices.saveOnboardingTour([
            ONBOARDING_TOUR_POST.REQUEST,
            ONBOARDING_TOUR_POST.SUCCESS,
            ONBOARDING_TOUR_POST.FAILURE,
        ])

        try {
            const resp = (await dispatch<any>(saveTour(data))) as OnboardingPostResponse

            dispatch<OnboardingActionShape>({
                type: ONBOARDING_TOUR_POST.FILL,
                payload: {
                    data: {
                        tour: data.Tour,
                        state: data.State,
                    },
                },
            })

            return resp
        } catch (error) {
            return Promise.reject(error)
        }
    }
