import { FC, ReactElement } from 'react'

// components
import { Button } from '../../../../components'

// styles
import { Modal, ModalImage, CtrButtons, TitleModal } from './saveSuccessModal-styles'

// Icons
import { CheckTransactionPNG } from '../../../../utils/getIcons'

export interface SaveSuccessModalProps {
    show: boolean
    onClose: () => void
}

const SaveSuccessModal: FC<SaveSuccessModalProps> = ({ show, onClose }): ReactElement => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <ModalImage src={CheckTransactionPNG} alt="credit card" />
                <TitleModal>Cambios guardados exitosamente.</TitleModal>

                <CtrButtons>
                    <Button variant="sub-dominant" type="submit" extend onClick={onClose}>
                        Cerrar
                    </Button>
                </CtrButtons>
            </Modal.Body>
        </Modal>
    )
}

export default SaveSuccessModal
