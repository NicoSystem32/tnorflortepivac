import { ReactElement, FC } from 'react'

// styles
import { Amount, Sub, TabInfo } from './tabsCreditCardType-styles'
import { ParagraphStep, SpaceStep, TitleStep } from '../../openingCreditCard-styles'

// utils
import {
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'

export interface TabsCreditCardTypeProps {
    quote: number
    title: string
    text: string
}

const TabsCreditCardType: FC<TabsCreditCardTypeProps> = ({ quote, title, text }): ReactElement => {
    return (
        <TabInfo>
            <TitleStep>Tu cupo será de:</TitleStep>
            <Amount txtAlign="start">
                ${formatValue(quote, 1)}
                <Sub>{formatDecimalValue(quote, 1)}</Sub>
            </Amount>
            <SpaceStep />
            <SpaceStep />
            <Amount txtAlign="start">{title}</Amount>
            <ParagraphStep>{text}</ParagraphStep>
        </TabInfo>
    )
}

export default TabsCreditCardType
