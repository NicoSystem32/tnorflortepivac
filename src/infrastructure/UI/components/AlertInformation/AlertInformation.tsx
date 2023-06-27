import { useSelector } from 'react-redux'

// selector
import { messagesSelector } from '../../../selectors'

// icons
import { AlertSVG } from '../../utils/getIcons'

// styles
import { AlertAddPaymentContainer } from './alertInformation-styles'

interface AlertInformationProps {
    isBigger?: boolean
    text?: string
}

const AlertInformation: React.FC<AlertInformationProps> = ({
    isBigger = false,
    text,
}): JSX.Element => {
    const messages = useSelector(messagesSelector)
    const message = !isBigger
        ? messages.find((m) => m.name === 'yaTienesElConcepto')?.text
        : messages.find((m) => m.name === 'pagoSuperiorAbono')?.text

    return (
        <AlertAddPaymentContainer>
            <img src={AlertSVG} alt="logo" />
            {text ? <p>{text}</p> : <p>{message}</p>}
        </AlertAddPaymentContainer>
    )
}

export default AlertInformation
