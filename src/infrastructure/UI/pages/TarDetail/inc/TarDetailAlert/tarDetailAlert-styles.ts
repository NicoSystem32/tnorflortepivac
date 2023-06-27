import tw, { styled } from 'twin.macro'

export const TarDetailAlertContainer = styled.div`
    ${tw`flex relative gap-2.5 py-2.5 px-[15px] min-h-[65px] items-center rounded-[10px]`}
    ${tw`grid-area[alertMora] box-shadow[0px 3px 6px #00000029]`}
    ${tw`border-top[5px solid var(--dominant-color-dark) !important]`}


    img {
        ${tw`grid-area[iconCtf]`}
    }

    p {
        ${tw`m-0 text-base color[var(--text-opacity9)] font-montserrat font-bold`}
        ${tw`lg:text-[17px]`}
    }
`
