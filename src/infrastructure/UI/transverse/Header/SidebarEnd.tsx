import { useState, MouseEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { messagesSelector } from '../../../selectors'

// Bootstrap
import { Button, Offcanvas } from 'react-bootstrap'

// Icons
import { Credit1SVG, ImgTitleMobSVG, ImgTitleSVG, EmptySVG } from '../../utils/getIcons'

import { updatePayments } from '../../../redux/actions/paymentActions'
import {
    arrayRemoveEsp,
    formatValue,
    formatDecimalValue,
} from '../../components/GlobalFuntions/globalFunction'

// custom hooks
import { useAppTour } from '../../hooks'

import './header.scss'

const SidebarEnd = (): JSX.Element => {
    const [show, setShow] = useState(false)
    const state = useSelector((stateRef: any) => stateRef)
    const dispatch = useDispatch()
    let listProducts: any[] = []
    const history = useHistory()
    const total = state.products.total
    const messages = useSelector(messagesSelector)
    if (state.products.products != undefined) {
        listProducts = state.products.products
    }
    const { setCurrentStep, isOpen, setIsOpen } = useAppTour()

    const rideStep = (step: number): void => {
        if (isOpen) setCurrentStep(step)
    }

    const handleClose = (): void => setShow(false)
    const handleShow = (e: MouseEvent<HTMLButtonElement>): void => {
        setShow(true)
        rideStep(5)
    }

    function validateExistence(number: any): boolean {
        let clave: any = {}
        let isInto = false
        for (const item of listProducts) {
            clave = item
            if (clave.number == number) {
                isInto = true
            }
        }
        return isInto
    }

    const removeItem = (number: any, finish: any): void => {
        let productArr = []
        if (state.products.products != undefined) {
            productArr = state.products.products
        }
        const result = arrayRemoveEsp(productArr, number, finish)
        dispatch(updatePayments(result))
        validateExistence(number)
    }

    const redirections = (url: string): void => {
        setShow(false)
        history.push(url)
    }

    return (
        <>
            <Button
                variant="primary"
                onClick={handleShow}
                className="btn-sidebar-end"
                id="btn-open-wallet"
                data-tour="wallet-menu-mob"
            ></Button>

            <Offcanvas show={show} onHide={handleClose} placement="end" data-tour="wallet">
                <Offcanvas.Header
                    closeButton
                    className="header-sidebar-end"
                    data-tour="wallet-title"
                >
                    <div className="only-mob-sidebar">
                        <Offcanvas.Title>
                            Pagos
                            <img src={ImgTitleMobSVG} alt="pagos" className="title-se-img" />
                        </Offcanvas.Title>
                    </div>
                    <div className="only-desk-sidebar">
                        <Offcanvas.Title>
                            Pagos
                            <img src={ImgTitleSVG} alt="Pagos" className="title-se-img-desk" />
                        </Offcanvas.Title>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body className="body-sidebar-end">
                    <div className="list-item-credit">
                        {listProducts.length === 0 ? (
                            <div className="content-wallet-empty" data-tour="content-wallet-empty">
                                <img src={EmptySVG} alt="listEmpty" />
                                <p className="text-empty-sb">
                                    {messages.find((m) => m.name === 'noConceptoPorPagar')?.text}
                                </p>
                            </div>
                        ) : (
                            listProducts.map((product: any) => (
                                <div
                                    className="item-credit"
                                    key={`${product.number}-${product.finishedNumber}`}
                                    data-tour="wallet-item"
                                >
                                    <img src={Credit1SVG} alt="" className="options-img" />
                                    <div className="text-item-credit">
                                        <div>
                                            <p className="title-credit title-short">
                                                {product.name}
                                            </p>
                                        </div>
                                        <p className="value-credit">
                                            $ {formatValue(product.value, 1)}
                                            <sup>{formatDecimalValue(product.value, 1)}</sup>
                                        </p>
                                    </div>
                                    <button
                                        className="btn-close-circle"
                                        onClick={() =>
                                            removeItem(product.number, product.finishedNumber)
                                        }
                                    ></button>
                                </div>
                            ))
                        )}
                    </div>
                    {listProducts.length === 0 ? (
                        <div className="content-total-credit">
                            <div className="text-total">
                                <p className="total-title">Total</p>
                                <p className="total-value">
                                    $ 0<sup className="sub-indice">.00</sup>
                                </p>
                            </div>
                            <Button id="btnPayment" variant="primary" type="submit" disabled>
                                Pagar
                            </Button>
                        </div>
                    ) : (
                        <div className="content-total-credit">
                            <div className="text-total">
                                <p className="total-title">Total</p>
                                <p className="total-value">
                                    $ {formatValue(total, 1)}
                                    <sup className="sub-indice">{formatDecimalValue(total, 1)}</sup>
                                </p>
                            </div>
                            <Button
                                id="btnPayment"
                                variant="primary"
                                type="submit"
                                onClick={() => {
                                    redirections('/payments')
                                    setIsOpen(false)
                                }}
                            >
                                Pagar
                            </Button>
                        </div>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default SidebarEnd
