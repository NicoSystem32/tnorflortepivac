import tw, { styled } from 'twin.macro'

export const OptionsSupportContent = styled.div`
    ${tw`grid gap-y-7.5 p-0 mb-9`}

    @media (min-width: 1180px) {
        ${tw`pr-5.5 m-0`}
        grid-area: content-options;
    }
`

export const OptionSupport = styled.a`
    ${tw`flex border border-solid border-gray-custom-200 rounded-global gap-2 p-0 pl-2 items-center h-15 no-underline w-full`}

    .support-img {
        ${tw`w-8`}
    }

    .text-support {
        ${tw`font-montserrat font-normal text-black text-base m-0 `}

        strong {
            ${tw`font-montserrat font-bold`}
        }
    }

    @media (min-width: 1180px) {
        ${tw`h-24 w-4/5 py-6 px-7 gap-[15%]`}
        box-shadow: 0px 3px 6px ${({ theme }) => theme.colors['dark-custom'][300]};

        .support-img {
            ${tw`w-12.5`}
        }

        .text-support {
            ${tw`text-lg`}
        }
    }
`
