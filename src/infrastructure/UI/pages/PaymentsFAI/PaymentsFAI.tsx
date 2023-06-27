// styled components
import { LayoutContent } from '../../transverse'
import { ContentPaymentFAI } from './paymentsFAI-styles'

// components
import FirstStep from './inc/FirstStep'
import SecondStep from './inc/SecondStep'

// custom hooks
import { useReducerStep } from './hooks'

const PaymentsFAI = (): JSX.Element => {
    const [step] = useReducerStep()

    return (
        <LayoutContent>
            <ContentPaymentFAI>
                {
                    {
                        1: <FirstStep />,
                        2: <SecondStep />,
                    }[step.currentStep]
                }
            </ContentPaymentFAI>
        </LayoutContent>
    )
}
export default PaymentsFAI
