import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const SavingsPaymentModify = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Ya tienes productos agregados{' '}
                <span className="sub-title">a la billetera de pagos</span>
            </StepTitle>

            <p>
                Si ya tienes valores agregados, puedes modificar los valores a pagar de tus
                productos
            </p>
        </StepContent>
    )
}

export default SavingsPaymentModify
