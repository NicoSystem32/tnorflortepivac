import { ReactElement } from 'react'
import 'twin.macro'

// styled components
import { StepContent, StepTitle, ImgContent } from '../../appTour-styles'

//icons
import { EmptySVG } from '../../../../utils/getIcons'

const ProductsOpeningStep = (): ReactElement => {
    return (
        <StepContent tw="lg:w-[40rem]">
            <ImgContent>
                <img src={EmptySVG} alt="Tour bienvenida" height="100" />
            </ImgContent>
            <StepTitle tw="text-center">
                Solicitar tus productos <span className="sub-title">es más fácil</span>
            </StepTitle>
        </StepContent>
    )
}

export default ProductsOpeningStep
