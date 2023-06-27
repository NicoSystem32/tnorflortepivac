import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const PaymentsMenuStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Paga tus productos de <span className="sub-title">forma fácil</span>
            </StepTitle>

            <p>
                Desde el apartado de pagos podrás elegir qué productos deseas pagar en una sola
                transacción.
            </p>
        </StepContent>
    )
}

export default PaymentsMenuStep
