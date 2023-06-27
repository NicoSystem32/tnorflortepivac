import tw, { styled } from 'twin.macro'

export const HeadMultiPaymentStep = styled.div`
    ${tw`m-[0px 0 20px] `}
    ${tw`lg:m-[0px 0 40px]`}
`

export const TitleMultiPayment = styled.h3`
    ${tw`flex font-montserrat font-bold text-lg text-dark-custom-700 m-0`}
    ${tw`lg:text-2xl`}

    strong {
        ${tw`text-dominant`}
    }
`

export const SubtitleMultiPayment = styled.p`
    ${tw`font-helvetica font-normal text-dark-custom-700 text-base mt-5`}
`
