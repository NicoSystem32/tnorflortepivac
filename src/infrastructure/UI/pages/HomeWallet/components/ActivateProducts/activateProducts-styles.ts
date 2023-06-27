import tw, { styled } from 'twin.macro'

export const ActivateProductsContent = styled.div`
    ${tw`grid relative p-[6%] gap-[5%] bg-sub-dominant box-shadow[0px 3px 6px #00000029] rounded-[10px] m-auto`}

    .tag-new {
        ${tw`absolute top-[-6%] right-[5%] rounded-[10px] pt-0 pb-1 px-[4%] text-[12px] text-white`}
        background-color: var(--approved-color);
    }

    .title {
        ${tw`text-base m-0 text-white font-bold`}
    }

    .subtitle {
        ${tw`text-base m-0 text-white font-helvetica font-normal`}
    }

    .link {
        ${tw`text-base text-white font-montserrat font-normal cursor-pointer text-decoration[none]`}
    }

    @media (min-width: 1180px) {
        ${tw`py-[4%] px-[3%]`}

        .tag-new {
            ${tw`text-base`}
        }

        .title {
            ${tw`text-base`}
        }

        .subtitle {
            ${tw`text-[16px]`}
        }

        .link {
            ${tw`absolute bottom-2 right-5 text-[16px]`}
        }
    }
`
