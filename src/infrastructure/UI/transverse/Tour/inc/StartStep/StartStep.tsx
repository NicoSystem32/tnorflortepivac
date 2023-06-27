import { ReactElement } from 'react'
import 'twin.macro'

// styled components
import { StepContent, StepTitle, ImgContent } from '../../appTour-styles'

// icons
import { WelcomeSVG } from '../../../../utils/getIcons'

const StartStep = (): ReactElement => {
    return (
        <StepContent>
            <ImgContent>
                <img src={WelcomeSVG} alt="Tour bienvenida" height="100" />
            </ImgContent>
            <StepTitle tw="text-center">
                Bienvenido a tu nuevo <span className="sub-title">portal de pagos</span>
            </StepTitle>

            <p>
                Evolucionamos para ti. Ahora desde PSE o tu cuenta FAI podrás pagar los productos de
                crédito, ahorro, aportes y tarjetas de crédito
            </p>
            <p>Te invitamos a conocerlo:</p>
        </StepContent>
    )
}

export default StartStep
