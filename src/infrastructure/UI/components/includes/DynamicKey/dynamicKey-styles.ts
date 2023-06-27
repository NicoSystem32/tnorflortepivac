import tw, { styled } from 'twin.macro'

export const DynamicKeyWrap = styled.div`
    text-align: center;
    justify-content: center;
    ${tw`flex gap-[15px] p-0`}

    .field-code {
        ${tw`w-10 h-10 border border-solid border-gray-custom-300 opacity-50 rounded`}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`gap-5`}
    }
`
