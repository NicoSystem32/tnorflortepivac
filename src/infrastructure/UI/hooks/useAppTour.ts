/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useEffect, useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { StepTypeExtended } from '@reactour/tour'
import { useMediaQuery, useUpdateEffect } from 'usehooks-ts'

// redux resources
import { StoreApp } from '../../redux/store/store.interface'

// selectors
import {
    useSelector,
    onboardingSelector,
    savingGroupSelector,
    creditGroupSelector,
    settingTDCSelector,
} from '../../selectors'

// Onboarding steps
import {
    overviewSteps,
    overviewMobileSteps,
    savingsGroupSteps,
    savingsGroupMobileSteps,
    creditGroupSteps,
    creditGroupMobileSteps,
    productsOpeningSteps,
    productsOpeningMobileSteps,
    firstPaymentSteps,
    firstPaymentMobileSteps,
    savingsProductModifySteps,
    savingsProductModifyMobileSteps,
} from '../transverse/Tour/steps'

// custom hooks
import useTourNavigation from '../transverse/Tour/hooks/useTourNavigation'
import { useFormProduct } from './useFormProducts'

// onboarding steps components
import {
    CreditGroupStep,
    PaymentAmountStep,
    ProductsOpeningStep,
    SavingsGroupStep,
} from '../transverse/Tour/inc'

// helpers
import { parseStringToBoolean } from '../utils/misc'

type InitStepSettings = {
    steps: StepTypeExtended[]
    stepsMobile: StepTypeExtended[]
    openOrRide?: 'ride' | 'open' | 'close'
    stepIndex?: number
    delay?: number
    loading?: boolean
}

const enableSavingsPayment = process.env.REACT_APP_SAVINGS_PAYMENT_ENABLE as 'false' | 'true'
const closeOrOpenSavings = parseStringToBoolean(enableSavingsPayment) ? 'open' : 'close'
const closeOrRideSavings = parseStringToBoolean(enableSavingsPayment) ? 'ride' : 'close'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAppTour = () => {
    // initial declarations
    const location = useLocation()
    const pathTourNames = {
        '/home-wallet': 'overview',
        '/savings-group': 'savings',
        '/savings-detail': 'savings',
        '/payments': 'savings',
        '/credits-group': 'credits',
        '/credits-detail': 'credits',
        '/product-opening': 'productsOpening',
        '/tdc-opening': 'productsOpening',
        '/paymentsfai': 'multipayment',
        '/multi-payments-tdc': 'multipayment',
    }

    // initial states
    const {
        setIsOpen,
        isOpen,
        currentStep,
        setCurrentStep,
        setSteps,
        steps: curSteps,
        rideStep,
    } = useTourNavigation({})
    const matchMedia = useMediaQuery('(min-width: 1180px)')
    const [loadingSavings, setLoadingSavings] = useState(true)
    const [loadingCredits, setLoadingCredits] = useState(true)
    const [loadingDetail, setLoadingDetail] = useState(true)
    const [loadingTDCSettings, setLoadingTDCSettings] = useState(true)

    const { onboarding, isLoading: isLoadingTour } = useSelector(onboardingSelector)
    const { loadingIn: isLoadingSavings } = useSelector(savingGroupSelector)
    const { loading: isLoadingCredits } = useSelector(creditGroupSelector)
    const { loading: isLoadingDetail } = useSelector((store: StoreApp) => store.detailReducer)
    const { loading: isLoadingTDCSettings } = useSelector(settingTDCSelector)
    const { validateExistence: existProduct } = useFormProduct()

    useEffect(() => {
        setLoadingSavings(true)
        setLoadingCredits(true)
        setLoadingDetail(true)
        setLoadingTDCSettings(true)
    })

    useUpdateEffect(() => {
        setLoadingSavings(isLoadingSavings)
        setLoadingCredits(isLoadingCredits)
        setLoadingDetail(isLoadingDetail)
        setLoadingTDCSettings(isLoadingTDCSettings)
    }, [isLoadingSavings, isLoadingCredits, isLoadingDetail, isLoadingTDCSettings])

    // helper functions
    const initStep = ({
        steps,
        stepsMobile,
        openOrRide = 'open',
        stepIndex = 0,
        delay = 0,
        loading = false,
    }: InitStepSettings): void => {
        const _steps = matchMedia ? steps : stepsMobile
        if (setSteps) setSteps(_steps)

        const fn = {
            open() {
                setCurrentStep(stepIndex)
                if (!isOpen) setIsOpen(true)
            },
            ride() {
                rideStep(stepIndex)
            },
            close() {
                setIsOpen(false)
            },
        }[openOrRide]

        if (!loading) {
            setTimeout(fn, delay)
        }
    }

    const validateReturned = (
        evalPos: number[],
        evalItem: StepTypeExtended['content'][],
        optsOverride: Partial<InitStepSettings>
    ): Partial<InitStepSettings> => {
        const returned = evalPos.includes(currentStep)
        const startComp = curSteps[0].content

        return returned && evalItem.includes(startComp) ? optsOverride : {}
    }

    const renderStep = useCallback(
        (pathTo: keyof typeof pathTourNames): void => {
            const startComp = curSteps[0].content

            const stepPaths = {
                '/home-wallet'() {
                    initStep({ steps: overviewSteps, stepsMobile: overviewMobileSteps })
                },
                '/savings-group'() {
                    const overSettings = validateReturned([1, 2], [SavingsGroupStep], {
                        openOrRide: closeOrRideSavings,
                        stepIndex: 1,
                        delay: 300,
                    })

                    initStep({
                        steps: savingsGroupSteps,
                        stepsMobile: savingsGroupMobileSteps,
                        loading: loadingSavings,
                        openOrRide: closeOrOpenSavings,
                        ...overSettings,
                    })
                },
                '/savings-detail'() {
                    const overSettings = validateReturned([3, 4], [SavingsGroupStep], {
                        stepIndex: existProduct ? 2 : 3,
                    })

                    initStep({
                        steps: existProduct ? savingsProductModifySteps : savingsGroupSteps,
                        stepsMobile: existProduct
                            ? savingsProductModifyMobileSteps
                            : savingsGroupMobileSteps,
                        openOrRide: closeOrRideSavings,
                        stepIndex: 2,
                        delay: 300,
                        loading: loadingDetail,
                        ...overSettings,
                    })
                },
                '/payments'() {
                    if (([SavingsGroupStep] as StepTypeExtended['content'][]).includes(startComp)) {
                        rideStep(4)
                    } else {
                        setIsOpen(false)
                    }
                },
                '/credits-group'() {
                    const overSettings = validateReturned([1, 2], [CreditGroupStep], {
                        openOrRide: 'ride',
                        stepIndex: 1,
                        delay: 300,
                    })

                    initStep({
                        steps: creditGroupSteps,
                        stepsMobile: creditGroupMobileSteps,
                        loading: loadingCredits,
                        ...overSettings,
                    })
                },
                '/credits-detail'() {
                    initStep({
                        steps: creditGroupSteps,
                        stepsMobile: creditGroupMobileSteps,
                        openOrRide: 'ride',
                        stepIndex: 2,
                        delay: 300,
                        loading: loadingDetail,
                    })
                },
                '/product-opening'() {
                    const overSettings = validateReturned([1, 2], [ProductsOpeningStep], {
                        openOrRide: 'ride',
                        stepIndex: 1,
                    })

                    initStep({
                        steps: productsOpeningSteps,
                        stepsMobile: productsOpeningMobileSteps,
                        ...overSettings,
                    })
                },
                '/tdc-opening'() {
                    initStep({
                        steps: productsOpeningSteps,
                        stepsMobile: productsOpeningMobileSteps,
                        openOrRide: 'ride',
                        stepIndex: 2,
                        delay: 300,
                        loading: loadingTDCSettings,
                    })
                },
                '/paymentsfai'() {
                    const overSettings = validateReturned([2, 3], [PaymentAmountStep], {
                        openOrRide: 'ride',
                        stepIndex: 2,
                    })

                    initStep({
                        steps: firstPaymentSteps,
                        stepsMobile: firstPaymentMobileSteps,
                        ...overSettings,
                    })
                },
                '/multi-payments-tdc'() {
                    stepPaths['/paymentsfai']()
                },

                default() {
                    setIsOpen(false)
                },
            }

            const finalized = onboarding.find((t) => t.tour === pathTourNames[pathTo])?.state

            const fn =
                typeof stepPaths[pathTo] === 'function' && !finalized
                    ? stepPaths[pathTo]
                    : stepPaths.default

            fn()
        },
        [
            loadingSavings,
            loadingDetail,
            loadingCredits,
            loadingTDCSettings,
            existProduct,
            curSteps.length,
            onboarding,
        ]
    )

    useLayoutEffect(() => {
        if (!isLoadingTour) {
            renderStep(location.pathname)
        }
    }, [isLoadingTour, location.pathname, renderStep])

    return {
        rideStep,
        matchMedia,
        setIsOpen,

        // useTour items
        isOpen,
        currentStep,
        setCurrentStep,
        setSteps,
    }
}

export default useAppTour
