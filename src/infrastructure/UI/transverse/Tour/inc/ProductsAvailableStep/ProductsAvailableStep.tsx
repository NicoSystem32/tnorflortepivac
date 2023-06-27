import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const ProductsAvailableStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Conoce todos tus <span className="sub-title">productos de ahorro</span>
            </StepTitle>

            <p>
                Al hacer clic en el botón{' '}
                <span className="highlight-text">"Conoce tus productos"</span> podrás visualizar
                todos tus TAR y aportes.
            </p>
        </StepContent>
    )
}

export default ProductsAvailableStep
