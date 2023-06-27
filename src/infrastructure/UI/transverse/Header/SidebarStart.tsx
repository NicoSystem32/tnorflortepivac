import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Bootstrap
import { Accordion, Button, Offcanvas } from 'react-bootstrap'

import { logout } from '../../../redux/actions/loginActions'
import { authenticationService } from '../../../../domain/services/User.service'

// Icons
import { HeadsetColorSVG, LogOutSVG, PaymentSideSVG, ProductSideSVG } from '../../utils/getIcons'

// Styles
import './header.scss'

//hooks
import { useAppTour } from '../../hooks'
import { parseStringToBoolean } from '../../utils/misc'

const enableCreditCard = process.env.REACT_APP_CREDIT_CARD_ENABLE as 'false' | 'true'
const enableTDC = process.env.REACT_APP_TDC_ENABLE as 'false' | 'true'

const SidebarStart = (): JSX.Element => {
    const dispatch = useDispatch()
    const state = useSelector((stateRef: any) => stateRef)
    const history = useHistory()
    const [show, setShow] = useState(false)
    const { isOpen, setCurrentStep, setIsOpen: setIsOpenTour } = useAppTour()

    const rideStep = (step: number): void => {
        if (isOpen) setCurrentStep(step)
    }

    const handleClose = (): void => {
        setShow(false)
    }
    const handleShow = (): void => {
        setShow(true)
        rideStep(2)
    }

    const redirections = (url: string): void => {
        history.push(url)
    }

    const loggout = async (): Promise<void> => {
        const tokenSave = state.auth.token
        await authenticationService
            .getLogin('/api/Authorization/LogOut', tokenSave)
            .then((response) => {
                if (response) {
                    setIsOpenTour(false)
                    dispatch(logout())
                    window.location.href = '/login'
                }
            })
    }

    return (
        <>
            <Button
                variant="primary"
                onClick={handleShow}
                className="only-mobile btn-sidebar-start"
                data-tour="menu-options-mob"
            ></Button>

            <Offcanvas show={show} onHide={handleClose} data-tour="menu-options-mob-cls">
                <Offcanvas.Header closeButton>
                    <div className="header-sidebar-start">
                        {state.auth.gender === 'Hombre' ? (
                            <p className="text-welcome-white">Bienvenido</p>
                        ) : (
                            <p className="text-welcome-white">Bienvenida</p>
                        )}
                        <p className="text-name">{state.auth.name}</p>
                        {state.auth.lastconection === '' ? (
                            <div className="last-connect"></div>
                        ) : (
                            <div className="last-connect">
                                <p>La fecha de tu último ingreso fue el:</p>
                                <p>{state.auth.lastconection}</p>
                            </div>
                        )}
                    </div>
                </Offcanvas.Header>
                <div className="content-sidebar-start">
                    <Offcanvas.Body className="conetnt-sidebar-start">
                        <div className="section1-sidebar-start">
                            <Accordion>
                                {parseStringToBoolean(enableTDC) && (
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header
                                            className="gap"
                                            data-tour="products-opt-mob"
                                        >
                                            <img
                                                src={ProductSideSVG}
                                                alt="Productos"
                                                className="options-img"
                                            />
                                            Productos
                                        </Accordion.Header>
                                        <Accordion.Body className="content-opton-sidebar-start">
                                            {parseStringToBoolean(enableCreditCard) && (
                                                <>
                                                    <p className="title-sidebar-start">
                                                        Tarjeta de crédito
                                                    </p>
                                                    <a
                                                        className="item-sidebar-start"
                                                        onClick={() =>
                                                            redirections('/product-opening')
                                                        }
                                                    >
                                                        Solicitar tarjeta
                                                    </a>
                                                    <a className="item-sidebar-start">
                                                        Activar tarjetas
                                                    </a>
                                                    <a className="item-sidebar-start">
                                                        Programa tus pagos
                                                    </a>
                                                    <p className="title-sidebar-start">
                                                        Inversiones
                                                    </p>
                                                </>
                                            )}
                                            <a
                                                className="item-sidebar-start"
                                                onClick={() => redirections('/product-opening')}
                                            >
                                                Abre un TDC
                                            </a>
                                        </Accordion.Body>
                                        <hr className="separed-item-sidebar"></hr>
                                    </Accordion.Item>
                                )}
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header className="gap" data-tour="payments-opt-mob">
                                        <img
                                            src={PaymentSideSVG}
                                            alt="Pagos"
                                            className="options-img"
                                        />
                                        Pagos
                                    </Accordion.Header>
                                    <Accordion.Body className="content-opton-sidebar-start">
                                        {parseStringToBoolean(enableCreditCard) && (
                                            <>
                                                <p className="title-sidebar-start">
                                                    Tarjetas de crédito
                                                </p>
                                                <a className="item-sidebar-start">
                                                    Pagar tarjeta crédito
                                                </a>
                                            </>
                                        )}
                                        <p className="title-sidebar-start">Productos de ahorro</p>
                                        <a
                                            className="item-sidebar-start"
                                            onClick={() => redirections('/savings-group')}
                                        >
                                            Pagar aportes
                                        </a>
                                        <a
                                            className="item-sidebar-start"
                                            onClick={() => redirections('/home-wallet')}
                                        >
                                            Pagar ahorro recreativo
                                        </a>
                                        <p className="title-sidebar-start">Créditos</p>
                                        <a
                                            className="item-sidebar-start"
                                            onClick={() => redirections('/home-wallet')}
                                        >
                                            Pagar créditos
                                        </a>
                                    </Accordion.Body>
                                    <hr className="separed-item-sidebar"></hr>
                                </Accordion.Item>
                            </Accordion>
                            <a
                                className="options-sidebar"
                                onClick={() => redirections('/support-private')}
                                data-tour="support-mob"
                            >
                                <img
                                    src={HeadsetColorSVG}
                                    alt="servicio al cliente"
                                    className="options-img"
                                />
                                <p>Servicio al asociado</p>
                            </a>
                        </div>
                        <a className="options-sidebar botton" onClick={loggout}>
                            <img src={LogOutSVG} alt="Cerrar sesión" className="options-img" />
                            <p>Cerrar sesión</p>
                        </a>
                    </Offcanvas.Body>
                </div>
            </Offcanvas>
        </>
    )
}

export default SidebarStart
