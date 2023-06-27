import tw, { styled } from 'twin.macro'
import { Modal as ModalBs } from 'react-bootstrap'

export const Modal = styled(ModalBs)`
    ${tw``}
`

export const ModalHeader = styled(ModalBs.Header)`
    ${tw`border-none mb-3 px-2 pt-2 pb-0`}

    & button {
        ${tw`p-5 w-7.5 h-7.5 !border-none opacity-100`}
        outline: none !important;

        &:hover {
            border: none !important ;
            outline: none !important;
            opacity: 1;
        }

        &:focus {
            opacity: 1;
            border: none !important ;
            outline: none !important;
        }
    }
`

export const ModalFooter = styled(ModalBs.Footer)`
    ${tw`mb-3 border-none`}
`

export const ModalContent = styled(ModalBs.Body)`
    ${tw`px-7 pb-7 pt-0 flex flex-col h-[600px] overflow-y-scroll`}

    &::-webkit-scrollbar {
        ${tw`w-2.5 rounded-[5px]`}
        background: rgba(0, 0, 0, 0.1);
        box-shadow: 0 0 1px black;
    }

    &::-webkit-scrollbar-thumb {
        ${tw`w-2.5 rounded-[5px]`}
        background: rgba(0, 0, 0, 0.2);
    }
`

export const ModalImage = styled.img`
    ${tw`w-16`}
`

export const ModalTitle = styled.h3`
    ${tw`font-montserrat font-semibold text-black text-base`}
`

export interface ModalTextProps {
    mb?: boolean
}

export const ModalText = styled.p<ModalTextProps>`
    ${tw`font-helvetica font-normal text-[var(--header-botton-color)] text-sm `}
    ${({ mb }) => mb && tw`mb-0`}
`

export interface ModalTextSpanProps {
    styleText?: string
}

export const ModalTextSpan = styled.span<ModalTextSpanProps>`
    ${tw``}
    text-decoration: ${({ styleText }) => styleText}
`

export const CtrButton = styled.div`
    ${tw`mt-7 flex justify-end`}

    & button {
        ${tw`w-full lg:max-w-[250px]`}
    }
`
