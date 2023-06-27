// styles
import { SimulatorWrapper, SimulatorContent } from './formContainer-styles'

interface FormContainerProps {
    children: React.ReactNode
}

const FormContainer: React.FC<FormContainerProps> = ({ children }): JSX.Element => {
    return (
        <SimulatorWrapper>
            <SimulatorContent>{children}</SimulatorContent>
        </SimulatorWrapper>
    )
}

export default FormContainer
