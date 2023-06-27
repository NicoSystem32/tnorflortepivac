import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const PaymentWalletStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Ahora podrás pagar tu producto o{' '}
                <span className="sub-title">añadir más conceptos</span>
            </StepTitle>

            <p>
                Aquí aparecerán todos los productos seleccionados y al final selecciona el botón{' '}
                <span className="highlight-text">"pagar"</span> para realizar la operación.
            </p>
        </StepContent>
    )
}

export default PaymentWalletStep
