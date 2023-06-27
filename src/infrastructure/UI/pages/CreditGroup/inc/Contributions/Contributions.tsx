/* eslint-disable jsx-a11y/img-redundant-alt */
//  components
import { Loading } from '../../../../components/includes'
import TagsCreditGroup from '../TagsCreditGroup'

import {
    formatValue,
    formatDecimalValue,
} from '../../../../components/GlobalFuntions/globalFunction'

// models & interfaces
import { CreditsAvailable } from '../../../../../../domain/models'

// icons
import { IconCreditSVG } from '../../../../utils/getIcons'

// styles
import {
    ButtonCTF,
    CardContent,
    CardNumber,
    CardsContainer,
    CardTitle,
    CardTitleContent,
    ContributionsContainer,
    TextCTF,
    ValueCTF,
} from './contributions-styles'

interface ContributionsProps {
    loading: boolean
    listCards: CreditsAvailable[]
    validateDateCreditGroup: (date: string | Date) => boolean
    redirectionWithInfo: (url: string, data: string) => void
}

const Contributions: React.FC<ContributionsProps> = ({
    loading,
    listCards,
    validateDateCreditGroup,
    redirectionWithInfo,
}): JSX.Element => {
    return (
        <ContributionsContainer>
            <CardsContainer>
                {loading ? (
                    <>
                        {[1, 2, 3].map((card) => (
                            <CardContent key={card} style={{ display: 'flex' }}>
                                <Loading text="Aguarda un momento" />
                            </CardContent>
                        ))}
                    </>
                ) : (
                    listCards.map(
                        (card) =>
                            card.balanceTotal !== 0 && (
                                <CardContent
                                    key={`${card.creditNumber}-${card.finishedNumber}`}
                                    data-tour="credit-overview"
                                >
                                    <CardTitleContent>
                                        <img
                                            src={
                                                card.urlImageProduct
                                                    ? card.urlImageProduct
                                                    : IconCreditSVG
                                            }
                                            className="icon"
                                            alt="image"
                                        />
                                        <CardTitle>{card.creditLineName}</CardTitle>
                                        <CardNumber>
                                            {card.creditNumber}-{card.finishedNumber}
                                        </CardNumber>
                                    </CardTitleContent>
                                    {card.numberInstallmentsArrears > 0 ? (
                                        <div>
                                            <ValueCTF className="mora">
                                                $ {formatValue(card.balanceTotal, 1)}
                                                <sup>
                                                    {formatDecimalValue(card.balanceTotal, 1)}
                                                </sup>
                                            </ValueCTF>
                                            <TextCTF>Saldo en mora</TextCTF>
                                        </div>
                                    ) : (
                                        <div>
                                            <ValueCTF>
                                                $ {formatValue(card.balanceTotal, 1)}
                                                <sup>
                                                    {formatDecimalValue(card.balanceTotal, 1)}
                                                </sup>
                                            </ValueCTF>
                                            <TextCTF>Saldo a la fecha</TextCTF>
                                        </div>
                                    )}
                                    <TagsCreditGroup
                                        card={card}
                                        validateDateCreditGroup={validateDateCreditGroup}
                                    />
                                    <ButtonCTF
                                        data-tour-hint="hint-action"
                                        data-tour-act="trigger-step"
                                        onClick={() =>
                                            redirectionWithInfo(
                                                '/credits-detail',
                                                `?creditNumber=${card.creditNumber}&finishedNumber=${card.finishedNumber}&typeDocumentProduct=${card.typeDocumentProduct}`
                                            )
                                        }
                                    >
                                        Ver detalle
                                    </ButtonCTF>
                                </CardContent>
                            )
                    )
                )}
            </CardsContainer>
        </ContributionsContainer>
    )
}

export default Contributions
