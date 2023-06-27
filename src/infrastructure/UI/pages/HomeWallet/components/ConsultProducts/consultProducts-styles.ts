import tw, { styled } from 'twin.macro'

export const ConsultProductsContent = styled.div`
    .title {
        ${tw`m-0 text-dominant text-[22px] font-montserrat font-bold`}
    }

    .subtitle {
        ${tw`text-sm font-helvetica font-normal text-dark-custom-700`}
        a {
            ${tw`!underline cursor-pointer`}
            color: var(--sub-dominant-color-href) !important;
        }
    }

    @media (min-width: 1180px) {
        .title {
            ${tw`text-2xl`}
        }

        .subtitle {
            ${tw`text-base`}
        }
    }
`
