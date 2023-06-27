import { Loading } from '../../../../components'
import {
    ContributionsContainer,
    TitleGroup,
    ContributionsContent,
    LoadingContainer,
    CardContainer,
    CardHead,
    ValueCTF,
    TextCTF,
    SpacingCTF,
    TagsCCG,
    ButtonStyle,
} from './contributions-styles'

import {
    formatValue,
    formatDecimalValue,
} from '../../../../components/GlobalFuntions/globalFunction'

import { SavingAvailable } from '../../../../../../domain/models'

interface ContributionsProps {
    loadingIn: boolean
    listCards: SavingAvailable[]
    redirectionWithInfo: (url: string, data: string) => void
}
const Contributions: React.FC<ContributionsProps> = ({
    loadingIn,
    listCards,
    redirectionWithInfo,
}): JSX.Element => {
    return (
        <ContributionsContainer data-tour="contributions">
            {loadingIn && listCards.length === 0 ? (
                <LoadingContainer>
                    <Loading text="Aguarda un momento" />
                </LoadingContainer>
            ) : (
                listCards.filter(({ creditLineName }) => creditLineName === 'Aportes').length >
                    0 && (
                    <>
                        <TitleGroup data-tour="contributions-title">Aportes</TitleGroup>
                        <ContributionsContent>
                            {listCards
                                .filter(({ creditLineName }) => creditLineName === 'Aportes')
                                .map((card) => (
                                    <CardContainer
                                        key={`${card.creditNumber}-${card.finishedNumber}`}
                                        data-tour="contribution-card"
                                    >
                                        <CardHead>
                                            <img src={card.urlImageProduct} alt="icon" />
                                            <p>{card.creditLineName}</p>
                                            <span>{card.creditNumber}</span>
                                        </CardHead>
                                        {card.delinquentBalance > 0 && (
                                            <>
                                                <ValueCTF className="text-danger">
                                                    $ {formatValue(card.balanceTotal, 1)}
                                                    <sup>
                                                        {formatDecimalValue(card.balanceTotal, 1)}
                                                    </sup>
                                                </ValueCTF>
                                                <TextCTF>Saldo a la fecha</TextCTF>
                                                <TagsCCG>
                                                    <div className="mora">En mora</div>
                                                </TagsCCG>
                                            </>
                                        )}
                                        {card.delinquentBalance === 0 && (
                                            <>
                                                <ValueCTF>
                                                    $ {formatValue(card.balanceTotal, 1)}
                                                    <sup>
                                                        {formatDecimalValue(card.balanceTotal, 1)}
                                                    </sup>
                                                </ValueCTF>
                                                <TextCTF>Saldo a la fecha</TextCTF>
                                                <SpacingCTF />
                                            </>
                                        )}
                                        <ButtonStyle
                                            data-tour-hint="hint-action"
                                            data-tour-act="trigger-step"
                                            onClick={() =>
                                                redirectionWithInfo(
                                                    '/savings-detail',
                                                    `?creditNumber=${card.creditNumber}&finishedNumber=${card.finishedNumber}&typeDocumentProduct=${card.typeDocumentProduct}`
                                                )
                                            }
                                        >
                                            Ver detalles
                                        </ButtonStyle>
                                    </CardContainer>
                                ))}
                        </ContributionsContent>
                    </>
                )
            )}
        </ContributionsContainer>
    )
}

export default Contributions
