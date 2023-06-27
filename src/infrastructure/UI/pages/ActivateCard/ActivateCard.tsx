/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { StoreApp } from '../../../redux/store/store.interface'
import { CreditCardSelector, CreditCardsSelector } from '../../../selectors'
import { BreadcrumbApp, Loading } from '../../components'
import { LayoutContent } from '../../transverse'
import { ActivateCardContainer, ActivateCardTitle } from './activateCard-styles'
import { FirstStep, SecondStep } from './inc'
import { useReducerActivateCard } from './hooks'
import useQueryId from '../../hooks/useQueryId'
import {
    cleanSendCodeOtpTCAction,
    cleanValidateCodeOtpTCAction,
    getCreditCardsAction,
} from '../../../redux/tc'
import { CardStates, CreditCard } from '../../../../domain/models'

const ActivateCard = (): ReactElement => {
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const { id } = useQueryId()
    const [{ currentStep }, setActivateCardState] = useReducerActivateCard()
    const { cardData: infoCard } = useSelector((store: StoreApp) =>
        CreditCardSelector(store, String(id))
    )
    const {
        data: cardsData,
        loading: loadingCards,
        status: statusCards,
    } = useSelector(CreditCardsSelector)
    const breadcrumbs = [
        {
            text: 'Inicio',
            active: false,
            onClick: () => {
                history.push('/home-wallet')
            },
        },
        {
            text: 'Tarjeta de crédito',
            active: false,
        },
        {
            text: `Activación ${infoCard?.lastFourDigits}`,
            active: true,
        },
    ]

    useEffect(() => {
        validateCards()
    }, [])
    useEffect(() => {
        validationId()
    }, [loadingCards])

    const validateCards = (): void => {
        if (!cardsData && !loadingCards) {
            dispatch(getCreditCardsAction())
        }
    }

    const validationId = (): void => {
        if (id) {
            return
        } else if (
            !id &&
            location?.state?.from === 'continue-activate-card' &&
            !loadingCards &&
            cardsData
        ) {
            const activeCard = cardsData.cards.find(
                (cardSelected: CreditCard) => cardSelected.lockType === CardStates.POR_ACTIVAR
            )
            if (activeCard) {
                history.push(`/activate-card?id=${activeCard.lastFourDigitsEncryptedCC}`)
            } else {
                history.push('/home-wallet')
            }
        } else if (
            (!id && location?.state?.from !== 'continue-activate-card') ||
            (!loadingCards && statusCards !== '200')
        ) {
            history.push('/home-wallet')
        }
    }

    const _onBack = (): void => {
        if (currentStep === 2) {
            dispatch(cleanValidateCodeOtpTCAction())
            dispatch(cleanSendCodeOtpTCAction())
            setActivateCardState({ type: 'PREV_STEP' })
        } else {
            history.push('/home-wallet')
        }
    }
    return (
        <LayoutContent>
            <ActivateCardContainer>
                {loadingCards && <Loading />}
                {!loadingCards && cardsData && id && (
                    <>
                        <div>
                            <BreadcrumbApp breadcrumbs={breadcrumbs} onBack={() => _onBack()} />
                        </div>
                        <ActivateCardTitle>
                            <span>Activa</span> tu tarjeta de crédito
                        </ActivateCardTitle>
                        {
                            {
                                1: <FirstStep />,
                                2: <SecondStep />,
                            }[currentStep]
                        }
                    </>
                )}
            </ActivateCardContainer>
        </LayoutContent>
    )
}
export default ActivateCard
