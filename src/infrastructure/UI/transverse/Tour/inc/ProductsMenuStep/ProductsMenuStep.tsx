import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const ProductsMenuStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Gestiona tus productos <span className="sub-title">desde un mismo lugar</span>
            </StepTitle>

            <p>Administra tus productos Cavipetrol o solicita nuevos.</p>
        </StepContent>
    )
}

export default ProductsMenuStep
