import tw, { styled } from 'twin.macro'
import { ProgressBar as ProgressBarBt, Accordion as AccordionBT } from 'react-bootstrap'

export const CardDetailContainer = styled.div`
    ${tw`w-full relative mt-26 pt-[45px]`}
    ${tw`lg:max-w-[400px] lg:mt-0 box-shadow[0px 3px 6px #00000029] rounded-[10px] lg:pt-[30px] pb-[0] px-[15px]`}
    ${tw`flex gap-1 flex-col`}

    /* & > img {
        ${tw`lg:w-[250px] w-[220px] self-center mb-4 lg:static absolute top-[-100px]`}
    } */

    & > h3 {
        ${tw`font-helvetica font-medium text-base color[var(--dominant-color-dark)]`}
    }

    & > h2 {
        ${tw`font-montserrat font-normal text-[22px] text-black`}
    }

    & > p {
        ${tw`font-helvetica font-medium text-[14px] color[var(--text-opacity7)]`}
    }
`

export const ImgCard = styled.div`
    ${tw`self-center`}
    ${tw`lg:w-[250px] w-[230px] mb-4 lg:static absolute top-[-105px]`}
`

export const ProgressBar = styled(ProgressBarBt)`
    ${tw`h-[6px] lg:h-[9px] rounded-full`}
    .bg-warning {
        ${tw`!bg-[var(--dominant-color-dark)]`}
    }
`

export const Accordion = styled(AccordionBT)`
    ${tw`lg:block hidden`}
    .accordion-item {
        ${tw`border-none`}
    }

    .accordion-button::after {
        content: none;
    }

    .accordion-button {
        ${tw`justify-center`}
    }

    .accordion-body {
        ${tw`px-0`}
    }
`

export const AccordionButton = styled.div`
    ${tw`flex flex-row items-center justify-center gap-1 font-helvetica font-medium text-sm color[var(--sub-dominant-color)]`}

    & > img {
        ${tw`w-[20px]`}
    }
`

export const AccordingBodyContainer = styled.div`
    ${tw``}
    & > h2 {
        ${tw`border-0 border-b-2 border-solid border-[#00000029] font-helvetica font-bold text-base`}
        &:first-child {
            ${tw`border-b-0 lg:border-b-2`}
        }
    }

    & > div {
        ${tw`flex flex-row justify-between items-center`}
        & h3 {
            ${tw`text-base font-medium`}
        }
        & h3:first-child {
            ${tw`font-helvetica`}
        }
        & h3:last-child {
            ${tw`font-montserrat`}
        }
    }
`
export const SummaryMobile = styled.div`
    ${tw`lg:hidden my-2 `}
`
