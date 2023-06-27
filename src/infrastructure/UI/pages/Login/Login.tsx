import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom'
// Components
import {
    ModalCloseSession,
    ModalLoginSuccess,
    LoginImages,
    LoginForm,
    LoginFailed,
    NewSession,
    MoreSession,
} from './inc'

// styled components
import { LayoutContent } from '../../transverse'
import { LoginContainer, ImgDots, LoginFormContainer } from './login-styles'

// Images
import { PointsPNG, PointsSVG } from '../../utils/getImages'

// custom hooks
import { useLoginState } from './hooks'

const Login = (): JSX.Element => {
    const { path, url } = useRouteMatch()
    const [{ showLoginSuccess, showCloseSession }, setLoginState] = useLoginState()
    const [{ showNewSession, showMoreSession }, setMultisesion] = useLoginState()
    const [{ msjNewSession }] = useLoginState()
    const [{ codeNewSession }] = useLoginState()

    const handleClose = (): void => {
        setLoginState((s) => ({ ...s, showLoginSuccess: false }))
    }
    const closeOtherSession = (): void => {
        setLoginState((s) => ({ ...s, showCloseSession: false }))
    }

    const handleCloseMulti = (): void => {
        setMultisesion((m) => ({ ...m, showNewSession: false }))
    }

    const handleCloseMoreSession = (): void => {
        setMultisesion((m) => ({ ...m, showMoreSession: false }))
    }

    return (
        <LayoutContent>
            <LoginContainer>
                <ImgDots src={PointsPNG} srcSet={PointsSVG} alt="" />

                <LoginFormContainer>
                    <Switch>
                        <Route exact path={path}>
                            <LoginForm />
                        </Route>
                        <Route exact path={`${path}/login-failed`}>
                            <LoginFailed />
                        </Route>
                        <Route path="/*" exact>
                            <Redirect to={url} />
                        </Route>
                    </Switch>
                </LoginFormContainer>

                <LoginImages />

                <ModalLoginSuccess show={showLoginSuccess} onHide={handleClose} />
                <ModalCloseSession show={showCloseSession} onHide={closeOtherSession} />
                <MoreSession show={showMoreSession} onHide={handleCloseMoreSession} />
                <NewSession
                    show={showNewSession}
                    onHide={handleCloseMulti}
                    msj={msjNewSession}
                    validationCode={codeNewSession}
                />
            </LoginContainer>
        </LayoutContent>
    )
}

export default Login
