import tw, { styled } from 'twin.macro'

export const TitleModuleContainer = styled.div`
    grid-area: titleDetail;
`

export const TitleModuleDesk = styled.p`
    ${tw`hidden text-[18px] text-black font-bold font-montserrat my-2.5 mx-0`}
    ${tw`lg:flex lg:text-2xl`}

    strong {
        ${tw`!color[var(--dominant-color-dark)]`}
    }
`

export const TitleModuleMobile = styled.p`
    ${tw`flex text-[18px] text-black font-bold font-montserrat my-2.5 mx-0`}
    ${tw`lg:hidden lg:text-2xl`}


    strong {
        ${tw`!color[var(--dominant-color-dark)]`}
    }
`
