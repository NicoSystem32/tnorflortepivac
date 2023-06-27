import tw, { styled } from 'twin.macro'

export const Controls = styled.div`
    ${tw`flex gap-5 lg:gap-7.5 mt-5 lg:mt-8 px-0 items-center justify-between`}

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        ${tw`flex-row gap-0 px-5`}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        > button {
            ${tw`max-w-[13.125rem]`}
        }
    }
`

export const StyledNavigation = styled.div`
    ${tw`flex justify-between items-center lg:w-auto lg:flex-wrap absolute top-5 right-5.5 pt-[5px]`}
    /* ${tw` gap-2 lg:gap-4`} */
    ${tw`w-[180px] flex-nowrap overflow-hidden`}

    counter-reset: dot;
`

export const DotButton = styled.button`
    ${tw`block w-2 h-2 border-0 rounded-full p-0 transition-[opacity,transform] delay-300 cursor-pointer scale-100`}

    counter-increment: dot;
    color: var(--reactour-accent, ${({ theme }) => theme.colors.dominant.dark});
    background: var(--reactour-accent, ${({ theme }) => theme.colors.dominant.dark});

    &:not(:last-child) {
        ${tw`mr-[0.938rem]`}
        ${tw`min-w-[8px]`}
    }

    &.current {
        ${tw`border border-solid border-dominant-dark scale-100 bg-transparent bg-none text-dominant-dark`}
    }

    &:disabled {
        ${tw`cursor-default`}
    }
`
