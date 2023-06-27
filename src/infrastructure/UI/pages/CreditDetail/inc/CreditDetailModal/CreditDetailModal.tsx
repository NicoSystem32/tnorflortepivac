import { Modal } from 'react-bootstrap'

// icons
import { IconModalSVG } from '../../../../utils/getIcons'

// styles
import { ButtonsContainer, CreditModal, ModalButton } from './CreditDetailModal-styles'

import { useSelector, messagesSelector } from '../../../../../selectors'

interface CreditDetailModalProps {
    showRefund: boolean
    handleCloseRefund: () => void
}

const CreditDetailModal: React.FC<CreditDetailModalProps> = ({
    showRefund,
    handleCloseRefund,
}): JSX.Element => {
    const messages = useSelector(messagesSelector)

    return (
        <CreditModal
            show={showRefund}
            onHide={handleCloseRefund}
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <img src={IconModalSVG} alt="" className="" />
                <h6 className="title-modal-login">Tienes dinero disponible para reintegro</h6>
                <p>
                    {messages
                        .find((m) => m.name === 'reintegro')
                        ?.text.replace(
                            /\$\d/g,
                            (match) =>
                                ({
                                    $1: '$150.000.00',
                                }[match] || '')
                        )}
                </p>
                <ButtonsContainer>
                    <ModalButton variant="primary">Continuar pago</ModalButton>
                    <ModalButton variant="primary">Cambiar concepto</ModalButton>
                </ButtonsContainer>
            </Modal.Body>
        </CreditModal>
    )
}

export default CreditDetailModal
