import React from 'react'
import { ModalProps as ModalPropsBs } from 'react-bootstrap/Modal'
import cn from 'classnames'

// styled components
import { StyledModal } from './modal-styles'

export type ModalProps = ModalPropsBs & {
    children: React.ReactNode
    kind?: 'base' | 'alternative'
}

const Modal = ({ children, className, kind = 'base', ...props }: ModalProps): JSX.Element => {
    const classNames = cn(className, `${kind}-modal`)

    return (
        <StyledModal className={classNames} {...props}>
            {children}
        </StyledModal>
    )
}

export default Modal
