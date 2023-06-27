import ModalBs from 'react-bootstrap/Modal'
import tw, { styled } from 'twin.macro'

export const StyledModal = styled(ModalBs)`
    &.base-modal,
    &.alternative-modal {
        .btn-close {
            background: transparent url(../../../assets/icons/close-modal.png) center/1em auto
                no-repeat;
            background-size: 25px;
            opacity: 1;
        }
        .modal-body {
            width: 100% !important;
        }

        .modal-header {
            border: none !important;
            display: grid;
            grid-template-columns: 75% 25%;
            text-align: end;
            padding: 1rem 2rem;
            color: var(--dominant-color) !important;
            font-family: var(--font-main-medium) !important;
            font-size: 18px;
        }

        .content-video-login {
            ${tw`mb-5`}
        }

        .modal-base-content {
            border-radius: 10px;
            box-shadow: 0px 3px 6px rgba(#000, 0.16);
            border: none;
        }

        .title-modal-login {
            ${tw`font-montserrat font-semibold text-lg text-gray-custom-500`}
        }

        .modal-base-footer {
            display: flex;
            grid-template-columns: 50% 50%;
            ${tw`flex justify-center border-0 flex-col-reverse items-center p-0 gap-7.5`};
        }

        @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
            .modal-base-footer {
                ${tw`flex-row`}
            }
        }
    }

    &.alternative-modal {
        .modal-body {
            ${tw`flex flex-col gap-7 pt-5 px-4 pb-5 text-center min-h-[20rem] w-[30.875rem]`}
        }
    }

    &.option-end {
        grid-template-columns: 100% !important;
    }
`
