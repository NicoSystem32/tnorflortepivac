import { useRef, useEffect, useState, useCallback } from 'react'
import IdleTimer from 'react-idle-timer'
import { Modal } from 'react-bootstrap'

// Icons
import { InactiveSVG, InactivitySVG, NotProductSVG } from '../../../../utils/getIcons'

import '../../../../components/Login/login.scss'

import ActiveSession from '../Multisesion/ActiveSession'
// custom hooks
import { useAppTour, useAuth } from '../../../../hooks'

let isUsedButton = false

const IdleTimerContainer = (): JSX.Element => {
    const idleTimerRef = useRef(null)
    const idleTimerRefLogout = useRef(null)
    const [show, setShow] = useState(false)
    const timeNotification = 180000
    const timeLogout = 530000
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenToken, setIsOpenToken] = useState(false)
    const { setIsOpen: setIsOpenTour } = useAppTour()
    const { checkExpirationToken, logout } = useAuth()

    const timeRefresh = useRef<NodeJS.Timer>()

    const handleClose = (): void => setShow(false)
    const handleCloseLogout = (): void => setIsOpenToken(false)

    const logOut = useCallback((): void => {
        setShow(false)
        logout(() => {
            setIsOpenTour(false)
        })
    }, [logout, setIsOpenTour])

    useEffect(() => {
        timeRefresh.current = setInterval(() => {
            checkExpirationToken(logOut)
        }, 61000)
        return () => {
            clearInterval(timeRefresh.current)
        }
    }, [checkExpirationToken, logOut])

    const onIdle = (): void => {
        setShow(true)
    }
    const onActive = (): void => {
        setShow(false)
    }
    const onIdleLogout = (): void => {
        setIsOpen(true)
        setShow(false)
        setTimeout(() => {
            if (!isUsedButton) {
                setIsOpen(false)
                logOut()
            } else {
                isUsedButton = false
            }
        }, 10000)
    }

    return (
        <div>
            <IdleTimer
                ref={(ref: any) => idleTimerRef}
                timeout={timeNotification}
                onIdle={onIdle}
                onActive={onActive}
            ></IdleTimer>
            <IdleTimer
                ref={(ref: any) => idleTimerRefLogout}
                timeout={timeLogout}
                onIdle={onIdleLogout}
            ></IdleTimer>
            <Modal show={show} onHide={handleClose} className="modal-inactivity">
                <Modal.Body>
                    <div className="body-modal-inactive">
                        <img src={InactiveSVG} alt="" />
                        <p className="title-modal">¿Sigues ahí?</p>
                        <p className="text-modal">
                            No se ha detectado actividad en la página transaccional
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={isOpen}
                backdrop="static"
                keyboard={false}
                onHide={handleCloseLogout}
                className="modal-logout"
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="body-modal-logout">
                        <img src={InactivitySVG} alt="" />
                        <p className="title-modal">Cerrando sesión</p>
                        <p className="text-modal">
                            Ha pasado demasiado tiempo inactiva la plataforma, ingresa de nuevo para
                            continuar.
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={isOpenToken}
                backdrop="static"
                keyboard={false}
                onHide={handleCloseLogout}
                className="modal-logout"
            >
                <Modal.Body>
                    <div className="body-modal-logout">
                        <img src={NotProductSVG} alt="" />
                        <p className="title-modal">Cerrando sesión</p>
                        <p className="text-modal">
                            Ha ocurrido un problema con tu token, ingresa de nuevo para continuar.
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
            <ActiveSession />
        </div>
    )
}

export default IdleTimerContainer
