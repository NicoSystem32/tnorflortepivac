import tw, { styled } from 'twin.macro'

export const TarDetailTitleWrapper = styled.div`
    ${tw`grid-area[titleDetail]`}
`

export const TitleDeskContainer = styled.div`
    ${tw`hidden lg:block`}

    p {
        ${tw`flex m-0 text-[18px] color[var(--text-opacity10)] font-montserrat font-bold`}
        ${tw`lg:text-[24px]`}

        strong {
            ${tw`color[var(--dominant-color-dark) !important]`}
        }
    }
`

export const TitleMobileContainer = styled.div`
    ${tw`block lg:hidden`}

    p {
        ${tw`flex m-0 text-[18px] color[var(--text-opacity10)] font-montserrat font-bold`}

        strong {
            ${tw`color[var(--dominant-color-dark) !important]`}
        }
    }
`
