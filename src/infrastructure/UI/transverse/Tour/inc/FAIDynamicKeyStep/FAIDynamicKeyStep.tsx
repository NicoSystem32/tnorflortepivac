import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const FAIDynamicKeyStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Nos preocupa <span className="sub-title">tu seguridad</span>
            </StepTitle>

            <p>
                Cada vez que vayas a realizar un pago, enviaremos a tu celular registrado una clave
                dinámica, la cual debes digitar en este campo.
            </p>
        </StepContent>
    )
}

export default FAIDynamicKeyStep
