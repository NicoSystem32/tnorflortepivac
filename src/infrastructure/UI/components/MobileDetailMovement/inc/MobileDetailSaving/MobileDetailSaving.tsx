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

interface MobileDetailSavingProps {
    detail: MovementDetail[]
    countPage: number
}

const MobileDetailSaving: React.FC<MobileDetailSavingProps> = ({
    detail,
    countPage,
}): JSX.Element => {
    return (
        <MobileDetail>
            <MobileDetailRow>
                <MobileDetailTd textColor="var(--sub-dominant-color)">
                    <p>Documento único</p>
                    <span>{detail[countPage - 1].uniqueDocument}</span>
                </MobileDetailTd>
                <MobileDetailTd textColor="var(--sub-dominant-color)">
                    <p>Primer pago realizado</p>
                    <span>
                        {formatDateComplete(detail[countPage - 1].contributionCavDateFirstPayment)}
                    </span>
                </MobileDetailTd>
            </MobileDetailRow>
            <MobileDetailRow>
                <MobileDetailTd>
                    <p>Ahorro permanente</p>
                    <span>
                        $ {formatValue(detail[countPage - 1].permanentCavSavingsContribution, 1)}
                        <sup>
                            {formatDecimalValue(
                                detail[countPage - 1].permanentCavSavingsContribution,
                                1
                            )}
                        </sup>
                    </span>
                </MobileDetailTd>
                <MobileDetailTd>
                    <p>Aporte social</p>
                    <span>
                        $ {formatValue(detail[countPage - 1].contributionCavContributionSocial, 1)}
                        <sup>
                            {formatDecimalValue(
                                detail[countPage - 1].contributionCavContributionSocial,
                                1
                            )}
                        </sup>
                    </span>
                </MobileDetailTd>
            </MobileDetailRow>
            <MobileDetailRow>
                <MobileDetailTd>
                    <p>Rendimientos</p>
                    <span>
                        $ {formatValue(detail[countPage - 1].contributionCavPerformance, 1)}
                        <sup>
                            {formatDecimalValue(
                                detail[countPage - 1].contributionCavPerformance,
                                1
                            )}
                        </sup>
                    </span>
                </MobileDetailTd>
                <MobileDetailTd>
                    <p>Revalorización</p>
                    <span>
                        $ {formatValue(detail[countPage - 1].contributionCavRevaluation, 1)}
                        <sup>
                            {formatDecimalValue(
                                detail[countPage - 1].contributionCavRevaluation,
                                1
                            )}
                        </sup>
                    </span>
                </MobileDetailTd>
            </MobileDetailRow>
        </MobileDetail>
    )
}

export default MobileDetailSaving
