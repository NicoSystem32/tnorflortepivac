// models
import { MovementDetail } from '../../../../../../domain/models'

// utils
import {
    formatDateComplete,
    formatDecimalValue,
    formatValue,
} from '../../../GlobalFuntions/globalFunction'

// styles
import { Body, CardContent, HorizontalLine, VerticalLine } from '../DetailData/detailData-styles'

interface DetailCreditProps {
    details: MovementDetail[]
}

const DetailCredit: React.FC<DetailCreditProps> = ({ details }): JSX.Element => {
    return (
        <>
            {details.map((detail) => (
                <div key={detail.uniqueDocument}>
                    <Body>
                        <CardContent color="var(--dominant-color-dark)">
                            <p>Fecha de inicio</p>
                            <span>{formatDateComplete(detail.creditStartDate)}</span>
                        </CardContent>
                        <VerticalLine />
                        <CardContent padding="20px" width="17%" color="var(--dominant-color-dark)">
                            <p>Periodo</p>
                            <span>{detail.creditPeriod}</span>
                        </CardContent>
                        <VerticalLine />
                        <CardContent padding="20px" width="17%" color="var(--dominant-color-dark)">
                            <p>Cuotas pactadas</p>
                            <span>{detail.creditQuotasAgreed}</span>
                        </CardContent>
                        <VerticalLine />
                        <CardContent padding="20px" width="17%" color="var(--dominant-color-dark)">
                            <p>Cuotas faltantes</p>
                            <span>{detail.creditFeesMissing}</span>
                        </CardContent>
                        <VerticalLine />
                        <CardContent padding="20px" width="18%" color="var(--dominant-color-dark)">
                            <p>Valor cuota</p>
                            <span>
                                $ {formatValue(detail.creditValueQuota, 1)}
                                <sup>{formatDecimalValue(detail.creditValueQuota, 1)}</sup>
                            </span>
                        </CardContent>
                        <VerticalLine />
                        <CardContent padding="20px" width="14%" color="var(--dominant-color-dark)">
                            <p>Tasa</p>
                            <span>{(parseFloat(detail.creditRate) * 100).toFixed(2)}%</span>
                        </CardContent>
                    </Body>
                    <HorizontalLine />
                </div>
            ))}
        </>
    )
}

export default DetailCredit
