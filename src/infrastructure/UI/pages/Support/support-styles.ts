import tw, { styled } from 'twin.macro'

export const SupportContainer = styled.div`
    ${tw`my-11 p-0`}

    @media (min-width: 1180px) {
        ${tw`grid grid-cols-[40% 60%] grid-rows-[20% 80%] my-20 p-0 min-h-[28.125rem]`}
        grid-template-areas: 'content-title .' 'content-options content-contact';
    }
`

export const TitleSupportContent = styled.div`
    ${tw`font-montserrat font-bold text-2xl mb-10 w-[85%]`}

    .title-support {
        ${tw`block m-0 text-dark-custom-700`}
    }

    .title-support-hight {
        ${tw`m-0 text-2xl text-dominant-dark`}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        ${tw`flex w-auto`}
    }

    @media (min-width: 1180px) {
        ${tw`mb-0`}
        grid-area: content-title;
    }
`
