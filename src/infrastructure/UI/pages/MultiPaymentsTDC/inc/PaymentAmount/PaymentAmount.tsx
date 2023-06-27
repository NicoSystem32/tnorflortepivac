import { ReactElement } from 'react'

// utils
import {
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'

// styles
import { MultiPaymentAmount, TitleMultiStep, MultiPaymentAmountCtr } from './paymentAmount-styles'

export type PaymentAmountProps = {
    amountFai: string
    amountTotal: number
}

const PaymentAmount = ({ amountFai, amountTotal }: PaymentAmountProps): ReactElement => {
    return (
        <MultiPaymentAmount data-tour="fai-payment-amount">
            <MultiPaymentAmountCtr>
                <TitleMultiStep dominantText>Monto a debitar cuenta FAI</TitleMultiStep>
                <p>
                    $ {amountFai === '' && '0'}
                    {formatValue(amountFai, 1)}
                    <sup className="sub-indice">{formatDecimalValue(amountFai, 1)}</sup>
                </p>
            </MultiPaymentAmountCtr>
            <MultiPaymentAmountCtr>
                <TitleMultiStep dominantText>Monto a pagar PSE-ACH</TitleMultiStep>
                <p>
                    ${formatValue(amountTotal - parseInt(amountFai || '0'), 1)}
                    <sup className="sub-indice">
                        {formatDecimalValue(amountTotal - parseInt(amountFai || '0'), 1)}
                    </sup>
                </p>
            </MultiPaymentAmountCtr>
            <MultiPaymentAmountCtr>
                <TitleMultiStep>Pago total</TitleMultiStep>
                <p>
                    ${formatValue(amountTotal, 1)}
                    <sup className="sub-indice">{formatDecimalValue(amountTotal, 1)}</sup>
                </p>
            </MultiPaymentAmountCtr>
        </MultiPaymentAmount>
    )
}

export default PaymentAmount
