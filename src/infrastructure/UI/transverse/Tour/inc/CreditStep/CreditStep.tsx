import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const CreditStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Podrás conocer <span className="sub-title">el estado de tu crédito</span> en todo
                momento
            </StepTitle>

            <p>
                Cada crédito tiene un espacio asignado, en él siempre conocerás si debes realizar
                alguna acción. Para conocer los detalles del crédito haz clic en{' '}
                <span className="highlight-text">"ver detalle".</span>
            </p>
        </StepContent>
    )
}

export default CreditStep
