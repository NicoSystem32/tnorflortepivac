import tw, { styled } from 'twin.macro'

export const CtrMultiPaymentTdc = styled.section`
    ${tw`mt-24`}

    .group-content {
        padding: 0;
    }

    @media (min-width: 750px) and (max-width: 1100px) {
        min-height: calc(90vh - 320px);
    }
`
