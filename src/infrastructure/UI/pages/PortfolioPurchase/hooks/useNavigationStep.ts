/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

// hooks
import { useReducerState } from '.'
import { getCleanPortfolioPurchaseAction } from '../../../../redux/portfolioPurchaseTC'

export const useNavigationStep = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [step, dispatchStep] = useReducerState()

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
        if (step.currentStep === 1) {
            dispatch(getCleanPortfolioPurchaseAction())
            redirection('/home-wallet')
        }
        if (step.currentStep === 2) {
            dispatchStep({ type: 'PREV_STEP' })
        }
    }
    return {
        breadcrumbs,
        onBack,
        step,
    }
}
