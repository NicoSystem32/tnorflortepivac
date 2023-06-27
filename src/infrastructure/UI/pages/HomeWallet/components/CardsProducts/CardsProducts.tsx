// styled components
import {
    ButtonCTF,
    CardHeader,
    CardsProductsContent,
    CreditCardContainer,
    Dropdown,
} from './cardsProducts-styles'

// icons
import { CreditCardSVG, DotsMenu } from '../../../../utils/getIcons'
import { CardStates, CreditCard } from '../../../../../../domain/models'
import {
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'
import { useHistory } from 'react-router-dom'
import { TagState } from '../../../../components'

export const CardsProducts: React.FC<{ info: CreditCard }> = ({ info }): JSX.Element => {
    const history = useHistory()
    return (
        <CardsProductsContent data-tour="credit-cards">
            <p className="">Tarjetas de crédito</p>
            <CreditCardContainer>
                <div>
                    <CardHeader>
                        <div>
                            <img src={CreditCardSVG} alt="tarjeta de crédito" />
                            <div>
                                <h3>{info.nameCard}</h3>
                                <h4>**** {info.lastFourDigits}</h4>
                            </div>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                <img className="dots-menu" src={DotsMenu} alt="" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {info.lockType !== CardStates.POR_ACTIVAR && (
                                    <>
                                        <Dropdown.Item
                                            href=" "
                                            onClick={() =>
                                                history.push(
                                                    `credit-card-detail?id=${info.lastFourDigitsEncryptedCC}`
                                                )
                                            }
                                        >
                                            Ver movimientos
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href=" ">Pagar cuota</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href=" ">
                                            Descargar Certificado
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item
                                            href=" "
                                            disabled={
                                                info.lockType !== CardStates.ACTIVA &&
                                                info.lockType !== CardStates.EN_MORA
                                            }
                                        >
                                            Rediferir cuota
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item
                                            href=" "
                                            disabled={
                                                info.lockType !== CardStates.ACTIVA &&
                                                info.lockType !== CardStates.EN_MORA
                                            }
                                        >
                                            Solicitar Clave Avances
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item
                                            href=" "
                                            disabled={
                                                info.lockType !== CardStates.ACTIVA &&
                                                info.lockType !== CardStates.EN_MORA
                                            }
                                        >
                                            Bloquear Temporalmente
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item
                                            href=" "
                                            disabled={
                                                info.lockType !== CardStates.ACTIVA &&
                                                info.lockType !== CardStates.BLOQUEO_TEMPORAL &&
                                                info.lockType !== CardStates.EN_MORA
                                            }
                                        >
                                            Bloqueo por hurto
                                        </Dropdown.Item>
                                    </>
                                )}
                                {info.lockType === CardStates.POR_ACTIVAR && (
                                    <>
                                        <Dropdown.Item
                                            href=" "
                                            disabled={info.lockType === CardStates.POR_ACTIVAR}
                                            onClick={() =>
                                                history.push(
                                                    `/activate-card?id=${info.lastFourDigitsEncryptedCC}`
                                                )
                                            }
                                        >
                                            Activar tarjeta
                                        </Dropdown.Item>
                                    </>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </CardHeader>
                    <p className="value">
                        $ {formatValue(info.quotaAvailable, 1)}
                        <sup>{formatDecimalValue(info.quotaAvailable, 1)}</sup>
                    </p>
                    <p className="subtitle">Cupo disponible</p>
                    {
                        <TagState
                            stateCard={info.lockType}
                            stateCardCoopcentral={info.lockTypeCoopCentral}
                        />
                    }
                </div>

                <div className="link-section">
                    {info.lockType !== CardStates.POR_ACTIVAR && (
                        <ButtonCTF
                            onClick={() =>
                                history.push(
                                    `/credit-card-detail?id=${info.lastFourDigitsEncryptedCC}`
                                )
                            }
                        >
                            Ver detalles
                        </ButtonCTF>
                    )}
                    {info.lockType === CardStates.POR_ACTIVAR && (
                        <ButtonCTF
                            disabled={info.lockType === CardStates.POR_ACTIVAR}
                            onClick={() =>
                                history.push(`/activate-card?id=${info.lastFourDigitsEncryptedCC}`)
                            }
                        >
                            Activar tarjeta
                        </ButtonCTF>
                    )}
                </div>
            </CreditCardContainer>
        </CardsProductsContent>
    )
}
