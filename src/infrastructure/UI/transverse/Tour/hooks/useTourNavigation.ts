/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { useTour } from '@reactour/tour'
import { useHistory, useLocation } from 'react-router-dom'

// helpers
import { smoothScrollToElem } from '../../../utils/misc'

// onboarding steps components
import { PaymentWalletStep } from '../inc'

export type TourNavigationOpts = {
    nextActionSelectors?: string[]
    offset?: number
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useTourNavigation = ({ nextActionSelectors = [], offset = 90 }: TourNavigationOpts) => {
    // initial declarations
    const history = useHistory()
    const location = useLocation()

    // initial states
    const {
        isOpen,
        currentStep,
        setCurrentStep,
        steps,
        setSteps,
        setIsOpen: _setIsOpen,
    } = useTour()
    const [loadingNext, setLoadingNext] = useState(false)

    useEffect(() => {
        setLoadingNext(false)
    }, [currentStep])

    // helper functions
    const executeActionBefore = useCallback(
        (step: number, noExecWhenNotElem?: boolean): HTMLElement | null => {
            const selectorOrElem = steps[step]?.selector
            const execElem =
                selectorOrElem instanceof Element
                    ? (selectorOrElem as HTMLElement)
                    : document.querySelector<HTMLElement>(selectorOrElem)

            const actionBeforeArrive = steps[step]?.actionBeforeArrive
            if (
                typeof actionBeforeArrive === 'function' &&
                !(noExecWhenNotElem && !execElem) &&
                isOpen
            ) {
                actionBeforeArrive(execElem)
            }

            return execElem
        },
        [steps, isOpen]
    )

    const rideStep = useCallback(
        (step: number): void => {
            if (isOpen) {
                const rideElem = executeActionBefore(step)

                if (rideElem) {
                    smoothScrollToElem(rideElem, { offset }).then(() => {
                        setCurrentStep(step)
                    })
                } else {
                    setCurrentStep(step)
                }
            }
        },
        [executeActionBefore, isOpen]
    )

    const setIsOpen = useCallback(
        (open: boolean): void => {
            const currentElem = executeActionBefore(currentStep)

            if (currentElem && open) {
                smoothScrollToElem(currentElem, { offset }).then(() => {
                    _setIsOpen(open)
                })
            } else {
                _setIsOpen(open)
            }
        },
        [currentStep, executeActionBefore]
    )

    // navigation methods
    const nextNavigationAction = (): boolean => {
        const selectorOrElem = steps[currentStep].selector
        let fired = false

        const currentElem =
            selectorOrElem instanceof Element
                ? selectorOrElem
                : document.querySelector(selectorOrElem)

        if (nextActionSelectors.includes(selectorOrElem.toString()) && currentElem) {
            const actionElem =
                (currentElem as HTMLElement)?.dataset?.tourAct === 'trigger-step'
                    ? currentElem
                    : currentElem.querySelector<HTMLElement>('[data-tour-act="trigger-step"]') ||
                      document.querySelector<HTMLFormElement>('[data-tour-act="trigger-step-form"]')

            if (actionElem instanceof HTMLFormElement) {
                // if the action element is a form
                const formBtn = actionElem.querySelector<HTMLButtonElement>('button[type="submit"]')

                if (!formBtn?.disabled) {
                    const event = new Event('submit', { bubbles: true })
                    actionElem.dispatchEvent(event)

                    setLoadingNext(true)
                }

                fired = true
            } else if (
                actionElem &&
                !(actionElem instanceof HTMLButtonElement && actionElem.disabled)
            ) {
                // if the action element is a button or another element
                const event = new Event('click', { bubbles: true })
                actionElem.dispatchEvent(event)

                setLoadingNext(true)
                fired = true
            } else if (actionElem) {
                fired = true
            }
        }

        return fired
    }

    const prevNavigationPaths = (): boolean => {
        let returned = false

        if (
            ['[data-tour="saving-payment-opts"]'].includes(steps[currentStep].selector.toString())
        ) {
            history.push('/savings-group')
            returned = true
        } else if (
            ['[data-tour="credit-payment-opts"]', '[data-tour="credit-payment-opts-mob"]'].includes(
                steps[currentStep].selector.toString()
            )
        ) {
            history.push('/credits-group')
            returned = true
        } else if (['[data-tour="create-tdc"]'].includes(steps[currentStep].selector.toString())) {
            history.push('/product-opening')
            returned = true
        } else if (
            ['[data-tour="fai-dynamic-key"]'].includes(steps[currentStep].selector.toString())
        ) {
            const btnReturn = document.querySelector('[data-tour="prev_fai_step"]')
            const event = new Event('click', { bubbles: true })
            btnReturn?.dispatchEvent(event)
            returned = true
        } else if (steps[currentStep].content === PaymentWalletStep) {
            if (['/payments'].includes(location.pathname)) {
                history.goBack()
            }
            returned = true
        }

        return returned
    }

    const navigationTo = (stepIndex: number, hasGoneForward = false): void => {
        const navElem = executeActionBefore(stepIndex, hasGoneForward)

        if (navElem) {
            smoothScrollToElem(navElem, { offset }).then(() => {
                setCurrentStep(stepIndex)
                setLoadingNext(false)
            })
        } else if (!hasGoneForward) {
            setCurrentStep(stepIndex)
            setLoadingNext(false)
        }
    }

    return {
        // helper functions
        executeActionBefore,
        rideStep,
        setIsOpen,

        // navigation methods
        nextNavigationAction,
        prevNavigationPaths,
        navigationTo,

        // custom states and setters
        loadingNext,
        setLoadingNext,

        // useTour items
        isOpen,
        currentStep,
        setCurrentStep,
        setSteps,
        steps,
    }
}

export default useTourNavigation
