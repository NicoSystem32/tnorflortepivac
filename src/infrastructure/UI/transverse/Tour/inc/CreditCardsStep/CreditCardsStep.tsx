import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const CreditCardsStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Puedes activar tu <span className="sub-title">tarjeta de crédito</span>
            </StepTitle>

            <p>
                Para activar tu tarjeta debes seleccionar el botón en{' '}
                <span className="highlight-text">"activar tarjeta"</span> y después debes
                diligenciar el formulario
            </p>
        </StepContent>
    )
}

export default CreditCardsStep
