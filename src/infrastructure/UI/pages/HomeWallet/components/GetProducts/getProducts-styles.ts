import tw, { styled } from 'twin.macro'

export const GetProductsContent = styled.div`
    ${tw`m-auto rounded-[10px] grid-rows-2 grid relative px-0 py-[4%] align-items[center]`}
    box-shadow: 0px 3px 6px #00000029;
    grid-template-columns: 20% 65% 15%;
    grid-template-areas: 'imgCt1 titleCt1 linkCt1' 'imgCt1 subtitleCt1 linkCt1';

    .link {
        ${tw`m-auto cursor-pointer`}
        grid-area: linkCt1;
        img {
            ${tw`w-5 -rotate-90`}
        }
    }

    .title {
        ${tw`m-0 text-base text-black font-montserrat font-bold`}
        grid-area: titleCt1;
    }

    .subtitle {
        ${tw`m-0 text-sm text-black font-helvetica font-normal`}
        grid-area: subtitleCt1;
    }

    .img {
        ${tw`m-auto`}
        grid-area: imgCt1;
        grid-area: imgCt1;
    }

    @media (min-width: 1180px) {
        ${tw`w-full px-0 py-[3%]`}

        .title {
            ${tw`text-[18px]`}
        }

        .subtitle {
            ${tw`text-base`}
        }
    }
`
