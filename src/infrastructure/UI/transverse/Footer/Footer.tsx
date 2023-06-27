import { useHistory } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

// Images
import { SuperSolidaria } from '../../utils/getImages'

// Icons
import {
    Cavipetrol,
    IconInstagramSVG,
    IconFacebookSVG,
    IconTwitterSVG,
    IconLinkedinSVG,
} from '../../utils/getIcons'

import './footer.scss'

const Footer = (): JSX.Element => {
    const history = useHistory()
    const redirections = (url: string): void => {
        history.push(url)
    }

    return (
        <Container className="content-footer">
            <div className="footer">
                <div className="content-social-network">
                    <a
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
                <div className="content-sect1-footer">
                    <div className="title-footer">Productos</div>
                    <div className="content-link-footer">
                        <a className="link-footer" onClick={() => redirections('/product-opening')}>
                            Solicitar tarjeta
                        </a>
                        <a className="link-footer" onClick={() => redirections('/product-opening')}>
                            Abre un TDC
                        </a>
                    </div>
                </div>
                <div className="content-sect2-footer">
                    <div className="title-footer">Pagos</div>
                    <div className="content-link-footer">
                        <a className="link-footer" onClick={() => redirections('/credits-group')}>
                            Pago de créditos
                        </a>
                        <a className="link-footer" onClick={() => redirections('/savings-group')}>
                            Pago de ahorro recreativo
                        </a>
                        <a className="link-footer" onClick={() => redirections('/savings-group')}>
                            Pago de aportes
                        </a>
                        <a className="link-footer" onClick={() => redirections('/product-opening')}>
                            Aperturar productos
                        </a>
                    </div>
                </div>
                <div className="content-sect3-footer">
                    <div className="title-footer">Servicio al asociado</div>
                    <div className="content-link-footer">
                        <a className="link-footer" onClick={() => redirections('/support-private')}>
                            Contacta a servicio
                        </a>
                    </div>
                </div>
                <div className="content-logo-footer">
                    <img alt="Logo Super Solidaria" src={SuperSolidaria} className="logo-super" />
                    <img alt="Logo Cavipetrol" src={Cavipetrol} className="logo-cavipetrol" />
                </div>
                <div className="content-copyright">
                    <p className="firts-copyright">Copyright © 2020 Cavipetrol.</p>
                </div>
            </div>
        </Container>
    )
}

export default Footer
