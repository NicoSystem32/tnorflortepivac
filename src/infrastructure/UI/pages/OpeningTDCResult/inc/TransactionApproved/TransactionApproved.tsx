/* eslint-disable react-hooks/exhaustive-deps */
import 'twin.macro'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { PDFDownloadLink, usePDF } from '@react-pdf/renderer'
import { useUpdateEffect } from 'usehooks-ts'
import { Modal } from 'react-bootstrap'

// models
import { Payment, Transaction, TransactionFAIResponse } from '../../../../../../domain/models'
// resources
import {
    cleanCreateTransactionAction,
    sendAttachmentPayment,
} from '../../../../../redux/transaction'

// selectors
import {
    getTransactionMultiSelector,
    getTransactionPSESelector,
    sendAttachmentPaymentSelector,
    transactionFAISelector,
} from '../../../../../selectors'

// helpers
import { getBase64 } from '../../../../utils/misc'

// icons
import {
    PdfSVG,
    CheckTransactionSVG,
    EmailSendSVG,
    PrintSVG,
    ArrowSVG,
} from '../../../../utils/getIcons'

// components
import TransactionVoucher from '../Documents/TransactionVoucher'
import { BreadcrumbApp, Button, ModalGeneric } from '../../../../components'
import AbstractPayment from '../AbstractPayment'

// styled components
import { ButtonShared, ButtonsShared, DetailHead } from '../../OpeningTDCResult-styles'
import {
    ButtonOptions,
    DetailContent,
    InformationProducts,
    ProductContent,
    TitleHeadTDC,
} from './transactionApproved-styles'
import TransactionTitle from '../TransactionTitle'
import ProductSummary from '../ProductSummary'
import { getPurchaseExtractFileAction } from '../../../../../redux/portfolioPurchaseTC'

const storageUrl = process.env.REACT_APP_STORAGE_URL as string
const storage = `${storageUrl}/assets/certificates`

interface TransactionApprovedProps {
    showShared?: boolean
    handleCloseShared?: () => void
}

const TransactionApproved = ({
    showShared,
    handleCloseShared,
}: TransactionApprovedProps): JSX.Element => {
    const history = useHistory()
    const { state: stateRouter } = useLocation()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [{ transaction, loading }, setTransactionData] = useState<{
        transaction: Transaction | TransactionFAIResponse['resultFaiPayments']
        loading: boolean
    }>({ transaction: null, loading: false })

    const {
        transaction: transactionMulti,
        isMultipayment,
        payFai,
        payPSE,
    } = useSelector(getTransactionMultiSelector)

    const { transaction: transactionPSE, isLoading: loadingPSE } =
        useSelector(getTransactionPSESelector)

    const { transaction: transactionFai, isLoading: loadingFai } =
        useSelector(transactionFAISelector)
    const {
        message: messageSendMail,
        status: statusSendMail,
        isLoading: loadingSendMail,
    } = useSelector(sendAttachmentPaymentSelector)

    const [base64, setBase64] = useState<string | ArrayBuffer | null>('')
    const [instance, updatePDF] = usePDF({
        document: <TransactionVoucher transaction={transaction} payPSE={payPSE} payFai={payFai} />,
    })

    const breadcrumbs = [
        {
            text: 'Inicio',
            active: false,
            onClick: () => {
                history.push('/home-wallet')
            },
        },
        {
            text: 'solicitud de productos',
            active: false,
            onClick: () => {
                history.push('/product-opening')
            },
        },
    ]

    useEffect(() => {
        return () => {
            dispatch(cleanCreateTransactionAction())
        }
    }, [])

    useEffect(() => {
        if (stateRouter?.paymentType === 'FAI')
            setTransactionData({ transaction: transactionFai, loading: loadingFai })
        else
            setTransactionData({
                transaction: isMultipayment ? transactionMulti : transactionPSE,
                loading: loadingPSE,
            })
    }, [loadingPSE, loadingFai])

    useEffect(() => {
        if (instance.blob !== null) {
            getBase64(instance.blob).then((result) => {
                setBase64(result)
            })
        }
    }, [instance])

    useEffect(() => {
        updatePDF()
    }, [transaction, loading])

    useUpdateEffect(() => {
        if (loadingSendMail === false && statusSendMail === '200') setShow(true)
    }, [statusSendMail, loadingSendMail, messageSendMail])

    /* events handlers */
    const handleClose = (): void => {
        setShow(false)
    }

    const sendEmailVoucher = (): void => {
        const baseString = base64?.toString()
        const voucherPdf = {
            Attachment: baseString?.substring(28),
            AttachmentName: 'ComprobantePago.pdf',
        }
        dispatch(sendAttachmentPayment(voucherPdf))
    }

    const downloadCertificate = (): void => {
        dispatch(
            getPurchaseExtractFileAction(
                `certificates/certificate_${transaction?.pyments[0].tdcNumber}.pdf`,
                'assets',
                (resp) => {
                    const blobResponse = new Blob([resp], {
                        type: 'application/octet-stream',
                    })
                    const downloadLink = document.createElement('a')
                    downloadLink.download = `certificate_${transaction?.pyments[0].tdcNumber}.pdf`
                    downloadLink.href = window.URL.createObjectURL(blobResponse)
                    downloadLink.click()
                    downloadLink.remove()
                    setTimeout(() => URL.revokeObjectURL(downloadLink.href), 3000)
                }
            )
        )
    }

    return (
        <div>
            <div tw="hidden lg:block">
                <BreadcrumbApp
                    breadcrumbs={transaction?.pyments[0].isTdc === 1 ? breadcrumbs : []}
                />
            </div>
            {transaction?.pyments[0].isTdc === 1 && (
                <TitleHeadTDC>
                    Solicitud de<span> TDC</span>
                </TitleHeadTDC>
            )}

            <DetailContent>
                <DetailHead>
                    <div>
                        <img src={CheckTransactionSVG} alt="" />
                        <TransactionTitle transaction={transaction} />
                    </div>
                    <p>Recibirás una notificación a tu correo con más información</p>
                </DetailHead>
                <AbstractPayment />
            </DetailContent>
            {transaction?.pyments[0].isTdc === 0 && (
                <InformationProducts>
                    <h3>Detalle de tu pago</h3>
                    <p>
                        <span> Tu pago ha sido recibido,</span> podrás visualizarlo junto con la
                        liberación de tu cupo en 24 horas.
                    </p>
                </InformationProducts>
            )}
            {transaction?.pyments.map((product: Payment) => (
                <ProductContent key={product.externalTransactionId}>
                    <ProductSummary product={product} />
                </ProductContent>
            ))}
            <ButtonOptions>
                <div>
                    {transaction?.pyments[0].isTdc === 1 && (
                        <Button
                            variant="outline-cancel"
                            disabled={Boolean(!transaction?.pyments[0].tdcNumber)}
                            onClick={downloadCertificate}
                        >
                            <img src={PdfSVG} alt="" />
                            Descargar certificado
                        </Button>
                    )}
                    <PDFDownloadLink
                        document={
                            <TransactionVoucher
                                transaction={transaction}
                                payPSE={payPSE}
                                payFai={payFai}
                            />
                        }
                        fileName="comprobante.pdf"
                    >
                        <Button variant="outline-cancel">Descargar comprobante</Button>
                    </PDFDownloadLink>
                    {transaction?.pyments[0].isTdc === 1 && (
                        <Button
                            variant="outline-cancel"
                            onClick={sendEmailVoucher}
                            isLoading={loadingSendMail}
                            disabled={loadingSendMail}
                        >
                            Enviar comprobante por correo
                        </Button>
                    )}
                </div>
                <div>
                    {transaction?.pyments[0].isTdc !== 1 && (
                        <Button
                            tw="lg:w-auto hidden lg:block"
                            variant="outline-cancel"
                            onClick={sendEmailVoucher}
                            isLoading={loadingSendMail}
                            disabled={loadingSendMail}
                        >
                            Enviar comprobante por correo
                        </Button>
                    )}
                    <Button
                        tw="lg:w-[200px] w-full"
                        variant="sub-dominant"
                        onClick={() => history.push('/home-wallet')}
                    >
                        Finalizar
                    </Button>
                </div>
            </ButtonOptions>
            <ModalGeneric
                show={show}
                handleClose={handleClose}
                img={EmailSendSVG}
                textTitle={messageSendMail?.split('|')[0] ?? ''}
                textBody={messageSendMail?.split('|')[1] ?? ''}
                handleButton={handleClose}
                textButton="Cerrar"
            />
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
                    <ButtonsShared>
                        <PDFDownloadLink
                            document={
                                <TransactionVoucher
                                    transaction={transaction}
                                    payPSE={payPSE}
                                    payFai={payFai}
                                />
                            }
                            fileName="comprobante.pdf"
                        >
                            <ButtonShared variant="outline-cancel">
                                <img src={PrintSVG} alt="" className="" />
                                <p>Descargar comprobante</p>
                            </ButtonShared>
                        </PDFDownloadLink>
                        <ButtonShared
                            variant="outline-cancel"
                            onClick={sendEmailVoucher}
                            disabled={loadingSendMail}
                            isLoading={loadingSendMail}
                        >
                            <img src={ArrowSVG} alt="" className="" />
                            <p>Enviar comprobante por correo</p>
                        </ButtonShared>
                    </ButtonsShared>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default TransactionApproved
