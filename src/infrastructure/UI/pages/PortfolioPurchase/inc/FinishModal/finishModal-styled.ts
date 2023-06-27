import tw, { styled } from 'twin.macro'

export const EndFlowWrapper = styled.section`
    ${tw`flex justify-center items-center py-2`}
`

export const EndFlowCtr = styled.div`
    ${tw`p-4 lg:px-10 w-full max-w-[520px] rounded-[10px] shadow-[0px 3px 6px #00000029]`}

    & button {
        ${tw`w-48 mb-5`}
    }
`

export const EndFlowContent = styled.div`
    ${tw`flex flex-col items-center`}
`

export const Image = styled.img`
    ${tw`mt-5 mb-10 w-28`}
`

export const TitleView = styled.h4`
    ${tw`font-montserrat font-semibold text-[18px] text-center mb-7`}
`

export const ParagraphView = styled.p`
    ${tw`font-helvetica font-normal text-base text-center leading-5 mb-7`}
`
