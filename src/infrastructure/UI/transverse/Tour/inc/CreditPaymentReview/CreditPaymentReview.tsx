import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const CreditPaymentReview = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Siempre conocerás <span className="sub-title">qué estás pagando</span>
            </StepTitle>

            <p>
                Al pasar tu cursor por el ícono de información, podrás conocer el detalle que
                compone cada uno de los valores a pagar.
            </p>
        </StepContent>
    )
}

export default CreditPaymentReview
