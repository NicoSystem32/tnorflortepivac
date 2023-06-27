/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback, useRef } from 'react'
import type { MouseEvent, MouseEventHandler } from 'react'

// base components
import { DigitKeyboard } from '../../../../components'

// styled components
import { KeyboardWrap } from './digitKeyboardTDC-styles'

export interface DigitKeyboardTDCProps {
    onMouseLeave?: MouseEventHandler<HTMLDivElement>
    onChange?: (inputChanged: string) => void
    defaultValue?: string
}

export const DigitKeyboardTDC: React.FC<DigitKeyboardTDCProps> = ({
    onMouseLeave,
    onChange,
    defaultValue = '',
}) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const keyboardRef = useRef<any>(null)

    useEffect(() => {
        keyboardRef.current?.setInput(defaultValue)
    }, [defaultValue])

    const handleMouseLeave = useCallback((e: MouseEvent<HTMLDivElement>): void => {
        if (typeof onMouseLeave === 'function') onMouseLeave(e)
    }, [])

    return (
        <KeyboardWrap onMouseLeave={handleMouseLeave} data-tour="fai-digit-keyboard">
            <DigitKeyboard shuffle onChange={onChange} keyboardRef={keyboardRef} />
        </KeyboardWrap>
    )
}

export default DigitKeyboardTDC
