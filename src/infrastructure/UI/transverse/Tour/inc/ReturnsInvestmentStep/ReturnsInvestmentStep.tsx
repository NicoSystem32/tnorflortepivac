import { ReactElement } from 'react'
import 'twin.macro'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const ReturnsInvestmentStep = (): ReactElement => {
    return (
        <StepContent tw="lg:w-[40rem]">
            <StepTitle>
                Conocerás el <span className="sub-title">resultado de tu inversión</span>
            </StepTitle>

            <p>Aquí aparecerá todo el detalle de tu TDC.</p>
        </StepContent>
    )
}

export default ReturnsInvestmentStep
