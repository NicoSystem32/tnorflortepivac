import { ReactElement } from 'react'

// components
import { Button, DynamicKey, ProgressBar } from '../../../../components'
import { ButtonsCtr, HeadStep, NavigationStep, ThirdStepExceptions } from '..'

// styles
import {
    ThirdStepWrapper,
    ThirdStepContent,
    DynamicCtr,
    ExpirationPayment,
    BodyDynamicKeyStep,
    TextDynamicKey,
} from './thirdStep-styles'

// hooks
import useThirdStep from '../../hooks/useThirdStep'

// selectors
import { getClientValidationCCRequestSelector, useSelector } from '../../../../../selectors'

const ThirdStep = (): ReactElement => {
    const {
        // states
        percentage,
        showRetrySendOtp,
        disablePaymentBtn,
        dynamicKey,

        // timer
        minutes,
        seconds,

        // handlers
        captureDynamicKey,
        onChangeDynamicKey,
        handleErrorMessage,
        validateOtpKey,
        retrySendCodeOTP,

        // selectorData
        loadingValidOtp,
        loadingOtp,
        messageOtp,

        // context
        message,
        exceptionType,
    } = useThirdStep()

    const { loading: loadingClienteValid } = useSelector(getClientValidationCCRequestSelector)
    const errorMS = handleErrorMessage()

    return (
        <>
            <NavigationStep validateException={exceptionType} />

            <ThirdStepWrapper>
                {exceptionType === undefined ? (
                    <ThirdStepContent>
                        <HeadStep title="Validación" paragraph={messageOtp ?? message} />

                        <BodyDynamicKeyStep>
                            <DynamicKey
                                errorMessage={errorMS}
                                onChange={onChangeDynamicKey}
                                onCompleted={captureDynamicKey}
                                clean={loadingOtp}
                            />

                            <DynamicCtr>
                                <ExpirationPayment>
                                    <ProgressBar variant="warning" now={percentage} />
                                    {percentage === 0 ? (
                                        <p>La clave ha expirado, debes solicitar otra</p>
                                    ) : (
                                        <p>
                                            La clave dinámica expirara en {minutes}:
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        </p>
                                    )}
                                </ExpirationPayment>
                            </DynamicCtr>

                            <TextDynamicKey>
                                {showRetrySendOtp ? (
                                    <p>Espera 1:00 minuto para solicitar una nueva clave</p>
                                ) : (
                                    <Button
                                        onClick={retrySendCodeOTP}
                                        className="link-dynamic-passw"
                                        variant="link"
                                        disabled={loadingOtp}
                                    >
                                        {loadingOtp
                                            ? 'Solicitando clave dinámica...'
                                            : 'No recibí mi clave dinámica'}
                                    </Button>
                                )}
                            </TextDynamicKey>
                        </BodyDynamicKeyStep>

                        <ButtonsCtr
                            onNext={() => {
                                validateOtpKey(dynamicKey)
                            }}
                            disabled={
                                !disablePaymentBtn ||
                                loadingOtp ||
                                loadingValidOtp ||
                                loadingClienteValid
                            }
                            isLoading={loadingValidOtp || loadingClienteValid}
                        />
                    </ThirdStepContent>
                ) : (
                    <ThirdStepExceptions exceptionType={exceptionType} />
                )}
            </ThirdStepWrapper>
        </>
    )
}

export default ThirdStep
