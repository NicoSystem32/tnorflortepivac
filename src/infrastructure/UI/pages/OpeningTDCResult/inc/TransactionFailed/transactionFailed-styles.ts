import tw, { styled } from 'twin.macro'

export const DetailContentFailed = styled.div`
    ${tw`w-full lg:w-[533px] rounded-[10px] lg:shadow-[0px 3px 6px var(--shadow-color)] lg:p-7.5 lg:pb-5 lg:pt-10`}
    ${tw`shadow-none px-0 py-5`}

    & div div {
        & h3 {
            ${tw`text-[15px] font-helvetica font-normal color[var(--text-opacity5)] mt-6`}
        }
        & p {
            ${tw`font-montserrat font-medium mt-1`}
        }
    }

    p {
        ${tw`font-medium font-helvetica text-base m-0 mt-5 mb-3`}
    }
    & div div > button {
        ${tw`font-montserrat font-normal text-base my-3 p-0`}
        color: var(--dominant-color-dark) !important;
        ${tw`flex flex-row gap-2 items-center justify-center border[none]`}
    }

    & > div:last-child {
        ${tw`flex flex-col lg:flex-row lg:gap-7.5 gap-2.5 my-5`}
    }
`
