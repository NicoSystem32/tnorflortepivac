import tw, { styled } from 'twin.macro'

export const PublicityContainer = styled.div`
    ${tw`my-5 mx-0 flex flex-col gap-2.5`}

    @media (min-width: 570px) and (max-width: 670px) {
        ${tw`items-center`}
    }

    @media (min-width: 670px) and (max-width: 1180px) {
        ${tw`grid grid-template-columns[40% 50%]`}
    }

    @media (min-width: 1180px) and (max-width: 1400px) {
        ${tw`items-center grid gap-[10%] grid-template-columns[50% 40%]`}
    }

    @media (min-width: 1180px) {
        ${tw`items-center grid gap-[10%] grid-template-columns[50% 40%]`}
    }
`

export const TitleInfo = styled.h1`
    ${tw`m-0 line-height[1.5] text-[18px] text-dark-custom-700 font-montserrat font-bold`}

    span {
        ${tw`!text-dominant`}
    }

    @media (max-width: 320px) {
        ${tw`text-[17px]`}
    }

    @media (min-width: 1180px) and (max-width: 1450px) {
        ${tw`text-2xl`}
    }

    @media (min-width: 1450px) {
        ${tw`text-2xl`}
    }
`

export const OpenCDTContent = styled.div`
    ${tw`flex justify-end`}
`

export const CardCDT = styled.a`
    ${tw`p-6 w-[360px] grid rounded-[10px] cursor-pointer border border-solid border-sub-dominant text-decoration[none]`}
    grid-template-columns: 95% 5%;
    grid-template-rows: 50% 50%;
    grid-template-areas: 'titleCto linkCto' 'subCto linkCto';

    .card-title {
        ${tw`m-0 text-[18px] font-montserrat font-bold text-black`}
        grid-area: titleCto;
    }

    .card-subtitle {
        ${tw`m-0 text-base font-helvetica font-normal text-black`}
        grid-area: subCto;
    }

    .img {
        ${tw`w-5 m-auto -rotate-90`}
        grid-area: linkCto;
    }

    &:hover {
        ${tw`bg-sub-dominant`}
        p {
            ${tw`!text-white`}
        }
    }
`
