import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const CreditsAvailableStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Conoce todos tus <span className="sub-title">créditos</span>
            </StepTitle>

            <p>
                Al hacer clic en el botón{' '}
                <span className="highlight-text">"Conoce tus créditos"</span> podrás visualizarlos y
                gestionarlos uno a uno.
            </p>
        </StepContent>
    )
}

export default CreditsAvailableStep
