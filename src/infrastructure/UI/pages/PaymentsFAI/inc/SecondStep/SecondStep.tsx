import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { useUpdateEffect } from 'usehooks-ts'
import 'twin.macro'

// base components
import { Button, DynamicKey } from '../../../../components'

// styled components
import { ReturnButton } from '../../paymentsFAI-styles'
import {
    PaymentStepContent,
    HeadPaymentStep,
    FootPaymentStep,
    TitlePayment,
    SubtitlePayment,
} from '../FirstStep/firstStep-styles'
import {
    PaymentFAISecondStep,
    BodyPaymentStep,
    TextForm,
    InfoIVRContent,
    ExpirationPayFAI,
    ExpirationProgress,
    TextDynamicKey,
} from './secondStep-styles'

// components
import ConfirmPaymentFAI from '../ConfirmPaymentFAI'

// redux resources
import { createTransaction } from '../../../../../redux/transaction'
import { transactionFAISelector } from '../../../../../selectors'

// custom hooks
import { useReducerStep, useSecondStep } from '../../hooks'
import { useAuth } from '../../../../hooks'

// icons
import { ArrowCircleSVG } from '../../../../utils/getIcons'
import { useState } from 'react'

const SecondStep = (): JSX.Element => {
    // initial declarations
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    // const state = useSelector((stateRef: any) => stateRef)
    const {
        isLoading,
        transaction,
        status,
        message: statusMessage,
        error: statusError,
    } = useSelector(transactionFAISelector)
    const { callToRefreshToken, logout } = useAuth()

    // states definition
    const [{ receivingOTP }, dispatchState] = useReducerStep()
    const [isDisabled, setDisabled] = useState(true)

    const {
        percentage,
        msgErrorKey,
        message,
        setKeyInvalid,
        setValueKey,
        showModalPayment,
        setShowModalPayment,
        minutes,
        seconds,
        listProducts,
        requestKey,
        validateKey,
        formatSendData,
        validateStatus,
        requiredKey,
    } = useSecondStep()

    useUpdateEffect(() => {
        if (isLoading === false && transaction !== null)
            validateStatus(status, {
                transaction,
                status,
                message: statusMessage,
                error: statusError,
                loading: isLoading,
            })
    }, [isLoading, status, transaction])

    useUpdateEffect(() => {
        if (!['200', '202', '203', '400', '401'].includes(status ?? '') && !isLoading) {
            history.push('/not-response')
        } else if (status === '400') {
            history.push('/payments', { type: location.state.from })
        }
    }, [status, isLoading])

    // events handlers
    const handleSubmit = (): void => {
        const body = formatSendData(listProducts)
        callToRefreshToken(() => {
            dispatch(createTransaction(body))
        }, logout)
    }

    const handleKeyChange = (): void => {
        setKeyInvalid(false)
        setDisabled(true)
        dispatchState({
            type: 'SET_FEEDBACK',
            payload: {
                code: '',
                message: '',
            },
        })
    }

    return (
        <>
            <ReturnButton
                data-tour="prev_fai_step"
                onClick={() => {
                    dispatchState({ type: 'PREV_STEP' })
                }}
            >
                <img src={ArrowCircleSVG} alt="volver" className="return-img" />
                <p>Volver</p>
            </ReturnButton>

            <PaymentFAISecondStep>
                <PaymentStepContent>
                    <HeadPaymentStep>
                        <TitlePayment>
                            Pago por<strong>&nbsp;cuenta FAI&nbsp;</strong>
                        </TitlePayment>
                        <SubtitlePayment>{message}</SubtitlePayment>
                    </HeadPaymentStep>

                    <BodyPaymentStep data-tour="fai-dynamic-key">
                        <TextForm>Clave dinámica</TextForm>
                        <DynamicKey
                            tw="text-left justify-start"
                            errorMessage={msgErrorKey}
                            onChange={handleKeyChange}
                            onCompleted={(codeValue) => {
                                setValueKey(codeValue)
                                setDisabled(false)
                            }}
                            clean={requiredKey}
                        />
                        <InfoIVRContent>
                            <ExpirationPayFAI>
                                <ExpirationProgress variant="warning" now={percentage} />
                                <div className="text-percentage">
                                    {percentage === 0 && (
                                        <p>La clave ha expirado, debes solicitar otra</p>
                                    )}
                                    {percentage > 0 && (
                                        <p>
                                            La clave dinámica expirará en {minutes}:
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        </p>
                                    )}
                                </div>
                            </ExpirationPayFAI>

                            <TextDynamicKey>
                                {receivingOTP && (
                                    <p>Espera 1:00 minuto para solicitar una nueva clave</p>
                                )}
                                {!receivingOTP && (
                                    <Button
                                        onClick={() => {
                                            requestKey()
                                        }}
                                        className="link-dynamic-passw"
                                        variant="link"
                                        disabled={requiredKey}
                                    >
                                        {requiredKey
                                            ? 'Solicitando clave dinámica...'
                                            : 'No recibí mi clave dinámica'}
                                    </Button>
                                )}
                            </TextDynamicKey>
                        </InfoIVRContent>
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

                        <Button variant="sub-dominant" onClick={validateKey} disabled={isDisabled}>
                            Pagar
                        </Button>
                    </FootPaymentStep>
                </PaymentStepContent>
            </PaymentFAISecondStep>

            <ConfirmPaymentFAI
                show={showModalPayment}
                handleClose={() => {
                    setShowModalPayment(false)
                }}
                handleSubmit={handleSubmit}
            ></ConfirmPaymentFAI>
        </>
    )
}

export default SecondStep
