import tw, { styled } from 'twin.macro'

export const AlertAddPaymentContainer = styled.div`
    ${tw`flex justify-center my-2 mx-0 items-center py-0 px-[15px] rounded-[10px] min-h-[65px] gap-2.5`}
    background-color: var(--alert-second);

    p {
        ${tw`m-0 font-normal font-helvetica text-sm`}
        color: var(--text-modal1);
    }

    @media (min-width: 1180px) {
        p {
            ${tw`lg:text-base`}
        }
    }
`
