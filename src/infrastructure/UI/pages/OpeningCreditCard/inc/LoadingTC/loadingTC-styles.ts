import tw, { styled } from 'twin.macro'

import { Modal as ModalBs } from 'react-bootstrap'

export const Modal = styled(ModalBs)`
    ${tw``}
`

export const ModalBody = styled(ModalBs.Body)`
    ${tw`p-5 rounded-[10px]`}
`

export const ModalText = styled.p`
    ${tw`text-center font-helvetica text-base`}
`
