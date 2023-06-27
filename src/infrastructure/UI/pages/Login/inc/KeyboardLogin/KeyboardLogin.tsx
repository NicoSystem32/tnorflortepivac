import { useState, useEffect, useCallback, useRef } from 'react'
import type { MouseEvent, MouseEventHandler } from 'react'

// custom components
import { Keyboard } from '../../../../components'

export interface KeyboardTypes {
    onMouseLeave?: MouseEventHandler<HTMLDivElement>
    onChange?: (inputChanged: string) => void
    defaultValue?: string
}

export const KeyboardLogin: React.FC<KeyboardTypes> = ({
    onMouseLeave,
    onChange,
    defaultValue = '',
}) => {
    // states definition
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const keyboardRef = useRef<any>(null)
    const [layoutName, setLayoutName] = useState('default')

    useEffect(() => {
        keyboardRef.current?.setInput(defaultValue)
    }, [defaultValue])

    // event handlers
    const handleShift = (): void => {
        const newLayoutName = layoutName === 'default' ? 'shift' : 'default'
        setLayoutName(newLayoutName)
    }

    const handleKeyPress = (button: string): void => {
        if (button === '{shift}' || button === '{lock}') {
            handleShift()
        }
    }

    const handleMouseLeave = useCallback((e: MouseEvent<HTMLDivElement>): void => {
        if (typeof onMouseLeave === 'function') onMouseLeave(e)
    }, [])

    return (
        <div onMouseLeave={handleMouseLeave}>
            <Keyboard
                layoutName={layoutName}
                keyboardRef={keyboardRef}
                maxLength={8}
                onChange={onChange}
                onKeyPress={handleKeyPress}
            />
            <div className="label-floating">Por tu seguridad utiliza el teclado virtual</div>
        </div>
    )
}

export default KeyboardLogin
