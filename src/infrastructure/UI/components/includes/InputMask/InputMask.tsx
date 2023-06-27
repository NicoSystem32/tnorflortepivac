import { ComponentProps } from 'react'
import { IMaskMixin } from 'react-imask'

import { FormControl } from '../Form'

export type InputMaskProps = Omit<ComponentProps<typeof FormControl>, 'as'>

const InputMask = IMaskMixin<InputMaskProps & IMask.AnyMaskedOptions, 'typed' | boolean>(
    ({ inputRef, ...props }: InputMaskProps) => {
        return <FormControl {...props} ref={inputRef} />
    }
)

export default InputMask
