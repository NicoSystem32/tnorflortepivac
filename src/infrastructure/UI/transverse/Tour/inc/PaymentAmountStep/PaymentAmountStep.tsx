import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const PaymentAmountStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Vamos a realizar <span className="sub-title">tu primer pago</span>
            </StepTitle>

            <p>Aquí aparecerá el monto y lugar de donde se realizará el débito.</p>
        </StepContent>
    )
}

export default PaymentAmountStep
