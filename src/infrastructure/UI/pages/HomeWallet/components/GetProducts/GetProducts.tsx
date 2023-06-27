import { useSelector, messagesSelector } from '../../../../../selectors'

// styled components
import { GetProductsContent } from './getProducts-styles'

// icons
import { ArrowYellowSVG, RequestSVG } from '../../../../utils/getIcons'

export const GetProducts = (): JSX.Element => {
    // initial declarations
    const messages = useSelector(messagesSelector)
    const message = messages.find((m) => m.name === 'publicitarioHomeBilleteraPagos')

    return (
        <GetProductsContent data-tour="get-products">
            <img src={RequestSVG} alt="solicitar producto" className="img" />
            <p className="title">{message?.title}</p>
            <p className="subtitle">{message?.text}</p>
            <a href="# " className="link">
                <img src={ArrowYellowSVG} alt="more forward" className="" />
            </a>
        </GetProductsContent>
    )
}
