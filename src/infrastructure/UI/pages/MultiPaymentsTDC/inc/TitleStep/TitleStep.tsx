import { ReactElement } from 'react'

import { HeadMultiPaymentStep, SubtitleMultiPayment, TitleMultiPayment } from './titleStep-styles'

export type TitleStepProps = {
    subtitle: string
    children?: React.ReactNode
}

const TitleStep = ({ subtitle, children }: TitleStepProps): ReactElement => {
    return (
        <HeadMultiPaymentStep>
            <TitleMultiPayment>{children}</TitleMultiPayment>
            <SubtitleMultiPayment>{subtitle}</SubtitleMultiPayment>
        </HeadMultiPaymentStep>
    )
}

export default TitleStep
