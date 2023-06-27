import tw, { styled } from 'twin.macro'

export const ErrorAddPaymentContainer = styled.div`
    ${tw`flex justify-center my-7 mx-7 items-center py-0 px-[15px] rounded-[10px] min-h-[65px] gap-2.5`}
    background-color: var(--error-cover);

    p {
        ${tw`m-0 font-normal font-helvetica text-sm`}
        color: var(--error-color);
    }

    @media (min-width: 1180px) {
        p {
            ${tw`lg:text-base`}
        }
    }
`
