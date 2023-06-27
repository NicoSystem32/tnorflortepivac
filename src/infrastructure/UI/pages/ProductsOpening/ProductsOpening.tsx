import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// components
import { LayoutContent } from '../../transverse'
import { BreadcrumbApp } from '../../components'
import { Title, ListCards, Card } from './inc'

// Icons
import { CardSVG, GraphSVG } from '../../utils/getIcons'

// styles
import { ContainerProducts } from './productsOpening-styles'

// hooks
import { useAppTour } from '../../hooks'

// utils
import { parseStringToBoolean } from '../../utils/misc'

// actions
import { getNomenclatorAction } from '../../../redux/tc'
import { validateUserStateAction } from '../../../redux/openingTC'

const enableCreditCard = process.env.REACT_APP_CREDIT_CARD_ENABLE as 'false' | 'true'

const ProductsOpening = (): JSX.Element => {
    const history = useHistory()
    const state = useLocation().state as { from: string }
    const dispatch = useDispatch()
    const [activeFlow, setActiveFlow] = useState(false)

    useAppTour()

    const redirection = (url: string, lastFrom?: string): void => {
        history.push(url, {
            lastFrom,
        })
    }

    const breadcrumbs = [
        {
            text: 'Inicio',
            active: false,
            onClick: () => {
                redirection('/home-wallet')
            },
        },
        {
            text: 'solicitud de productos',
            active: true,
        },
    ]

    // listeners
    useEffect(() => {
        dispatch(getNomenclatorAction())
        dispatch(
            validateUserStateAction(({ data }) => {
                if (data) {
                    validateBlockUsesCases([2, 5, 6, 8, 9, 13, 14], data.state)
                }
                if (data === null) {
                    setActiveFlow(true)
                }
                if (data?.state === 3) {
                    if (['3', '11'].includes(data.requestStep)) {
                        redirectToOpeningCreditCard()
                    }
                }
            })
        )
    }, [])

    // handlers
    const validateBlockUsesCases = (usesCases: number[], currentCase: number): void => {
        if (usesCases.includes(currentCase)) {
            return setActiveFlow(false)
        }
        return setActiveFlow(true)
    }

    const redirectToOpeningCreditCard = (): void => {
        if (state && state.from === 'continue-tc-request') {
            redirection('/credit-card-opening', 'PO')
        }
    }

    return (
        <LayoutContent>
            <ContainerProducts>
                <BreadcrumbApp
                    breadcrumbs={breadcrumbs}
                    onBack={() => {
                        redirection('/home-wallet')
                    }}
                />
                <Title />

                <ListCards>
                    <Card
                        data-tour="investment-tdc"
                        data-tour-act="trigger-step"
                        onClick={() => {
                            redirection('/tdc-opening')
                        }}
                        image={GraphSVG}
                        title="Inversiones TDC"
                        text="Invierte tu dinero recibiendo intereses por el tiempo de permanencia de tus recursos."
                        isActive
                    />
                    {parseStringToBoolean(enableCreditCard) && (
                        <Card
                            onClick={() => {
                                if (activeFlow) {
                                    redirection('/credit-card-opening', 'PO')
                                }
                            }}
                            image={CardSVG}
                            title="Tarjeta de crédito"
                            text="Una tarjeta pensada solo para ti, con beneficios increíbles."
                            isActive={activeFlow}
                        />
                    )}
                </ListCards>
            </ContainerProducts>
        </LayoutContent>
    )
}

export default ProductsOpening
