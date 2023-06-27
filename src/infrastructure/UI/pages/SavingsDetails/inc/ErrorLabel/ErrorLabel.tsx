import { ErrorLabelContainer } from './errorLabel-styles'

interface ErrorLabelProps {
    showErrors: boolean
    text?: string
}

const ErrorLabel: React.FC<ErrorLabelProps> = ({ showErrors, text }): JSX.Element => {
    return <ErrorLabelContainer>{showErrors && <p>{text}</p>}</ErrorLabelContainer>
}

export default ErrorLabel
