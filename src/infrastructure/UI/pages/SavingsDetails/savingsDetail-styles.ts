import tw, { styled } from 'twin.macro'

export const SavingsDetailContainer = styled.div`
    ${tw`mt-20 px-0 pt-5 pb-10`}
`
export const SavingDetailsHead = styled.div`
    ${tw`flex flex-col gap-7.5 items-center`}
    ${tw`lg:mx-0 lg:mt-[50px] lg:mb-[40px] lg:grid lg:grid-template-columns[20% 20% 60%] lg:gap-0 lg:grid-template-areas['titleDetail . alertMora']`}
`
export const SavingDetailsFormContainer = styled.div`
    ${tw`w-full box-shadow[0px 3px 6px #00000029] rounded-[10px] py-7.5 px-[15px]`}
    ${tw`lg:p-7.5`}
`
export const SavingDetailsFormTitle = styled.p`
    ${tw`font-montserrat font-normal text-sm color[var(--text-modal1)]`}
    ${tw`lg:text-base`}
`

export const LoadingSavingContainer = styled.div`
    ${tw`min-h-[400px] flex items-center`}
`
