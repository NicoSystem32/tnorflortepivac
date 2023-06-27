import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const FinishInvestmentStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                <span className="sub-title">¡Todo listo!</span>
            </StepTitle>

            <p>
                Cuando tengas los datos completos podrás pagar tu TDC, recuerda que no será
                constituido hasta recibir el pago
            </p>
        </StepContent>
    )
}

export default FinishInvestmentStep
