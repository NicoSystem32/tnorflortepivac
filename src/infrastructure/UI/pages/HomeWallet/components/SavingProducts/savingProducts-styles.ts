import tw, { styled } from 'twin.macro'

export const SavingProductsContent = styled.div`
    .title {
        ${tw`text-black text-[14px] mb-[5%] font-montserrat font-normal`}
    }

    .card-content {
        ${tw`grid m-auto px-[4%] pt-[4%] pb-0 !h-52 relative rounded-[10px]`}
        box-shadow: 0px 3px 6px #00000029;
        border-left: 5px solid var(--sub-dominant-color);
    }

    .tag {
        ${tw`absolute text-sm border-radius[15px 15px 0 0] top-[-23%] right-[5%] pt-0 px-[4%] pb-[3px] text-white bg-danger`}
    }

    .img-content {
        ${tw`w-[73%] grid py-[2%] px-0`}
        grid-template-columns: 23% 77%;
    }

    .card-title {
        ${tw`m-0 text-base text-black font-montserrat font-bold`}
    }

    .card-subtitle {
        ${tw`m-0 text-sm text-black font-helvetica font-normal`}
    }

    .link-btn {
        ${tw`flex items-center  justify-center p-0 text-center cursor-pointer text-sm text-black font-montserrat font-normal text-decoration[none]`}
        border-top: 1px solid #e6e7e8;
    }

    @media (min-width: 1180px) {
        .title {
            ${tw`mb-[8%] text-base`}
        }

        .tag {
            ${tw`text-sm`}
        }

        .img-content {
            ${tw`w-[73%]`}
            grid-template-columns: 19% 81%;
        }

        .card-title {
            ${tw`text-[18px]`}
        }

        .card-subtitle,
        .link-btn {
            ${tw`text-base`}
        }
    }
`
