import React from 'react'
import { RefundAlertContent } from './refundAlert-styles'

import { IconModalSVG } from '../../../../utils/getIcons'
import {
    formatValue,
    formatValueDecimal,
} from '../../../../components/GlobalFuntions/globalFunction'

import { useSelector, messagesSelector } from '../../../../../selectors'

interface RefundAlertProps {
    refund: number
}

const RefundAlert: React.FC<RefundAlertProps> = ({ refund }) => {
    const messages = useSelector(messagesSelector)

    const createMarkup = (): {
        __html: string
    } => {
        return {
            __html:
                messages
                    .find((m) => m.name === 'reintegro')
                    ?.text.replace(
                        /\$\d/g,
                        (match) =>
                            ({
                                $1: `$ ${formatValue(refund, 1)}.
                            <sup>${formatValueDecimal(refund)}</sup>
                        `,
                            }[match] || '')
                    ) || '',
        }
    }

    return (
        <RefundAlertContent>
            <img src={IconModalSVG} alt="reintegro" className="img" />
            <span className="title" dangerouslySetInnerHTML={createMarkup()}></span>
        </RefundAlertContent>
    )
}

export default RefundAlert
