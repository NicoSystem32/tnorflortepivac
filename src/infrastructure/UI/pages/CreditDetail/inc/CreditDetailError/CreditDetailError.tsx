import { ErrorContainer } from './creditDetailError-styles'

interface CreditDetailErrorProps {
    message: string
}

const CreditDetailError: React.FC<CreditDetailErrorProps> = ({ message }): JSX.Element => {
    return (
        <ErrorContainer>
            <p>{message}</p>
        </ErrorContainer>
    )
}

export default CreditDetailError
