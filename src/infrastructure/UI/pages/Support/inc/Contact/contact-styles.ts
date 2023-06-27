import tw, { styled } from 'twin.macro'

export const ContactContent = styled.div`
    ${tw`grid grid-rows-[20% 80%] grid-cols-[50% 50%] p-4 rounded-global`}

    grid-template-areas: 'title-contact title-contact' 'sect1-mob sect2-mob';
    box-shadow: 0px 3px 6px ${({ theme }) => theme.colors['dark-custom'][300]};

    @media (min-width: 1180px) {
        ${tw`grid-rows-[22% 37% 37%] grid-cols-[31% 34% 31%] gap-[2%]`}

        grid-area: content-contact;
        grid-template-areas:
            'title-contact title-contact title-contact'
            'sect1 sect3 sect5'
            'sect2 sect4 sect6';
    }
`

export const TitleContactContent = styled.div`
    ${tw`flex gap-2 p-0 m-0 ml-3 mb-1.5 items-center`}
    grid-area: title-contact;

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
        .support-img {
            ${tw`w-12.5`}
        }

        .text-support {
            ${tw`text-lg`}
        }
    }
`

export const ContactNumbersContent = styled.div`
    &.sect1 {
        ${tw`hidden`}
        grid-area: sect1;
    }
    &.sect2 {
        ${tw`hidden`}
        grid-area: sect2;
    }
    &.sect3 {
        ${tw`hidden`}
        grid-area: sect3;
    }
    &.sect4 {
        ${tw`hidden`}
        grid-area: sect4;
    }
    &.sect5 {
        ${tw`hidden`}
        grid-area: sect5;
    }
    &.sect6 {
        ${tw`hidden`}
        grid-area: sect6;
    }

    &.sect1-mobile {
        grid-area: sect1-mob;
    }

    &.sect2-mobile {
        grid-area: sect2-mob;
    }

    .title-number,
    .title-number-special {
        ${tw`font-helvetica font-bold text-base text-dominant-dark m-0`}
    }

    .number {
        ${tw`font-helvetica font-normal text-base text-gray-custom-600`}
    }

    .title-number-special {
        ${tw`text-sub-dominant`}
    }

    @media (min-width: 1180px) {
        &.sect1-mobile,
        &.sect2-mobile {
            ${tw`hidden`}
        }

        &.sect1,
        &.sect2,
        &.sect3,
        &.sect4,
        &.sect5,
        &.sect6 {
            ${tw`block`}
        }

        .title-number,
        .title-number-special {
            ${tw`text-lg`}
        }
    }
`
