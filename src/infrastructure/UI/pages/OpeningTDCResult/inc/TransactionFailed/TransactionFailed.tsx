/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { ArrowSVG, CircleSVG } from '../../../../utils/getIcons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

// resources
import { Transaction, TransactionFAIResponse } from '../../../../../../domain/models'

// selectors
import {
    getTransactionMultiSelector,
    getTransactionPSESelector,
    messagesSelector,
    transactionFAISelector,
} from '../../../../../selectors'

//components
import { Button } from '../../../../components'

//styles
import { DetailHead, TitleHead } from '../../OpeningTDCResult-styles'
import { DetailContentFailed } from './transactionFailed-styles'
import { cleanCreateTransactionAction } from '../../../../../redux/transaction'

const TransactionFailed = (): JSX.Element => {
    /* initial declaration */
    const history = useHistory()
    const dispatch = useDispatch()
    const { state: stateRouter } = useLocation()
    const messages = useSelector(messagesSelector)
    const { transaction: transactionPSE, message: messagePSE } =
        useSelector(getTransactionPSESelector)
    const { transaction: transactionFai, message: messageFai } = useSelector(transactionFAISelector)
    const {
        transaction: transactionMulti,
        isMultipayment,
        message: messageMulti,
    } = useSelector(getTransactionMultiSelector)

    /* states definition */
    const [{ transaction, statusMessage }, setTransactionData] = useState<{
        transaction: Transaction | TransactionFAIResponse['resultFaiPayments']
        statusMessage: string | null
    }>({ transaction: null, statusMessage: '' })

    useEffect(() => {
        if (stateRouter?.paymentType === 'FAI')
            setTransactionData({ transaction: transactionFai, statusMessage: messageFai })
        else
            setTransactionData({
                transaction: isMultipayment ? transactionMulti : transactionPSE,
                statusMessage: isMultipayment ? messageMulti : messagePSE,
            })
    }, [messageFai, messagePSE, transactionFai, transactionPSE, stateRouter?.paymentType])

    useEffect(() => {
        return () => {
            dispatch(cleanCreateTransactionAction())
        }
    }, [])

    return (
        <div>
            {transaction !== null && (
                <DetailContentFailed>
                    <div>
                        <DetailHead>
                            <div>
                                <img src={CircleSVG} alt="" />
                                {/* <div>Tu transacción no ha sido completada</div> */}
                                {/* <div>Tu TDC no ha sido constituido.</div> */}
                                <TitleHead>{statusMessage?.split('|')[0]}</TitleHead>
                            </div>
                        </DetailHead>
                        {/* <p>
                        Valida que el dinero no haya sido debitado de tu cuenta e intenta de nuevo,
                        si el problema persiste intenta nuevamente mas tarde
                    </p> */}
                        <p>{statusMessage?.split('|')[1]}</p>
                        <div>
                            <h3>Código de error</h3>
                            <p>
                                {'message' in transaction
                                    ? transaction?.message
                                    : transaction?.externalTransactionId}
                            </p>
                        </div>
                        <p>{messages.find((m) => m.name === 'problemaPersiste')?.text}</p>
                        <div>
                            <Button
                                variant="outline-cancel"
                                onClick={() => history.push('/support-private')}
                            >
                                <img src={ArrowSVG} alt="" className="" />
                                {messages.find((m) => m.name === 'tituloServicioAsociado')?.text}
                            </Button>
                        </div>
                    </div>

                    <div>
                        <Button
                            variant="outline-cancel"
                            onClick={() =>
                                transaction?.pyments[0].isTdc === 1
                                    ? history.push('/payments', { type: 'TDC' })
                                    : history.push('/payments', { type: 'TC' })
                            }
                            extend
                        >
                            Reintentar pago
                        </Button>
                        <Button
                            variant="sub-dominant"
                            onClick={() => history.push('/home-wallet')}
                            extend
                        >
                            Finalizar
                        </Button>
                    </div>
                </DetailContentFailed>
            )}
        </div>
    )
}
export default TransactionFailed
