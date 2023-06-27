import { useSelector, messagesSelector } from '../../../../../selectors'

import { ArrowYellowSVG } from '../../../../utils/getIcons'
import { CardOpenCredit, OpenCredit, PublicityContainer, TitlePublicity } from './publicity-styles'

const Publicity = (): JSX.Element => {
    const messages = useSelector(messagesSelector)

    return (
        <>
            <PublicityContainer>
                <TitlePublicity>
                    Paga los <span>créditos</span> que tienes a la fecha
                </TitlePublicity>
                <OpenCredit>
                    <CardOpenCredit
                        href="https://www.cavipetrol.com/web/productos-y-servicios/productos-de-credito/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <p className="title-card">
                            {messages.find((m) => m.name === 'abrirCreditoFacil')?.title}
                        </p>
                        <p className="subtitle-card">
                            {messages.find((m) => m.name === 'abrirCreditoFacil')?.text}
                        </p>
                        <img src={ArrowYellowSVG} alt="" className="img-card" />
                    </CardOpenCredit>
                </OpenCredit>
            </PublicityContainer>
        </>
    )
}

export default Publicity
