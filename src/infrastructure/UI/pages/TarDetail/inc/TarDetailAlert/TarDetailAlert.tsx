// Icons
import { IconAlertYellowSVG } from '../../../../utils/getIcons'

// Styles
import { TarDetailAlertContainer } from './tarDetailAlert-styles'

const TarDetailAlert = (): JSX.Element => {
    return (
        <TarDetailAlertContainer>
            <img src={IconAlertYellowSVG} alt="logo" />
            <p>Estas próximo a cumplir el plazo al que programaste tu ahorro TAR</p>
        </TarDetailAlertContainer>
    )
}

export default TarDetailAlert
