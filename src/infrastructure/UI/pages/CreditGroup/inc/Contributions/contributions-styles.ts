import tw, { styled } from 'twin.macro'

export const ContributionsContainer = styled.div`
    ${tw`py-[25px] px-0`}
`
export const CardContent = styled.div`
    ${tw`relative p-[20px] h-[250px] shadow-[0px 3px 6px #00000029] rounded-[10px] max-w-[450px]`}

    .mora {
        ${tw`text-[var(--error-color)]`}
    }
`
export const CardsContainer = styled.div`
    ${tw`grid gap-[35px] pb-[30px] grid-template-columns[100%]`}
    ${tw`md:grid-template-columns[48% 48%]`}
    ${tw`lg:grid-template-columns[31% 31% 31%]`}
`

export const CardTitleContent = styled.div`
    ${tw`grid mb-[20px] grid-template-columns[15% 85%] grid-template-rows[50% 50%] `}
    ${tw`grid-template-areas['iconCtf titleCtf' 'iconCtf numberCtf']`}
    ${tw`lg:grid-template-columns[18% 82%]`}

    .icon {
        ${tw`max-w-[90%] !w-[90%] grid-area[iconCtf]`}
    }
`

export const CardTitle = styled.p`
    ${tw`m-0 w-[95%] text-[var(--text-opacity9)] grid-area[titleCtf] text-base overflow-hidden`}
    ${tw`font-montserrat text-overflow[ellipsis] whitespace-nowrap font-bold`}
    ${tw`lg:text-[18px]`}
`
export const CardNumber = styled.p`
    ${tw`m-0 text-[var(--text-opacity9)] font-helvetica font-normal text-sm lg:text-base grid-area[numberCtf]`}
`

export const ValueCTF = styled.p`
    ${tw`m-0 font-montserrat grid-area[valueCtf] font-normal text-[18px] lg:text-2xl text-[var(--text-opacity9)]`}
`

export const TextCTF = styled.p`
    ${tw`m-0 font-helvetica grid-area[textCtf] font-normal text-base text-[var(--text-opacity9)]`}
`

export const ButtonCTF = styled.button`
    ${tw`w-full bg-transparent border-none text-base text-[var(--text-opacity9)] font-montserrat font-normal`}
    ${tw`p-3.5 absolute left-0 bottom-0`}
    border-top: 1px solid var(--text-opacity2);

    &:hover {
        ${tw`bg-[var(--text-opacity2)]`}
    }
`
