import tw, { styled } from 'twin.macro'

export const MultiPaymentTDCFirstStep = styled.section`
    ${tw`p-3.5 pt-0`}
`

export const MultiPaymentTDCStepContent = styled.div`
    ${tw`w-full shadow-none rounded-global pb-[30px] mb-5`}
    ${tw`sm:p-7`}
    ${tw`lg:w-full lg:rounded-global lg:pt-5 lg:pr-7.5 lg:pb-7.5 lg:pl-5`}

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        box-shadow: 0px 3px 6px ${({ theme }) => theme.colors['dark-custom']['300']};
    }
`

interface TitleMultiStepProps {
    dominantText?: boolean
}

export const TitleMultiStep = styled.p<TitleMultiStepProps>`
    ${tw`font-helvetica font-normal text-base block`}

    ${({ dominantText }) =>
        !dominantText ? tw`text-dominant-dark font-bold` : tw`text-gray-custom-300 font-bold`}
`

export const BodyMultiPaymentStep = styled.div`
    ${tw`lg:grid lg:grid-cols-[25% 50%] lg:pb-24`}
`

export const TDCFormWrap = styled.div`
    ${tw`pb-6`}
    ${tw`lg:ml-15 lg:relative`}

    .label-floating {
        ${tw`hidden font-helvetica font-normal text-gray-custom-700 text-base`}
        ${tw`lg:block lg:absolute lg:mt-3 lg:top-full lg:left-0`}
    }
`

export const FootPaymentStep = styled.div`
    ${tw`flex flex-col-reverse gap-5 py-0`}
    ${tw`sm:flex sm:flex-row sm:gap-5 sm:justify-end`}
    ${tw`lg:flex lg:flex-row lg:justify-end lg:gap-5 lg:text-center lg:pr-0`}

    .btn-form-type-light {
        ${tw`border-transparent no-underline`}
        ${tw`hover:text-sub-dominant hover:border-sub-dominant`}
        ${tw`sm:border-gray-custom-600`}
    }

    button {
        ${tw`sm:w-48`}
    }

    button.secundary {
        ${tw`text-gray-custom-300 no-underline h-[3.125rem]`}
        ${tw`border border-solid border-gray-custom-300 rounded-lg`}
        ${tw`hover:border-sub-dominant hover:text-sub-dominant hover:underline`}

        ${tw`lg:w-56 lg:no-underline`}
        ${tw`lg:hover:border lg:hover:border-solid lg:hover:border-sub-dominant lg:hover:text-sub-dominant`}
    }

    button.main {
        ${tw`lg:ml-auto`}
    }
`

export const CtrForm = styled.section`
    ${tw`flex flex-col justify-between h-[250px]`}
`
