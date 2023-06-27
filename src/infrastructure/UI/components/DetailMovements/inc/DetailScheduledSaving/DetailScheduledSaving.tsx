// models
import { MovementDetail } from '../../../../../../domain/models'

// utils
import {
    formatDateComplete,
    formatDecimalValue,
    formatValue,
} from '../../../GlobalFuntions/globalFunction'

// styles
import {
    Body,
    CardContent,
    Head,
    HorizontalLine,
    VerticalLine,
} from '../DetailData/detailData-styles'

interface DetailScheduledSavingProps {
    detail: MovementDetail
}

const DetailScheduledSaving: React.FC<DetailScheduledSavingProps> = ({ detail }): JSX.Element => {
    return (
        <>
            <Head>
                <CardContent width="33%" color="var(--sub-dominant-color)">
                    <p>Valor ahorro programado</p>
                    <span>
                        $ {formatValue(detail.savingValueProgrammed, 1)}
                        <sup>{formatDecimalValue(detail.savingValueProgrammed, 1)}</sup>
                    </span>
                </CardContent>
                <VerticalLine />
                <CardContent width="33%" padding="20px" color="var(--sub-dominant-color)">
                    <p>Valor ahorrado</p>
                    <span>
                        $ {formatValue(detail.savingsValue, 1)}
                        <sup>{formatDecimalValue(detail.savingsValue, 1)}</sup>
                    </span>
                </CardContent>
                <VerticalLine />
                <CardContent width="33%" padding="20px" color="var(--sub-dominant-color)">
                    <p>Tasa</p>
                    <span>{(parseFloat(detail.creditRate) * 100).toFixed(2)}% EA</span>
                </CardContent>
            </Head>
            <HorizontalLine />
            <Body>
                <CardContent color="var(--dominant-color-dark)">
                    <p>Cuotas programadas</p>
                    <span>{detail.savingsInstallmentsScheduled}</span>
                </CardContent>
                <VerticalLine />
                <CardContent padding="20px" color="var(--dominant-color-dark)">
                    <p>Cuotas efectivamente ahorradas</p>
                    <span>{detail.savingInstallmentsEffective}</span>
                </CardContent>
                <VerticalLine />
                <CardContent padding="20px" color="var(--dominant-color-dark)">
                    <p>Fecha primer descuento</p>
                    <span>{formatDateComplete(detail.savingsDateFirstDiscount)}</span>
                </CardContent>
                <VerticalLine />
                <CardContent padding="20px" color="var(--dominant-color-dark)">
                    <p>Fecha ultimo descuento</p>
                    {detail.savingsDateLastDiscount && (
                        <span>{formatDateComplete(detail.savingsDateLastDiscount)}</span>
                    )}
                </CardContent>
            </Body>
            <HorizontalLine />
        </>
    )
}

export default DetailScheduledSaving
