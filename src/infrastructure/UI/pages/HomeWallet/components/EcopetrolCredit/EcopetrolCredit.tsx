// styled components
import { EcopetrolCreditsContent } from './ecopetrolCredit-styles'

// resources
import {
    formatValue,
    formatDecimalValue,
} from '../../../../components/GlobalFuntions/globalFunction'
import { CreditsConsolidate } from '../../../../../../domain/models'

// icons

interface EcopetrolCreditProps {
    credit: CreditsConsolidate
}

export const EcopetrolCredit: React.FC<EcopetrolCreditProps> = ({ credit }): JSX.Element => {
    return (
        <EcopetrolCreditsContent>
            <div className="card-content">
                <div className="img-container">
                    <img src={credit.urlImageProduct} className="" alt="" />
                    <p className="title">
                        {credit.creditName}
                        <br></br>
                        <strong className="subtitle">{credit.creditNumber}</strong>
                    </p>
                </div>
                {credit.balanceTotal > 0 ? (
                    <div>
                        <p className="value">
                            $ {formatValue(credit.balanceTotal, 1)}
                            <sup>{formatDecimalValue(credit.balanceTotal, 1)}</sup>
                        </p>
                        <p className="subtitle">Saldo a la fecha</p>
                    </div>
                ) : (
                    <div>
                        <p className="value mora">
                            $ {formatValue(credit.balanceTotal, 1)}
                            <sup>{formatDecimalValue(credit.balanceTotal, 1)}</sup>
                        </p>
                        <p className="subtitle mora">Saldo en mora</p>
                    </div>
                )}
            </div>
        </EcopetrolCreditsContent>
    )
}
