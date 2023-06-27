import tw, { styled } from 'twin.macro'
import { ProgressBar } from '../../../../components'

export const MultiPaymentTDCSecondStep = styled.section`
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

export const BodyMultiPaymentStep = styled.div`
    ${tw`my-10 flex flex-col items-start`}
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

export const TextForm = styled.p`
    ${tw`font-montserrat font-normal text-gray-custom-600 text-sm p-0 mb-2`}
    ${tw`lg:p-0 lg:text-base`}
`

export const InfoIVRCtr = styled.div`
    ${tw`flex flex-col-reverse mt-5 mb-26`}
    ${tw`lg:flex-col lg:m-0 lg:p-0 lg:my-4`}
`

export const ExpirationProgress = styled(ProgressBar)`
    ${tw`mr-[15px] w-11`}
    ${tw`lg:mr-5`}
`

export const ExpirationPayment = styled.div`
    ${tw`flex justify-center items-center mt-[4%] py-0 px-0`}
    ${tw`lg:mt-[4%] lg:justify-start lg:p-0`}

    p {
        ${tw`font-montserrat font-normal text-sm text-gray-custom-700 m-0`}
        ${tw`lg:text-base`}
    }

    .text-percentage {
        ${tw`flex`}
    }
`

export const TextDynamicKey = styled.div`
    ${tw`mt-6`}

    .link-dynamic-passw {
        ${tw`font-montserrat font-normal text-sm text-gray-custom-700 cursor-pointer underline`}
        ${tw`lg:text-base`}
    }
`
