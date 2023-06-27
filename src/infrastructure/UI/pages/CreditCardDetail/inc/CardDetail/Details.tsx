import { AccordingBodyContainer } from './cardDetail-styles'
import {
    formatDateES,
    formatDecimalValue,
    formatValue,
    getNameCreditCard,
} from '../../../../components/GlobalFuntions/globalFunction'
import { CreditCard } from '../../../../../../domain/models'
import 'twin.macro'

interface DetailsProps {
    infoCard: CreditCard
}
const Details: React.FC<DetailsProps> = ({ infoCard }): JSX.Element => {
    return (
        <AccordingBodyContainer tw="lg:mx-0 mx-2">
            <h2> </h2>
            <div>
                <h3>Cupo total</h3>
                <h3>
                    $ {formatValue(infoCard.totalLimit, 1)}
                    <sup>{formatDecimalValue(infoCard.totalLimit, 1)}</sup>
                </h3>
            </div>
            <div>
                <h3>Deuda a la fecha</h3>
                <h3>
                    $ {formatValue(infoCard.availableWingDate, 1)}
                    <sup>{formatDecimalValue(infoCard.availableWingDate, 1)}</sup>
                </h3>
            </div>
            <div>
                <h3>Disponible en compras</h3>
                <h3>
                    $ {formatValue(infoCard.availableShopping, 1)}
                    <sup>{formatDecimalValue(infoCard.availableShopping, 1)}</sup>
                </h3>
            </div>
            <div>
                <h3>Disponible en avances</h3>
                <h3>
                    $ {formatValue(infoCard.availablePreviews, 1)}
                    <sup>{formatDecimalValue(infoCard.availablePreviews, 1)}</sup>
                </h3>
            </div>
            <h2>Próximos pagos</h2>
            <div>
                <h3>Fecha próximo pago</h3>
                <h3>{formatDateES(infoCard.dateNextPayment)}</h3>
            </div>
            <div>
                <h3>Fecha de corte</h3>
                <h3>{formatDateES(infoCard.cutoffDate)}</h3>
            </div>
            <h2>Sobre tu tarjeta</h2>
            <div>
                <h3>Tipo de tarjeta</h3>
                <h3>{getNameCreditCard(infoCard.typeCard)}</h3>
            </div>
            <div>
                <h3>Últimos 4 dígitos</h3>
                <h3>{infoCard.lastFourDigits}</h3>
            </div>
        </AccordingBodyContainer>
    )
}
export default Details
