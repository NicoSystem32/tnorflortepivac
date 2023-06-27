import { useSelector } from 'react-redux'

// components
import { Button, Modal } from '../../../../components'

// components
import { createTransactionSelector, parametersTDCSelector } from '../../../../../selectors'

// utils
import {
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'

// icons
import { IconModalSVG } from '../../../../utils/getIcons'

// styles
import {
    ModalContent,
    ContainerButtons,
    ContainerHeader,
    ModalImage,
    ModalTitle,
    ModalText,
} from './multiPaymentTdcModal-styles'

export interface MultiPaymentTdcModalProps {
    showOpenTdc: boolean
    handleClose?: () => void
    handleNext: () => void
}

const MultiPaymentTdcModal: React.FC<MultiPaymentTdcModalProps> = ({
    showOpenTdc,
    handleClose,
    handleNext,
}): JSX.Element => {
    const { loadingTransaction } = useSelector(createTransactionSelector)
    const amount = useSelector(parametersTDCSelector)?.value

    return (
        <Modal show={showOpenTdc} onHide={handleClose} keyboard={false} centered backdrop="static">
            <ModalContent>
                <ContainerHeader>
                    <ModalImage src={IconModalSVG} alt="logo" />
                </ContainerHeader>
                <ModalTitle>¿Realizar pago?</ModalTitle>
                <ModalText>Estás a punto de realizar un pago por un valor de</ModalText>
                <ModalText>
                    ${formatValue(amount, 1)}
                    <sup className="sub-indice">{formatDecimalValue(amount, 1)}</sup>
                </ModalText>
                <ModalText>
                    Te recomendamos validar que tienes los fondos suficientes antes de continuar.
                </ModalText>
                <ContainerButtons>
                    <Button
                        variant="sub-dominant"
                        extend
                        onClick={handleNext}
                        isLoading={loadingTransaction}
                    >
                        Pagar
                    </Button>
                    <Button variant="outline-cancel" extend onClick={handleClose}>
                        Cancelar
                    </Button>
                </ContainerButtons>
            </ModalContent>
        </Modal>
    )
}

export default MultiPaymentTdcModal
