/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
    cleanSendCodeOtpTCAction,
    cleanStatusChangeTCAction,
    cleanValidateCodeOtpTCAction,
    sendCodeOtpTCAction,
    statusChangeTCAction,
    validateCodeOtpTCAction,
} from '../../../../../redux/tc'
import {
    CreditCardSelector,
    SendCodeOtpTCSelector,
    StatusChangeTCSelector,
    useSelector,
    ValidateCodeOtpTCSelector,
} from '../../../../../selectors'
import { IconAlertSVG, IconSuccessfulProcess } from '../../../../utils/getIcons'
import { calPercentage } from '../../../../utils/misc'

//styles
import {
    BodyMultiPaymentStep,
    InfoIVRCtr,
    ExpirationPayment,
    TextDynamicKey,
} from '../../../MultiPaymentsTDC/inc/SecondStep/secondStep-styles'
import { Buttons, Title } from '../../activateCard-styles'
import { InformationText } from '../FirstStep/firstStep-styles'
import { SecondStepContainer } from './secondStep-styles'

//components
import { Button, DynamicKey, ModalGeneric, ProgressBar } from '../../../../components'

//hooks
import { useTimer } from '../../../../hooks'

//models
import { StoreApp } from '../../../../../redux/store/store.interface'
import useQueryId from '../../../../hooks/useQueryId'

const SecondStep = (): ReactElement => {
    const dispatch = useDispatch()
    const history = useHistory()
    const startMinutes = 5
    const [percentage, setPercentage] = useState<number>(90)
    const { minutes, seconds, startTimer, resetTimer } = useTimer(startMinutes)
    const [showRetrySendOtp, setShowRetrySendOtp] = useState<boolean>(true)
    const [disablePaymentBtn, setDisablePaymentBtn] = useState<boolean>(false)
    const [dynamicKey, setDynamicKey] = useState<string>('')
    const [errorMessage, setMessage] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const { id } = useQueryId()

    const { cardData: infoCard } = useSelector((store: StoreApp) =>
        CreditCardSelector(store, String(id))
    )

    const { loading: loadingOtp, message } = useSelector(SendCodeOtpTCSelector)

    const {
        loading: loadingValidate,
        status: statusValidate,
        error: errorValidate,
    } = useSelector(ValidateCodeOtpTCSelector)

    const {
        loading: loadingChange,
        status: statusChange,
        message: messageChange,
        error: errorChange,
    } = useSelector(StatusChangeTCSelector)

    useEffect(() => {
        updatePercentageAndShowRetrySend()
    }, [minutes, seconds])

    useEffect(() => {
        startTimer()
    }, [])

    useEffect(() => {
        changeStateCreditCard()
    }, [loadingValidate])

    useEffect(() => {
        validateStatusChange()
    }, [loadingChange])

    useEffect(() => {
        return () => {
            dispatch(cleanSendCodeOtpTCAction())
            dispatch(cleanValidateCodeOtpTCAction())
            dispatch(cleanStatusChangeTCAction())
        }
    }, [])

    const updatePercentageAndShowRetrySend = (): void => {
        if (minutes === 4 && seconds === 0) {
            setShowRetrySendOtp(false)
        }
        refreshPercentage(minutes, seconds)
    }

    const changeStateCreditCard = (): void => {
        if (errorValidate?.errorData?.message && statusValidate !== '200' && !loadingValidate) {
            setMessage(errorValidate?.errorData?.message)
        } else if (statusValidate === '200' && !loadingValidate && infoCard) {
            setMessage('')
            dispatch(
                statusChangeTCAction({
                    TransactionDate: '',
                    TransactionTime: '',
                    EffectiveDate: '',
                    Consecutive: '',
                    NumberCard: infoCard.lastFourDigits,
                    Filler1: '',
                    Filler2: infoCard.dateExpiredCard,
                    Status: '1',
                })
            )
            // setOpenModal(true) // se va
        } else {
            setMessage('')
        }
    }

    const validateStatusChange = (): void => {
        if ((statusChange === '200' || errorChange?.errorData?.message) && !loadingChange) {
            setOpenModal(true)
        }
    }

    const refreshPercentage = (minsPerc: number, secsPerc: number): void => {
        setPercentage(calPercentage(startMinutes, minsPerc + secsPerc / 60))
    }

    const retrySendCodeOTP = (): void => {
        dispatch(cleanSendCodeOtpTCAction())
        dispatch(sendCodeOtpTCAction())
        resetTimer()
        startTimer()
        setShowRetrySendOtp(true)
        setMessage('')
    }

    const validateOtpCode = (): void => {
        dispatch(validateCodeOtpTCAction(dynamicKey))
    }

    const onChangeDynamicKey = (): void => {
        setDisablePaymentBtn(false)
        setMessage('')
    }

    const captureDynamicKey = (dynamicKeyReceived: string): void => {
        setDisablePaymentBtn(true)
        setDynamicKey(dynamicKeyReceived)
    }

    const handleClose = (): void => {
        setOpenModal(false)
        history.push('/home-wallet')
    }

    const pushMessageModal = (): string => {
        if (messageChange) {
            return messageChange.split('|')[1]
        } else if (
            errorChange?.errorData?.message &&
            !errorChange?.errorData?.message?.toLowerCase().includes('internal server')
        ) {
            return errorChange?.errorData?.message
        } else {
            return 'Se produjo un error en la activación, por favor intentar nuevamente'
        }
    }

    return (
        <SecondStepContainer>
            <InformationText>{message}</InformationText>
            <BodyMultiPaymentStep data-tour="fai-dynamic-key">
                <Title>Código de activación</Title>

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
                    {showRetrySendOtp && !loadingOtp ? (
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
            <Buttons>
                <Button
                    variant="outline-cancel"
                    extend
                    onClick={() => {
                        history.push('/home-wallet')
                    }}
                    disabled={loadingValidate || loadingChange}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="sub-dominant"
                    extend
                    disabled={
                        !disablePaymentBtn ||
                        errorMessage !== '' ||
                        loadingValidate ||
                        loadingChange
                    }
                    isLoading={loadingValidate || loadingChange}
                    onClick={validateOtpCode}
                >
                    Activar
                </Button>
            </Buttons>
            <ModalGeneric
                show={openModal}
                handleClose={handleClose}
                img={statusChange === '200' ? IconSuccessfulProcess : IconAlertSVG}
                textTitle={statusChange === '200' ? messageChange?.split('|')[0] : 'Error'}
                textBody={pushMessageModal()}
                handleButton={handleClose}
                textButton="Aceptar"
            />
        </SecondStepContainer>
    )
}
export default SecondStep
