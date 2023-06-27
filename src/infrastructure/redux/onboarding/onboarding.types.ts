/**
 * Action types
 */
export const ONBOARDING_GET = {
    REQUEST: 'ONBOARDING_GET/request',
    SUCCESS: 'ONBOARDING_GET/success',
    FAILURE: 'ONBOARDING_GET/failure',
} as const

export const ONBOARDING_TOUR_POST = {
    REQUEST: 'ONBOARDING_TOUR_POST/request',
    SUCCESS: 'ONBOARDING_TOUR_POST/success',
    FAILURE: 'ONBOARDING_TOUR_POST/failure',
    FILL: 'ONBOARDING_TOUR_POST/fill',
} as const
