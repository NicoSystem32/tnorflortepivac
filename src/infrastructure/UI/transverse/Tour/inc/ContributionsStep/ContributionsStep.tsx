import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const ContributionsStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Vamos a incluir un <span className="sub-title">producto a tu sección de pagos</span>
            </StepTitle>

            <p>
                Para realizar el pago de tus productos ingresa a{' '}
                <span className="highlight-text">"ver detalles"</span> y elige el monto a pagar.
            </p>
        </StepContent>
    )
}

export default ContributionsStep
