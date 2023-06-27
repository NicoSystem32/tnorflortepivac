import { ReactElement } from 'react'
import 'twin.macro'

// styled components
import { StepContent, StepTitle, ImgContent } from '../../appTour-styles'

// icons
import { IconFaiSVG } from '../../../../utils/getIcons'

const SavingsGroupStep = (): ReactElement => {
    return (
        <StepContent>
            <ImgContent>
                <img src={IconFaiSVG} alt="Tour ahorros" height="100" />
            </ImgContent>
            <StepTitle tw="text-center">
                Este es tu <span className="sub-title">agrupamiento de ahorro</span>
            </StepTitle>

            <p>
                Desde aquí conocerás los productos de ahorro como TAR, aportes y el saldo de tu
                cuenta FAI.
            </p>
        </StepContent>
    )
}

export default SavingsGroupStep
