import React, { useEffect, useState } from 'react'
import { OverlayTrigger } from 'react-bootstrap'
import { useMediaQuery } from 'usehooks-ts'

// base components
import {
    Form,
    FormGroup,
    InputGroup,
    InputGroupText,
    FormLabel,
    FormMessage,
    FormControl,
    Popover,
} from '../../../../components'

// components
import DigitKeyboardFAI from '../DigitKeyboardFAI'

// icons
import { LockSVG } from '../../../../utils/getIcons'

type FAIFormProps = {
    errorMessage?: string
    onChange?: (changed: string) => void
    onFocusIVR?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const FAIForm = ({ onFocusIVR, onChange, errorMessage }: FAIFormProps): JSX.Element => {
    // states definition
    const [showKeyboard, setShowKeyboard] = useState(false)
    const [valueIVR, setValueIVR] = useState('')
    const [invalidIVR, setInvalidIVR] = useState(!!(errorMessage && errorMessage.length))
    const matchMedia = useMediaQuery('(min-width: 1024px)')

    useEffect(() => {
        setInvalidIVR(!!(errorMessage && errorMessage.length))
    }, [errorMessage])

    // event handlers
    const onChangeIVR = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInvalidIVR(false)

        if (!matchMedia) {
            const targetValue = event.target.value.replace(/[^0-9\s]/g, '')
            setValueIVR(targetValue)
            if (typeof onChange === 'function') onChange(targetValue)
        }
    }

    const onFocusInput = (event: React.FocusEvent<HTMLInputElement>): void => {
        if (matchMedia) setShowKeyboard(true)

        if (typeof onFocusIVR === 'function') onFocusIVR(event)
    }

    const handleInputDigit = (inputChanged: string): void => {
        setValueIVR(inputChanged)
        setInvalidIVR(false)

        if (typeof onChange === 'function') onChange(inputChanged)
    }

    const handleSeeKeyboard = (): void => {
        setShowKeyboard(false)
    }

    return (
        <Form id="form-fai" data-tour="fai-ivr-key">
            <FormGroup className="group-content" id="content-group-user">
                <FormLabel className="group-label">Clave IVR</FormLabel>
                <OverlayTrigger
                    show={showKeyboard}
                    placement="right"
                    overlay={
                        <Popover id="digit-keyboard-popover" noSpace>
                            <DigitKeyboardFAI
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
                            placeholder="Ingresa tu clave IVR"
                            value={valueIVR}
                            onFocus={onFocusInput}
                            readOnly={matchMedia}
                            onChange={onChangeIVR}
                            pattern={!matchMedia ? '{0,13}' : ''}
                            maxLength="14"
                            isInvalid={invalidIVR}
                        />
                        <FormMessage type="invalid">{errorMessage}</FormMessage>
                    </InputGroup>
                </OverlayTrigger>
            </FormGroup>
        </Form>
    )
}

export default FAIForm
