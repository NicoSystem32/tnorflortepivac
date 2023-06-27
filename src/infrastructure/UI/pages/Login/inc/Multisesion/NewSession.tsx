import { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import { authenticationService } from '../../../../../../domain/services/User.service'
import { calPercentage, parseStringToBoolean } from '../../../../utils/misc'

// Icons
import { InactivitySVG, ArrowSVG, BlockerSVG } from '../../../../utils/getIcons'

// Styles
import {
    NewSessionFirstButton,
    InfoIVRContent,
    ExpirationCode,
    ExpirationProgress,
    TextDynamicCode,
    ButtonNewSession,
} from './newSession-styles'
import './multisesion.scss'

// components
import { ModalLoginSuccess } from '../'
import { Button, LoadingScreen } from '../../../../components'
import DynamicKey from '../../../../components/includes/DynamicKey/DynamicKey'
import { login } from '../../../../../redux/actions/loginActions'

export interface NewSessionTypes {
    show: boolean
    onHide?: () => void
    msj: string
    validationCode: string
}

const NewSession: React.FC<NewSessionTypes> = ({ show, onHide, msj, validationCode }) => {
    // initial declarations
    const dispatch = useDispatch()
    const history = useHistory()
    let refreshToken = ''
    const startingMinutes = useRef(4)
    const startingSeconds = useRef(59)
    const sampleInterval = useRef<NodeJS.Timer>()

    // states definition
    const [percentage, setPercentage] = useState(90)
    const [valueKey, setValueKey] = useState('')
    const [blockedCode, setBlockedCode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [msgErrorKey, setMsgErrorKey] = useState('')
    const [receivingKey, setReceivingKey] = useState(false)
    const [mins, setMinutes] = useState(startingMinutes.current)
    const [secs, setSeconds] = useState(startingSeconds.current)
    const [isCode, setIsCode] = useState(false)
    const [isError, setIsError] = useState(false)
    const [firts, setFirts] = useState(true)
    const [modalClass, setModalClass] = useState('modal-code-multi center')
    const [message, setMessage] = useState('')
    const [disabled, setDisabled] = useState(true)
    const infoUser = {
        name: '',
        gender: '',
        lastEntry: '',
    }
    const [showSuccess, setShowSuccess] = useState(false)
    const [showBlocker, setShowBlocker] = useState(false)
    const handleCloseBlocker = (): void => setShowBlocker(false)

    // event handlers
    const handleCloseCode = (): void => setIsCode(false)
    const handleCloseSuccess = (): void => setShowSuccess(false)
    const handleCloseError = (): void => setIsError(false)
    const validCode = async (): Promise<void> => {
        await authenticationService
            .getLogin('/api/Authorization/ValidOtpAutentication?code=' + validationCode, valueKey)
            .then((response: any) => {
                const elementsCode = document.querySelectorAll('.item-code')
                if (response.status === 200) {
                    const tokenSave = response.data.Data.Token
                    refreshToken = response.data.Data.Refresh
                    setIsCode(false)
                    setShowSuccess(true)
                    setTimeout(() => {
                        handleCloseSuccess()
                        setInfoUser(tokenSave)
                        history.push('/home-wallet', infoUser)
                    }, 6000)
                    setBlockedCode(false)
                } else {
                    elementsCode?.forEach(function (codeItem) {
                        codeItem.classList.add('error-input')
                    })
                    if (response.Response === '401') {
                        setModalClass('modal-code-multi center modal-code-multi-medium')
                        setBlockedCode(true)
                    } else {
                        setModalClass('modal-code-multi center modal-code-multi-medium')
                    }
                    setMsgErrorKey(response.Message)
                    setDisabled(true)
                }
            })
    }

    useEffect(() => {
        sampleInterval.current = setInterval(() => {
            if (secs > 0) {
                setSeconds(secs - 1)
            }
            if (secs === 0) {
                if (mins === 0) {
                    clearInterval(sampleInterval.current)
                } else {
                    setMinutes(mins - 1)
                    setSeconds(59)
                }
            }
            if (mins === 4 && secs === 0) {
                setReceivingKey(false)
            }
            if (mins === 0 && secs === 0) {
                setPercentage(0)
            }
            refreshPercentage(mins, secs)
        }, 1000)

        return () => {
            clearInterval(sampleInterval.current)
        }
    })

    const refreshPercentage = (minsPerc: number, secsPerc: number): void => {
        setPercentage(
            calPercentage(
                startingMinutes.current + startingSeconds.current / 60,
                minsPerc + secsPerc / 60
            )
        )
    }

    // event handlers
    const requestCode = async (): Promise<void> => {
        handleCloseCode()
        setFirts(false)
        const contentFirtsModal = document.getElementById('#firts-modal')
        contentFirtsModal?.setAttribute('min-height', '10px !important')
        contentFirtsModal?.setAttribute('height', '10px !important')
        contentFirtsModal?.setAttribute('min-width', '10px !important')
        contentFirtsModal?.setAttribute('width', '10px !important')
        setLoading(true)
        await authenticationService
            .getCode('/api/Authorization/SendCodeAutentication?Code=' + validationCode)
            .then((response: any) => {
                if (response.status === 200) {
                    setMessage(response.data.Message)
                    setIsCode(true)
                    setMsgErrorKey('')
                    setModalClass('modal-code-multi center')
                    setMinutes(4)
                    setSeconds(58)
                    setReceivingKey(true)
                    setLoading(false)
                    //
                } else {
                    setLoading(false)
                    setFirts(false)
                    setMsgErrorKey(response.Message)
                    setIsError(true)
                    setTimeout(() => {
                        handleCloseError()
                    }, 10000)
                }
            })
    }

    const setInfoUser = (tokenSeter: any): void => {
        const decoded = jwt_decode(tokenSeter)
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const moment = require('moment')
        let timestampNFB = JSON.parse(JSON.stringify(decoded)).nbf
        timestampNFB = timestampNFB.toString()
        if (timestampNFB.length < 13) {
            timestampNFB = timestampNFB + '000'
        }
        let timestampEXP = JSON.parse(JSON.stringify(decoded)).exp
        timestampEXP = timestampEXP.toString()
        if (timestampEXP.length < 13) {
            timestampEXP = timestampEXP + '000'
        }
        let m1 = moment(parseInt(timestampNFB)).format('YYYY-MM-DD HH:mm:ss')
        m1 = moment(new Date(m1))
        let m2 = moment(parseInt(timestampEXP)).format('YYYY-MM-DD HH:mm:ss')
        m2 = moment(new Date(m2))
        const duration = moment.duration(m1.diff(m2))._milliseconds
        const dateToCall = moment().format('YYYY-MM-DD HH:mm:ss')
        infoUser.gender = JSON.parse(JSON.stringify(decoded)).gender
        let nameComplete = JSON.parse(JSON.stringify(decoded)).name.split(' ')
        nameComplete = nameComplete[0].charAt(0).toUpperCase() + nameComplete[0].slice(1)
        infoUser.name = nameComplete
        infoUser.lastEntry = JSON.parse(JSON.stringify(decoded)).lastEntry
        let multisesion = JSON.parse(JSON.stringify(decoded)).document
        multisesion = multisesion.toString()
        const paymentPSE = parseStringToBoolean(
            JSON.parse(JSON.stringify(decoded)).paymentPSE ?? 'true'
        )
        const isLogin = true
        dispatch(
            login({
                token: tokenSeter,
                refreshToken: refreshToken,
                name: nameComplete,
                gender: infoUser.gender,
                lastconection: infoUser.lastEntry,
                isLoggin: isLogin,
                duration: duration,
                dateToCall: dateToCall,
                multisesion: multisesion,
                paymentPSE: paymentPSE,
            })
        )
    }

    const redirections = (url: string): void => {
        window.location.href = url
        handleCloseBlocker()
    }

    const closedCode = (): void => {
        setModalClass('modal-code-multi center modal-blocked')
        setShowBlocker(true)
    }

    const cancelClosedCode = (): void => {
        setModalClass('modal-code-multi center')
        handleCloseBlocker()
    }

    const returnMins = (): string => {
        return secs < 10 ? `0${secs}` : secs.toString()
    }

    return (
        <div>
            <div>
                <Modal
                    show={firts ? show : firts}
                    id="firts-modal"
                    onHide={onHide}
                    keyboard={false}
                    className="modal-contact-footer"
                    centered
                >
                    <Modal.Header closeButton className="modal-header-multi"></Modal.Header>
                    <Modal.Body className="modal-body-multi">
                        <div className="body-modal-logout center">
                            <img src={InactivitySVG} alt="inactivity clock" />
                            <p className="title-modal">{msj.split('|')[0]}</p>
                            <p className="text-modal">{msj.split('|')[1]}</p>
                        </div>
                    </Modal.Body>
                    <NewSessionFirstButton onClick={requestCode}>
                        <img src={ArrowSVG} alt="forward arrow" className="" />
                        <a className="support-service">Enviar código</a>
                    </NewSessionFirstButton>
                </Modal>
            </div>
            {loading && <LoadingScreen />}
            <ModalLoginSuccess show={showSuccess} onHide={handleCloseSuccess} />
            <Modal
                show={isCode}
                backdrop="static"
                keyboard={false}
                onHide={handleCloseCode}
                className={modalClass}
            >
                <div className="modal-header-multi modal-header">
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={closedCode}
                    ></button>
                </div>
                <Modal.Body>
                    <div className="body-modal-logout">
                        <img src={InactivitySVG} alt="inactivity clock" />
                        <p className="title-modal">{message.split('|')[0]}</p>
                        <p className="text-modal">{message.split('|')[1]}</p>
                    </div>
                    <DynamicKey
                        errorMessage={msgErrorKey}
                        onChange={(currCode) => {
                            setMsgErrorKey('')
                            setDisabled(true)
                            setModalClass('modal-code-multi center')
                        }}
                        onCompleted={(codeValue) => {
                            setValueKey(codeValue)
                            setDisabled(false)
                        }}
                    />
                    <InfoIVRContent>
                        <ExpirationCode>
                            {percentage === 0 && !blockedCode && (
                                <>
                                    <ExpirationProgress variant="warning" now={percentage} />
                                    <div className="text-percentage">
                                        <p>El código ha expirado, debes solicitar otro</p>
                                    </div>
                                </>
                            )}
                            {percentage !== 0 && !blockedCode && (
                                <>
                                    <ExpirationProgress variant="warning" now={percentage} />
                                    <div className="text-percentage">
                                        <p>Éste código expirará en&nbsp;</p>
                                        <p>
                                            {' '}
                                            {mins}:{returnMins()}
                                        </p>
                                    </div>
                                </>
                            )}
                        </ExpirationCode>
                    </InfoIVRContent>
                    <ButtonNewSession>
                        {disabled && !blockedCode ? (
                            <Button
                                id="btnContinueStep1"
                                type="button"
                                onClick={validCode}
                                disabled
                            >
                                Continuar
                            </Button>
                        ) : null}
                        {!disabled && !blockedCode ? (
                            <Button id="btnContinueStep1" type="button" onClick={validCode}>
                                Continuar
                            </Button>
                        ) : null}
                        {blockedCode ? (
                            <Button id="btnContinueStep1" type="button" onClick={handleCloseCode}>
                                Cerrar
                            </Button>
                        ) : null}
                    </ButtonNewSession>
                    <TextDynamicCode>
                        {receivingKey && !blockedCode ? (
                            <p>Espera 1:00 minuto para solicitar un nuevo código</p>
                        ) : null}
                        {!receivingKey && !blockedCode ? (
                            <a onClick={requestCode} className="link-dinamic-passw">
                                Solicita un nuevo código
                            </a>
                        ) : null}
                    </TextDynamicCode>
                </Modal.Body>
            </Modal>
            <Modal
                show={isError}
                onHide={handleCloseError}
                backdrop="static"
                keyboard={false}
                className="modal-contact-footer"
                centered
            >
                <Modal.Header closeButton className="modal-header-multi"></Modal.Header>
                <Modal.Body>
                    <div className="body-modal-logout center">
                        <img src={InactivitySVG} alt="inactivity clock" />
                        <p className="title-modal">{msgErrorKey.split('|')[0]}</p>
                        <p className="text-modal">{msgErrorKey.split('|')[1]}</p>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={showBlocker}
                onHide={handleCloseBlocker}
                keyboard={false}
                className="modal-contact-footer modal-center"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Modal.Body>
                    <div className="content-video-login">
                        <img src={BlockerSVG} alt="" className="return-img" />
                    </div>
                    <p className="title-modal-login">
                        ¿Estás seguro que deseas cerrar esta pantalla?
                    </p>
                    <p className="text-modal-login">
                        Si lo haces tendrás que esperar {mins}:{secs < 10 ? `0${secs}` : secs}{' '}
                        minutos para volver a <br></br>intentar abrir tu sesión.
                    </p>
                    <div className="content-btn-double-multi">
                        <Button
                            variant="sub-dominant"
                            className="btn-multi"
                            onClick={cancelClosedCode}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="outline-cancel"
                            className="btn-multi"
                            onClick={() => {
                                redirections('/login')
                            }}
                        >
                            Cerrar
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default NewSession
