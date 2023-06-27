// icons
import { IconAlertSVG } from '../../utils/getIcons'

// styles
import { ErrorAddPaymentContainer } from './errorInformation-styles'

interface ErrorInformationProps {
    text?: string
}

const ErrorInformation: React.FC<ErrorInformationProps> = ({ text }): JSX.Element => {
    return (
        <>
            {text !== '' ? (
                <ErrorAddPaymentContainer>
                    <img src={IconAlertSVG} alt="logo" />
                    {text ? <p>{text}</p> : null}
                </ErrorAddPaymentContainer>
            ) : null}
        </>
    )
}

export default ErrorInformation
