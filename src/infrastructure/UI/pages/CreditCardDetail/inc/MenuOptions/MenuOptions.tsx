import { useHistory } from 'react-router-dom'
import { CardStates } from '../../../../../../domain/models'
import { useSelector, portfolioPurchaseProcessSelector } from '../../../../../selectors'
import {
    IconAssignMobileSVG,
    IconFileMobileSVG,
    IconReferQuotasMobileSVG,
    ListMenu,
} from '../../../../utils/getIcons'
import {
    Dropdown,
    MenuOptionsContainer,
    OptionButton,
    OptionsContainer,
} from './menuOptions-styles'
interface MenuOptionsProps {
    stateCard: string
    quotaAvailable: number
}

const MenuOptions: React.FC<MenuOptionsProps> = ({ stateCard, quotaAvailable }): JSX.Element => {
    const history = useHistory()
    const claveAvances = true
    const { portfolioPurchaseProcess } = useSelector(portfolioPurchaseProcessSelector)

    return (
        <MenuOptionsContainer>
            <OptionsContainer>
                <OptionButton isDisable={stateCard !== CardStates.ACTIVA}>
                    <div>
                        <img className="normal" src={IconReferQuotasMobileSVG} alt="" />
                    </div>
                    <h3>Rediferir cuotas</h3>
                </OptionButton>
                {claveAvances && (
                    <OptionButton isDisable={stateCard !== CardStates.ACTIVA}>
                        <div>
                            <img className="normal" src={IconAssignMobileSVG} alt="" />
                        </div>
                        <h3>Asignar clave avances</h3>
                    </OptionButton>
                )}
                {!claveAvances && (
                    <OptionButton isDisable={stateCard !== CardStates.ACTIVA}>
                        <div>
                            <img className="normal" src={IconAssignMobileSVG} alt="" />
                        </div>
                        <h3>Cambiar clave avances</h3>
                    </OptionButton>
                )}
                <OptionButton>
                    <div>
                        <img className="small" src={IconFileMobileSVG} alt="" />
                    </div>
                    <h3>Descargar certificado</h3>
                </OptionButton>
                <OptionButton>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            <div>
                                <img className="normal" src={ListMenu} alt="" />
                                <h3>Más</h3>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                href="#/action-1"
                                disabled={stateCard === CardStates.BLOQUEO_PERDIDA_O_HURTO}
                            >
                                Bloqueo por hurto o perdida
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            {stateCard !== CardStates.BLOQUEO_TEMPORAL && (
                                <Dropdown.Item
                                    href="#/action-2"
                                    disabled={stateCard === CardStates.BLOQUEO_PERDIDA_O_HURTO}
                                >
                                    Bloquear temporalmente
                                </Dropdown.Item>
                            )}
                            {stateCard === CardStates.BLOQUEO_TEMPORAL && (
                                <Dropdown.Item href="#/action-2">Desbloquear</Dropdown.Item>
                            )}
                            <Dropdown.Divider />
                            <Dropdown.Item
                                disabled={
                                    stateCard !== CardStates.ACTIVA ||
                                    (!!portfolioPurchaseProcess &&
                                        portfolioPurchaseProcess.length > 0 &&
                                        portfolioPurchaseProcess.some(
                                            (e) => e.isCompletedInCore === true
                                        ))
                                }
                                onClick={() =>
                                    history.push('/portfolio-purchase', {
                                        lastFrom: 'CCD',
                                        quotaAvailable,
                                    })
                                }
                            >
                                Comprar Cartera
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </OptionButton>
            </OptionsContainer>
        </MenuOptionsContainer>
    )
}
export default MenuOptions
