import tw, { styled } from 'twin.macro'

export const ContainerButtons = styled.div`
    ${tw`gap-1 my-5 flex flex-col justify-between lg:flex-row-reverse`}

    & button {
        ${tw`lg:!w-[46%]`}
    }
`
