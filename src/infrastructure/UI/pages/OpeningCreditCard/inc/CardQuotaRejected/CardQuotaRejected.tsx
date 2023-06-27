import { ReactElement, useEffect } from 'react'

// components
import { CardExceptionError, NavigationStep } from '..'

// styles
import {
    StyledCardQuotaRejected,
    ExceptionImg,
    ExceptionImage,
    ExceptionCtr,
    CardQuotaRejectedWrapper,
    ExceptionNavigateLink,
} from './cardQuoteRejected-styles'
import { SpaceStep, TitleStep } from '../../openingCreditCard-styles'

// icons
import { CreditCardFlowSVG, ArrowSVG } from '../../../../utils/getIcons'

// hooks
import { useReducerStep } from '../../hooks'

const CardQuotaRejected = (): ReactElement => {
    const [
        {
            feedback: { message },
        },
        dispatchStep,
    ] = useReducerStep()

    useEffect(() => {
        return () => {
            dispatchStep({
                type: 'SET_FEEDBACK',
                payload: {
                    code: '',
                    message: '',
                },
            })
        }
    }, [])

    return (
        <>
            <NavigationStep />
            <CardQuotaRejectedWrapper>
                <StyledCardQuotaRejected>
                    <ExceptionCtr>
                        <ExceptionImg src={CreditCardFlowSVG} alt="Logo" />
                        <CardExceptionError
                            title={
                                message
                                    ? message.split('|')[0]
                                    : 'En este momento no podemos continuar con tu solicitud'
                            }
                            text={
                                message
                                    ? message.split('|')[1]
                                    : 'Para mayor información comunícate con servicio al asociado'
                            }
                            txtAlign="center"
                        />
                        <SpaceStep />
                        <ExceptionNavigateLink to="/support-private">
                            <ExceptionImage src={ArrowSVG} alt="Arrow" />
                            <TitleStep>Contactar a servicio al asociado</TitleStep>
                        </ExceptionNavigateLink>
                    </ExceptionCtr>
                </StyledCardQuotaRejected>
            </CardQuotaRejectedWrapper>
        </>
    )
}

export default CardQuotaRejected
