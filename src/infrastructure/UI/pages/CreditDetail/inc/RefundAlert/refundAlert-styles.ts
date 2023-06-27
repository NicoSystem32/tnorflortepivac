import tw, { styled } from 'twin.macro'

export const RefundAlertContent = styled.div`
    grid-area: alertMora;
    /*
    ${tw`w-full m-auto rounded-[10px] grid-rows-1 grid relative px-0 py-[4%] align-items[center]`}
    box-shadow: 0px 3px 6px #00000029;
    grid-template-columns: 20% 80%;
    grid-template-areas: 'imgCt1 titleCt1'; */

    ${tw`relative flex gap-2.5 rounded-[10px] px-3 py-3.5 box-shadow[0px 3px 6px #00000029]`}

    .title {
        ${tw`m-0 text-base text-black font-montserrat font-medium`}/* grid-area: titleCt1; */
    }

    .img {
        ${tw`w-12.5 m-1`}/* grid-area: imgCt1; */
    }

    @media (min-width: 1180px) {
        ${tw`w-full`}

        .title {
            ${tw`text-base`}
        }
    }
`
