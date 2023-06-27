import { ChangeEvent, FormEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { CreditCardSelector } from '../../../../../selectors'
import { ChevronDown, ChevronUp } from '../../../../utils/getIcons'
import {
    formatDateES,
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'

//components
import { FormError, FormPay } from '../../CreditCardDetail'
import Details from './Details'
import PaymentCardForm from '../PaymentCardForm'
import { CreditCard, TagState } from '../../../../components'

//models
import { CardStates } from '../../../../../../domain/models'
import { StoreApp } from '../../../../../redux/store/store.interface'

//styles
import {
    AccordingBodyContainer,
    Accordion,
    AccordionButton,
    CardDetailContainer,
    ImgCard,
    ProgressBar,
    SummaryMobile,
} from './cardDetail-styles'
import 'twin.macro'
import useQueryId from '../../../../hooks/useQueryId'

interface CardDetailProps {
    setShowInput: (state: boolean) => void
    showInput?: boolean
    setFormPay: (state: FormPay) => void
    formPay: FormPay
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    formError: FormError
}

const CardDetail: React.FC<CardDetailProps> = ({
    setFormPay,
    formPay,
    setShowInput,
    handleChange,
    handleSubmit,
    formError,
}): JSX.Element => {
    const { id } = useQueryId()
    const { cardData: infoCard } = useSelector((store: StoreApp) =>
        CreditCardSelector(store, String(id))
    )
    const [more, setMore] = useState(false)
    let now = 0
    if (infoCard) {
        now = (infoCard?.quotaAvailable * 100) / infoCard?.totalLimit
    }
    return (
        <CardDetailContainer>
            {infoCard && (
                <>
                    <ImgCard>
                        <CreditCard
                            isDisabled={
                                infoCard.lockType !== CardStates.ACTIVA &&
                                infoCard.lockType !== CardStates.EN_MORA
                            }
                            lastFourDigits={infoCard.lastFourDigits}
                            dateExpired={infoCard.dateExpiredCard}
                            nameCard={infoCard.nameCard}
                        />
                    </ImgCard>

                    {![
                        CardStates.POR_ACTIVAR.toString(),
                        // CardStates.ACTIVA.toString(),
                        // CardStates.EN_MORA.toString(),
                    ].includes(infoCard.lockType) && (
                        <TagState
                            stateCard={infoCard ? infoCard.lockType : ''}
                            stateCardCoopcentral={infoCard ? infoCard.lockTypeCoopCentral : ''}
                        />
                    )}
                    {infoCard.lockType !== CardStates.BLOQUEO_PERDIDA_O_HURTO && (
                        <>
                            <h3>Cupo disponible</h3>
                            <h2>
                                $ {formatValue(infoCard?.quotaAvailable, 1)}
                                <sup>{formatDecimalValue(infoCard?.quotaAvailable, 1)}</sup>
                            </h2>
                            <ProgressBar now={now} variant="warning" />
                            {/* section to mobile detail card and payment form */}
                            <SummaryMobile>
                                <AccordingBodyContainer>
                                    <div>
                                        <h3>Valor cuota</h3>
                                        <h3>
                                            $ {formatValue(infoCard.minimumPayment, 1)}
                                            <sup>
                                                {formatDecimalValue(infoCard.minimumPayment, 1)}
                                            </sup>
                                        </h3>
                                    </div>
                                    <div>
                                        <h3>Próxima cuota</h3>
                                        <h3>
                                            $ {formatValue(infoCard.totalPayment, 1)}
                                            <sup>
                                                {formatDecimalValue(infoCard.totalPayment, 1)}
                                            </sup>
                                        </h3>
                                    </div>
                                    <div>
                                        <h3>Fecha de pago</h3>
                                        <h3>{formatDateES(infoCard.dateNextPayment)}</h3>
                                    </div>
                                    <h2> </h2>
                                </AccordingBodyContainer>
                                <PaymentCardForm
                                    setFormPay={setFormPay}
                                    formPay={formPay}
                                    setShowInput={setShowInput}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    formError={formError}
                                />
                            </SummaryMobile>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    {[
                                        CardStates.ACTIVA.toString(),
                                        CardStates.BLOQUEO_TEMPORAL.toString(),
                                        CardStates.EN_MORA.toString(),
                                        CardStates.BLOQUEO_TEMPORAL_POR_MORA.toString(),
                                    ].includes(infoCard.lockType) && (
                                        <Accordion.Body>
                                            <Details infoCard={infoCard} />
                                        </Accordion.Body>
                                    )}
                                    <Accordion.Header
                                        onClick={() =>
                                            [
                                                CardStates.ACTIVA.toString(),
                                                CardStates.BLOQUEO_TEMPORAL.toString(),
                                                CardStates.EN_MORA.toString(),
                                                CardStates.BLOQUEO_TEMPORAL_POR_MORA.toString(),
                                            ].includes(infoCard.lockType) && setMore(!more)
                                        }
                                    >
                                        {!more && (
                                            <AccordionButton>
                                                <img src={ChevronDown} alt="" /> Ver más detalles
                                            </AccordionButton>
                                        )}
                                        {more && (
                                            <AccordionButton>
                                                <img src={ChevronUp} alt="" /> Ver menos
                                            </AccordionButton>
                                        )}
                                    </Accordion.Header>
                                </Accordion.Item>
                            </Accordion>
                        </>
                    )}
                    {infoCard.lockType === CardStates.BLOQUEO_PERDIDA_O_HURTO && (
                        <>
                            <p tw="lg:block hidden">
                                Tu tarjeta ha sido bloqueada definitivamente.
                            </p>
                            <div tw="block lg:hidden mb-[15px]">
                                <PaymentCardForm
                                    setFormPay={setFormPay}
                                    formPay={formPay}
                                    setShowInput={setShowInput}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    formError={formError}
                                />
                            </div>
                        </>
                    )}
                </>
            )}
        </CardDetailContainer>
    )
}
export default CardDetail
