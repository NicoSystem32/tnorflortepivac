import { ReactElement } from 'react'
import 'twin.macro'

// styled components
import { StepContent, StepTitle, ImgContent } from '../../appTour-styles'

// icons
import { IconModalSVG } from '../../../../utils/getIcons'

const CreditGroupStep = (): ReactElement => {
    return (
        <StepContent>
            <ImgContent>
                <img src={IconModalSVG} alt="Tour créditos" height="100" />
            </ImgContent>
            <StepTitle tw="text-center">
                Este es tu <span className="sub-title">agrupamiento de crédito</span>
            </StepTitle>

            <p>Desde aquí conocerás todos tus créditos y el estado de cada uno.</p>
        </StepContent>
    )
}

export default CreditGroupStep
