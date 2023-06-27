/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useHistory } from 'react-router'

// hooks
import { useReducerStep } from '.'

export const useNavigationStep = (validateException?: 1 | 2 | 3 | 4 | 5 | 6 | undefined) => {
    const history = useHistory()
    const [step, dispatchStep] = useReducerStep()

    const redirection = (url: string, data?: Record<string, string | number>): void => {
        history.push(url, data)
    }

    const breadcrumbs = [
        {
            text: 'Inicio',
            active: false,
            onClick: () => {
                redirection('/home-wallet')
            },
        },
        {
            text: 'solicitud de productos',
            active: true,
        },
    ]

    const onBack = (): void => {
        if ([1, 4].includes(step.currentStep)) {
            return redirection('/product-opening')
        }
        if (step.currentStep === 3 && validateException !== undefined) {
            return redirection('/product-opening')
        }
        if ([18, 19, 11, 17].includes(step.currentStep)) {
            return redirection('/home-wallet')
        }
        if ([9, 12].includes(step.currentStep)) {
            return dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 7,
                },
            })
        }
        if (step.currentStep === 15) {
            return dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 12,
                },
            })
        }
        if ([13, 16].includes(step.currentStep)) {
            return dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 15,
                },
            })
        }
        dispatchStep({ type: 'PREV_STEP' })
    }
    return {
        breadcrumbs,
        onBack,
    }
}
