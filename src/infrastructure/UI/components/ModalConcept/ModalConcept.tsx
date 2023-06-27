import { Modal } from 'react-bootstrap'

// selector
import { useSelector, messagesSelector } from '../../../selectors'

// Icons
import { IconEditSVG } from '../../utils/getIcons'

// Styles
import { ModalContainer, ModalButton } from './modalConcept-styles'

interface ModalConceptProps {
    show: boolean
    handleClose: () => void
    handleContinue: () => void
}

const ModalConcept: React.FC<ModalConceptProps> = ({
    show,
    handleClose,
    handleContinue,
}): JSX.Element => {
    const messages = useSelector(messagesSelector)
    const message = messages.find((m) => m.name === 'popupModificarConcepto')

    return (
        <ModalContainer
            show={show}
            onHide={handleClose}
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <img src={IconEditSVG} alt="Editar logo" className="" />
                <h6>{message?.title}</h6>
                <p>{message?.text}</p>
                <ModalButton variant="primary" onClick={handleContinue}>
                    Continuar
                </ModalButton>
            </Modal.Body>
        </ModalContainer>
    )
}

export default ModalConcept
