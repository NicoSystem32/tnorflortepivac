import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// hooks
import { useReducerStep } from '.'

// selectors
import { getCreditCardDataPerStepSelector, validateUserStateSelector } from '../../../../selectors'

// actions
import { fillDataPerStepAction, cleanDataPerStepAction } from '../../../../redux/openingTC'

// models
import { ValidateUserResponse } from '../../../../../domain/models'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useEntryModule = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [step, dispatchStep] = useReducerStep()
    const state = useLocation().state as { lastFrom: string }

    const { validateUser } = useSelector(validateUserStateSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { fourthStep, fifthStep, sixthStep, seventhStep, twelfthStep } = createCreditCard

    // listeners
    useEffect(() => {
        dispatchStep({
            type: 'GO_TO_STEP',
            payload: {
                step: createCreditCard.currentStep ?? step.currentStep,
            },
        })
    }, [createCreditCard.currentStep])

    useEffect(() => {
        validateUserStateExist()
    }, [validateUser])

    useEffect(() => {
        validatePreviousNavigation()
        return () => {
            dispatch(cleanDataPerStepAction())
            history.replace()
        }
    }, [])

    useEffect(() => {
        return () => {
            dispatch(cleanDataPerStepAction())
        }
    }, [])

    // methods
    const setStepsState = (currentStep: number | string, data: ValidateUserResponse): void => {
        dispatch(
            fillDataPerStepAction({
                ...createCreditCard,
                currentStep: setCurrentStep(currentStep),
                fourthStep: {
                    ...fourthStep,
                    phone: data.phone,
                    state: data.department,
                    city: data.city,
                    neighborhood: data.neighborhood,
                    checkTyC: data.authorize,
                    address1: data.address ? data.address.split('|')[0] : null,
                    address2: data.address ? data.address.split('|')[1] : null,
                    address3: data.address ? data.address.split('|')[2] : null,
                    additionalIndications: data.address ? data.address.split('|')[3] : null,
                },
                fifthStep: {
                    ...fifthStep,
                    civilStatus: data.civilStates,
                },
                sixthStep: {
                    ...sixthStep,
                    economicActivity: data.economyActivity,
                    mainIncome: data.mainIncome ? data.mainIncome.toString() : null,
                    haveAdditionalIncome: data.hasOtherIncome ? 'yes' : 'not',
                    additionalIncome: data.otherIncome ? data.otherIncome.toString() : null,
                },
                seventhStep: {
                    ...seventhStep,
                    cardQuote: data.assignedFee ?? null,
                },
                twelfthStep: {
                    ...twelfthStep,
                    state: data.department,
                    city: data.city,
                    neighborhood: data.neighborhood,
                    address1: data.address ? data.address.split('|')[0] : null,
                    address2: data.address ? data.address.split('|')[1] : null,
                    address3: data.address ? data.address.split('|')[2] : null,
                    additionalData: data.address ? data.address.split('|')[3] : null,
                },
            })
        )
    }

    const validatePreviousNavigation = (): void => {
        if (!state || state.lastFrom !== 'PO') {
            redirection('/product-opening')
        }
    }

    const setCurrentStep = (currentStep: number | string): number => {
        if (currentStep === '20' || currentStep === 20) {
            return 13
        }

        if (currentStep === '7' || currentStep === 7) {
            return 7
        }
        return typeof currentStep !== 'string' ? currentStep + 1 : parseInt(currentStep) + 1
    }

    const validateUserStateExist = (): void => {
        if (validateUser) {
            setStepsState(validateUser.requestStep, validateUser)
        }
    }

    const redirection = (url: string, lastFrom?: string): void => {
        history.push(url, {
            lastFrom,
        })
    }

    return {
        step,
    }
}
