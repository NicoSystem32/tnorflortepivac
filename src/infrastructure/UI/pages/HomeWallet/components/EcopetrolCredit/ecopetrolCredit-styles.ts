import tw, { styled } from 'twin.macro'

export const EcopetrolCreditsContent = styled.div`
    .card-content {
        ${tw`rounded-[10px] pt-[2%] px-[6%] pb-[3%]`}
        border: 1px solid var(--text-opacity5);
    }

    .value {
        ${tw`m-0 font-montserrat font-normal text-black text-xl`}
    }

    .img-container {
        ${tw`grid px-0 py-[2%]`}
        grid-template-columns: 20% 80%;

        & img {
            width: 50px;
        }
    }

    .title {
        ${tw`font-montserrat text-black font-bold text-base m-0`}
    }

    .subtitle {
        ${tw`font-helvetica font-normal text-sm text-black m-0`}
    }

    @media (min-width: 1180px) {
        .card-content {
            ${tw`min-h-[160px] px-[6%] pt-[3%] pb-[4%]`}
        }

        .value {
            ${tw`text-[22px]`}
        }

        .img-container {
            ${tw`mb-[4%] min-h-[65px]`}
        }

        .title {
            ${tw`text-[18px]`}
        }

        .subtitle {
            ${tw`text-base`}
        }
    }
`
