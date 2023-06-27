import { useSelector, messagesSelector } from '../../../../../selectors'

// icons
import { IconAlertSVG } from '../../../../utils/getIcons'

// styles
import {
    DangerAlertContainer,
    DangerLogo,
    DangerTitle,
    DangerText,
    WrapperInfo,
} from './dangerAlert-styles'

interface DangerAlertProps {
    quotes: number
}

const DangerAlert: React.FC<DangerAlertProps> = ({ quotes }): JSX.Element => {
    const messages = useSelector(messagesSelector)
    const message = messages.find((m) => m.name === 'ponteAlDia')

    return (
        <DangerAlertContainer>
            <DangerLogo src={IconAlertSVG} alt="logo" />
            <WrapperInfo>
                <DangerTitle>{message?.title}</DangerTitle>
                <DangerText>
                    {message?.text.replace(
                        /\$\d/g,
                        (match) =>
                            ({
                                $1: quotes.toString(),
                            }[match] || '')
                    )}
                </DangerText>
            </WrapperInfo>
        </DangerAlertContainer>
    )
}

export default DangerAlert
