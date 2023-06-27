import { useLocation } from 'react-router-dom'
import { Transaction, TransactionFAIResponse } from '../../../../../../domain/models'
import { TitleHead } from '../../OpeningTDCResult-styles'

interface TransactionTitleProps {
    transaction: Transaction | TransactionFAIResponse['resultFaiPayments']
}
const TransactionTitle: React.FC<TransactionTitleProps> = ({ transaction }): JSX.Element => {
    const { state: stateRouter } = useLocation()
    switch (
        transaction !== null && stateRouter?.paymentType === 'FAI' && 'methodPayment' in transaction
            ? transaction?.methodPayment
            : transaction?.paymentMethod
    ) {
        case 4:
        case 'Cuenta Fai':
            return (
                <TitleHead>
                    Hemos debitado el pago de tu
                    <span> tarjeta de crédito de tu cuenta FAI</span>
                </TitleHead>
            )
        case 3:
        case 2:
            return (
                <TitleHead>
                    Hemos
                    <span> recibido tu pago PSE</span>
                </TitleHead>
            )
        case 0:
            return (
                <TitleHead>
                    Todo listo, tu TDC ha sido
                    <span> constituido con éxito</span>
                    <p>Recibirás una notificación a tu correo con más información</p>
                </TitleHead>
            )
        default:
            return (
                <TitleHead>
                    Hemos
                    <span> recibido tu pago</span>
                </TitleHead>
            )
    }
}
export default TransactionTitle
