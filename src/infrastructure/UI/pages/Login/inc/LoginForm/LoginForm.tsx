import { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import cn from 'classnames'
import { useMediaQuery } from 'usehooks-ts'

// Bootstrap components
import { OverlayTrigger } from 'react-bootstrap'

// Components
import {
    Button,
    FormGroup,
    FormControl,
    InputGroup,
    InputGroupText,
    FormLabel,
    FormMessage,
    Popover,
} from '../../../../components'
import { KeyboardLogin, LoginToast } from '../../inc'

// styled components
import { ForgetPasswordWrap } from '../../login-styles'
import { StyledLoginForm, FormHeader, ButtonContent } from './loginForm-styles'

// resources
import { authenticationService } from '../../../../../../domain/services/User.service'

// custom hooks
import { useAuth } from '../../../../hooks'
import { useLoginForm } from '../../hooks'

// Images
import { LoginPNG } from '../../../../utils/getImages'

// Icons
import { UserSVG, LockSVG, EyeSVG, EyeCleanPNG } from '../../../../utils/getIcons'

// validation schema
const loginSchema = yup
    .object({
        username: yup
            .string()
            .required('Campo obligatorio')
            .min(4, 'Este campo debe contener un mínimo de 4 caracteres y un máximo de 16')
            .max(16, 'Este campo debe contener un máximo de 16 caracteres'),
        password: yup
            .string()
            .required('Campo obligatorio')
            .min(4, 'Este campo debe contener un mínimo de 4 caracteres y un máximo de 8')
            .max(8, 'Este campo debe contener un máximo de 8 caracteres'),
    })
    .required()

// type definitions
type LoginInputsType = yup.InferType<typeof loginSchema>

const LoginForm = (): JSX.Element => {
    // initial declarations
    const refreshTokenRef = useRef('')
    const history = useHistory()
    const messagesRef = useRef({
        userNotExists: {
            type: 'not-exists',
            message: '',
        },
        pwdNotExits: {
            type: 'not-exists',
            message: '',
        },
        pwdTried: {
            type: 'pwd-tried',
            message: '',
        },
    })
    const defaultValuesRef = useRef({
        username: '',
        password: '',
    })
    const infoUser = useRef({
        name: '',
        gender: '',
        lastEntry: '',
        paymentPSE: true,
    })

    // states definition
    const [showKeyboard, setShowKeyboard] = useState(false)
    const [seePassword, setPassword] = useState(false)
    const matchMedia = useMediaQuery('(min-width: 571px)')

    const {
        handleSubmit,
        control,
        register,
        getValues,
        setValue,
        validateErrorLogin,
        actionsSuccessfulContinue,
        actionsFailedContinue,
        userVerified,
        handleLoginModal,
    } = useLoginForm<LoginInputsType>({
        defaultValues: defaultValuesRef.current,
        validationSchema: yupResolver(loginSchema),
        messages: messagesRef.current,
    })
    const { setInfoUser } = useAuth()

    const { errors, isValid, dirtyFields, isSubmitting } = useFormState({ control })

    /* events handlers */
    const handleContinue = (): void => {
        const userString = JSON.stringify(getValues('username'))

        authenticationService
            .getLogin('/api/Authorization/LoginVerification', userString)
            .then((response: any) => {
                if (response.status === 200) {
                    actionsSuccessfulContinue()
                } else {
                    actionsFailedContinue(response.Response, response)
                }
            })
    }

    const onSubmit = async (loginInputs: LoginInputsType): Promise<void> => {
        const sendData = {
            user: loginInputs.username,
            password: loginInputs.password,
        }

        return authenticationService
            .getLogin('/api/Authorization/Authentication', sendData)
            .then((response: any) => {
                if (response.status === 200) {
                    const tokenSave = response.data.Data.Token
                    refreshTokenRef.current = response.data.Data.Refresh
                    handleLoginModal(true)
                    setTimeout(() => {
                        handleLoginModal(false)
                        infoUser.current = setInfoUser(tokenSave, refreshTokenRef.current)
                        history.push('/home-wallet', infoUser.current)
                    }, 5000)
                } else {
                    validateErrorLogin(response.Response, response)
                }
            })
    }

    const handlePasswordInput = (inputChanged: string): void => {
        setValue('password', inputChanged, { shouldValidate: true })
    }

    const handleFocusPassword = (): void => {
        setShowKeyboard(true)
    }

    const handleHideKeyboard = (): void => {
        setShowKeyboard(false)
    }

    return (
        <StyledLoginForm onSubmit={handleSubmit(onSubmit)}>
            <img src={LoginPNG} alt="start session" className="img-top" />
            {!userVerified && (
                <FormHeader>
                    <span>
                        Ingresa a tu <p>portal</p>
                    </span>
                    <p>transaccional Cavipetrol</p>
                </FormHeader>
            )}

            {!userVerified && (
                <FormGroup>
                    <FormLabel>Usuario</FormLabel>
                    <InputGroup id="input-group-user" hasValidation>
                        <InputGroupText $inputError={!!errors.username}>
                            <img src={UserSVG} alt="usuario icono" />
                        </InputGroupText>
                        <FormControl
                            {...register('username')}
                            placeholder="EjemploCavipetrol"
                            maxLength={16}
                            isInvalid={!!errors.username}
                        />
                        <FormMessage type="invalid">
                            {errors.username && errors.username.message}
                        </FormMessage>
                    </InputGroup>
                </FormGroup>
            )}

            <FormGroup id="content-password" className={cn({ 'not-default': !userVerified })}>
                <FormLabel>Contraseña</FormLabel>
                <OverlayTrigger
                    show={showKeyboard}
                    placement="auto-start"
                    overlay={
                        <Popover id="keyboard-popover" hasKeyboard>
                            <KeyboardLogin
                                onMouseLeave={handleHideKeyboard}
                                onChange={handlePasswordInput}
                                defaultValue={getValues('password')}
                            />
                        </Popover>
                    }
                >
                    <InputGroup hasValidation>
                        <InputGroupText $inputError={!!errors.password}>
                            <img src={LockSVG} alt="clave" className="icon-input" />
                        </InputGroupText>
                        <FormControl
                            {...register('password')}
                            placeholder="Digita tu contraseña"
                            className="has-suffix"
                            type={seePassword ? 'input' : 'password'}
                            onFocus={matchMedia ? handleFocusPassword : () => void 0}
                            readOnly={matchMedia}
                            maxLength={8}
                            isInvalid={!!errors.password}
                        />

                        <InputGroupText
                            className={cn('icon-action', {
                                seePassword: !seePassword,
                                'not-seePassword': seePassword,
                            })}
                            onClick={() => {
                                setPassword((sp) => !sp)
                            }}
                        >
                            <img
                                src={seePassword ? EyeCleanPNG : EyeSVG}
                                alt="clave oculta y visible"
                                className="icon-eye"
                            />
                        </InputGroupText>
                        <FormMessage type="invalid">
                            {errors.password && errors.password.message}
                        </FormMessage>
                    </InputGroup>
                </OverlayTrigger>
            </FormGroup>

            {!userVerified && (
                <ButtonContent className="default">
                    <Button
                        id="btnContinue"
                        variant="sub-dominant"
                        type="button"
                        onClick={handleContinue}
                        disabled={!dirtyFields.username || !!errors.username}
                        extend
                    >
                        Continuar
                    </Button>
                </ButtonContent>
            )}
            <ButtonContent className={cn({ 'not-default': !userVerified })}>
                <Button
                    id="btnSubmit"
                    variant="sub-dominant"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    isLoading={isSubmitting}
                    extend
                >
                    Ingresar
                </Button>
            </ButtonContent>
            <ForgetPasswordWrap className={cn({ 'not-default': !userVerified })}>
                <a href="forget-password">Olvide mi contraseña</a>
            </ForgetPasswordWrap>

            <LoginToast />
        </StyledLoginForm>
    )
}

export default LoginForm
