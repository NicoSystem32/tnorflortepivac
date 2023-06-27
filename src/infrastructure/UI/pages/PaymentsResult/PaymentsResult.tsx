import { useEffect, useState } from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { Button } from '../../components'
import { PDFDownloadLink, usePDF } from '@react-pdf/renderer'

// redux resources
import {
    useSelector,
    messagesSelector,
    getTransactionPSESelector,
    transactionPSESelector,
    transactionFAISelector,
} from '../../../selectors'
import { transactionService } from '../../../../domain/services/User.service'

// components
import PaymentsPDF from './PaymentsPDF'
import LoadingCircle from '../../components/includes/LoadingCircle/LoadingCircle'

// icons
import {
    ArrowSVG,
    DownloadSVG,
    MailOutlineSVG,
    CircleSVG,
    CloseSVG,
    EmailSendSVG,
    ElipseGreenPNG,
    ElipseYellowPNG,
    ElipseBluePNG,
    ArrowPurplePNG,
    SharePNG,
    CheckTransactionPNG,
} from '../../utils/getIcons'

import { formatValue, formatDecimalValue } from '../../components/GlobalFuntions/globalFunction'

// styles
import './payments.scss'

// helpers
import { getBase64 } from '../../utils/misc'
import { useDispatch } from 'react-redux'
import { createTransaction, getTransactionAction } from '../../../redux/transaction'
import { useUpdateEffect } from 'usehooks-ts'
import { Pay as PayProduct, PaymentTransaction, TransactionState } from '../../../../domain/models'
import { cleanPayments } from '../../../redux/actions/paymentActions'
import { StoreApp } from '../../../redux/store/store.interface'

import queryString from 'query-string'
import OpeningTDCResult from '../OpeningTDCResult'

// hooks
import { useAuth } from '../../hooks'

Buffer.from('anything', 'base64')
// eslint-disable-next-line @typescript-eslint/no-var-requires
window.Buffer = window.Buffer || require('buffer').Buffer

let infoPDF = {}
let isReady = true

const PaymentsResult = (): JSX.Element => {
    const history = useHistory()
    const { search, state: stateRouter } = useLocation()
    const { id } = queryString.parse(search)
    const dispatch = useDispatch()
    const [isApproved, setApproved] = useState('Progress')
    const [showShared, setShowShared] = useState(false)
    const [show, setShow] = useState(true)
    const [showEmail, setShowEmail] = useState(false)
    const [messageEmail, setMessageEmail] = useState('')

    const messages = useSelector(messagesSelector)
    const state = useSelector((stateRef: any) => stateRef)
    const tokenSave = state.auth.token
    const handleClose = (): void => {
        setShow(false)
        history.push('/home-wallet')
    }
    const handleCloseShared = (): void => setShowShared(false)
    const handleCloseEmail = (): void => setShowEmail(false)
    const [isLoading, setIsLoading] = useState(false)
    const [base64, setBase64] = useState<string | ArrayBuffer | null>('')
    const { callToRefreshToken, logout } = useAuth()

    const { urlPayment } = useSelector(transactionPSESelector)

    const { isLoading: loadingFai, transaction: transactionFai } =
        useSelector(transactionFAISelector)
    const {
        isLoading: loading,
        transaction,
        status,
        message: statusMessage,
        error: statusError,
    } = useSelector(getTransactionPSESelector)

    const infoReceived = {
        loading,
        transaction,
        status,
        message: statusMessage,
        error: statusError,
    }

    const listProducts = transaction ? transaction.pyments : []
    const { total } = useSelector((stateRef: any) => stateRef.products)
    const [instance, updatePDF] = usePDF({
        document: <PaymentsPDF info={infoReceived} />,
    })

    const { status: statusTransaction } = useSelector(
        (store: StoreApp) => store.createTransactionReducer
    )

    const captureInfo = (): void => {
        const completeURL = window.location.toString()
        const allInfo = completeURL.split('?')
        const PaymentID = allInfo[1].split('=')[1]
        dispatch(getTransactionAction(PaymentID))
    }

    useEffect(() => {
        if (id) {
            captureInfo()
            setInterval(() => {
                if (!isReady) {
                    captureInfo()
                }
            }, 180000)
        }
        if (!id && stateRouter?.paymentType !== 'FAI') history.push('/not-found')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const redirections = (url: string): void => {
        history.push(url)
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        setIsLoading(true)
        transactionService
            .getTransaction('/api/Transaction/SendAttachmentPayment', tokenSave, infoPDF)
            .then((response: any) => {
                setIsLoading(false)
                handleCloseShared()
                if (response.status === 200) {
                    setMessageEmail(response.data.Message)
                    setShowEmail(true)
                    // handleClose()
                    setShow(false)
                } else if (response.status === 202) {
                    setShow(true)
                    handleCloseEmail()
                } else {
                    handleCloseEmail()
                }
            })
    }

    const closeEmailSend = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        handleCloseEmail()
        history.push('/home-wallet')
    }

    const validateStatus = (statusReceived: string | null, data: TransactionState): void => {
        if (statusReceived === '200') {
            setApproved('Approved')
            isReady = true
            setShow(false)
            dispatch(cleanPayments())
        } else if (statusReceived === '202') {
            setApproved('Progress')
            isReady = false
            dispatch(cleanPayments())
        } else {
            setApproved('Failed')
            setShow(false)
            isReady = true
        }
    }

    useEffect(() => {
        if (instance.blob !== null) {
            getBase64(instance.blob).then((result) => {
                setBase64(result)
            })
        }
    }, [instance])

    useEffect(() => {
        const baseString = base64?.toString()
        infoPDF = {
            Attachment: baseString?.substring(28),
            AttachmentName: 'ComprobantePago.pdf',
        }
    }, [base64])

    useEffect(() => {
        updatePDF()
    }, [loading])

    useUpdateEffect(() => {
        if (status === '500') {
            history.push('/not-response')
        }
    }, [status, loading, history])

    useUpdateEffect(() => {
        if (loading === false && transaction !== null)
            validateStatus(status, {
                transaction,
                status,
                message: statusMessage,
                error: statusError,
                loading,
            })
    }, [loading, status, transaction])

    const formatSendData = (): PaymentTransaction => {
        const pays: PayProduct[] = []
        for (const itemArray of listProducts) {
            const item = {
                TypeDocument: itemArray.typeDocumentProduct,
                FinishedNumber: itemArray.finishedNumber,
                document: itemArray.document,
                description: 'pse',
                value: itemArray.value,
                typePay: 0,
                origenPayment: 2,
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
            totalValuePSE: totalFloat,
            totalValueFAI: 0,
            paymentMethod: 2,
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
        if (statusTransaction === '500') {
            history.push('/not-response')
        }
        if (statusTransaction === '200') {
            window.location.href = urlPayment
        }
    }, [statusTransaction, urlPayment])

    if (
        ((transaction?.pyments[0].isTdc === 1 || transaction?.paymentMethod === 3) && !loading) ||
        ((transactionFai?.pyments[0].isTdc === 1 || transactionFai?.paymentMethod === 4) &&
            stateRouter?.paymentType === 'FAI' &&
            !loadingFai)
    ) {
        return <OpeningTDCResult />
    }

    return (
        <div>
            <div className="content-sg content-global-payment">
                <div>
                    <div className="global-content-pay conponet-only-mob">
                        <a href=" " className="content-mob-pay left">
                            <img
                                src={CloseSVG}
                                alt=""
                                className="return-img"
                                onClick={() => {
                                    history.push('/home-wallet')
                                }}
                            />
                            <p>Cerrar</p>
                        </a>
                        <a
                            href=" "
                            className="content-mob-pay right"
                            onClick={() => setShowShared(true)}
                        >
                            <p>Compartir</p>
                            <img src={SharePNG} alt="" className="return-img" />
                        </a>
                    </div>
                    {isApproved === 'Approved' ? (
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
                                                Hemos recibido tu pago PSE
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="title-table">Resumen del pago</p>
                                {transaction !== null ? (
                                    <div className="row-sub-result">
                                        <div className="content-sub-result">
                                            <p className="sub-title-pay-result">Medio de pago</p>
                                            <p className="text-pay-result">PSE - ACH</p>
                                        </div>
                                        <div className="content-sub-result">
                                            <p className="sub-title-pay-result">Número CUS</p>
                                            <p className="text-pay-result">
                                                {transaction.trazabilityCode}
                                            </p>
                                        </div>
                                        <div className="content-sub-result">
                                            <p className="sub-title-pay-result">Número IP</p>
                                            <p className="text-pay-result">
                                                {transaction.ipAddress}
                                            </p>
                                        </div>
                                        <div className="content-sub-result">
                                            <p className="sub-title-pay-result">Banco emisor</p>
                                            <p className="text-pay-result">
                                                {transaction.bankName}
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
                                          className="content-item-result content-result-variante"
                                          key={product.externalTransactionId}
                                      >
                                          <div className="item-result-basic item-with-image pay-area1">
                                              <p className="sub-title-pay-result">Producto</p>
                                              <div className="item-result-comp">
                                                  <img src={product.urlImage || ''} alt="" />
                                                  <p className="text-pay-result">
                                                      {product.nameDocument}
                                                      <br></br>
                                                      {product.document}
                                                  </p>
                                              </div>
                                          </div>
                                          <div className="item-result-basic pay-area2">
                                              <p className="sub-title-pay-result">Valor recibido</p>
                                              <p className="text-pay-result">
                                                  $ {formatValue(product.value, 1)}
                                                  <sup className="sub-indice">
                                                      {formatDecimalValue(product.value, 1)}
                                                  </sup>
                                              </p>
                                          </div>
                                          <div className="item-result-basic pay-area3">
                                              {product.status === '1' ? (
                                                  <p className="sub-title-pay-result">
                                                      Soporte contable
                                                  </p>
                                              ) : (
                                                  <p className="sub-title-pay-result">
                                                      ID de la transacción
                                                  </p>
                                              )}
                                              <p className="text-pay-result">
                                                  {product.externalTransactionId}
                                              </p>
                                          </div>
                                          {product.status === '1' ? (
                                              <div className="item-result-basic pay-area4">
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
                                          {product.status === 'REINTEGRO' ? (
                                              <div className="item-result-basic pay-area4">
                                                  <p className="sub-title-pay-result">
                                                      Estado del pago
                                                  </p>
                                                  <div className="item-result-comp-status">
                                                      <img src={ElipseBluePNG} alt="" />
                                                      <p className="text-pay-result text-blue">
                                                          Enviado a reintegro
                                                      </p>
                                                  </div>
                                              </div>
                                          ) : null}
                                          {product.status === '2' ? (
                                              <div className="item-result-basic area4 pay-area4">
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
                                          {product.status === '2' ? (
                                              <div className="option-service-item area5 only-desk pay-area5">
                                                  <Link to="/support-private">
                                                      <img src={ArrowPurplePNG} alt="" />
                                                      <p>
                                                          {
                                                              messages.find(
                                                                  (m) =>
                                                                      m.name ===
                                                                      'tituloServicioAsociado'
                                                              )?.text
                                                          }
                                                      </p>
                                                  </Link>
                                              </div>
                                          ) : null}
                                      </div>
                                  ))
                                : null}
                            <div className="content-btn-form payments content-btn-align-standar content-btn-fdcto options-out-form">
                                <div className="conponet-only-desk">
                                    <PDFDownloadLink
                                        className="without-decoration"
                                        document={<PaymentsPDF info={infoReceived} />}
                                        fileName="comprobante.pdf"
                                    >
                                        <Button className="btn-only-icon-text">
                                            <img src={DownloadSVG} alt="" className="return-img" />
                                            <p>Descargar</p>
                                        </Button>
                                    </PDFDownloadLink>
                                </div>
                                <Button
                                    className="add-more conponet-only-desk"
                                    variant="outline-cancel"
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    isLoading={isLoading}
                                >
                                    Enviar por correo
                                </Button>
                                <Button
                                    className="btn-form"
                                    variant="sub-dominant"
                                    onClick={() => redirections('/home-wallet')}
                                >
                                    Finalizar
                                </Button>
                            </div>
                        </div>
                    ) : null}

                    {isApproved === 'Failed' ? (
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
                                    <p className="text-pay-result">{transaction?.message}</p>
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
                            document={<PaymentsPDF info={infoReceived} />}
                            fileName="comprobante.pdf"
                        >
                            <Button className="btn-modal-share">
                                <img src={DownloadSVG} alt="" className="return-img" />
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
                            onClick={closeEmailSend}
                        >
                            Salir
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default PaymentsResult
