import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const InvestmentTDCStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Conoce cómo <span className="sub-title">solicitar un TDC</span>
            </StepTitle>
            <p>
                Para iniciar el proceso debes seleccionar la opción de{' '}
                <span className="highlight-text">"Inversiones TDC"</span>.
            </p>
        </StepContent>
    )
}

export default InvestmentTDCStep
