// utils
import {
    formatValue,
    formatDecimalValue,
} from '../../../../components/GlobalFuntions/globalFunction'

// components
import { Loading } from '../../../../components'

// models
import { SavingAvailable } from '../../../../../../domain/models'

// styles
import { CardCreditFAIContainer, RedirectMessage } from './accountFAI-styles'

interface AccountFAIProps {
    loadingIn: boolean
    listCards: SavingAvailable[]
}
const AccountFAI: React.FC<AccountFAIProps> = ({ loadingIn, listCards }): JSX.Element => {
    const href =
        'https://transacciones.cavipetrol.com/DwPortalApp/Cavionline/UI/Web/Login.aspx?ItemID=1&tabID=417&mID=3411'

    return loadingIn && listCards.length === 0 ? (
        <CardCreditFAIContainer style={{ display: 'block' }}>
            <Loading text="Aguarda un momento" />
        </CardCreditFAIContainer>
    ) : (
        <>
            {listCards
                .filter((card) => card.creditLineName === 'FAI')
                .map((card) => (
                    <CardCreditFAIContainer key={`${card.creditNumber}-${card.finishedNumber}`}>
                        <img src={card.urlImageProduct} alt="logo" />
                        <p className="title-ctf">Cuenta FAI</p>
                        <p className="number-ctf">{card.creditNumber}</p>
                        <p className="value-ctf">
                            $ {formatValue(card.balanceTotal, 1)}
                            <sup>{formatDecimalValue(card.balanceTotal, 1)}</sup>
                        </p>
                        <p className="text-ctf">Saldo a la fecha</p>
                    </CardCreditFAIContainer>
                ))}
            {listCards.filter((card) => card.creditLineName === 'FAI').length > 0 && (
                <RedirectMessage>
                    Para más información sobre tu cuenta FAI,{' '}
                    <a href={href} target="_blank" rel="noreferrer">
                        ingresa al portal de consultas
                    </a>
                </RedirectMessage>
            )}
        </>
    )
}

export default AccountFAI
