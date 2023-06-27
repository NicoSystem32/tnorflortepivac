import tw, { styled } from 'twin.macro'

export const ContributionsContainer = styled.div`
    ${tw`py-6 px-0`}
`

export const TitleGroup = styled.p`
    ${tw`text-base font-montserrat font-normal `}
`

export const ContributionsContent = styled.div`
    ${tw`grid`}
    ${tw`sm:grid-template-columns[ 48% 48%] sm:gap-[4%] sm:pb-[4%]`}
    ${tw`lg:grid-template-columns[ 31% 31% 31%] lg:gap-[3%]`}
`

export const LoadingContainer = styled.div`
    ${tw`h-64 box-shadow[0px 3px 6px #00000029] rounded-[10px] p-20`}
    ${tw`sm:m-auto sm:w-[360px]`}
`

export const CardContainer = styled.div`
    ${tw`h-64 relative box-shadow[0px 3px 6px #00000029] rounded-[10px] px-5 pt-5 pb-0`}
    ${tw`sm:m-auto sm:w-[360px]`}
`

export const CardHead = styled.div`
    ${tw`grid grid-template-columns[15% 85%] grid-template-rows[50% 50%] mb-5 grid-template-areas['iconCtf titleCtf' 'iconCtf numberCtf']`}
    ${tw`lg:grid-template-columns[20% 80%]`}
    ${tw`2xl:grid-template-columns[17% 83%]`}

    & img {
        width: 90% !important;
    }

    & img {
        ${tw`grid-area[iconCtf] w-15 width[90%]`}
    }
    & p {
        ${tw`m-0 grid-area[titleCtf] text-[18px] font-montserrat font-bold text-black`}
    }
    & span {
        ${tw`m-0 grid-area[numberCtf]`}
    }
`

export const ValueCTF = styled.p`
    ${tw`m-0 text-black text-2xl font-montserrat font-normal grid-area[valueCtf]`}
`

export const TextCTF = styled.p`
    ${tw`m-0 text-base text-black font-helvetica font-normal`}
`

export const SpacingCTF = styled.div`
    ${tw`h-10 relative`}
`

export const TagsCCG = styled.div`
    ${tw`h-10 relative`}

    .mora {
        ${tw`bg-danger width[fit-content] rounded-[10px] font-helvetica font-normal text-base !text-white py-0 px-[15px]`}
    }
`

export const ButtonStyle = styled.button`
    ${tw`font-montserrat font-normal p-4 text-black absolute left-0 bottom-0 w-full bg-transparent border-none text-base`}
    border-top: 1px solid var(--text-opacity2);

    &:hover {
        ${tw`bg-[#E6E7E8]`}
    }
`
