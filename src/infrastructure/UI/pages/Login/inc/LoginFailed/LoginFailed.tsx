import { Link } from 'react-router-dom'

// styled components
import {
    LoginFailedContainer,
    TitleLoginContent,
    CustomerServiceContent,
    LoginTextInfo,
} from './loginFailed-styles'

// custom hooks
import { useLogin, useLoginState } from '../../hooks'

// Images
import { LoginPNG } from '../../../../utils/getImages'

// Icons
import { ArrowSVG } from '../../../../utils/getIcons'

const LoginFailed = (): JSX.Element => {
    // initial declarations
    const { loginMessages } = useLogin()
    const [{ feedback }] = useLoginState()

    const [title, message] = feedback.message.split('|')

    return (
        <LoginFailedContainer>
            <img src={LoginPNG} alt="" className="img-top" />
            <TitleLoginContent>
                <h3 className="title-login-failed">{title}</h3>
            </TitleLoginContent>

            {message && <LoginTextInfo>{message}</LoginTextInfo>}

            <LoginTextInfo>
                {loginMessages.find((m) => m.name === 'comunicateServicioAsociado')?.text}
            </LoginTextInfo>
            <CustomerServiceContent>
                <img src={ArrowSVG} alt="right arrow" />
                <Link id="support-lf" to="/support">
                    {loginMessages.find((m) => m.name === 'tituloServicioAsociado')?.text}
                </Link>
            </CustomerServiceContent>
        </LoginFailedContainer>
    )
}
export default LoginFailed
