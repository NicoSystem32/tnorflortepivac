import { ReactElement } from 'react'
import {
    CaviCardLogo,
    ChipLogo,
    ClassicCardBase,
    GoldCardBase,
    PlatinoCardBase,
    SignatureCardBase,
    VisaLogo,
} from '../../utils/getIcons'
import { getNameCreditCard } from '../GlobalFuntions/globalFunction'
import { CardBody, CardContainer, CardFooter, CreditCardContainer } from './creditCard-styles'

interface CreditCardProps {
    isDisabled?: boolean
    lastFourDigits?: string
    nameCard?: string
    dateExpired?: string
}

const creditCardConfig: { [key: string]: { img: string; text: string } } = {
    Classic: {
        img: ClassicCardBase,
        text: 'Classic',
    },
    Platinum: {
        img: PlatinoCardBase,
        text: 'Platino',
    },
    Platino: {
        img: PlatinoCardBase,
        text: 'Platino',
    },
    Gold: {
        img: GoldCardBase,
        text: 'Gold',
    },
    Signature: {
        img: SignatureCardBase,
        text: 'Signature',
    },
}

const CreditCard: React.FC<CreditCardProps> = ({
    isDisabled = false,
    lastFourDigits = '6789',
    nameCard = 'CLASSIC CREDIT CAVIPETROL',
    dateExpired = '2000-01-01',
}): ReactElement => {
    const DateExpired = (): string => {
        const date = new Date(dateExpired.length > 10 ? dateExpired : `${dateExpired}T00:00:00`)
        return `${date.getMonth() + 1}/${date.getFullYear().toString().substring(2, 4)}`
    }
    return (
        <CreditCardContainer isDisable={isDisabled}>
            <picture>
                <img src={creditCardConfig[getNameCreditCard(nameCard)].img} alt="" />
            </picture>
            <CardContainer>
                <picture>
                    <img src={CaviCardLogo} alt="" />
                </picture>
                <CardBody>
                    <picture>
                        <img src={ChipLogo} alt="" />
                    </picture>
                    <p>**** **** **** {lastFourDigits.length <= 5 ? lastFourDigits : '6789'}</p>
                </CardBody>
                <CardFooter>
                    <div>
                        <h4>VALIDA HASTA</h4>
                        <h3>{DateExpired()}</h3>
                    </div>
                    <div>
                        <img src={VisaLogo} alt="" />
                        <p>{creditCardConfig[getNameCreditCard(nameCard)].text}</p>
                    </div>
                </CardFooter>
            </CardContainer>
        </CreditCardContainer>
    )
}
export default CreditCard
