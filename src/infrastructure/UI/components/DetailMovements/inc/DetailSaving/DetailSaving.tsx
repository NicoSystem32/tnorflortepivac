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

interface DetailSavingProps {
    detail: MovementDetail
}

const DetailSaving: React.FC<DetailSavingProps> = ({ detail }): JSX.Element => {
    return (
        <>
            <Head>
                <CardContent width="50%" color="var(--sub-dominant-color)">
                    <p>Documento Único</p>
                    <span>{detail.uniqueDocument}</span>
                </CardContent>
                <VerticalLine />
                <CardContent width="50%" padding="20px" color="var(--sub-dominant-color)">
                    <p>Fechas de primer pago realizado</p>
                    <span>{formatDateComplete(detail.contributionCavDateFirstPayment)}</span>
                </CardContent>
            </Head>
            <HorizontalLine />
            <Body>
                <CardContent color="var(--dominant-color-dark)">
                    <p>Ahorro permanente</p>
                    <span>
                        $ {formatValue(detail.permanentCavSavingsContribution, 1)}
                        <sup>{formatDecimalValue(detail.permanentCavSavingsContribution, 1)}</sup>
                    </span>
                </CardContent>
                <VerticalLine />
                <CardContent padding="20px" color="var(--dominant-color-dark)">
                    <p>Aporte social</p>
                    <span>
                        $ {formatValue(detail.contributionCavContributionSocial, 1)}
                        <sup>{formatDecimalValue(detail.contributionCavContributionSocial, 1)}</sup>
                    </span>
                </CardContent>
                <VerticalLine />
                <CardContent padding="20px" color="var(--dominant-color-dark)">
                    <p>Rendimientos</p>
                    <span>
                        $ {formatValue(detail.contributionCavPerformance, 1)}
                        <sup>{formatDecimalValue(detail.contributionCavPerformance, 1)}</sup>
                    </span>
                </CardContent>
                <VerticalLine />
                <CardContent padding="20px" color="var(--dominant-color-dark)">
                    <p>Revalorización</p>
                    <span>
                        $ {formatValue(detail.contributionCavRevaluation, 1)}
                        <sup>{formatDecimalValue(detail.contributionCavRevaluation, 1)}</sup>
                    </span>
                </CardContent>
            </Body>
        </>
    )
}

export default DetailSaving
