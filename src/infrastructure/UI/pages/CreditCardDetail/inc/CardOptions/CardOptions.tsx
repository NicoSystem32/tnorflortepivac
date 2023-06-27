import { useHistory } from 'react-router-dom'
import { CardStates } from '../../../../../../domain/models'
import { useSelector, portfolioPurchaseProcessSelector } from '../../../../../selectors'
import {
    IconAssignSVG,
    IconBuyPortfolioSVG,
    IconChangePassSVG,
    IconFileCertificateSVG,
    IconLockLightSVG,
    IconLockOpenSVG,
    IconLockSVG,
    IconReferQuotasSVG,
} from '../../../../utils/getIcons'
import { CardOptionsContainer, OptionButton } from './cardOptions-styles'

interface CardOptionsProps {
    stateCard: string
    quotaAvailable: number
}

const CardOptions: React.FC<CardOptionsProps> = ({ stateCard, quotaAvailable }): JSX.Element => {
    const history = useHistory()
    const claveAvances = true
    const { portfolioPurchaseProcess } = useSelector(portfolioPurchaseProcessSelector)

    return (
        <CardOptionsContainer>
            <OptionButton>
                <div>
                    <img className="small" src={IconFileCertificateSVG} alt="" />
                </div>
                <h3>Certificado</h3>
            </OptionButton>
            {stateCard !== CardStates.BLOQUEO_PERDIDA_O_HURTO && (
                <>
                    <OptionButton
                        isDisable={
                            ![CardStates.ACTIVA.toString(), CardStates.EN_MORA.toString()].includes(
                                stateCard
                            ) ||
                            (!!portfolioPurchaseProcess &&
                                portfolioPurchaseProcess.length > 0 &&
                                portfolioPurchaseProcess.some((e) => e.isCompletedInCore === true))
                        }
                        onClick={() => {
                            if (
                                stateCard === CardStates.ACTIVA &&
                                !(
                                    !!portfolioPurchaseProcess &&
                                    portfolioPurchaseProcess.length > 0 &&
                                    portfolioPurchaseProcess.some(
                                        (e) => e.isCompletedInCore === true
                                    )
                                )
                            ) {
                                history.push(`/portfolio-purchase`, {
                                    lastFrom: 'CCD',
                                    quotaAvailable,
                                })
                            }
                        }}
                    >
                        <div>
                            <img className="normal" src={IconBuyPortfolioSVG} alt="" />
                        </div>
                        <h3>Comprar cartera</h3>
                    </OptionButton>
                    <OptionButton
                        isDisable={
                            ![CardStates.ACTIVA.toString(), CardStates.EN_MORA.toString()].includes(
                                stateCard
                            )
                        }
                    >
                        <div>
                            <img className="normal" src={IconReferQuotasSVG} alt="" />
                        </div>
                        <h3>Rediferir cuotas</h3>
                    </OptionButton>
                    {claveAvances && (
                        <OptionButton
                            isDisable={
                                ![
                                    CardStates.ACTIVA.toString(),
                                    CardStates.EN_MORA.toString(),
                                ].includes(stateCard)
                            }
                        >
                            <div>
                                <img className="normal" src={IconAssignSVG} alt="" />
                            </div>
                            <h3>Asignar clave avances</h3>
                        </OptionButton>
                    )}
                    {!claveAvances && (
                        <OptionButton
                            isDisable={
                                ![
                                    CardStates.ACTIVA.toString(),
                                    CardStates.EN_MORA.toString(),
                                ].includes(stateCard)
                            }
                        >
                            <div>
                                <img className="normal" src={IconChangePassSVG} alt="" />
                            </div>
                            <h3>Cambiar clave avances</h3>
                        </OptionButton>
                    )}
                    {stateCard !== CardStates.BLOQUEO_TEMPORAL && (
                        <OptionButton
                            isDisable={stateCard === CardStates.BLOQUEO_TEMPORAL_POR_MORA}
                        >
                            <div>
                                <img className="small" src={IconLockLightSVG} alt="" />
                            </div>
                            <h3>Bloquear temporalmente</h3>
                        </OptionButton>
                    )}
                    {stateCard === CardStates.BLOQUEO_TEMPORAL && (
                        <OptionButton>
                            <div>
                                <img className="normal" src={IconLockOpenSVG} alt="" />
                            </div>
                            <h3>Desbloquear</h3>
                        </OptionButton>
                    )}
                    <OptionButton>
                        <div>
                            <img className="small" src={IconLockSVG} alt="" />
                        </div>
                        <h3>Bloqueo por hurto</h3>
                    </OptionButton>
                </>
            )}
        </CardOptionsContainer>
    )
}
export default CardOptions
