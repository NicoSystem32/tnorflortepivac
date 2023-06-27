import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { Button } from '../../../../components'
import { PDFDownloadLink, usePDF } from '@react-pdf/renderer'
import { useUpdateEffect } from 'usehooks-ts'

// resources
import { Pay as PayProduct } from '../../../../../../domain/models'

// redux resources
import { useSelector, messagesSelector, transactionFAISelector } from '../../../../../selectors'

// components
import PaymentsFaiPDF from './PaymentsFaiPDF'
import LoadingCircle from '../../../../components/includes/LoadingCircle/LoadingCircle'

import {
    formatValue,
    formatDecimalValue,
} from '../../../../components/GlobalFuntions/globalFunction'
import { transactionService } from '../../../../../../domain/services/User.service'

// helpers
import { getBase64 } from '../../../../utils/misc'

// icons
import {
    ArrowSVG,
    DownloadSVG,
    MailOutlineSVG,
    CircleSVG,
    EmailSendSVG,
    CheckTransactionPNG,
    CloseSVG,
    ElipseGreenPNG,
    ElipseYellowPNG,
    SharePNG,
} from '../../../../utils/getIcons'

// styles
import './payments.scss'

import { createTransaction } from '../../../../../redux/transaction'
import { PaymentTransaction } from '../../../../../../domain/models/transaction'
import { StoreApp } from '../../../../../redux/store/store.interface'
import { useAuth } from '../../../../hooks'

Buffer.from('anything', 'base64')
// eslint-disable-next-line @typescript-eslint/no-var-requires
window.Buffer = window.Buffer || require('buffer').Buffer

let infoPDF = {}

const PaymentFaiResult = (): React.ReactElement => {
    // initial declarations
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((stateRef: any) => stateRef)
    const tokenSave = state.auth.token
    const messages = useSelector(messagesSelector)
    const {
        isLoading: loading,
        transaction,
        status,
        message: statusMessage,
        error: statusError,
    } = useSelector(transactionFAISelector)
    const infoReceived = {
        loading,
        transaction,
        status,
        message: statusMessage,
        error: statusError,
    }
    const [instance] = usePDF({
        document: <PaymentsFaiPDF info={infoReceived} />,
    })
    const { callToRefreshToken, logout } = useAuth()

    // states definition
    const [messageEmail, setMessageEmail] = useState('')
    const [showShared, setShowShared] = useState(false)
    const [show, setShow] = useState(false)
    const [showEmail, setShowEmail] = useState(false)
    const [base64, setBase64] = useState<string | ArrayBuffer | null>('')
    const [isLoading, setIsLoading] = useState(false)

    const handleCloseShared = (): void => setShowShared(false)
    const handleClose = (): void => setShow(false)
    const handleCloseEmail = (): void => setShowEmail(false)

    const listProducts = transaction ? transaction.pyments : []
    const { total } = useSelector((stateRef: any) => stateRef.products)
    const { status: statusTransaction } = useSelector(
        (store: StoreApp) => store.createTransactionReducer
    )

    useEffect(() => {
        if (instance.blob !== null) {
            getBase64(instance.blob).then((result) => {
                setBase64(result)
            })
        }
    }, [instance.blob])

    useEffect(() => {
        const baseString = String(base64)
        infoPDF = {
            Attachment: baseString.substring(28),
            AttachmentName: 'ComprobantePago.pdf',
        }
    }, [base64])

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        setIsLoading(true)
        transactionService
            .getTransaction('/api/Transaction/SendAttachmentPayment', tokenSave, infoPDF)
            .then((response: any) => {
                setIsLoading(false)
                if (response.status === 200) {
                    setMessageEmail(response.data.Message)
                    setShowEmail(true)
                } else {
                    handleCloseEmail()
                }
            })
    }

    const handleOut = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        handleCloseEmail()
        history.push('/home-wallet')
    }

    const formatSendData = (): PaymentTransaction => {
        const pays: PayProduct[] = []
        for (const itemArray of listProducts) {
            const valueFloat = itemArray.value
            const item = {
                TypeDocument: itemArray.typeDocumentProduct,
                FinishedNumber: itemArray.finishedNumber,
                Number: itemArray.finishedNumber,
                document: itemArray.document,
                description: 'fai',
                value: valueFloat,
                typePay: 1,
                origenPayment: 1,
                Term: 0,
                Rate: '0',
                PaymentMethod: '',
                NameDocument: itemArray.nameDocument,
                IdProduct: itemArray.idProduct,
            }
            pays.unshift(item as unknown as PayProduct)
        }
        const totaltemporal = parseFloat(total).toFixed(2)
        const totalFloat = parseFloat(totaltemporal)
        return {
            totalValue: totalFloat,
            totalValuePSE: 0,
            totalValueFAI: totalFloat,
            paymentMethod: 1,
            IsTdc: false,
            pays: pays,
            NormaTdc: '',
            IsExpiration: false,
        }
    }

    // events handlers
    const handleSubmitBtn = (): void => {
        const body = formatSendData()
        callToRefreshToken(() => {
            dispatch(createTransaction(body))
        }, logout)
    }

    useUpdateEffect(() => {
        if (
            statusTransaction !== '200' &&
            statusTransaction !== '400' &&
            statusTransaction !== '401'
        ) {
            history.push('/not-response')
        }
    }, [statusTransaction])

    return (
        <>
            <div className="content-sg content-global-payment">
                <div>
                    <div className="global-content-pay conponet-only-mob">
                        <a
                            className="content-mob-pay left"
                            onClick={() => {
                                history.push('/home-wallet')
                            }}
                        >
                            <img src={CloseSVG} alt="" className="return-img" />
                            <p>Cerrar</p>
                        </a>
                        <a className="content-mob-pay right" onClick={() => setShowShared(true)}>
                            <p>Compartir</p>
                            <img src={SharePNG} alt="" className="return-img" />
                        </a>
                    </div>
                    {status === '200' ? (
                        <div>
                            <div className="content-detail-cto payments payments-results transaction-approved">
                                <p className="title-table">Comprobante</p>
                                <div className="sect-title-dcto payments">
                                    <div>
                                        <div className="content-result-pay">
                                            <img
                                                src={CheckTransactionPNG}
                                                alt=""
                                                className="return-img"
                                            />
                                            <p className="title-info-sg">
                                                Hemos debitado el pago de tu cuenta FAI
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="title-table">Resumen del pago</p>
                                {transaction ? (
                                    <div className="row-sub-result">
                                        <div className="content-sub-result">
                                            <p className="sub-title-pay-result">Medio de pago</p>
                                            <p className="text-pay-result">Cuenta FAI</p>
                                        </div>
                                        <div className="content-sub-result">
                                            <p className="sub-title-pay-result">Número de cuenta</p>
                                            <p className="text-pay-result">
                                                {transaction.numberCount}
                                            </p>
                                        </div>
                                        <div className="content-sub-result">
                                            <p className="sub-title-pay-result">
                                                Número de comprobante
                                            </p>
                                            <p className="text-pay-result">
                                                {transaction.transaction}
                                            </p>
                                        </div>
                                        <div className="content-sub-result">
                                            <p className="sub-title-pay-result">Dirección IP</p>
                                            <p className="text-pay-result">
                                                {transaction.ipAddress}
                                            </p>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                            <p className="title-section-result">Detalle de tu pago</p>
                            <p className="text-section-result">
                                <strong>Tu pago ha sido recibido,</strong> a continuación te
                                mostraremos el detalle de como ha sido aplicado este pago a cada uno
                                de tus productos.
                            </p>
                            {listProducts.length !== 0
                                ? listProducts.map((product: any) => (
                                      <div
                                          className="content-item-result"
                                          key={product.externalTransactionId}
                                      >
                                          <div className="item-result-basic item-with-image">
                                              <p className="sub-title-pay-result">Producto</p>
                                              <div className="item-result-comp">
                                                  <img src={product.urlImage || ''} alt="" />
                                                  <p className="text-pay-result">
                                                      {product.nameDocument}
                                                      <br />
                                                      {product.document}
                                                  </p>
                                              </div>
                                          </div>
                                          <div className="item-result-basic">
                                              <p className="sub-title-pay-result">Valor recibido</p>
                                              <p className="text-pay-result">
                                                  $ {formatValue(product.value, 1)}
                                                  <sup className="sub-indice">
                                                      {formatDecimalValue(product.value, 1)}
                                                  </sup>
                                              </p>
                                          </div>
                                          <div className="item-result-basic">
                                              <p className="sub-title-pay-result">
                                                  Soporte contable
                                              </p>
                                              <p className="text-pay-result">
                                                  {product.externalTransactionId}
                                              </p>
                                          </div>
                                          {product.status === '1' ? (
                                              <div className="item-result-basic">
                                                  <p className="sub-title-pay-result">
                                                      Estado del pago
                                                  </p>
                                                  <div className="item-result-comp-status">
                                                      <img src={ElipseGreenPNG} alt="" />
                                                      <p className="text-pay-result text-green">
                                                          Completado
                                                      </p>
                                                  </div>
                                              </div>
                                          ) : null}
                                          {product.status === '2' ? (
                                              <div className="item-result-basic area4">
                                                  <p className="sub-title-pay-result">
                                                      Estado del pago
                                                  </p>
                                                  <div className="item-result-comp-status">
                                                      <img src={ElipseYellowPNG} alt="" />
                                                      <p className="text-pay-result text-yellow">
                                                          Pendiente de aplicar
                                                      </p>
                                                  </div>
                                              </div>
                                          ) : null}
                                      </div>
                                  ))
                                : null}
                            <div className="content-btn-form payments content-btn-align-standar content-btn-fdcto options-out-form">
                                <div className="conponet-only-desk">
                                    <PDFDownloadLink
                                        className="without-decoration"
                                        document={<PaymentsFaiPDF info={infoReceived} />}
                                        fileName="comprobante.pdf"
                                    >
                                        <Button className="btn-only-icon-text">
                                            <img src={DownloadSVG} alt="" className="return-img" />
                                            <p>Descargar</p>
                                        </Button>
                                    </PDFDownloadLink>
                                </div>
                                <Button
                                    className="btn-form-type-light conponet-only-desk"
                                    variant="primary"
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    isLoading={isLoading}
                                >
                                    Enviar por correo
                                </Button>
                                <Button
                                    className="btn-form btn-full-size-mob"
                                    variant="sub-dominant"
                                    onClick={() => {
                                        history.push('/home-wallet')
                                    }}
                                >
                                    Finalizar
                                </Button>
                            </div>
                        </div>
                    ) : null}

                    {status === '203' ? (
                        <div className="content-detail-cto payments payments-results transaction-declined">
                            <p className="title-table">Comprobante</p>
                            <div className="sect-title-dcto payments">
                                <div>
                                    <div className="content-result-pay">
                                        <img src={CircleSVG} alt="" className="return-img" />
                                        <p className="title-info-sg">
                                            {statusMessage?.split('|')[0]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-pay-declined">{statusMessage?.split('|')[1]}</p>
                            <div className="cod-error-result">
                                <div className="content-sub-result">
                                    <p className="sub-title-pay-result">Código de error</p>
                                    <p className="text-pay-result">
                                        {transaction?.externalTransactionId}
                                    </p>
                                </div>
                            </div>
                            <p className="text-pay-declined">
                                {messages.find((m) => m.name === 'problemaPersiste')?.text}
                            </p>
                            <div id="content-customer-service" className="customer-pre-footer">
                                <img src={ArrowSVG} alt="" className="" />
                                <Link to="/support-private">
                                    {
                                        messages.find((m) => m.name === 'tituloServicioAsociado')
                                            ?.text
                                    }
                                </Link>
                            </div>
                            <div className="content-btn-form payments content-btn-align-standar content-btn-fdcto">
                                <Button
                                    className="btn-form-type-light conponet-only-desk"
                                    variant="primary"
                                    onClick={handleSubmitBtn}
                                    isLoading={loading}
                                >
                                    Reintentar pago
                                </Button>
                                <Button
                                    className="btn-form"
                                    variant="sub-dominant"
                                    onClick={() => {
                                        history.push('/home-wallet')
                                    }}
                                >
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
                        <PDFDownloadLink
                            className="without-decoration"
                            document={<PaymentsFaiPDF info={infoReceived} />}
                            fileName="comprobante.pdf"
                        >
                            <Button className="btn-modal-share">
                                <img src={DownloadSVG} alt="" className="" />
                                <p>Descargar</p>
                            </Button>
                        </PDFDownloadLink>
                        <Button
                            className="btn-modal-share"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            isLoading={isLoading}
                        >
                            <img src={MailOutlineSVG} alt="" className="" />
                            <p>Enviar por correo</p>
                        </Button>
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
                        <LoadingCircle />
                    </div>
                    <p className="title-modal-login payments">
                        {messages.find((m) => m.name === 'finalizandoPago')?.title}
                    </p>
                    <p className="text-modal-login payments">
                        {messages.find((m) => m.name === 'finalizandoPago')?.text}
                    </p>
                    <div className="content-btn-form content-btn-fdcto content-btn-modal-detail">
                        <Button
                            className="btn-form btn-modal-detail btn-global"
                            variant="primary"
                            onClick={handleOut}
                        >
                            Salir
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={showEmail}
                onHide={handleCloseEmail}
                keyboard={false}
                className="modal-contact-footer modal-center"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="option-end" closeButton></Modal.Header>
                <Modal.Body className="payments content-email-send">
                    <div className="content-video-login">
                        <img src={EmailSendSVG} alt="inactive clock" className="img-options-uer" />
                    </div>
                    <p className="title-modal-login payments">{messageEmail.split('|')[0]}</p>
                    <p className="text-modal-login space-normal payments">
                        {messageEmail.split('|')[1]}
                    </p>
                    <div className="content-btn-recovery centered">
                        <Button
                            className="btn-modal-detail modal-btn sub-dominant-full"
                            variant="sub-dominant"
                            onClick={handleOut}
                        >
                            Salir
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PaymentFaiResult
