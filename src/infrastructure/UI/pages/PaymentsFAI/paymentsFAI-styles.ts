import tw, { styled } from 'twin.macro'

export const ContentPaymentFAI = styled.section`
    ${tw`mt-24`}

    .group-content {
        padding: 0;
    }

    @media (min-width: 750px) and (max-width: 1100px) {
        min-height: calc(90vh - 320px);
    }
`

export const ReturnButton = styled.a`
    ${tw`flex p-0 no-underline gap-[15px] cursor-pointer mb-[25px]`}

    p {
        ${tw`mt-0 mb-0 font-montserrat font-normal text-base text-gray-custom-600`}
    }
`
