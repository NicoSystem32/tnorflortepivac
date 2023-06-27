import tw, { styled } from 'twin.macro'

export const CreditsProductsContent = styled.div`
    .card-content {
        ${tw`m-auto grid relative !h-52 px-[4%] pt-[4%] pb-[0%] rounded-[10px]`}
        border-left: 5px solid var(--sub-dominant-color);
        box-shadow: 0px 3px 6px #00000029;
    }

    .title {
        ${tw`mb-[5%] text-black text-sm font-montserrat font-normal`}
    }

    .tag {
        ${tw`absolute text-[12px] pt-0 pb-[3px] px-[4%] top-[-23px] right-[5%] text-white bg-danger`}
        border-radius: 15px 15px 0 0;
    }

    .img-section {
        ${tw`w-[73%] grid py-[2%] px-[0]`}
        grid-template-columns: 23% 77%;
    }

    .title-card {
        ${tw`m-0 font-bold font-montserrat text-base text-black`}
    }

    .subtitle-card {
        ${tw`m-0 font-normal font-helvetica text-[14px] text-black`}
    }

    .link-btn {
        ${tw`flex justify-center items-center text-center cursor-pointer text-sm text-black font-montserrat font-normal text-decoration[none] p-0`}
        border-top: 1px solid #e6e7e8;
    }

    @media (min-width: 1180px) {
        .title {
            ${tw`text-base !mb-[8%]`}
        }

        .tag {
            ${tw`text-sm`}
        }

        .img-section {
            ${tw`w-[73%]`}
            grid-template-columns: 19% 81%;
        }

        .title-card {
            ${tw`text-[18px]`}
        }

        .subtitle-card,
        .link-btn {
            ${tw`text-base`}
        }
    }
`
