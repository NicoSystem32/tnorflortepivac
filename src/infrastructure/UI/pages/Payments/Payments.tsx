// components
import { ConfirmationPayments, FundsOrigin } from './inc'
import { BreadcrumbApp, ModalGeneric } from '../../components'

// Icons
import { IconAlertSVG } from '../../utils/getIcons'

// Styles
import '../../components/Payments/payments.scss'
import { LayoutContent } from '../../transverse'
import { PaymentsContainer } from './payments-styles'

// custom hooks
import { UsePayments } from './hooks/usePayments'

const Payments = (): JSX.Element => {
    const {
        currentStep,
        // history,
        show,
        handleClose,
        modalMessage,
        validateStatus,
        // prevStep,
        breadcrumbs,
        location,
        _onBack,
    } = UsePayments()

    return (
        <LayoutContent>
            <PaymentsContainer>
                <BreadcrumbApp
                    breadcrumbs={
                        location.state?.type === 'TDC' ? breadcrumbs : [{ text: '', active: false }]
                    }
                    onBack={() => _onBack()}
                    // onBack={() => (currentStep === 1 ? history.push('/home-wallet') : prevStep())}
                />
                {
                    {
                        1: <ConfirmationPayments />,
                        2: <FundsOrigin validateStatus={validateStatus} />,
                    }[currentStep]
                }
            </PaymentsContainer>
            <ModalGeneric
                show={show}
                handleClose={handleClose}
                img={IconAlertSVG}
                textTitle="Error"
                textBody={modalMessage ?? ''}
                handleButton={handleClose}
                textButton="Cerrar"
            />
        </LayoutContent>
    )
}
export default Payments
