import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const SavingsAddPaymentsStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Puedes agregar el <span className="sub-title">pago a realizar</span> de la opción
                que seleccionaste
            </StepTitle>

            <p>
                Selecciona el botón <span className="highlight-text">"agregar a pagos".</span>
            </p>
        </StepContent>
    )
}

export default SavingsAddPaymentsStep
