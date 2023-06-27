import { CardStates } from '../../../../domain/models'
import { IconBan, IconLockSVG } from '../../utils/getIcons'
import { Tags } from './tagState-styles'

interface TagStateProps {
    stateCard: string
    stateCardCoopcentral: string
}
const TagState: React.FC<TagStateProps> = ({ stateCard, stateCardCoopcentral }): JSX.Element => {
    switch (stateCard) {
        case CardStates.ACTIVA:
            return (
                <Tags>
                    <div className="success-tag">
                        {(stateCardCoopcentral &&
                            stateCardCoopcentral?.toUpperCase()[0] +
                                stateCardCoopcentral?.toLowerCase().substring(1)) ??
                            'Estás al día'}
                    </div>
                </Tags>
            )
        case CardStates.POR_ACTIVAR:
            return (
                <Tags>
                    <div className="active-tag">
                        {(stateCardCoopcentral &&
                            stateCardCoopcentral?.toUpperCase()[0] +
                                stateCardCoopcentral?.toLowerCase().substring(1)) ??
                            'Por activar'}
                    </div>
                </Tags>
            )
        case CardStates.BLOQUEO_TEMPORAL:
            return (
                <Tags>
                    <div className="warning-tag">
                        <img src={IconLockSVG} alt="" />{' '}
                        {(stateCardCoopcentral &&
                            stateCardCoopcentral?.toUpperCase()[0] +
                                stateCardCoopcentral?.toLowerCase().substring(1)) ??
                            'Bloqueo temporal'}
                    </div>
                </Tags>
            )
        case CardStates.BLOQUEO_TEMPORAL_POR_MORA:
            return (
                <Tags>
                    <div className="error-tag">
                        <img src={IconLockSVG} alt="" />
                        {(stateCardCoopcentral &&
                            stateCardCoopcentral?.toUpperCase()[0] +
                                stateCardCoopcentral?.toLowerCase().substring(1)) ??
                            'Bloqueo temporal por mora'}
                    </div>
                </Tags>
            )
        case CardStates.BLOQUEO_PERDIDA_O_HURTO:
            return (
                <Tags>
                    <div className="error-tag">
                        <img style={{ transform: 'rotate(90deg)' }} src={IconBan} alt="" />{' '}
                        {(stateCardCoopcentral &&
                            stateCardCoopcentral?.toUpperCase()[0] +
                                stateCardCoopcentral?.toLowerCase().substring(1)) ??
                            'Bloqueo por perdida o hurto'}
                    </div>
                </Tags>
            )
        case CardStates.EN_MORA:
            return (
                <Tags>
                    <div className="error-circle-tag">
                        {(stateCardCoopcentral &&
                            stateCardCoopcentral?.toUpperCase()[0] +
                                stateCardCoopcentral?.toLowerCase().substring(1)) ??
                            'En mora'}
                    </div>
                </Tags>
            )
        default:
            return <></>
    }
}

export default TagState
