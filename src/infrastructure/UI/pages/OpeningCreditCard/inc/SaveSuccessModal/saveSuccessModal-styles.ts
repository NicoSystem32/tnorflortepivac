import tw, { styled } from 'twin.macro'
import { Modal as ModalBs } from 'react-bootstrap'

export const Modal = styled(ModalBs)`
    .modal-content {
        ${tw`!rounded-[10px] p-4`}

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
export const ModalImage = styled.img`
    ${tw`w-24 mb-10`}
`

export const CtrButtons = styled.div`
    ${tw`w-full mt-5 flex flex-row items-center justify-between gap-2`}
`

export const TitleModal = styled.h4`
    ${tw`font-montserrat text-center text-[18px] font-semibold`}
`

export const TextModal = styled.p`
    ${tw`my-2.5 mx-0 text-center text-sm font-helvetica font-normal text-[var(--header-botton-color)]`}

    & a {
        text-decoration: none;

        &:hover {
            color: var(--sub-dominant-color);
        }
    }
`

export const BankName = styled.span`
    ${tw`font-montserrat text-center text-[18px] font-semibold text-sub-dominant`}
`
