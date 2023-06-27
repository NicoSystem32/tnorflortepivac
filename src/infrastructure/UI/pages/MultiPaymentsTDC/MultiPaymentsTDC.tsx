import { ReactElement } from 'react'

// components
import { LayoutContent } from '../../transverse'
import { FirstStep, SecondStep } from './inc'

// styles
import { CtrMultiPaymentTdc } from './multiPaymentsTDC-styles'

// hooks
import { useReducerStep } from './hooks'

const MultiPaymentsTDC = (): ReactElement => {
    const [step] = useReducerStep()

    return (
        <LayoutContent>
            <CtrMultiPaymentTdc>
                {
                    {
                        1: <FirstStep />,
                        2: <SecondStep />,
                    }[step.currentStep]
                }
            </CtrMultiPaymentTdc>
        </LayoutContent>
    )
}

export default MultiPaymentsTDC
