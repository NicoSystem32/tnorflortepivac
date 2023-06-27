import tw, { styled } from 'twin.macro'

export const InternalServerErrorContent = styled.div`
    ${tw`mx-auto mt-33.5 mb-14 min-h-[calc(80vh - 300px)]`}

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        ${tw`w-[90%]`}
        grid-template-areas: 'info500 img500';
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        ${tw`grid grid-cols-[55% 45%] min-h-[calc(90vh - 300px)]`}
        grid-template-areas: 'info500 img500';
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`mx-auto`}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
        ${tw`grid w-auto mx-auto grid-cols-[50% 48%]`}
    }
`
export const InternalServerErrorImg = styled.div`
    ${tw`flex flex-col justify-center mb-12.5 h-full bg-no-repeat bg-contain`}
    background-image: url(../../assets/icons/big-stain.png);
    grid-area: img500;

    .img-server-error {
        ${tw`w-auto`}
    }

    @media (min-width: 570px) and (max-width: 1180px) {
        ${tw`mb-auto bg-center`}
        background-size: 90%;

        .img-server-error {
            ${tw`w-full h-80`}
        }
    }

    @media (min-width: 1180px) {
        ${tw`mb-auto w-full bg-right text-center`}
        background-size: 100%;

        .img-server-error {
            ${tw`w-full h-auto`}
        }
    }
`
export const InternalServerErrorInfo = styled.div`
    ${tw`flex flex-col justify-center bg-no-repeat bg-center`}
    background-image: url(../../assets/icons/small-stain.png);
    background-size: 65%;
    grid-area: info500;

    .title-500 {
        ${tw`font-montserrat font-bold text-4xl text-black`}
    }

    .subtitle-500 {
        ${tw`font-helvetica font-normal text-base text-black`}
    }

    @media (min-width: 570px) {
        ${tw`w-[90%]`}
        background-size: 50%;
    }

    @media (min-width: 1180px) {
        ${tw`w-[90%] bg-left`}
        background-size: 40%;

        .title-500 {
            ${tw`text-5xl`}
        }

        .subtitle-500 {
            ${tw`text-base`}
        }
    }
`
