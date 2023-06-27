import tw, { styled } from 'twin.macro'
import { Modal, Button } from 'react-bootstrap'

export const ModalContainer = styled(Modal)`
    .modal-content {
        ${tw`!rounded-[10px] p-2.5`}

        .modal-header {
            ${tw`border-none p-2 flex`}

            .btn-close {
                ${tw`!opacity-100`}
                background-size: 25px;
            }
        }

        .modal-body {
            ${tw`flex flex-col items-center`}

            img {
                ${tw`m-2.5`}
            }

            h6 {
                ${tw`font-montserrat text-center text-base font-semibold text-[var(--header-botton-color)]`}
            }

            p {
                ${tw`my-2.5 mx-0 text-center text-sm font-helvetica font-normal text-[var(--header-botton-color)]`}
            }
        }
    }
`

export const ModalButton = styled(Button)`
    ${tw`my-2.5 mx-0 w-[200px] h-[50px] color[var(--background-color)] rounded-[10px] font-normal font-montserrat`}

    &:hover {
        background-color: var(--sub-dominant-color);
    }
    background-color: var(--sub-dominant-color);
    border-color: transparent !important;
`
