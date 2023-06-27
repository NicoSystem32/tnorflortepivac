import { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

import { useSelector, messagesSelector } from '../../../selectors'

// Icons
import {
    ArrowSVG,
    SharedSVG,
    PdfSVG,
    PrintSVG,
    CircleSVG,
    CheckTransactionSVG,
    CloseSVG,
    CreditUmbrellaSVG,
} from '../../utils/getIcons'

import { transactionService } from '../../../../domain/services/User.service'

const ProductOpeningResult = (): JSX.Element => {
    const [isApproved, setApproved] = useState('Approved')
    const messages = useSelector(messagesSelector)
    const [isReady, setReady] = useState(false)
    const state = useSelector((stateRef: any) => stateRef)
    const tokenSave = state.auth.token
    const [show, setShow] = useState(false)
    const handleClose = (): void => setShow(false)
    const [showShared, setShowShared] = useState(false)
    const handleCloseShared = (): void => setShowShared(false)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const GifLoading = require('../../assets/gifts/gif-loading.mp4')

    const captureFirtsInfo = (): void => {
        const completeURL = window.location.toString()
        const allInfo = completeURL.split('?')
        const PaymentID = allInfo[1].split('=')[1]
        transactionService
            .getStatus('/api/Transaction/GetTransaction/' + PaymentID, tokenSave)
            .then((response: any) => {
                if (response.Response == '200') {
                    setApproved('Approved')
                    setShow(false)
                } else if (response.Response == '202') {
                    setApproved('Progress')
                } else {
                    setApproved('Failed')
                    setShow(false)
                }
                setReady(true)
            })
    }

    useEffect(() => {
        captureFirtsInfo()
        if (!isReady) {
            setInterval(() => {
                captureFirtsInfo()
            }, 180000)
        }
    }, [])

    const nextStep = (): void => {
        const elementsStep1 = document.querySelectorAll('.step2-not-see')
        const elementsStep2 = document.querySelectorAll('.step2-see')
        elementsStep2?.forEach(function (userItem) {
            userItem.classList.remove('not-display')
        })
        elementsStep1?.forEach(function (userItem) {
            userItem.classList.add('not-display')
        })
    }

    return (
        <div>
            <div className="content-sg content-global-payment paymentsfai">
                <div>
                    <div className="global-content-pay conponet-only-mob">
                        <a className="content-mob-pay left">
                            <img src={CloseSVG} alt="" className="return-img" />
                            <p>Cerrar</p>
                        </a>
                        <a className="content-mob-pay right" onClick={() => setShowShared(true)}>
                            <p>Compartir</p>
                            <img src={SharedSVG} alt="" className="return-img" />
                        </a>
                    </div>
                    {isApproved == 'Approved' ? (
                        <div>
                            <div className="content-detail-cto payments payments-results transaction-approved">
                                <p className="title-table">Comprobante</p>
                                <div className="sect-title-dcto payments">
                                    <div className="title-mob-sg">
                                        <div className="content-result-pay">
                                            <img
                                                src={CheckTransactionSVG}
                                                alt=""
                                                className="return-img"
                                            />
                                            <div>
                                                <p className="title-info-sg">
                                                    Todo listo, tu TDC ha sido
                                                </p>
                                                <p className="title-info-sg">
                                                    constituido con éxito
                                                </p>
                                            </div>
                                        </div>
                                        <p>
                                            Recibirás una notificación a tu correo con más
                                            información
                                        </p>
                                    </div>
                                    <div className="title-desk-sg">
                                        <div className="content-result-pay">
                                            <img
                                                src={CheckTransactionSVG}
                                                alt=""
                                                className="return-img"
                                            />
                                            <div>
                                                <p className="title-info-sg">
                                                    Todo listo, tu TDC ha sido
                                                    <strong>&nbsp;constituido con éxito</strong>
                                                </p>
                                                <p>
                                                    Recibirás una notificación a tu correo con más
                                                    información
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="title-table">Resumen del pago</p>
                                <div className="row-sub-result">
                                    <div className="content-sub-result">
                                        <p className="sub-title-pay-result">Medio de pago</p>
                                        <p className="text-pay-result">PSE - ACH</p>
                                    </div>
                                    <div className="content-sub-result">
                                        <p className="sub-title-pay-result">Número CUS</p>
                                        <p className="text-pay-result">1234512345</p>
                                    </div>
                                    <div className="content-sub-result">
                                        <p className="sub-title-pay-result">Número IP</p>
                                        <p className="text-pay-result">700012345</p>
                                    </div>
                                    <div className="content-sub-result">
                                        <p className="sub-title-pay-result">Banco emisor</p>
                                        <p className="text-pay-result">Bancolombia</p>
                                    </div>
                                </div>
                            </div>
                            <div className="content-item-result content-item-result-open">
                                <div className="item-result-basic item-with-image itemProduct">
                                    <p className="sub-title-pay-result">Producto</p>
                                    <div className="item-result-comp">
                                        <img src={CreditUmbrellaSVG} alt="" />
                                        <p className="text-pay-result">TDC</p>
                                    </div>
                                </div>
                                <div className="content-sub-result itemValue">
                                    <p className="sub-title-pay-result">Valor de la inversión</p>
                                    <p className="text-pay-result">
                                        $ 1´500.000<sup>.00</sup>
                                    </p>
                                </div>
                                <div className="content-sub-result itemInterest">
                                    <p className="sub-title-pay-result">Tasa de interés EA</p>
                                    <p className="text-pay-result">12%</p>
                                </div>
                                <div className="content-sub-result itemNumber">
                                    <p className="sub-title-pay-result">Número de pagos</p>
                                    <p className="text-pay-result">12</p>
                                </div>
                                <div className="content-sub-result itemTitle">
                                    <p className="sub-title-pay-result">Número título digital</p>
                                    <p className="text-pay-result">123454321</p>
                                </div>
                                <div className="content-sub-result itemDocument">
                                    <p className="sub-title-pay-result">Documento único</p>
                                    <p className="text-pay-result">123454321</p>
                                </div>
                                <div className="content-sub-result itemMode">
                                    <p className="sub-title-pay-result">Modalidad de pagos</p>
                                    <p className="text-pay-result">Mensual</p>
                                </div>
                            </div>
                            <div className="content-btn-form payments open-result content-btn-align-standar content-btn-fdcto options-out-form">
                                <div className="conponet-only-desk">
                                    <div className="content-print">
                                        <img src={PdfSVG} alt="" className="return-img" />
                                        <p>Descargar certificado</p>
                                    </div>
                                </div>
                                <div className="conponet-only-desk">
                                    <div className="content-print">
                                        <p>Imprimir</p>
                                    </div>
                                </div>
                                <div className="conponet-only-desk">
                                    <div className="content-print">
                                        <p>Enviar por correo</p>
                                    </div>
                                </div>
                                <Button className="btn-form" variant="primary" onClick={nextStep}>
                                    Finalizar
                                </Button>
                            </div>
                        </div>
                    ) : null}

                    {isApproved == 'Failed' ? (
                        <div className="content-detail-cto payments payments-results transaction-declined">
                            <p className="title-table">Comprobante</p>
                            <div className="sect-title-dcto payments">
                                <div className="title-mob-sg">
                                    <div className="content-result-pay">
                                        <img src={CircleSVG} alt="" className="return-img" />
                                        <p className="title-info-sg">
                                            Tu transacción no ha<br></br>sido completada
                                        </p>
                                    </div>
                                </div>
                                <div className="title-desk-sg">
                                    <div className="content-result-pay">
                                        <img src={CircleSVG} alt="" className="return-img" />
                                        <p className="title-info-sg">
                                            Tu TDC no ha sido constituido.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-pay-declined">
                                Valida que el dinero no haya sido debitado de tu cuenta e intenta de
                                nuevo, si el problema persiste intenta nuevamente mas tarde
                            </p>
                            <div className="row-sub-result cod-error-result">
                                <div className="content-sub-result">
                                    <p className="sub-title-pay-result">Código de error</p>
                                    <p className="text-pay-result">Errorcode1234</p>
                                </div>
                            </div>
                            <p className="text-pay-declined">
                                {messages.find((m) => m.name === 'problemaPersiste')?.text}
                            </p>
                            <div id="content-customer-service" className="customer-pre-footer">
                                <img src={ArrowSVG} alt="" className="" />
                                <a>
                                    {
                                        messages.find((m) => m.name === 'tituloServicioAsociado')
                                            ?.text
                                    }
                                </a>
                            </div>
                            <div className="content-btn-form payments content-btn-align-standar content-btn-fdcto">
                                <Button
                                    className="btn-form-type-light conponet-only-desk"
                                    variant="primary"
                                    onClick={nextStep}
                                >
                                    Reintentar pago
                                </Button>
                                <Button className="btn-form" variant="primary" onClick={nextStep}>
                                    Finalizar
                                </Button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            <Modal
                show={showShared}
                onHide={handleCloseShared}
                keyboard={false}
                className="modal-shared"
                centered
            >
                <Modal.Body className="payments-shared">
                    <hr className="firts-line-shared" />
                    <hr className="second-line-shared" />
                    <div className="content-payments-shared">
                        <a href="">
                            <img src={PrintSVG} alt="" className="" />
                            <p>Imprimir</p>
                        </a>
                        <a href="">
                            <img src={ArrowSVG} alt="" className="" />
                            <p>Enviar por correo</p>
                        </a>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modal-contact-footer"
                centered
            >
                <Modal.Body className="payments">
                    <div className="content-video-login payments">
                        <video autoPlay width="70" height="70">
                            <source src={GifLoading} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <p className="title-modal-login payments">
                        {messages.find((m) => m.name === 'finalizandoPago')?.title}
                    </p>
                    <p className="text-modal-login payments">
                        {messages.find((m) => m.name === 'finalizandoPago')?.text}
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default ProductOpeningResult
