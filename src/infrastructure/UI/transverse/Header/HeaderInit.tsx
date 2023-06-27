import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

// Images
import { Logo } from '../../utils/getImages'

// Icons
import { HeadsetSVG, IconUsercogSVG, IconUnlockSVG } from '../../utils/getIcons'

import './header.scss'

const HeaderInit = (): JSX.Element => {
    return (
        <Navbar className="theme-header">
            <Container className="content-header">
                <a id="logo" className="logo" href="/login">
                    <img alt="Logo Cavipetrol" src={Logo} />
                </a>
                <a id="support-hd" className="options-content border-pipe" href="/support">
                    <img src={HeadsetSVG} alt="Servicio al asociado" className="options-img" />
                    <p className="options-text">Servicio al asociado</p>
                </a>
                <a
                    id="forget-password-hd"
                    className="options-content border-pipe"
                    href="/forget-password"
                >
                    <img src={IconUsercogSVG} alt="" className="options-img" />
                    <p className="options-text">Olvidé mi contraseña</p>
                </a>
                <a
                    id="unlocked-user-hd"
                    className="options-content"
                    href="https://transacciones.cavipetrol.com/DwPortalApp/Cavionline/UI/Web/bloqueado_m.aspx?tabID=417&mID=3411"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        alt=""
                        src={IconUnlockSVG}
                        srcSet={IconUnlockSVG}
                        className="options-img"
                    />

                    <p className="options-text">Desbloquear mi usuario</p>
                </a>
                <a
                    id="new-user-hd"
                    className="option-register"
                    href="https://transacciones.cavipetrol.com/DwPortalApp/Cavionline/UI/Web/x_crea0_m.aspx?tabID=417&mID=3411"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="register"></span>
                </a>
            </Container>
        </Navbar>
    )
}

export default HeaderInit
