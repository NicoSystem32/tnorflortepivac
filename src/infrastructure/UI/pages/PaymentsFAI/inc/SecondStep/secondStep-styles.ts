import tw, { styled } from 'twin.macro'
import { ProgressBar } from '../../../../components'

export const PaymentFAISecondStep = styled.section`
    ${tw`pb-3.5 px-3`}
`

export const BodyPaymentStep = styled.div``

export const TextForm = styled.p`
    ${tw`font-montserrat font-normal text-gray-custom-600 text-sm p-0 mb-2`}

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`p-0 text-base`}
    }
`

export const InfoIVRContent = styled.div`
    ${tw`flex flex-col-reverse mt-5 mb-26`}

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`flex-col m-0 p-0`}
    }
`

export const ExpirationPayFAI = styled.div`
    ${tw`flex justify-center items-center mt-[4%] py-0 px-0`}

    p {
        ${tw`font-montserrat font-normal text-sm text-gray-custom-700 m-0`}
    }

    .text-percentage {
        ${tw`flex`}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`mt-[4%] justify-start p-0`}

        p {
            ${tw`text-base`}
        }
    }
`

export const ExpirationProgress = styled(ProgressBar)`
    ${tw`mr-[15px] w-11`}

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`mr-5`}
    }
`

export const TextDynamicKey = styled.div`
    ${tw`mt-4`}

    .link-dynamic-passw {
        ${tw`font-montserrat font-normal text-sm text-gray-custom-700 cursor-pointer pl-0 border-l-0`}

        @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
            ${tw`text-base`}
        }
    }
`
