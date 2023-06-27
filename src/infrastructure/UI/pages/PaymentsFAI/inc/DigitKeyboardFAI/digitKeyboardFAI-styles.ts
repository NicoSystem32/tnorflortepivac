import tw, { styled } from 'twin.macro'

export const KeyboardWrap = styled.div`
    ${tw`w-56`}

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        .hg-theme-default.hg-layout-numeric .hg-button {
            ${tw`h-12`}
        }
    }
`
