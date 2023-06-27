import { MutableRefObject } from 'react'
import SKeyboard, { KeyboardOptions } from 'react-simple-keyboard'

// styles
import 'react-simple-keyboard/build/css/index.css'

export interface KeyboardTypes extends KeyboardOptions {
    keyboardRef?: MutableRefObject<any | null>
    onKeyPress?: (button: string) => void
}

export const Keyboard: React.FC<KeyboardTypes> = ({
    keyboardRef,
    onChange,
    onKeyPress,
    theme,
    ...props
}) => {
    const defaultKeys = [
        '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
        'q w e r t y u i o p [ ] \\',
        "{lock} a s d f g h j k l ; '",
        'z x c v b n m , . /',
        '@ {space}',
    ]

    const shift = [
        '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
        'Q W E R T Y U I O P { } |',
        '{lock} A S D F G H J K L : "',
        'Z X C V B N M &lt; &gt; ?',
        '@ {space}',
    ]

    const handleChange = (changed: string): void => {
        if (typeof onChange === 'function') onChange(changed)
    }

    const handleKeyPress = (button: string): void => {
        if (typeof onKeyPress === 'function') onKeyPress(button)
    }

    return (
        <SKeyboard
            {...props}
            keyboardRef={(r) => {
                if (keyboardRef) keyboardRef.current = r
            }}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            theme={`hg-theme-default hg-layout-numeric numeric-theme${theme ? ` ${theme}` : ''}`}
            layout={{
                default: defaultKeys,
                shift,
            }}
            display={{
                '{bksp}': 'BORRAR',
                '{lock}': 'MAYÚSCULA',
                '{space}': 'ESPACIO',
            }}
        />
    )
}

export default Keyboard
