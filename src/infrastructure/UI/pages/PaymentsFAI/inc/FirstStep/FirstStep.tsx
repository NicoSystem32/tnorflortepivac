import { useState, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

// styled components
import { ReturnButton } from '../../paymentsFAI-styles'

import {
    PaymentFAIFirstStep,
    PaymentStepContent,
    HeadPaymentStep,
    BodyPaymentStep,
    FootPaymentStep,
    TitleStep,
    TitlePayment,
    SubtitlePayment,
    PaymentAmount,
    FAIFormWrap,
} from './firstStep-styles'

// base components
import { Button } from '../../../../components'
import FAIForm from '../FAIForm'

// resources
import {
    formatValue,
    formatDecimalValue,
} from '../../../../components/GlobalFuntions/globalFunction'
import { transactionService } from '../../../../../../domain/services/User.service'
import { CreditCardPaymentSelector, parametersTDCSelector } from '../../../../../selectors'

// custom hooks
import { useReducerStep, useSecondStep } from '../../hooks'
import { useAppTour } from '../../../../hooks'

// icons
import { ArrowCircleSVG } from '../../../../utils/getIcons'

const FirstStep = (): JSX.Element => {
    // initial declarations
    const history = useHistory()
    const location = useLocation()
    const state = useSelector((stateRef: any) => stateRef)
    const tokenSave = state.auth.token
    const tdcParameters = useSelector(parametersTDCSelector)
    const { dataPayment } = useSelector(CreditCardPaymentSelector)
    const paymentData = useRef<{ total: number }>({
        total: state.products.total,
    })
    if (location.state.from === 'TDC' && tdcParameters !== null) {
        paymentData.current.total = tdcParameters.value
    }
    if (location.state.from === 'TC' && dataPayment !== null) {
        paymentData.current.total = dataPayment.value
    }

    // states definition
    const [valueIVR, setValueIVR] = useState('')
    const [isReady, setIsReady] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isFocus, setIsFocus] = useState(false)
    const dispatchState = useReducerStep()[1]
    const { requestKey } = useSecondStep()
    const { rideStep: rideTourStep } = useAppTour()

    // event handlers
    const handleInputDigit = (inputChanged: string): void => {
        setValueIVR(inputChanged)

        if (inputChanged === '') {
            setIsReady(false)
        } else {
            setIsReady(true)
        }
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        setIsLoading(true)
        transactionService
            .getTransaction('/api/Authorization/ValidIVR', tokenSave, valueIVR)
            .then((response: any) => {
                if (response.status === 200) {
                    requestKey(
                        () => {
                            // success
                            dispatchState({ type: 'NEXT_STEP' })
                            rideTourStep(3)
                        },
                        () => {
                            // failed
                            dispatchState({ type: 'NEXT_STEP' })
                            rideTourStep(3)
                        }
                    )
                } else {
                    setErrorMessage(response.Message)
                    setIsReady(false)
                    setIsLoading(false)
                }
            })
            .catch(() => {
                setIsLoading(false)
            })
    }

    return (
        <>
            <ReturnButton
                onClick={() => {
                    if (location.state.from === 'TDC' || location.state.from === 'TC') {
                        history.push('/payments', { type: location.state.from })
                    } else {
                        history.push('/payments')
                    }
                }}
            >
                <img src={ArrowCircleSVG} alt="volver" className="return-img" />
                <p>Volver</p>
            </ReturnButton>

            <PaymentFAIFirstStep>
                <PaymentStepContent>
                    <HeadPaymentStep>
                        <TitlePayment>
                            Pago por<strong>&nbsp;cuenta FAI&nbsp;</strong>
                        </TitlePayment>
                        <SubtitlePayment>Ingresa tu Clave IVR para continuar</SubtitlePayment>
                    </HeadPaymentStep>

                    <BodyPaymentStep>
                        <PaymentAmount data-tour="fai-payment-amount">
                            <TitleStep>Monto a debitar cuenta FAI</TitleStep>
                            <p>
                                ${formatValue(paymentData.current.total, 1)}
                                <sup className="sub-indice">
                                    {formatDecimalValue(paymentData.current.total, 1)}
                                </sup>
                            </p>
                        </PaymentAmount>

                        <FAIFormWrap>
                            <FAIForm
                                errorMessage={errorMessage}
                                onChange={handleInputDigit}
                                onFocusIVR={() => {
                                    setIsFocus(true)
                                }}
                            />
                            {isFocus && (
                                <div className="label-floating">
                                    Por tu seguridad utiliza el teclado virtual
                                </div>
                            )}
                        </FAIFormWrap>
                    </BodyPaymentStep>

                    <FootPaymentStep>
                        <Button
                            variant="outline-cancel"
                            onClick={() => {
                                history.push('/home-wallet')
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="sub-dominant"
                            onClick={handleSubmit}
                            disabled={!isReady || isLoading}
                            isLoading={isLoading}
                            data-tour="confirm-fai-ivr"
                            data-tour-act="trigger-step"
                        >
                            Siguiente
                        </Button>
                    </FootPaymentStep>
                </PaymentStepContent>
            </PaymentFAIFirstStep>
        </>
    )
}

export default FirstStep
