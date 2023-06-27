import ButtonBS from 'react-bootstrap/Button'
import tw, { styled } from 'twin.macro'
import { LoadingEllipsis } from './../Loading/loading-styles'

export const StyledButton = styled(ButtonBS)`
    ${tw`px-2 h-[3.125rem] rounded-[5px] font-montserrat`}

    &.extend {
        ${tw`w-full`}
    }

    /* extends variant styles */
    &.btn-link {
        ${tw`text-sub-dominant`}

        &:focus {
            ${tw`shadow-none`}
        }
    }

    /* custom variant buttons */
    &.btn-dominant {
        ${tw`bg-dominant text-white hover:opacity-90 border-dominant`}
    }

    &.btn-sub-dominant {
        ${tw`bg-sub-dominant text-white hover:opacity-90 border-sub-dominant`}
    }

    &.btn-outline-cancel {
        ${tw`border-gray-custom-300 text-gray-custom-300 hover:bg-transparent hover:border-sub-dominant hover:text-sub-dominant`}
    }

    &.is-loading {
        color: transparent !important;
        ${tw`relative bg-white`}
        ${LoadingEllipsis} {
            ${tw`absolute left-0 right-0 top-0 bottom-0`}
        }
    }

    &.sub-dominant-full {
        ${tw`w-full`}
    }
`
