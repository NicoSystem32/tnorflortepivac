import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const WalletMenuStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Control de los productos que <span className="sub-title">pagarás</span>
            </StepTitle>

            <p>Aquí te mostraremos la cantidad de productos que vas a pagar.</p>
        </StepContent>
    )
}

export default WalletMenuStep
