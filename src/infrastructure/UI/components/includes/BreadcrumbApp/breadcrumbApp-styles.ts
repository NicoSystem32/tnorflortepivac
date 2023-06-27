import tw, { styled } from 'twin.macro'

export const BreadcrumbContainer = styled.div`
    ${tw`hidden lg:block`}

    &  li a {
        text-decoration: none !important;
        font-family: var(--font-main-regular);
        font-size: 14;
        color: var(--footer-color);
    }

    & .active {
        text-decoration: none !important;
        font-family: var(--font-main-regular);
        font-size: 14 !important;
        color: var(--sub-dominant-color);
    }
`

export const ArrowBlack = styled.div`
    ${tw`flex p-0 !text-decoration[none] gap-3.5 cursor-pointer  color[var(--footer-color)]`}

    & p {
        ${tw`my-auto text-base text-gray-custom-600 font-montserrat font-normal`}
    }

    @media (max-width: 500px) {
        ${tw`w-40`}
        & p {
            ${tw`text-sm`}
        }
    }

    @media (min-width: 1024px) {
        ${tw`w-12`}
    }
`
