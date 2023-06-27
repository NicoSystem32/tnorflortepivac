// utils
import {
    formatDateComplete,
    formatDecimalValue,
    formatValue,
} from '../../../GlobalFuntions/globalFunction'

// models
import { MovementDetail } from '../../../../../../domain/models'

// styles
import {
    MobileDetail,
    MobileDetailRow,
    MobileDetailTd,
} from '../MobileDetailTable/mobileDetailTable-styled'

interface MobileDetailScheduledProps {
    detail: MovementDetail[]
    countPage: number
}

const MobileDetailScheduled: React.FC<MobileDetailScheduledProps> = ({
    detail,
    countPage,
}): JSX.Element => {
    return (
        <MobileDetail>
            <MobileDetailRow>
                <MobileDetailTd textColor="var(--sub-dominant-color)">
                    <p>Valor ahorro programado</p>
                    <span>
                        $ {formatValue(detail[countPage - 1].savingValueProgrammed, 1)}
                        <sup>
                            {formatDecimalValue(detail[countPage - 1].savingValueProgrammed, 1)}
                        </sup>
                    </span>
                </MobileDetailTd>
                <MobileDetailTd textColor="var(--sub-dominant-color)">
                    <p>Valor ahorrado</p>
                    <span>
                        $ {formatValue(detail[countPage - 1].savingsValue, 1)}
                        <sup>{formatDecimalValue(detail[countPage - 1].savingsValue, 1)}</sup>
                    </span>
                </MobileDetailTd>
            </MobileDetailRow>
            <MobileDetailRow>
                <MobileDetailTd textColor="var(--sub-dominant-color)">
                    <p>Tasa</p>
                    <span>
                        {(parseFloat(detail[countPage - 1].creditRate) * 100).toFixed(2)}% EA
                    </span>
                </MobileDetailTd>
                <MobileDetailTd>
                    <p>Cuotas programadas</p>
                    <span>{detail[countPage - 1].savingsInstallmentsScheduled}</span>
                </MobileDetailTd>
            </MobileDetailRow>
            <MobileDetailRow>
                <MobileDetailTd>
                    <p>Cuotas efectivamente ahorradas</p>
                    <span>{detail[countPage - 1].savingInstallmentsEffective}</span>
                </MobileDetailTd>
                <MobileDetailTd>
                    <p>Fecha primer descuento</p>
                    <span>
                        {formatDateComplete(detail[countPage - 1].savingsDateFirstDiscount)}
                    </span>
                </MobileDetailTd>
            </MobileDetailRow>
            <MobileDetailRow>
                <MobileDetailTd>
                    <p>Fecha último descuento</p>
                    {detail[countPage - 1].savingsDateLastDiscount && (
                        <span>
                            {formatDateComplete(detail[countPage - 1].savingsDateLastDiscount)}
                        </span>
                    )}
                </MobileDetailTd>
                <MobileDetailTd borderBottom></MobileDetailTd>
            </MobileDetailRow>
        </MobileDetail>
    )
}

export default MobileDetailScheduled
