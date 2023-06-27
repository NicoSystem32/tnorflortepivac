import tw, { styled } from 'twin.macro'

export const ContainerHW = styled.div`
    ${tw`pt-10 mt-24 pb-10`}
`

export const TopSection = styled.section`
    ${tw`grid gap-5 py-0 mb-8 lg:gap-5 lg:grid-cols-2`}
`

export const SectionCards = styled.section`
    ${tw`grid gap-2.5 mb-10 py-0 lg:mb-10 lg:gap-5 lg:grid-cols-3`}
`

export const SectionHW3 = styled.section`
    ${tw`flex lg:flex-row flex-col gap-4 mt-0 py-0 lg:gap-5 flex-wrap`}
`

export const SectionHW4 = styled.div`
    ${tw`my-5`}
`

export const TitleCredit = styled.p`
    ${tw`text-[14px] text-black font-montserrat font-normal lg:mb-8 lg:text-[16px]`}
`

export const SectionCredits = styled.section`
    ${tw`grid gap-2.5 mt-0 py-0 lg:gap-5 lg:grid-cols-3`}
`

export const CardError = styled.div`
    ${tw`w-full relative p-10 !h-60 flex flex-col justify-center items-center rounded-[10px]`}

    box-shadow: 0px 3px 6px #00000029;
`

export const CardErrorParagraph = styled.p`
    ${tw`font-helvetica text-base text-center`}
`

export const CardErrorImage = styled.img`
    ${tw`w-20 mb-7`}
`
