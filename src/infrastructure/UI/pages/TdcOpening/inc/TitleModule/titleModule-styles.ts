import tw, { styled } from 'twin.macro'

export const ContainerTitle = styled.div`
    ${tw`my-5 lg:my-10`}
`

export const Title = styled.h1`
    ${tw`m-0 font-montserrat font-bold text-black text-2xl`}

    span {
        ${tw`pl-1 text-dominant-dark`}
    }
`
