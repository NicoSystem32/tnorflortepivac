import { ReactElement, FC } from 'react'

// styles
import {
    CreditCardCtr,
    ImageCtr,
    InformationCtr,
    Image,
    CreditCardContent,
    HrCustom,
    CardType,
    Amount,
    AdditionalInfo,
    Sub,
    ImageLogo,
} from './creditCardType-styles'
import { ParagraphStep, TitleStep } from '../../openingCreditCard-styles'

// Icons
import { CreditCardPNG, CreditCardFlowSVG } from '../../../../utils/getIcons'

// utils
import {
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'

export interface CreditCardTypeProps {
    isActive?: boolean
    onChangeOption?: () => void
    cardProps: CardProps
}

export interface CardProps {
    quota: number
    cardType: string
    title: string
    text: string
    image: string
}

const CreditCardType: FC<CreditCardTypeProps> = ({
    isActive,
    onChangeOption,
    cardProps,
}): ReactElement => {
    return (
        <CreditCardCtr isActive={isActive} onClick={onChangeOption}>
            <ImageCtr>
                <Image
                    src={cardProps.image ? cardProps.image : CreditCardPNG}
                    alt={cardProps.cardType}
                />
            </ImageCtr>
            <InformationCtr>
                <CreditCardContent>
                    <CardType>{cardProps.cardType}</CardType>
                    <TitleStep>Tu cupo será de:</TitleStep>
                    <Amount txtAlign="start">
                        ${formatValue(cardProps.quota, 1)}
                        <Sub>{formatDecimalValue(cardProps.quota, 1)}</Sub>
                    </Amount>
                    <HrCustom />
                    <AdditionalInfo>
                        <ImageLogo src={CreditCardFlowSVG} alt="image" />
                        <Amount txtAlign="start">{cardProps.title}</Amount>
                        <ParagraphStep>{cardProps.text}</ParagraphStep>
                    </AdditionalInfo>
                </CreditCardContent>
            </InformationCtr>
        </CreditCardCtr>
    )
}

export default CreditCardType
