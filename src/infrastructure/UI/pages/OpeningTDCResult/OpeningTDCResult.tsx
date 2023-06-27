/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import {
    useSelector,
    messagesSelector,
    getTransactionPSESelector,
    transactionFAISelector,
    getTransactionMultiSelector,
} from '../../../selectors'

// Icons
import { SharedSVG, CloseSVG } from '../../utils/getIcons'

import queryString from 'query-string'

import { useDispatch } from 'react-redux'
import { getTransactionAction } from '../../../redux/transaction'

//components
import { TransactionApproved, TransactionFailed } from './inc'
import { Modal } from 'react-bootstrap'
import LoadingCircle from '../../components/includes/LoadingCircle'

//styles
import 'twin.macro'
import { LayoutContent } from '../../transverse'
import { OptionsShare, TDCResultContainer } from './OpeningTDCResult-styles'
import { Transaction, TransactionFAIResponse } from '../../../../domain/models'

const OpeningTDCResult = (): JSX.Element => {
    // initial declarations
    const history = useHistory()
    const messages = useSelector(messagesSelector)
    const dispatch = useDispatch()
    const { search, state: stateRouter } = useLocation()
    const { id: paymentID } = queryString.parse(search)
    const isFAI = stateRouter?.paymentType === 'FAI'
    const [{ transaction }, setTransactionData] = useState<{
        transaction: Transaction | TransactionFAIResponse['resultFaiPayments']
        loadingTransaction: boolean
    }>({ transaction: null, loadingTransaction: false })

    const { transaction: transactionMulti, isMultipayment } = useSelector(
        getTransactionMultiSelector
    )

    const {
        isLoading: loading,
        status,
        transaction: transactionPSE,
    } = useSelector(getTransactionPSESelector)
    const {
        isLoading: loadingFai,
        status: statusFai,
        transaction: transactionFai,
    } = useSelector(transactionFAISelector)

    // states definition
    const [showLoading, setShowLoading] = useState(false)
    const [showShared, setShowShared] = useState(false)

    const captureFirstInfo = useCallback((): void => {
        typeof paymentID === 'string' && dispatch(getTransactionAction(paymentID))
    }, [paymentID])

    useEffect(() => {
        if (!isFAI) {
            let intervalo: NodeJS.Timer | null = null
            setShowLoading(status === '202')

            if (status === '202' && !loading) {
                intervalo = setInterval(() => {
                    captureFirstInfo()
                }, 180000)
            } else if (intervalo !== null) {
                clearInterval(intervalo)
                setShowLoading(false)
            }
            if (
                status !== '200' &&
                status !== '202' &&
                status !== '203' &&
                status !== '401' &&
                !loading
            ) {
                history.push('/not-response')
            }

            return () => {
                if (intervalo !== null) clearInterval(intervalo)
            }
        }
    }, [loading, status, isFAI, captureFirstInfo, history])

    useEffect(() => {
        if (stateRouter?.paymentType === 'FAI')
            setTransactionData({ transaction: transactionFai, loadingTransaction: loadingFai })
        else
            setTransactionData({
                transaction: isMultipayment ? transactionMulti : transactionPSE,
                loadingTransaction: loading,
            })
    }, [loading, loadingFai])

    // events handlers
    const handleCloseShared = (): void => {
        setShowShared(false)
    }

    const handleShowLoading = (): void => {
        setShowLoading(false)
        history.push('/home-wallet')
    }

    return (
        <LayoutContent>
            <TDCResultContainer>
                <OptionsShare>
                    <div
                        onClick={() =>
                            transaction?.pyments[0].isTdc === 1
                                ? history.push('/product-opening')
                                : history.push('/home-wallet')
                        }
                    >
                        <img src={CloseSVG} alt="" />
                        <p>Cerrar</p>
                    </div>
                    {(status === '200' || statusFai === '200') && (
                        <div onClick={() => setShowShared(true)}>
                            <p>Compartir</p>
                            <img src={SharedSVG} alt="" />
                        </div>
                    )}
                </OptionsShare>

                {((status === '200' && !isFAI && !loading) ||
                    (statusFai === '200' && isFAI && !loadingFai)) && (
                    <TransactionApproved
                        showShared={showShared}
                        handleCloseShared={handleCloseShared}
                    />
                )}

                {((status === '203' && !isFAI && !loading) ||
                    (statusFai !== '200' && isFAI && !loadingFai)) && <TransactionFailed />}
            </TDCResultContainer>

            <Modal
                show={showLoading}
                onHide={handleShowLoading}
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
        </LayoutContent>
    )
}
export default OpeningTDCResult
