import React, { useState, useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import cn from 'classnames'

// styled components
import { DynamicKeyWrap } from './dynamicKey-styles'

type DynamicKeyProps = React.ComponentPropsWithoutRef<'div'> & {
    onChange?: (curInput: string) => void
    onCompleted?: (codeValue: string) => void
    errorMessage?: string
    className?: string
    clean?: boolean
}

const DynamicKey = ({
    onChange,
    onCompleted,
    errorMessage,
    className,
    clean,
    ...props
}: DynamicKeyProps): JSX.Element => {
    // initial declaration
    const initialCode = useRef({
        inputCode1: '',
        inputCode2: '',
        inputCode3: '',
        inputCode4: '',
        inputCode5: '',
        inputCode6: '',
    })
    const [inputCodes, setInputCodes] = useState(initialCode.current)

    // states definition
    const [valueKey, setValueKey] = useState('')
    const [msgErrorKey, setMsgErrorKey] = useState(errorMessage)

    const fieldClassName = cn('field-code', { 'input-error': !!msgErrorKey })

    const validateCompleteCode = (): void => {
        const bunchCodes = Object.values(inputCodes)
        const validateCompleted = bunchCodes.every((cod) => cod.length > 0)

        if (validateCompleted) {
            if (typeof onCompleted === 'function') onCompleted(valueKey)
        }
    }

    useEffect(() => {
        setMsgErrorKey(errorMessage)
    }, [errorMessage])

    useEffect(() => {
        setValueKey(Object.values(inputCodes).join(''))
    }, [inputCodes])

    useEffect(() => {
        if (valueKey) {
            validateCompleteCode()
        }
    }, [valueKey])

    useEffect(() => {
        if (clean) {
            setInputCodes(initialCode.current)
        }
    }, [clean, onChange])

    // event handlers
    const onChangeDynamic = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const valInput = event.target.value.trim().replace(/[^0-9\s]/g, '')
        const inputName = event.target.name
        const nextCode = event.target.nextSibling as HTMLInputElement

        if (valInput.length > 0 && nextCode) {
            nextCode.focus()
        }

        setInputCodes((codes) => ({ ...codes, [inputName]: valInput }))

        setMsgErrorKey('')

        if (typeof onChange === 'function') onChange(valInput)
    }

    return (
        <>
            <DynamicKeyWrap className={className} {...props}>
                <Form.Control
                    id="code-character1"
                    name="inputCode1"
                    maxLength={1}
                    onChange={onChangeDynamic}
                    type="text"
                    placeholder=""
                    className={fieldClassName}
                    value={inputCodes.inputCode1}
                    autoComplete="off"
                />
                <Form.Control
                    id="code-character2"
                    name="inputCode2"
                    maxLength={1}
                    onChange={onChangeDynamic}
                    type="text"
                    placeholder=""
                    className={fieldClassName}
                    value={inputCodes.inputCode2}
                    autoComplete="off"
                />
                <Form.Control
                    id="code-character3"
                    name="inputCode3"
                    maxLength={1}
                    onChange={onChangeDynamic}
                    type="text"
                    placeholder=""
                    className={fieldClassName}
                    value={inputCodes.inputCode3}
                    autoComplete="off"
                />
                <Form.Control
                    id="code-character4"
                    name="inputCode4"
                    maxLength={1}
                    onChange={onChangeDynamic}
                    type="text"
                    placeholder=""
                    className={fieldClassName}
                    value={inputCodes.inputCode4}
                    autoComplete="off"
                />
                <Form.Control
                    id="code-character5"
                    name="inputCode5"
                    maxLength={1}
                    onChange={onChangeDynamic}
                    type="text"
                    placeholder=""
                    className={fieldClassName}
                    value={inputCodes.inputCode5}
                    autoComplete="off"
                />
                <Form.Control
                    id="code-character6"
                    name="inputCode6"
                    maxLength={1}
                    onChange={onChangeDynamic}
                    type="text"
                    placeholder=""
                    className={fieldClassName}
                    value={inputCodes.inputCode6}
                    autoComplete="off"
                />
            </DynamicKeyWrap>
            {!!msgErrorKey && <p className="text-red">{msgErrorKey}</p>}
        </>
    )
}

export default DynamicKey
