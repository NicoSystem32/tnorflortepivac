import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

// resources
import { Payment, Transaction, TransactionFAIResponse } from '../../../../../../domain/models'
import {
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'

// selectors
import {
    getTransactionMultiSelector,
    getTransactionPSESelector,
    transactionFAISelector,
} from '../../../../../selectors'

// styled components
import { DetailBody } from '../../OpeningTDCResult-styles'

/* renders functions */
const paymentFAI = (
    transaction: TransactionFAIResponse['resultFaiPayments'] | null
): JSX.Element => {
    return (
        <DetailBody>
            <p>Resumen del pago</p>
            <div>
                <div>
                    <h3>Medio de pago</h3>
                    <p>Débito FAI</p>
                </div>
                <div>
                    <h3>Número de cuenta</h3>
                    <p>{transaction?.numberCount || 0}</p>
                </div>
                <div>
                    <h3>Número de comprobante</h3>
                    <p>{transaction?.transaction || 0}</p>
                </div>
                <div>
                    <h3>Dirección IP</h3>
                    <p>{transaction?.ipAddress || '0.0.0.0'}</p>
                </div>
            </div>
        </DetailBody>
    )
}
const paymentPSE = (transaction: Transaction): JSX.Element => {
    return (
        <DetailBody>
            <p>Resumen del pago</p>
            <div>
                <div>
                    <h3>Medio de pago</h3>
                    <p>PSE - ACH</p>
                </div>
                <div>
                    <h3>Número CUS*</h3>
                    <p>{transaction?.trazabilityCode || '0'}</p>
                </div>
                <div>
                    <h3>Banco emisor</h3>
                    <p>{transaction?.bankName || 'No aplica'}</p>
                </div>

                <div>
                    <h3>Dirección IP</h3>
                    <p>{transaction?.ipAddress || '0.0.0.0'}</p>
                </div>
            </div>
            <h4>
                *El número CUS es el código único de seguimiento y es la referencia de pago dentro
                del banco. Solo aplica para pagos realizados con PSE
            </h4>
        </DetailBody>
    )
}
const paymentMulti = ({
    transaction,
    payPSE,
    payFai,
}: {
    transaction: Transaction
    payPSE?: Payment | null
    payFai?: Payment | null
}): JSX.Element => {
    return (
        <>
            <DetailBody>
                <p>Resumen del pago por débito FAI</p>
                <div>
                    <div>
                        <h3>Monto del pago</h3>
                        <p>
                            $ {formatValue(payFai?.value, 1)}
                            <sup>{formatDecimalValue(payFai?.value, 1)}</sup>
                        </p>
                    </div>
                    <div>
                        <h3>Número de cuenta</h3>
                        <p>{transaction?.accountFai}</p>
                    </div>
                    <div>
                        <h3>Número de comprobante</h3>
                        <p>{payFai?.externalTransactionId}</p>
                    </div>
                    <div>
                        <h3>Dirección IP</h3>
                        <p>{transaction?.ipAddress}</p>
                    </div>
                </div>
            </DetailBody>
            <DetailBody>
                <p>Resumen del pago por débito PSE</p>
                <div>
                    <div>
                        <h3>Monto del pago</h3>
                        <p>
                            $ {formatValue(payPSE?.value, 1)}
                            <sup>{formatDecimalValue(payPSE?.value, 1)}</sup>
                        </p>
                    </div>

                    <div>
                        <h3>Número CUS*</h3>
                        <p>{payPSE?.externalTransactionId}</p>
                    </div>
                    <div>
                        <h3>Banco emisor</h3>
                        <p>{transaction?.bankName}</p>
                    </div>
                </div>
                <h4>
                    *El número CUS es el código único de seguimiento y es la referencia de pago
                    dentro del banco. Solo aplica para pagos realizados con PSE
                </h4>
            </DetailBody>
        </>
    )
}

const AbstractPayment = (): JSX.Element => {
    const { state: stateRouter } = useLocation()
    const { transaction: transactionPSE } = useSelector(getTransactionPSESelector)
    const { transaction: transactionFai } = useSelector(transactionFAISelector)
    const {
        transaction: transactionMulti,
        payFai,
        payPSE,
    } = useSelector(getTransactionMultiSelector)

    switch (
        stateRouter?.paymentType === 'FAI'
            ? transactionFai?.methodPayment
            : transactionPSE?.paymentMethod
    ) {
        case 4:
        case 'Cuenta Fai':
            return paymentFAI(transactionFai)
        case 3:
        case 2:
            return paymentPSE(transactionPSE)
        case 0:
            return paymentMulti({ transaction: transactionMulti, payFai, payPSE })
        default:
            return paymentPSE(transactionPSE)
    }
}
export default AbstractPayment
