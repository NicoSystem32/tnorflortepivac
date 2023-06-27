import tw, { styled } from 'twin.macro'

export const ErrorLabelContainer = styled.section`
    ${tw`mt-2.5 flex justify-end items-center`}
    ${tw`lg:!absolute lg:bottom-[-35px] lg:w-[320px] lg:right-0`}

    p {
        ${tw`m-0 text-[var(--error-color)] font-normal font-helvetica text-sm`}
        ${tw`lg:text-base`}
    }
`
