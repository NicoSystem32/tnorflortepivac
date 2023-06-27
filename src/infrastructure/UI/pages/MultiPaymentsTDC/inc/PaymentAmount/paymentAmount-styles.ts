import tw, { styled } from 'twin.macro'

interface TitleMultiStepProps {
    dominantText?: boolean
}

export const TitleMultiStep = styled.p<TitleMultiStepProps>`
    ${tw`font-helvetica font-normal text-base block`}

    ${({ dominantText }) =>
        !dominantText ? tw`text-dominant-dark font-bold` : tw`text-gray-custom-300 font-bold`}
`

export const MultiPaymentAmount = styled.div`
    ${tw`bg-gray-custom-50 p-5 mt-5 mb-5 rounded-global`}
    ${tw`lg:bg-transparent lg:p-0 lg:mt-0 lg:mb-0 lg:rounded-none lg:border-0`}
    ${tw`lg:border-r-2 lg:border-solid lg:border-gray-custom-300 lg:pb-[15%]`}
    ${tw`xl:pb-[10%]`}

    ${TitleMultiStep} {
        ${tw`font-helvetica font-normal text-base block`}
        ${tw`lg:mb-2.5`}
    }

    .sub-indice {
        ${tw`top-[-0.35em] text-[0.65em]`}
    }

    p {
        ${tw`m-0`}
    }
`

export const MultiPaymentAmountCtr = styled.div`
    ${tw`mb-5`}
`
