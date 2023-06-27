import { useState, useEffect } from 'react'

// Components

import { Button, DynamicKey } from '../../../../components'

// Styles
import './../../forgetPassword.scss'

// helpers
import { useReducerState, useStateForget } from '../../hooks'
import {
    ExpirationCode,
    ExpirationProgress,
    InfoIVRContent,
    TextDynamicCode,
} from '../../../Login/inc/Multisesion/newSession-styles'
import useLogicForget from '../../hooks/useLogicForget'

const ValidateCode = (): JSX.Element => {
    const [{ optionSelected, feedback }] = useReducerState()
    const dispatchStep = useReducerState()[1]
    const { sendCodeForget, validateCodeForget, cleanFailed } = useStateForget()
    const {
        controlInterval,
        setRefresh,
        setReceivingKey,
        setMinutes,
        setSeconds,
        sampleInterval,
        receivingKey,
        refresh,
        percentage,
        mins,
        secs,
    } = useLogicForget()
    const [isDisabled, setDisabled] = useState(true)

    const setCodeReceived = (codeValue: string): void => {
        dispatchStep({
            type: 'SET_CODE',
            payload: {
                codeReceived: codeValue,
            },
        })
    }

    const newCode = (): void => {
        setRefresh(true)
        cleanFailed()
        setReceivingKey(true)
        dispatchStep({
            type: 'SET_RETURN',
            payload: {
                returnScreen: false,
            },
        })
        setMinutes(4)
        setSeconds(59)
        sendCodeForget(2, optionSelected)
    }

    useEffect(() => {
        controlInterval()

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            clearInterval(sampleInterval.current)
        }
    })

    useEffect(() => {
        dispatchStep({
            type: 'SET_RETURN',
            payload: {
                returnScreen: false,
            },
        })
    }, [])

    return (
        <div className="content-step3">
            <div>
                {optionSelected === 0 && (
                    <>
                        <p className="title-form-forget-basic">
                            Hemos enviado el
                            <strong className="title-form-forget-high">&nbsp;código</strong>
                        </p>
                        <p className="text-subtitle-recovery send-to-cell">
                            Ingresa el código enviado a tu celular
                        </p>
                    </>
                )}
                {optionSelected === 1 && (
                    <>
                        <p className="title-form-forget-basic">
                            Hemos enviado el
                            <strong className="title-form-forget-high">&nbsp;código&nbsp;</strong>
                            <br></br>a tu correo
                        </p>
                        <p className="text-subtitle-recovery send-to-cell">
                            Ingresa el código que enviamos a tu correo para restablecer tu
                            contraseña
                        </p>
                    </>
                )}
            </div>
            <DynamicKey
                tw="text-left justify-start"
                errorMessage={feedback.failed ? feedback.message : ''}
                onChange={() => {
                    // setKeyInvalid(false)
                    setDisabled(true)
                    setRefresh(false)
                }}
                onCompleted={(codeValue) => {
                    setCodeReceived(codeValue)
                    setDisabled(false)
                    setRefresh(false)
                }}
                clean={refresh}
            />
            <InfoIVRContent className={feedback.failed ? 'info-ivr-forget' : 'info-ivr-top'}>
                <ExpirationCode>
                    {percentage === 0 && (
                        <>
                            <ExpirationProgress variant="warning" now={percentage} />
                            <div className="text-percentage">
                                <p>El código ha expirado, debes solicitar otro</p>
                            </div>
                        </>
                    )}
                    {percentage !== 0 && (
                        <>
                            <ExpirationProgress variant="warning" now={percentage} />
                            <div className="text-percentage">
                                <p>Éste código expirará en&nbsp;</p>
                                <p>
                                    {' '}
                                    {mins}:{secs < 10 ? `0${secs}` : secs}
                                </p>
                            </div>
                        </>
                    )}
                </ExpirationCode>
            </InfoIVRContent>
            <div id="content-btn-continue" className="content-btn-forget step3">
                <Button
                    id="btnContinueStep1"
                    type="button"
                    onClick={validateCodeForget}
                    disabled={isDisabled}
                >
                    Continuar
                </Button>
            </div>
            <TextDynamicCode className="content-new-code-forget">
                {receivingKey && <p>Espera 1:00 minuto para solicitar un nuevo código</p>}
                {!receivingKey && (
                    <a onClick={newCode} className="link-dinamic-passw">
                        Solicita un nuevo código
                    </a>
                )}
            </TextDynamicCode>
        </div>
    )
}
export default ValidateCode
