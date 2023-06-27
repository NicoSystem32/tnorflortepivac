import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const SupportStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Siempre estaremos <span className="sub-title">para ayudarte</span>
            </StepTitle>

            <p>Desde aquí podrás contactar a nuestro equipo de servicio.</p>
        </StepContent>
    )
}

export default SupportStep
