import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { components } from '@reactour/tour'

// redux resources
import { OnboardingTour } from '../../../../../domain/models'
import { actions } from '../../../../redux/onboarding'

// onboarding steps components
import {
    StartStep,
    SavingsGroupStep,
    CreditGroupStep,
    ProductsOpeningStep,
    PaymentAmountStep,
} from '../inc'

// custom hooks
import useTourNavigation from './useTourNavigation'

export type UseNavigationProps = Pick<
    React.ComponentProps<typeof components.Navigation>,
    'disableDots' | 'disableAll'
>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useNavigation = ({ disableDots, disableAll }: UseNavigationProps) => {
    // initial declarations
    const dispatch = useDispatch()
    const disableSelectorsNextBtn = [
        '[data-tour="contributions"]',
        '[data-tour="add-savings-to-payments"]',
        '[data-tour="credit-overview"]:first-of-type',
        '[data-tour="confirm-fai-ivr"]',
        '[data-tour="investment-tdc"]',
    ]
    const {
        nextNavigationAction,
        prevNavigationPaths,
        navigationTo,
        loadingNext,
        steps,
        currentStep,
        setIsOpen,
    } = useTourNavigation({
        nextActionSelectors: disableSelectorsNextBtn,
    })
    const stepsLength = steps.length

    // initial states
    const [disableNext, setDisableNext] = useState(false)
    const [disablePrev, setDisablePrev] = useState(false)

    // custom next and prev validation
    const disableIndexes = steps
        .filter((s) => disableSelectorsNextBtn.includes(s.selector as string))
        .map((s) => steps.indexOf(s))

    useEffect(() => {
        setDisableNext(disableAll ? disableAll : stepsLength - 1 === currentStep)
        setDisablePrev(disableAll ? disableAll : currentStep === 0)
    }, [disableAll, stepsLength, currentStep])

    // events handlers
    const handleNextNPrev = (kind: 'next' | 'prev') => (): void => {
        if (!disableAll) {
            if (kind === 'next') {
                const nextStep = Math.min(currentStep + 1, stepsLength - 1)

                const fired = nextNavigationAction()
                setDisableNext(fired)
                navigationTo(nextStep, fired)
            } else {
                const prevStep = Math.max(currentStep - 1, 0)

                const returned = prevNavigationPaths()
                setDisablePrev(returned)
                navigationTo(prevStep, returned)
            }
        }
    }

    const handleDot = (idx: number) => () => {
        const disabledIdx = disableIndexes.some((nextDisabled) => idx > nextDisabled)

        if (!disableDots && !disableAll && !disabledIdx) {
            const returned = prevNavigationPaths()
            setDisablePrev(returned)
            navigationTo(idx, returned)
        }
    }

    const handleFinalize = (): void => {
        const startComp = steps[0].content
        let tourName: OnboardingTour['tour'] | '' = ''

        if (typeof startComp !== 'string') {
            if (startComp === StartStep) {
                tourName = 'overview'
            } else if (startComp === SavingsGroupStep) {
                tourName = 'savings'
            } else if (startComp === CreditGroupStep) {
                tourName = 'credits'
            } else if (startComp === ProductsOpeningStep) {
                tourName = 'productsOpening'
            } else if (startComp === PaymentAmountStep) {
                tourName = 'multipayment'
            }
        }

        if (tourName) {
            dispatch(
                actions.saveTourAction({
                    Tour: tourName,
                    State: true,
                })
            )
        }

        setIsOpen(false)
    }

    return {
        disableSelectorsNextBtn,
        disableIndexes,

        // states
        disableNext,
        disablePrev,
        loadingNext,

        // event handlers
        handleNextNPrev,
        handleDot,
        handleFinalize,
    }
}

export default useNavigation
