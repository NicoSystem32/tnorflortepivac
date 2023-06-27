import { Modal } from 'react-bootstrap'
import './multisesion.scss'

// custom components
import { Modal as ModalBase } from '../../../../components'

// Icons
import { InactivitySVG } from '../../../../utils/getIcons'

export interface MoreSessionTypes {
    show: boolean
    onHide?: () => void
}

const MoreSession: React.FC<MoreSessionTypes> = ({ show, onHide }) => {
    return (
        <ModalBase
            show={show}
            onHide={onHide}
            keyboard={false}
            className="modal-contact-footer"
            centered
        >
            <Modal.Header closeButton className="modal-header-multi"></Modal.Header>
            <Modal.Body className="modal-body-multi">
                <div className="content-video-login">
                    <img src={InactivitySVG} alt="inactivity clock" className="img-options-uer" />
                </div>
                <p className="title-modal-login">Ya tienes una sesión abierta</p>
                <p className="text-modal-login space-normal">
                    Tienes varios intentos simultáneos de ingreso, cierra tu sesión y vuelve a
                    intentarlo más tarde
                </p>
            </Modal.Body>
        </ModalBase>
    )
}

export default MoreSession
