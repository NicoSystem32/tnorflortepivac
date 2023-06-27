import tw, { styled } from 'twin.macro'
export const Tags = styled.div`
    ${tw`h-[32px]`}

    & img {
        ${tw`w-[14px] mb-[2px]`}
    }

    & > div {
        ${tw`flex flex-row items-center gap-3.5`}
    }

    & > .active-tag {
        /* width: fit-content; */
        ${tw`w-[fit-content] px-[20px] font-helvetica font-medium rounded-[15px] text-[14px] color[var(--background-color)] bg-[var(--text-modal1)]`}
    }
    & > .success-tag {
        /* width: fit-content; */
        ${tw`w-[fit-content] px-[20px] font-helvetica font-medium rounded-[15px] text-[14px] color[var(--background-color)] bg-[var(--approved-color)]`}
    }
    & > .error-circle-tag {
        /* width: fit-content; */
        ${tw`w-[fit-content] px-[20px] font-helvetica font-medium rounded-[15px] text-[14px] color[var(--background-color)] bg-[var(--error-color)]`}
    }
    & > .error-tag {
        /* width: fit-content; */
        ${tw`w-[fit-content] absolute left-0 pl-[40px] pr-[20px] font-helvetica font-medium rounded-r-full text-[14px] color[var(--background-color)] bg-[var(--error-color)]`}
    }
    & > .warning-tag {
        /* width: fit-content; */
        ${tw`w-[fit-content] absolute left-0 pl-[40px] pr-[20px] font-helvetica font-medium rounded-r-full text-[14px] color[var(--background-color)] bg-[var(--dominant-color-dark)]`}
    }
`
