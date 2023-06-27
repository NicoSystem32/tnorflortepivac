import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const CreditPaymentOptsStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                En todos los productos podrás elegir{' '}
                <span className="sub-title">qué deseas pagar</span>
            </StepTitle>

            <p>
                Selecciona el pago que realizarás y haz clic en el botón{' '}
                <span className="highlight-text">"agregar a pagos".</span>
            </p>
        </StepContent>
    )
}

export default CreditPaymentOptsStep
