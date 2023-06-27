/* eslint-disable no-constant-condition */
import moment from 'moment'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

// components
import { Loading } from '../../../../components'

// utils
import {
    formatValue,
    formatDecimalValue,
} from '../../../../components/GlobalFuntions/globalFunction'

// Styles
import {
    SavingsContainer,
    TitleSaving,
    CardContainer,
    CardHead,
    ValueCTF,
    TextCTF,
    TagCCG,
    ButtonsContainer,
    ButtonDefault,
    ButtonDisable,
} from './savings-styles'

// models
import { SavingAvailable } from '../../../../../../domain/models'

// Icons
import { IconContributionsSVG } from '../../../../utils/getIcons'

interface SavingsProps {
    loadingIn: boolean
    listCards: SavingAvailable[]
    validateExistence: (index: string | (string | null)[] | null) => boolean
    redirectionWithInfo: (url: string, data: string) => void
    addPayment: (
        name: string,
        number: string | number,
        date: string,
        finishedNumber: string | number,
        typeDocument: string
    ) => void
}

const Savings: React.FC<SavingsProps> = ({
    loadingIn,
    listCards,
    validateExistence,
    redirectionWithInfo,
    addPayment,
}): JSX.Element => {
    const validateDate = (
        paymentDate: string | Date
    ): 'proximo a vencer' | 'Estas en mora' | 'Estas al dia' => {
        const nextPayment = moment(paymentDate)
        const now = moment(new Date())
        const diff = nextPayment.diff(now, 'days')

        if (diff >= 0 && diff <= 6) {
            return 'proximo a vencer'
        }

        if (diff < 0) {
            return 'Estas en mora'
        }

        if (diff > 6) {
            return 'Estas al dia'
        }

        return 'Estas al dia'
    }

    return (
        <>
            {listCards.filter((card) => card.creditLineName === 'Fondo Ahorro Recreativo')
                .length !== 0 && <TitleSaving>Ahorro recreativo</TitleSaving>}
            <SavingsContainer>
                {loadingIn && listCards.length === 0 ? (
                    <CardContainer>
                        <Loading text="Aguarda un momento" />
                    </CardContainer>
                ) : (
                    listCards
                        .filter(
                            (card) =>
                                card.creditLineName === 'Ahorro recreativo' ||
                                card.creditLineName === 'Fondo Ahorro Recreativo'
                        )
                        .map((card) => (
                            <CardContainer key={`${card.creditNumber}-${card.finishedNumber}`}>
                                <CardHead>
                                    <img
                                        src={
                                            card.urlImageProduct
                                                ? card.urlImageProduct
                                                : IconContributionsSVG
                                        }
                                        alt="logo"
                                    />
                                    <div>
                                        <p>{card.creditLineName}</p>
                                        <span>{card.creditNumber}</span>
                                    </div>
                                </CardHead>
                                <ValueCTF>
                                    $ {formatValue(card.balanceTotal, 1)}
                                    <sup>{formatDecimalValue(card.balanceTotal, 1)}</sup>
                                </ValueCTF>
                                <TextCTF>Saldo a la fecha</TextCTF>
                                <TagCCG>
                                    {validateDate(card.nextPaymentDate) === 'Estas al dia' && (
                                        <span className="success">Estás al día</span>
                                    )}
                                    {validateDate(card.nextPaymentDate) === 'proximo a vencer' && (
                                        <span className="to-complete">Proximo a vencer</span>
                                    )}
                                </TagCCG>
                                <ButtonsContainer>
                                    <ButtonDefault
                                        onClick={() =>
                                            redirectionWithInfo(
                                                '/tar-detail',
                                                `?creditNumber=${card.creditNumber}&finishedNumber=${card.finishedNumber}&typeDocumentProduct=${card.typeDocumentProduct}`
                                            )
                                        }
                                    >
                                        Ver detalles
                                    </ButtonDefault>
                                    {validateExistence(card.creditNumber) ? (
                                        <OverlayTrigger
                                            key="cuota"
                                            placement="bottom"
                                            overlay={
                                                <Tooltip>
                                                    Ya tienes este producto en tu billetera de pagos
                                                </Tooltip>
                                            }
                                        >
                                            <ButtonDisable>Agregar a pagos</ButtonDisable>
                                        </OverlayTrigger>
                                    ) : (
                                        <ButtonDefault
                                            onClick={() => {
                                                addPayment(
                                                    card.creditLineName,
                                                    card.creditNumber,
                                                    card.nextPaymentDate,
                                                    card.finishedNumber,
                                                    card.typeDocumentProduct
                                                )
                                            }}
                                        >
                                            Agregar a pagos
                                        </ButtonDefault>
                                    )}
                                </ButtonsContainer>
                            </CardContainer>
                        ))
                )}
            </SavingsContainer>
        </>
    )
}

export default Savings
