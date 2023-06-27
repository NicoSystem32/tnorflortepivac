import tw, { styled } from 'twin.macro'

export const ActivateCardContainer = styled.div`
    ${tw`mt-26 mb-4 flex flex-col gap-5`}
`
export const ActivateCardTitle = styled.div`
    ${tw`font-montserrat font-bold text-black text-[24px]`}
    & > span {
        ${tw`color[var(--dominant-color-dark)]`}
    }
`
export const Title = styled.h3`
    ${tw`font-helvetica font-medium text-sm text-[var(--dominant-color-dark)]`}
`
export const SubTitle = styled.h4`
    ${tw`font-montserrat font-medium text-base text-[var(--text-opacity6)] pl-[8px]`}
`

export const Buttons = styled.div`
    ${tw`w-full flex flex-col gap-[15px] pt-[10px]`}
    ${tw`lg:flex-row lg:gap-[35px]`}
`
