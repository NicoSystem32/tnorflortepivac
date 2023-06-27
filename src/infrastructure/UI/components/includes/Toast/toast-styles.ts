import tw, { styled } from 'twin.macro'
import ToastBS from 'react-bootstrap/Toast'
import ToastContainerBs from 'react-bootstrap/ToastContainer'

export const StyledToastCtr = styled(ToastContainerBs)`
    ${tw`shadow-[0px 3px 6px var(--shadow-color)] bg-sub-dominant rounded-[10px]`}
`

export const StyledToast = styled(ToastBS)`
    ${tw`min-h-[60px] bg-sub-dominant`}
`

export const StyledToastBody = styled(ToastBS.Body)`
    ${tw``}
`
