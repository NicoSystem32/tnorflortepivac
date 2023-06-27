import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const CreateInvestmentStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Elige tu inversión y{' '}
                <span className="sub-title">modalidad de pago de rendimientos</span>
            </StepTitle>

            <p>
                Ingresa el valor de tu inversión, selecciona el plazo al que deseas ahorrar y la
                modalidad de pago de tus rendimientos.
            </p>
        </StepContent>
    )
}

export default CreateInvestmentStep
