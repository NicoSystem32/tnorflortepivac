import { ReactElement } from 'react'

// components
import { MultiPaymentTdcModal, ReturnButton, TitleStep } from '..'
import { Button, DynamicKey, ModalGeneric, ProgressBar } from '../../../../components'

// hooks
import useSecondStep from '../../hooks/useSecondStep'

// Icons
import { IconAlertSVG } from '../../../../utils/getIcons'

// styles
import {
    MultiPaymentTDCSecondStep,
    MultiPaymentTDCStepContent,
    FootPaymentStep,
    TextForm,
    BodyMultiPaymentStep,
    InfoIVRCtr,
    ExpirationPayment,
    TextDynamicKey,
} from './secondStep-styles'

const SecondStep = (): ReactElement => {
    const {
        loadingValidOtp,
        message,
        showConfirmPayment,
        dispatchStep,
        history,
        validateOtpKey,
        minutes,
        seconds,
        percentage,
        disablePaymentBtn,
        dynamicKey,
        captureDynamicKey,
        errorMessage,
        retrySendCodeOTP,
        loadingOtp,
        onChangeDynamicKey,
        showRetrySendOtp,
        onCreateTransaction,
        showModalError,
        messageError,
        handleCloseErrorModal,
    } = useSecondStep()

    return (
        <>
            <ReturnButton
                onClick={() => {
                    dispatchStep({ type: 'PREV_STEP' })
                }}
            />

            <MultiPaymentTDCSecondStep>
                <MultiPaymentTDCStepContent>
                    {message && (
                        <TitleStep subtitle={message}>
                            Pago por<strong>&nbsp;multipagos&nbsp;</strong>
                        </TitleStep>
                    )}

                    <BodyMultiPaymentStep data-tour="fai-dynamic-key">
                        <TextForm>Clave dinámica</TextForm>

                        <DynamicKey
                            errorMessage={errorMessage}
                            onChange={onChangeDynamicKey}
                            onCompleted={captureDynamicKey}
                            clean={loadingOtp}
                        />

                        <InfoIVRCtr>
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
                        </InfoIVRCtr>

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
                    </BodyMultiPaymentStep>

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
                            type="submit"
                            variant="sub-dominant"
                            disabled={
                                !disablePaymentBtn ||
                                message === '' ||
                                loadingOtp ||
                                loadingValidOtp
                            }
                            isLoading={loadingValidOtp}
                            onClick={() => {
                                validateOtpKey(dynamicKey)
                            }}
                        >
                            Pagar
                        </Button>
                    </FootPaymentStep>
                </MultiPaymentTDCStepContent>
            </MultiPaymentTDCSecondStep>

            <MultiPaymentTdcModal
                showOpenTdc={showConfirmPayment}
                handleClose={() => {
                    history.push('/home-wallet')
                }}
                handleNext={onCreateTransaction}
            />

            <ModalGeneric
                show={showModalError}
                handleClose={handleCloseErrorModal}
                img={IconAlertSVG}
                textTitle="Error"
                textBody={messageError ?? ''}
                handleButton={handleCloseErrorModal}
                textButton="Cerrar"
            />
        </>
    )
}

export default SecondStep
