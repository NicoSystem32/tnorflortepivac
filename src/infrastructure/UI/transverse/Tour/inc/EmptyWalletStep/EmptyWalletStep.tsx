import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const EmptyWalletStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Los productos que vas a pagar{' '}
                <span className="sub-title">aparecerán en esta lista</span>
            </StepTitle>

            <p>En cualquier momento podrás incluir o eliminar los conceptos que deseas pagar.</p>
        </StepContent>
    )
}

export default EmptyWalletStep
