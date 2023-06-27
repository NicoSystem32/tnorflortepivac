import tw, { styled } from 'twin.macro'

export const StyleImgElipse = styled.img`
    ${tw`block absolute h-auto w-64 z-[-1] -left-16 mt-[-40%]`}
    content: ${({ theme }) => theme.images['elipse-mobile']};

    @media (min-width: 570px) and (max-width: 1180px) {
        ${tw`mt-[-25%] w-[295px]`}
    }

    @media (min-width: 1180px) and (max-width: 1400px) {
        ${tw`hidden`}
    }

    @media (min-width: 1400px) {
        ${tw`hidden`}
    }
`

export const StyleImgElipseDesk = styled.img`
    ${tw`hidden w-[24.875rem]`}
    content: ${({ theme }) => theme.images['elipse-desk']};

    @media (min-width: 1180px) and (max-width: 1400px) {
        ${tw`!block absolute mt-[-262px] left-[-95px] z-[-1]`}
    }

    @media (min-width: 1400px) {
        ${tw`!block absolute top-[80%] left-[-95px] z-[-1]`}
    }
`

export const StyleImgNetworks = styled.img`
    ${tw`hidden`}
    content: ${({ theme }) => theme.images['banner-login']};

    @media (min-width: 1180px) {
        ${tw`block absolute top-0 -right-15 border border-solid border-gray-custom-200 z-[-1]`}
    }
`

export const StyleImgWomen = styled.img`
    ${tw`hidden`}

    @media (min-width: 1180px) {
        ${tw`block absolute top-0 right-16 z-[-1]`}
    }
`
