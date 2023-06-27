/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components
import { Loading } from '../../components/includes'
import {
    ActivateProducts,
    CardsProducts,
    ConsultProducts,
    CreditsProducts,
    EcopetrolCredit,
    GetProducts,
    Insurance,
    SavingProducts,
} from './components'
import { LayoutContent } from '../../transverse'

// Styles
import {
    ContainerHW,
    TopSection,
    SectionCards,
    SectionHW3,
    SectionHW4,
    TitleCredit,
    SectionCredits,
    CardError,
    CardErrorParagraph,
    CardErrorImage,
} from './homeWallet-styles'

import { EcopetrolCreditsContent } from './components/EcopetrolCredit/ecopetrolCredit-styles'
import { CreditsProductsContent } from './components/CreditsProducts/creditsProducts-styles'

// custom hooks
import { useAppTour } from '../../hooks'
import { useHomeWallet } from './hooks'

// utils
import { parseStringToBoolean } from '../../utils/misc'

// selectors
import { CreditCardsSelector } from '../../../selectors'

// actions
import { getCreditCardsAction } from '../../../redux/tc/tc.actions'

// models
import { CreditCard } from '../../../../domain/models'

// icons
import { ConnectionErrorSVG } from '../../utils/getIcons'

const enableCreditCard = process.env.REACT_APP_CREDIT_CARD_ENABLE as 'false' | 'true'

const findMessage = (message: string): string => message.split('|')[1]

const HomeWallet = (): JSX.Element => {
    const dispatch = useDispatch()

    // selectors
    const { data } = useSelector(CreditCardsSelector)

    // hooks
    const { credits, loadingCredits, cards, loadingCards, errorCards, errorCredits } =
        useHomeWallet()
    useAppTour()

    // listeners
    useEffect(() => {
        dispatch(getCreditCardsAction())
    }, [])

    return (
        <LayoutContent>
            <ContainerHW>
                <TopSection>
                    <GetProducts />
                    {parseStringToBoolean(enableCreditCard) && <ActivateProducts />}
                </TopSection>

                <SectionCards>
                    {loadingCards ? (
                        <>
                            {[1, 2].map((card) => (
                                <CreditsProductsContent key={card}>
                                    <div className="card-content">
                                        <Loading text="Aguarda un momento, estamos consultando la información" />
                                    </div>
                                </CreditsProductsContent>
                            ))}
                        </>
                    ) : (
                        <>
                            {errorCards.errorData && errorCredits.errorData?.message && (
                                <CardError>
                                    <CardErrorImage src={ConnectionErrorSVG} alt="Logo Error" />
                                    <CardErrorParagraph>
                                        {findMessage(errorCredits.errorData?.message)}
                                    </CardErrorParagraph>
                                </CardError>
                            )}
                            {cards
                                .filter((card) => card.title === 'Créditos disponibles')
                                .map((card) => (
                                    <CreditsProducts
                                        key={`${card.title}-${card.quotaspayable}-available-credits`}
                                        card={card}
                                    />
                                ))}
                            {cards
                                .filter((card) => card.title !== 'Créditos disponibles')
                                .map((card) => (
                                    <SavingProducts
                                        key={`${card.title}-${card.quotaspayable}-savings-products`}
                                        card={card}
                                    />
                                ))}
                        </>
                    )}
                </SectionCards>

                <SectionHW3>
                    {parseStringToBoolean(enableCreditCard) && (
                        <>
                            {data?.cards.map((card: CreditCard) => (
                                <CardsProducts info={card} key={card.lastFourDigitsEncryptedCC} />
                            ))}
                        </>
                    )}
                    {parseStringToBoolean(enableCreditCard) && <Insurance />}
                </SectionHW3>

                <SectionHW4>
                    <ConsultProducts />
                </SectionHW4>

                {credits.length > 0 && <TitleCredit>Créditos Ecopetrol</TitleCredit>}

                <SectionCredits>
                    {loadingCredits ? (
                        <EcopetrolCreditsContent>
                            <div className="card-content">
                                <Loading text="Aguarda un momento, estamos consultando la información" />
                            </div>
                        </EcopetrolCreditsContent>
                    ) : (
                        <>
                            {errorCredits.errorData && errorCredits.errorData?.message && (
                                <CardError>
                                    <CardErrorImage src={ConnectionErrorSVG} alt="Logo Error" />
                                    <CardErrorParagraph>
                                        {findMessage(errorCredits.errorData?.message)}
                                    </CardErrorParagraph>
                                </CardError>
                            )}
                            {credits.map((credit) => (
                                <EcopetrolCredit
                                    key={`${credit.creditNumber}-${credit.finishedNumber}`}
                                    credit={credit}
                                />
                            ))}
                        </>
                    )}
                </SectionCredits>
            </ContainerHW>
        </LayoutContent>
    )
}
export default HomeWallet
