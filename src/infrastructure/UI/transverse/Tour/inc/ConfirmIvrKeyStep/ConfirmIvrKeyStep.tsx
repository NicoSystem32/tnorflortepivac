import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const ConfirmIvrKeyStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Vas a realizar <span className="sub-title">tu primer pago</span>
            </StepTitle>

            <p>
                Para continuar con el proceso de pago debes seleccionar el botón{' '}
                <span className="highlight-text">"Siguiente"</span>
            </p>
        </StepContent>
    )
}

export default ConfirmIvrKeyStep
