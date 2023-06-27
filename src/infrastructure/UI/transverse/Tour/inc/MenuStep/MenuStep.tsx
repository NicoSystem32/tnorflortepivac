import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const MenuStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Todo lo que necesitas en un <span className="sub-title">mismo lugar</span>
            </StepTitle>

            <p>Desde el menú podrás gestionar tus productos y realizar los pagos que desees.</p>
        </StepContent>
    )
}

export default MenuStep
