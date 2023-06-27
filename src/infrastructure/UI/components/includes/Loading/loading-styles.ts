import tw, { styled } from 'twin.macro'
import { keyframes } from 'styled-components/macro'

const loadingEllipsis1 = keyframes`
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
`
const loadingEllipsis2 = keyframes`
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(24px, 0);
    }
`

const loadingEllipsis3 = keyframes`
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
`

/* loading animation */
export const LoadingEllipsis = styled.div`
    ${tw`inline-block relative w-[4.5rem] h-[2.813rem] my-0 mx-auto`}
`
export const EllipsisItem = styled.div`
    ${tw`absolute top-[calc(50% - 5px)] w-2.5 h-2.5 rounded-full bg-sub-dominant`}
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-child(1) {
        left: 8px;
        animation: ${loadingEllipsis1} 0.6s infinite;
    }

    &:nth-child(2) {
        left: 8px;
        animation: ${loadingEllipsis2} 0.6s infinite;
    }

    &:nth-child(3) {
        left: 32px;
        animation: ${loadingEllipsis2} 0.6s infinite;
    }

    &:nth-child(4) {
        left: 56px;
        animation: ${loadingEllipsis3} 0.6s infinite;
    }
`

/* loading container */
export const LoadingContainer = styled.div`
    ${tw`flex flex-col flex-wrap justify-center items-center p-[30px] text-center bg-white/70 z-[1] flex-auto font-montserrat font-semibold text-lg`}

    p {
        ${tw`m-0 mt-[30px] text-gray-custom-500`}
    }
`
