import Form from 'react-bootstrap/Form'

// Images
import {
    PointsPNG,
    PointsSVG,
    ElipsePNG,
    ElipseDeskPNG,
    WomenPNG,
    NetworksPNG,
    LoginPNG,
} from '../../utils/getImages'

// Icons
import { ForgotSVG } from '../../utils/getIcons'

// Styles
import './problemsUser.scss'

const ProblemsUser = (): JSX.Element => {
    return (
        <div className="content-global-login">
            <img src={PointsPNG} srcSet={PointsSVG} alt="" className="points-img" />
            <div className="content-global-init">
                <Form className="form-login-failed">
                    <img src={LoginPNG} alt="" className="form-img" />
                    <div className="content-title"></div>
                    <a
                        id="forget-password-pu"
                        className="content-options-pu"
                        href="/forget-password"
                    >
                        <img src={ForgotSVG} alt="forgot" className="img-options-pu" />
                        <p className="link-options-pu">
                            Olvidé<p className="text-options-pu">&nbsp;mi contraseña</p>
                        </p>
                    </a>
                    <a
                        id="locked-user-pu"
                        className="content-options-pu"
                        href="https://transacciones.cavipetrol.com/DwPortalApp/Cavionline/UI/Web/bloqueado_m.aspx?tabID=417&mID=3411"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={ForgotSVG} alt="forgot" className="img-options-pu" />
                        <p className="link-options-pu">
                            Desbloquear<p className="text-options-pu">&nbsp;mi usuario</p>
                        </p>
                    </a>
                    <a
                        id="new-user-pu"
                        className="content-options-pu"
                        href="https://transacciones.cavipetrol.com/DwPortalApp/Cavionline/UI/Web/x_crea0_m.aspx?tabID=417&mID=3411"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={ForgotSVG} alt="forgot" className="img-options-pu" />
                        <p className="link-options-pu">
                            Soy nuevo,<p className="text-options-pu">&nbsp;quiero registrarme</p>
                        </p>
                    </a>
                    <div className="content-link-service">
                        <a id="support-pu" href="/support">
                            Contactar a servicio al asociado
                        </a>
                    </div>
                </Form>
            </div>
            <img src={ElipsePNG} alt="" className="elipse-img" />
            <img src={ElipseDeskPNG} alt="" className="elipse-img-desk elipse-failed" />
            <img src={NetworksPNG} alt="" className="networks-img failed" />
            <img src={WomenPNG} alt="" className="women-img" />
        </div>
    )
}
export default ProblemsUser
