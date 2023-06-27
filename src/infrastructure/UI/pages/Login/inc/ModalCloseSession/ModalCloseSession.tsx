import { Modal } from 'react-bootstrap'

// custom components
import { Modal as ModalBase, Button } from '../../../../components'

// Icons
import { InactivitySVG } from '../../../../utils/getIcons'

export interface ModalCloseSessionTypes {
    show: boolean
    onHide?: () => void
}

const ModalCloseSession: React.FC<ModalCloseSessionTypes> = ({ show, onHide }) => {
    return (
        <ModalBase
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            className="modal-contact-footer"
            centered
        >
            <Modal.Body>
                <div className="content-video-login">
                    <img src={InactivitySVG} alt="inactivity clock" className="img-options-uer" />
                </div>
                <p className="title-modal-login">Ya tienes una sesión abierta</p>
                <p className="text-modal-login space-normal">
                    ¿Deseas cerrar la sesión anterior y comenzar una nueva?
                </p>
                <div className="content-btndouble-modalLogin">
                    <Button className="btn-modal-detail modal-btn-secundary" variant="primary">
                        Mantener sesión activa
                    </Button>
                    <Button className="btn-modal-detail modal-btn" variant="primary">
                        Cerrar sesión anterior
                    </Button>
                </div>
            </Modal.Body>
        </ModalBase>
    )
}

export default ModalCloseSession
