import { CreditsAvailable } from '../../../../../../domain/models'

import { TagsCCG } from './tagsCreditGroup-styles'

interface TagsCreditGroupProps {
    card: CreditsAvailable
    validateDateCreditGroup: (date: string | Date) => boolean
}
const TagsCreditGroup: React.FC<TagsCreditGroupProps> = ({
    card,
    validateDateCreditGroup,
}): JSX.Element => {
    if (card.numberInstallmentsArrears > 0) {
        return (
            <TagsCCG>
                {card.numberInstallmentsArrears < 540 ? (
                    <div className="mora">{card.numberInstallmentsArrears} días de mora</div>
                ) : (
                    <div className="mora">+540 días de mora</div>
                )}
            </TagsCCG>
        )
    }

    if (validateDateCreditGroup(card.nextPaymentDate) && card.numberInstallmentsArrears === 0) {
        return (
            <TagsCCG>
                <div className="caducity">Proximo a vencer</div>
            </TagsCCG>
        )
    }

    return (
        <TagsCCG>
            <div className="normal">Estás al día</div>
        </TagsCCG>
    )
}

export default TagsCreditGroup
