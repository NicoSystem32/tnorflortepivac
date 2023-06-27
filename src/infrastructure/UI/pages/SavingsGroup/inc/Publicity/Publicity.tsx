import { useSelector, messagesSelector } from '../../../../../selectors'

import { CardCDT, OpenCDTContent, PublicityContainer, TitleInfo } from './publicity-styles'

// icons
import { ArrowYellowSVG } from '../../../../utils/getIcons'

// utils
import { parseStringToBoolean } from '../../../../utils/misc'

interface Props {
    redirection: (value: string) => void
}

const enableTDC = process.env.REACT_APP_TDC_ENABLE as 'false' | 'true'

const Publicity = ({ redirection }: Props): JSX.Element => {
    const messages = useSelector(messagesSelector)

    return (
        <PublicityContainer>
            <TitleInfo>
                Paga tus <span>productos de </span>
                <span>ahorro</span> y constituye productos de inversión.
            </TitleInfo>

            {parseStringToBoolean(enableTDC) && (
                <OpenCDTContent>
                    <CardCDT onClick={() => redirection('/product-opening')}>
                        <p className="card-title">
                            {messages.find((m) => m.name === 'tarjetaPromocionalAbrirTdc')?.title}
                        </p>
                        <p className="card-subtitle">
                            {messages.find((m) => m.name === 'tarjetaPromocionalAbrirTdc')?.text}
                        </p>
                        <img src={ArrowYellowSVG} alt="arrow down yellow" className="img" />
                    </CardCDT>
                </OpenCDTContent>
            )}
        </PublicityContainer>
    )
}

export default Publicity
