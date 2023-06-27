import { ReactElement, FC, useRef } from 'react'
import { useHistory } from 'react-router-dom'

// components
import { Button } from '../../../../components'
import { CardExceptionError, MoraCard } from '..'

// styles
import { TitleStep, SpaceStep } from '../../openingCreditCard-styles'
import {
    ThirdStepExceptionsContent,
    ExceptionCtr,
    ExceptionImg,
    ExceptionNavigateLink,
    ExceptionImage,
} from './thirdStepExceptions-styles'

// icons
import { ArrowSVG, Credit1SVG, CarGifSVG, CreditCardFlowSVG } from '../../../../utils/getIcons'

// utils
import {
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'

// selectors
import { getClientValidationCCRequestSelector, useSelector } from '../../../../../selectors'

export interface ThirdStepExceptionsProps {
    exceptionType?: number
}

const ThirdStepExceptions: FC<ThirdStepExceptionsProps> = ({ exceptionType }): ReactElement => {
    const history = useHistory()
    const amountMora = useRef<number>(30000)

    // selectors
    const { clientValidation } = useSelector(getClientValidationCCRequestSelector)

    const redirection = (url: string, state?: Record<string, string | number>): void => {
        history.push(url, state)
    }

    // handlers
    const isMoraResponse = (amount: number, state: number): boolean =>
        state === 3 && amount > amountMora.current

    return (
        <>
            {exceptionType !== undefined && (
                <ThirdStepExceptionsContent>
                    <ExceptionCtr>
                        <ExceptionImg src={CreditCardFlowSVG} alt="Logo" />
                        {clientValidation !== null && (
                            <>
                                {exceptionType === 1 && (
                                    <CardExceptionError
                                        text="Para mayor información visita nuestras oficinas"
                                        title="En este momento no podemos continuar con tu solicitud"
                                        txtAlign="center"
                                    />
                                )}

                                {exceptionType === 2 && (
                                    <CardExceptionError
                                        text="Debes estar al día en todos tus productos para solicitar la
                                tarjeta de crédito Cavipetrol"
                                        title="Estás en mora en alguno de tus productos Cavipetrol"
                                        txtAlign="start"
                                        children={
                                            <>
                                                {clientValidation.validationData &&
                                                    'mortgageSavings' in
                                                        clientValidation.validationData &&
                                                    isMoraResponse(
                                                        clientValidation.validationData
                                                            .mortgageSavings,
                                                        clientValidation.state
                                                    ) && (
                                                        <MoraCard
                                                            image={Credit1SVG}
                                                            title="Saldo en mora en ahorros"
                                                            value={`${formatValue(
                                                                clientValidation.validationData
                                                                    .mortgageSavings,
                                                                1
                                                            )}${formatDecimalValue(
                                                                clientValidation.validationData
                                                                    .mortgageSavings,
                                                                1
                                                            )}`}
                                                            url="/savings-group"
                                                            type="saving"
                                                        />
                                                    )}

                                                {clientValidation.validationData &&
                                                    'mortgageCredits' in
                                                        clientValidation.validationData &&
                                                    isMoraResponse(
                                                        clientValidation.validationData
                                                            .mortgageCredits,
                                                        clientValidation.state
                                                    ) && (
                                                        <MoraCard
                                                            image={CarGifSVG}
                                                            title="Saldo en mora en créditos"
                                                            value={`${formatValue(
                                                                clientValidation.validationData
                                                                    .mortgageCredits,
                                                                1
                                                            )}${formatDecimalValue(
                                                                clientValidation.validationData
                                                                    .mortgageCredits,
                                                                1
                                                            )}`}
                                                            url="/credits-group"
                                                            type="credit"
                                                        />
                                                    )}
                                            </>
                                        }
                                    />
                                )}

                                {exceptionType === 3 && (
                                    <CardExceptionError
                                        text="Nos encontramos realizando una revisión interna, pronto te
estaremos notificando a tu correo electrónico el avance de tu
solicitud."
                                        title="Necesitamos más información"
                                        txtAlign="center"
                                        children={
                                            <Button
                                                variant="sub-dominant"
                                                type="submit"
                                                disabled={false}
                                                onClick={() => {
                                                    redirection('/product-opening')
                                                }}
                                            >
                                                Regresar
                                            </Button>
                                        }
                                    />
                                )}
                                {exceptionType === 4 && (
                                    <CardExceptionError
                                        text="Nos estamos comunicando para brindarte alternativas de
                                asegurabilidad"
                                        title="Pronto un asesor te contactará"
                                        txtAlign="start"
                                        children={
                                            <Button
                                                variant="sub-dominant"
                                                type="submit"
                                                disabled={false}
                                                onClick={() => {
                                                    redirection('/product-opening')
                                                }}
                                            >
                                                Regresar
                                            </Button>
                                        }
                                    />
                                )}
                                {exceptionType === 5 && (
                                    <CardExceptionError
                                        text="Comunícate con servicio al asociado para tener más información"
                                        title="Tienes un proceso ejecutivo en curso"
                                        txtAlign="center"
                                        children={
                                            <>
                                                <SpaceStep />
                                                <ExceptionNavigateLink to="/support-private">
                                                    <ExceptionImage src={ArrowSVG} alt="Arrow" />
                                                    <TitleStep>
                                                        Contactar a servicio al asociado
                                                    </TitleStep>
                                                </ExceptionNavigateLink>
                                            </>
                                        }
                                    />
                                )}
                            </>
                        )}
                    </ExceptionCtr>
                </ThirdStepExceptionsContent>
            )}
        </>
    )
}

export default ThirdStepExceptions
