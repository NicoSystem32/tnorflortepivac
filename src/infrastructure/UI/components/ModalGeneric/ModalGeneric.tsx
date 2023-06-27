import { Modal } from 'react-bootstrap'
// Styles
import { ModalContainer, ModalButton } from './modalGeneric-styles'

interface ModalGenericProps {
    show: boolean
    img?: string
    textTitle?: string
    textBody?: string
    textButton?: string
    handleClose: () => void
    handleButton?: () => void
}

/**
 * Generic Modal
 */

const ModalGeneric: React.FC<ModalGenericProps> = ({
    show,
    img = '',
    textTitle = '',
    textBody = '',
    textButton = '',
    handleClose,
    handleButton,
}): JSX.Element => {
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
                {img && <img src={img} alt="Editar logo" className="" />}
                {textTitle && <h6>{textTitle}</h6>}
                {textBody && <p>{textBody}</p>}
                {textButton && (
                    <ModalButton variant="primary" onClick={handleButton ?? handleClose}>
                        {textButton}
                    </ModalButton>
                )}
            </Modal.Body>
        </ModalContainer>
    )
}

export default ModalGeneric
