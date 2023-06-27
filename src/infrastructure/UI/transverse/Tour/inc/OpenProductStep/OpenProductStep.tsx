import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const OpenProductStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Podrás solicitar y aperturar productos{' '}
                <span className="sub-title">con un solo clic</span>
            </StepTitle>

            <p>
                Desde aquí podrás pagar tu TDC. Próximamente podrás solicitar tu tarjeta de crédito.
            </p>
        </StepContent>
    )
}

export default OpenProductStep
