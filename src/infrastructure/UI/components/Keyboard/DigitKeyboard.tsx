import { useState, useRef } from 'react'
import type { MutableRefObject } from 'react'
import Keyboard, { KeyboardOptions } from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

// custom hooks
import { useShuffleItems } from '../../hooks'

import { reduceByCountNDelimiter } from '../../utils/misc'

export interface DigitKeyboardProps extends KeyboardOptions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    keyboardRef?: MutableRefObject<any | null>
    shuffle?: boolean
    locked?: boolean
    backspaceText?: string
    onKeyPress?: (button: string) => void
}

const DigitKeyboard = ({
    keyboardRef,
    shuffle,
    locked,
    backspaceText = 'BORRAR',
    onKeyPress,
    theme,
    ...props
}: DigitKeyboardProps): JSX.Element => {
    // initial definitions
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const lockLayout = ['* * *', '* * *', '* * *', ' * ', '{bksp}']
    const shuffledOrNot = useRef(digits)

    // initial states
    const [isLocked, setIsLocked] = useState(!!locked)
    const [shuffled, setShuffled] = useShuffleItems(digits)

    if (shuffle) {
        shuffledOrNot.current = shuffled
    }

    const defaultLayout = reduceByCountNDelimiter(shuffledOrNot.current, 3, ' ')
    ;[defaultLayout[defaultLayout.length - 1]] = [` ${defaultLayout.at(-1)} `]
    defaultLayout.push('{bksp}')

    /* event handlers */
    const handleKeyPress = (button: string): void => {
        if (shuffle) {
            setShuffled()
            setIsLocked(true)

            setTimeout(() => {
                setIsLocked(false)
            }, 600)
        }
        if (typeof onKeyPress === 'function') onKeyPress(button)
    }

    return (
        <Keyboard
            {...props}
            keyboardRef={(r) => {
                if (keyboardRef) keyboardRef.current = r
            }}
            stopMouseDownPropagation={isLocked}
            stopMouseUpPropagation={isLocked}
            disableCaretPositioning
            disableButtonHold
            layoutName={isLocked ? 'lock' : 'default'}
            theme={`hg-theme-default hg-layout-numeric numeric-theme${theme ? ` ${theme}` : ''}`}
            display={{ '{bksp}': backspaceText }}
            layout={{
                default: defaultLayout,
                lock: lockLayout,
            }}
            onKeyPress={handleKeyPress}
            inputPattern={/^[^*]+$/}
        />
    )
}

export default DigitKeyboard
