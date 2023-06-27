import tw, { styled } from 'twin.macro'

export const ThirdStepWrapper = styled.section`
    ${tw`flex justify-center items-center py-2`}
`

export const ThirdStepContent = styled.div`
    ${tw`p-5 lg:px-10 w-full max-w-[550px] lg:max-w-[600px] rounded-[10px] shadow-[0px 3px 6px #00000029]`}
`

export const DynamicCtr = styled.div`
    ${tw`flex flex-col-reverse mt-5 mb-26`}
    ${tw`lg:flex-col lg:m-0 lg:p-0 lg:my-4`}
`

export const BodyDynamicKeyStep = styled.div`
    ${tw`my-5 flex flex-col items-start`}
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
