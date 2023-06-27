import { useEffect, useState } from 'react'

// Bootstrap
import { InputGroup, Form, Button, OverlayTrigger } from 'react-bootstrap'
import { useMediaQuery } from 'usehooks-ts'
import { FormControl, InputGroupText, Popover } from '../../../../components'
import { validNumber, validUpper } from '../../../../components/GlobalFuntions/globalFunction'

// Icons
import { LockSVG, EyeSVG, EyeCleanPNG } from '../../../../utils/getIcons'

// Styles
import './../../forgetPassword.scss'
import cn from 'classnames'

// helpers
import { useReducerState, useStateForget } from '../../hooks'
import { KeyboardLogin } from '../../../Login/inc'

const NewPassword = (): JSX.Element => {
    const [showKeyboard, setShowKeyboard] = useState(false)
    const [showKeyboardConfirmed, setShowKeyboardConfirmed] = useState(false)
    const [{ feedback }] = useReducerState()
    const [isSmall, setIsSmall] = useState(false)
    const { resetPasswordForget } = useStateForget()
    const dispatchStep = useReducerState()[1]
    const [invalidIVR, setInvalidIVR] = useState(!!feedback.failed)
    const [validIVRConfirmed, setValidIVRConfirmed] = useState(false)
    const [valueIVR, setValueIVR] = useState('')
    const [valueIVRConfirmed, setValueIVRConfirmed] = useState('')
    const matchMedia = useMediaQuery('(min-width: 1024px)')
    // states definition
    const [upperPassword, setUpperPassword] = useState(false)
    const [numberPassword, setNumberPassword] = useState(false)
    const [seePassword, setPassword] = useState(false)
    const [seeConfirmedPassword, setConfirmedPassword] = useState(false)

    useEffect(() => {
        setInvalidIVR(!!feedback.failed)
    }, [feedback.failed])

    // event handlers
    const onChangeIVR = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatchStep({
            type: 'SET_FEEDBACK',
            payload: {
                code: '',
                message: '',
                failed: false,
            },
        })
        const myInput = document.getElementById('ivr-field')
        if (myInput !== null) {
            myInput.onpaste = function (e) {
                e.preventDefault()
            }

            myInput.oncopy = function (e) {
                e.preventDefault()
            }
        }

        setValueIVR(event.target.value)
        dispatchStep({
            type: 'SET_NEW_PASSWORD',
            payload: {
                newPassword: event.target.value,
            },
        })
        setInvalidIVR(false)
        setNumberPassword(validNumber(event.target.value))
        setUpperPassword(validUpper(event.target.value))
        if (event.target.value.length <= 3 || event.target.value.length > 8) {
            setIsSmall(true)
        } else {
            setIsSmall(false)
        }
        if (event.target.value !== valueIVRConfirmed) setValidIVRConfirmed(false)
        else {
            setValidIVRConfirmed(true)
        }
    }

    // event handlers
    const onChangeIVRConfirmed = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const myInput = document.getElementById('ivr-field-confirmed')
        if (myInput !== null) {
            myInput.onpaste = function (e) {
                e.preventDefault()
            }

            myInput.oncopy = function (e) {
                e.preventDefault()
            }
        }
        setValueIVRConfirmed(event.target.value)
        if (event.target.value !== valueIVR) setValidIVRConfirmed(false)
        else setValidIVRConfirmed(true)
    }

    const onFocusInput = (event: React.FocusEvent<HTMLInputElement>): void => {
        if (matchMedia) setShowKeyboard(true)
        setShowKeyboardConfirmed(false)
    }

    const onFocusInputConfirmed = (event: React.FocusEvent<HTMLInputElement>): void => {
        if (matchMedia) setShowKeyboardConfirmed(true)
        setShowKeyboard(false)
    }

    const handleInputDigit = (inputChanged: string): void => {
        const myInput = document.getElementById('ivr-field')

        dispatchStep({
            type: 'SET_FEEDBACK',
            payload: {
                code: '',
                message: '',
                failed: false,
            },
        })
        if (myInput !== null) {
            myInput.onpaste = function (e) {
                e.preventDefault()
            }

            myInput.oncopy = function (e) {
                e.preventDefault()
            }
        }
        setValueIVR(inputChanged)
        dispatchStep({
            type: 'SET_NEW_PASSWORD',
            payload: {
                newPassword: inputChanged,
            },
        })
        setInvalidIVR(false)
        setNumberPassword(validNumber(inputChanged))
        setUpperPassword(validUpper(inputChanged))
        if (inputChanged.length <= 3 || inputChanged.length > 8) {
            setIsSmall(true)
        } else {
            setIsSmall(false)
        }
        if (inputChanged !== valueIVRConfirmed) setValidIVRConfirmed(false)
        else {
            setValidIVRConfirmed(true)
        }
    }

    const handleInputDigitConfirmed = (inputChanged: string): void => {
        const myInput = document.getElementById('ivr-field-confirmed')
        if (myInput !== null) {
            myInput.onpaste = function (e) {
                e.preventDefault()
            }

            myInput.oncopy = function (e) {
                e.preventDefault()
            }
        }
        setValueIVRConfirmed(inputChanged)
        if (inputChanged !== valueIVR) setValidIVRConfirmed(false)
        else setValidIVRConfirmed(true)
    }

    const handleSeeKeyboard = (): void => {
        setShowKeyboard(false)
    }

    const handleSeeKeyboardConfirmed = (): void => {
        setShowKeyboardConfirmed(false)
    }

    return (
        <div className="content-step4">
            <div className="content-title-form-forget">
                <p className="title-form-forget">
                    Todo listo, por favor
                    <strong className="title-form-forget-high">&nbsp;ingresa tu&nbsp;</strong>
                </p>
                <p className="title-form-forget-high">nueva contraseña</p>
            </div>
            <Form.Group id="content-password" className="group-content">
                <Form.Label className="group-label">Nueva contraseña</Form.Label>
                <OverlayTrigger
                    show={showKeyboard}
                    placement="right"
                    overlay={
                        <Popover id="digit-keyboard-popover" noSpace className="keyBoardForget">
                            <KeyboardLogin
                                onMouseLeave={handleSeeKeyboard}
                                onChange={handleInputDigit}
                                defaultValue={valueIVR}
                            />
                        </Popover>
                    }
                >
                    <InputGroup hasValidation>
                        <InputGroupText $inputError={invalidIVR}>
                            <img src={LockSVG} alt="clave" className="icon-input" />
                        </InputGroupText>
                        <FormControl
                            id="ivr-field"
                            placeholder="Digita tú contraseña"
                            value={valueIVR}
                            onFocus={onFocusInput}
                            readOnly={matchMedia}
                            onChange={onChangeIVR}
                            pattern={!matchMedia ? '{0,13}' : ''}
                            maxLength="14"
                            isInvalid={invalidIVR}
                            type={seePassword ? 'input' : 'password'}
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
                    </InputGroup>
                </OverlayTrigger>
            </Form.Group>
            {feedback.failed ? <p className="text-red">{feedback.message}</p> : null}
            <div className={isSmall ? 'msj-size-password' : 'msj-size-password not-see-yet'}>
                <p>Recuerda que tu contraseña debe tener entre 4 y 8 caracteres</p>
            </div>
            <Form.Group
                id="content-password"
                className={isSmall ? 'not-margin group-content' : 'group-content'}
            >
                <Form.Label className="group-label">Confirma tu contraseña</Form.Label>
                <OverlayTrigger
                    show={showKeyboardConfirmed}
                    placement="right"
                    overlay={
                        <Popover id="digit-keyboard-popover2" noSpace className="keyBoardForget">
                            <KeyboardLogin
                                onMouseLeave={handleSeeKeyboardConfirmed}
                                onChange={handleInputDigitConfirmed}
                                defaultValue={valueIVRConfirmed}
                            />
                        </Popover>
                    }
                >
                    <InputGroup hasValidation>
                        <InputGroupText
                            $inputError={!validIVRConfirmed && valueIVRConfirmed !== ''}
                        >
                            <img src={LockSVG} alt="clave" className="icon-input" />
                        </InputGroupText>
                        <FormControl
                            id="ivr-field-confirmed"
                            placeholder="Digita tú contraseña"
                            value={valueIVRConfirmed}
                            onFocus={onFocusInputConfirmed}
                            readOnly={matchMedia}
                            onChange={onChangeIVRConfirmed}
                            pattern={!matchMedia ? '{0,13}' : ''}
                            maxLength="14"
                            isInvalid={!validIVRConfirmed && valueIVRConfirmed !== ''}
                            type={seeConfirmedPassword ? 'input' : 'password'}
                        />
                        <InputGroupText
                            className={cn('icon-action', {
                                seeConfirmedPassword: !seeConfirmedPassword,
                                'not-seePassword': seeConfirmedPassword,
                            })}
                            onClick={() => {
                                setConfirmedPassword((sp) => !sp)
                            }}
                        >
                            <img
                                src={seeConfirmedPassword ? EyeCleanPNG : EyeSVG}
                                alt="clave oculta y visible"
                                className="icon-eye"
                            />
                        </InputGroupText>
                    </InputGroup>
                </OverlayTrigger>
                <p
                    className={
                        !validIVRConfirmed && valueIVRConfirmed !== ''
                            ? 'text-error-confirmed'
                            : 'not-see-yet'
                    }
                >
                    Las contraseñas no coinciden
                </p>
            </Form.Group>
            <div className="content-description-password">
                <p className={upperPassword ? 'text-green' : ''}>+ 1 Mayúscula</p>
                <p className={numberPassword ? 'text-green' : ''}>+ 1 Número</p>
            </div>
            <div id="content-btn-continue" className="content-btn-forget">
                <Button
                    id="btnContinueStep1"
                    type="button"
                    onClick={resetPasswordForget}
                    disabled={
                        numberPassword && upperPassword && validIVRConfirmed && !isSmall
                            ? false
                            : true
                    }
                >
                    Continuar
                </Button>
            </div>
        </div>
    )
}
export default NewPassword
