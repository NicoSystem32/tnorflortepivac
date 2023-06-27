import { ReactElement, FC } from 'react'
import type { ToastProps as ToastPropsBS } from 'react-bootstrap/Toast'

// styles
import { StyledToastCtr, StyledToast, StyledToastBody } from './toast-styles'

export interface ToastProps extends Omit<ToastPropsBS, 'as'> {
    position?:
        | 'top-start'
        | 'top-center'
        | 'top-end'
        | 'middle-start'
        | 'middle-center'
        | 'middle-end'
        | 'bottom-start'
        | 'bottom-center'
        | 'bottom-end'
    children?: React.ReactNode
}

const Toast: FC<ToastProps> = ({ position, children, ...props }): ReactElement => {
    return (
        <StyledToastCtr position={position}>
            <StyledToast>
                <StyledToastBody>{children}</StyledToastBody>
            </StyledToast>
        </StyledToastCtr>
    )
}

export default Toast
