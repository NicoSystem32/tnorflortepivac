import { ReactElement } from 'react'

// styled components
import { StepContent, StepTitle } from '../../appTour-styles'

const IvrKeyStep = (): ReactElement => {
    return (
        <StepContent>
            <StepTitle>
                Vamos a realizar <span className="sub-title">tu primer pago</span>
            </StepTitle>

            <p>
                Aquí debes ingresar tu clave IVR usando el teclado virtual que aparece al lado
                derecho.
            </p>
        </StepContent>
    )
}

export default IvrKeyStep
