import { useState } from 'react'
import { useSelector, contactMessagesSelector } from '../../../selectors'

// Bootstrap
import { Button, Modal } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

// Images
import { SuperSolidaria, Cavipetrol } from '../../utils/getImages'

// Icons
import {
    IconInstagramSVG,
    IconFacebookSVG,
    IconTwitterSVG,
    IconLinkedinSVG,
} from '../../utils/getIcons'

// Styles
import './footer.scss'

const FooterInit = (): JSX.Element => {
    const [show, setShow] = useState(false)
    const handleClose = (): void => setShow(false)
    const handleShow = (): void => setShow(true)
    const messages = useSelector(contactMessagesSelector)

    return (
        <Container className="content-footer-init">
            <div className="footer-init">
                <div className="content-social-network">
                    <a
                        id="instagram-ft"
                        className="link-social-network"
                        href="https://www.instagram.com/cavipetrol_oficial/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src={IconInstagramSVG}
                            alt="Instagram"
                            className="social-network instagram"
                        />
                    </a>
                    <a
                        id="facebook-ft"
                        className="link-social-network"
                        href="https://www.facebook.com/Cavipetrol"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src={IconFacebookSVG}
                            alt="Facebook"
                            className="social-network facebook"
                        />
                    </a>
                    <a
                        id="twitter-ft"
                        className="link-social-network"
                        href="https://twitter.com/Cavipetrol"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src={IconTwitterSVG}
                            alt="Twitter"
                            className="social-network twitter"
                        />
                    </a>
                    <a
                        id="linkedin-ft"
                        className="link-social-network"
                        href="https://www.linkedin.com/company/fondo-de-empleados-cavipetrol/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src={IconLinkedinSVG}
                            alt="Linkedin"
                            className="social-network linkedin"
                        />
                    </a>
                </div>
                <hr className="hr-footer"></hr>
                <div className="title-footer only-desk-footer">Contacto</div>
                <Button variant="primary" onClick={handleShow} className="title-footer-mob">
                    Contáctanos
                </Button>
                <div className="content-firts-info only-desk-footer">
                    <ListGroup variant="flush" className="content-info-footer firts-info">
                        <ListGroup.Item className="info-footer">
                            {messages.find((m) => m.name === 'telefonoBarrancabermeja')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoBarrancabermeja')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-footer">
                            {messages.find((m) => m.name === 'telefonoBogota')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoBogota')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-footer">
                            {messages.find((m) => m.name === 'telefonoBucaramanga')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoBucaramanga')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-footer">
                            {messages.find((m) => m.name === 'telefonoCali')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoCali')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-footer">
                            {messages.find((m) => m.name === 'telefonoCartagena')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoCartagena')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-footer">
                            {messages.find((m) => m.name === 'telefonoCucuta')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoCucuta')?.text}
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                <div className="content-second-info only-desk-footer">
                    <ListGroup variant="flush" className="content-info-footer second-info">
                        <ListGroup.Item className="info-footer">
                            {messages.find((m) => m.name === 'telefonoMedellin')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoMedellin')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-footer">
                            {messages.find((m) => m.name === 'telefonoNeiva')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoNeiva')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-footer">
                            {messages.find((m) => m.name === 'telefonoVillavicencio')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoVillavicencio')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-footer">
                            {messages.find((m) => m.name === 'telefonoYopal')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoYopal')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-footer">
                            {messages.find((m) => m.name === 'telefonoOrito')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoOrito')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-footer sub-title-footer">
                            {messages.find((m) => m.name === 'telefonoRestoPais')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoRestoPais')?.text}
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                <div className="content-logo-footer">
                    <img alt="Logo Super Solidaria" src={SuperSolidaria} className="logo-super" />
                    <img alt="Logo Cavipetrol" src={Cavipetrol} className="logo-cavipetrol" />
                </div>
                <div className="content-copyright">
                    <p className="firts-copyright">Copyright © 2020 Cavipetrol.</p>
                    <p className="second-copyright"> - </p>
                    <p className="third-copyright">Política de tratamientos personales</p>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} className="modal-contact-footer">
                <Modal.Header closeButton>
                    <Modal.Title className="title-modal-footer">Contáctenos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup variant="flush" className="content-modal-footer">
                        <ListGroup.Item className="info-modal-footer">
                            {messages.find((m) => m.name === 'telefonoBarrancabermeja')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoBarrancabermeja')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-modal-footer">
                            {messages.find((m) => m.name === 'telefonoBogota')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoBogota')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-modal-footer">
                            {messages.find((m) => m.name === 'telefonoBucaramanga')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoBucaramanga')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-modal-footer">
                            {messages.find((m) => m.name === 'telefonoCali')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoCali')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-modal-footer">
                            {messages.find((m) => m.name === 'telefonoCartagena')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoCartagena')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-modal-footer">
                            {messages.find((m) => m.name === 'telefonoCucuta')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoCucuta')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-modal-footer">
                            {messages.find((m) => m.name === 'telefonoMedellin')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoMedellin')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-modal-footer">
                            {messages.find((m) => m.name === 'telefonoNeiva')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoNeiva')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-modal-footer">
                            {messages.find((m) => m.name === 'telefonoVillavicencio')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoVillavicencio')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-modal-footer">
                            {messages.find((m) => m.name === 'telefonoYopal')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoYopal')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-modal-footer">
                            {messages.find((m) => m.name === 'telefonoOrito')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoOrito')?.text}
                        </ListGroup.Item>
                        <ListGroup.Item className="info-modal-footer-i">
                            {messages.find((m) => m.name === 'telefonoRestoPais')?.title}:{' '}
                            {messages.find((m) => m.name === 'telefonoRestoPais')?.text}
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default FooterInit
