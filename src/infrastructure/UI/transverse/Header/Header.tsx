import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

// Transverse
import { SidebarStart, SidebarEnd } from '..'

// Images
import { Logo } from '../../utils/getImages'

// Icons
import {
    IconHeadsetSVG,
    IconLogOutSVG,
    PaymentSVG,
    ProductSVG,
    ChartSVG,
} from '../../utils/getIcons'

import { logout } from '../../../redux/actions/loginActions'
import { cleanPayments } from '../../../redux/actions/paymentActions'
import { authenticationService } from '../../../../domain/services/User.service'
import { ThemeMenu } from '../../components'

// custom hooks
import { useAppTour } from '../../hooks'

import './header.scss'
import { parseStringToBoolean } from '../../utils/misc'

const enableCreditCard = process.env.REACT_APP_CREDIT_CARD_ENABLE as 'false' | 'true'
const enableTDC = process.env.REACT_APP_TDC_ENABLE as 'false' | 'true'

const Header = (): JSX.Element => {
    const state = useSelector((stateRef: any) => stateRef)
    const { setIsOpen: setIsOpenTour, rideStep, isOpen: isOpenTour, currentStep } = useAppTour()

    const dispatch = useDispatch()

    const history = useHistory()
    const months = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
    ]
    const dateNow = new Date()
    const nowEntry =
        dateNow.getDate() + ' de ' + months[dateNow.getMonth()] + ' de ' + dateNow.getFullYear()
    let listProducts = []
    if (state.products.products !== undefined) {
        listProducts = state.products.products
    }

    const loggout = async (): Promise<void> => {
        const tokenSave = state.auth.token
        await authenticationService
            .getLogin('/api/Authorization/LogOut', tokenSave)
            .then((response) => {
                if (response) {
                    setIsOpenTour(false)
                    dispatch(logout())
                    dispatch(cleanPayments())
                    // window.location.href = '/login'
                }
            })
    }

    const seePayments = async (): Promise<void> => {
        const navbar = document.querySelector('#theme-header-botton')
        const contentPayment = document.querySelector('#content-header-payment')
        const contentProduct = document.querySelector('#content-header-products')
        const textPayment = document.querySelector('#text-pay-header')
        const imgPayment = document.querySelector('#img-pay-header')
        const textProduct = document.querySelector('#text-prod-header')
        const imgProduct = document.querySelector('#img-prod-header')
        navbar?.classList.remove('not-display')
        contentPayment?.classList.remove('not-display')
        contentProduct?.classList.add('not-display')
        textPayment?.classList.add('important-text')
        textProduct?.classList.remove('important-text')
        textPayment?.classList.remove('vertical-text-header')
        textProduct?.classList.add('vertical-text-header')
        imgPayment?.classList.add('change-img-payment')
        imgProduct?.classList.remove('change-img-product')

        rideStep(2)
    }

    const seeProducts = async (): Promise<void> => {
        const navbar = document.querySelector('#theme-header-botton')
        const contentProduct = document.querySelector('#content-header-products')
        const contentPayment = document.querySelector('#content-header-payment')
        const textPayment = document.querySelector('#text-pay-header')
        const imgPayment = document.querySelector('#img-pay-header')
        const textProduct = document.querySelector('#text-prod-header')
        const imgProduct = document.querySelector('#img-prod-header')
        navbar?.classList.remove('not-display')
        contentProduct?.classList.remove('not-display')
        contentPayment?.classList.add('not-display')
        textPayment?.classList.remove('important-text')
        textProduct?.classList.add('important-text')
        textPayment?.classList.add('vertical-text-header')
        textProduct?.classList.remove('vertical-text-header')
        imgPayment?.classList.remove('change-img-payment')
        imgProduct?.classList.add('change-img-product')

        rideStep(3)
    }

    const handleMouseEvent = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault()
        if (!isOpenTour || ![2, 3].includes(currentStep)) {
            const navbar = document.querySelector('#theme-header-botton')
            const textPayment = document.querySelector('#text-pay-header')
            const imgPayment = document.querySelector('#img-pay-header')
            const textProduct = document.querySelector('#text-prod-header')
            const imgProduct = document.querySelector('#img-prod-header')
            navbar?.classList.add('not-display')
            textPayment?.classList.remove('important-text')
            textProduct?.classList.remove('important-text')
            textPayment?.classList.add('vertical-text-header')
            textProduct?.classList.add('vertical-text-header')
            imgPayment?.classList.remove('change-img-payment')
            imgProduct?.classList.remove('change-img-product')
            // Do something
        }
    }

    const redirectInput = (): void => {
        const section = '#Aportes'
        history.push({
            pathname: '/savings-group',
            state: section,
        })
    }

    const redirectRecreational = (): void => {
        const section = '#Recreativo'
        history.push('/savings-group', section)
    }

    function intervale(): void {
        const myElement = document.body.contains(document.getElementById('timeWatch'))

        const element = (
            <p> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        )

        if (myElement) {
            ReactDOM.render(element, document.getElementById('timeWatch'))
        }
    }
    setInterval(intervale, 60000)
    setTimeout(() => {
        intervale()
    }, 500)

    const redirections = (url: string): void => {
        history.push(url)
    }
    window.addEventListener('themeMode', () => {
        // When local storage changes, dump the list to
        // the console.
        // (localStorage.getItem('themeMode'))
    })

    return (
        <>
            <Navbar className="theme-header2">
                <Container className="content-header">
                    <SidebarStart />
                    <img
                        alt=""
                        src={Logo}
                        className="logo-header"
                        onClick={() => redirections('/home-wallet')}
                    />
                    <div className="only-mobile">
                        <SidebarEnd />
                    </div>
                    <div className="content-header-desk only-desk">
                        <a
                            className="options-top border-pipe-white"
                            onClick={() => redirections('/support-private')}
                            data-tour="support"
                        >
                            <img
                                src={IconHeadsetSVG}
                                alt="Servicio al asociado"
                                className="options-img"
                            />
                            <p>Servicio al asociado</p>
                        </a>
                        <a className="options-top" onClick={loggout}>
                            <img src={IconLogOutSVG} alt="Cerrar sesión" className="options-img" />
                            <p>Cerrar sesión</p>
                        </a>
                        <ThemeMenu />
                    </div>
                </Container>
            </Navbar>
            <div id="content-second-section" className="header-second-content">
                <Navbar className="theme-header3">
                    <Container className="content-header-center">
                        <div className="content-welcome">
                            {state.auth.gender === 'Hombre' ? (
                                <p className="text-welcome-header">
                                    Bienvenido,&nbsp;
                                    <strong className="text-name-header">{state.auth.name}</strong>
                                </p>
                            ) : (
                                <p className="text-welcome-header">
                                    Bienvenida,&nbsp;
                                    <strong className="text-name-header">{state.auth.name}</strong>
                                </p>
                            )}
                            {state.auth.lastconection === '' ? (
                                <div className="lastEntry-header"></div>
                            ) : (
                                <div className="lastEntry-header">
                                    <p>Último ingreso fue el:&nbsp;</p>
                                    <p>{state.auth.lastconection}</p>
                                </div>
                            )}
                            <div className="lastEntry-header color-domain">
                                <p>{nowEntry},&nbsp;</p>
                                <div id="timeWatch" className="text-date-header color-domain"></div>
                            </div>
                        </div>
                        <div className="content-header-options" data-tour="menu-options">
                            <a
                                className="vertical-option-header"
                                onClick={seePayments}
                                data-tour="payments-opt"
                            >
                                <img
                                    id="img-pay-header"
                                    src={PaymentSVG}
                                    alt="Pagos"
                                    className="options-img"
                                />
                                <p className="vertical-text-header" id="text-pay-header">
                                    Pagos
                                </p>
                            </a>
                            {parseStringToBoolean(enableTDC) && (
                                <a
                                    className="vertical-option-header"
                                    onClick={seeProducts}
                                    data-tour="products-opt"
                                >
                                    <img
                                        id="img-prod-header"
                                        src={ProductSVG}
                                        alt="Productos"
                                        className="options-img"
                                    />
                                    <p className="vertical-text-header" id="text-prod-header">
                                        Productos
                                    </p>
                                </a>
                            )}
                        </div>
                        <div className="content-wallet-header" data-tour="wallet-menu">
                            <div className="content-text-wallet">
                                <p>Pagos</p>
                                {listProducts.length == 1 ? (
                                    <p>
                                        <strong>1</strong>&nbsp;concepto
                                    </p>
                                ) : (
                                    <p>
                                        <strong>{listProducts.length}</strong>&nbsp;conceptos
                                    </p>
                                )}
                            </div>
                            <div className="content-img-wallet">
                                <SidebarEnd />
                            </div>
                        </div>
                    </Container>
                </Navbar>
                <Navbar
                    id="theme-header-botton"
                    className="theme-header-botton not-display"
                    onMouseLeave={handleMouseEvent}
                    data-tour="nav-menu-content"
                >
                    <Container className="content-header-botton">
                        <div
                            id="content-header-payment"
                            className="content-header-payment not-display"
                        >
                            {parseStringToBoolean(enableCreditCard) && (
                                <>
                                    <div className="options-header-botton border-option-header">
                                        <div className="title-header-botton">
                                            <img
                                                alt="Tarjetas de crédito"
                                                className="options-img img-option-payment img-header-botton"
                                            />
                                            <p>Tarjetas de crédito</p>
                                        </div>
                                        <div className="links-header-botton">
                                            <a>Pagar tarjeta crédito</a>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="options-header-botton border-option-header">
                                <div className="title-header-botton">
                                    <img
                                        alt="Productos de ahorro"
                                        className="options-img img-option-product img-header-botton"
                                    />
                                    <p>Productos de ahorro</p>
                                </div>
                                <div className="links-header-botton">
                                    <a onClick={redirectInput}>Pagar aportes</a>
                                    <a onClick={redirectRecreational}>Pagar ahorro recreativo</a>
                                </div>
                            </div>
                            <div className="options-header-botton">
                                <div className="title-header-botton">
                                    <img
                                        alt="Créditos"
                                        className="options-img img-option-credit img-header-botton"
                                    />
                                    <p>Créditos</p>
                                </div>
                                <div className="links-header-botton">
                                    <a onClick={() => redirections('/credits-group')}>
                                        Pagar créditos
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div
                            id="content-header-products"
                            className="content-header-products not-display"
                        >
                            {parseStringToBoolean(enableCreditCard) && (
                                <div className="options-header-botton border-option-header">
                                    <div className="title-header-botton">
                                        <img
                                            alt="Tarjetas de crédito"
                                            className="options-img img-option-payment img-header-botton"
                                        />
                                        <p>Tarjetas de crédito</p>
                                    </div>
                                    <div className="links-header-botton three-columns">
                                        <a onClick={() => redirections('/product-opening')}>
                                            Solicitar tarjeta
                                        </a>
                                        <a>Programar pago automático</a>
                                        <a>Cancelar pago automático</a>
                                        <a>Activar tarjetas</a>
                                        <a>Activar tarjeta fuera de Colombia</a>
                                        <a>Olvidé mi clave para avances</a>
                                    </div>
                                </div>
                            )}
                            <div className="options-header-botton">
                                <div className="title-header-botton">
                                    <img
                                        src={ChartSVG}
                                        alt="Inversiones"
                                        className="img-header-botton icon-chart-header"
                                    />
                                    <p>Inversiones</p>
                                </div>
                                <div className="links-header-botton">
                                    <a onClick={() => redirections('/product-opening')}>
                                        Abre un TDC
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}

export default Header
