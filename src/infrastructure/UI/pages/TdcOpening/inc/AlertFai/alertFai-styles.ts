import tw, { styled } from 'twin.macro'

export const AlertFaiContainer = styled.div`
    ${tw`my-6 flex items-center`}
`

export const Logo = styled.img`
    ${tw`w-10 mr-5`}
`

export const Content = styled.div`
    ${tw`flex flex-col`}
    ${tw`font-helvetica font-normal text-sm m-0`}

    & p {
        ${tw`m-0`}
    }
`

export const Title = styled.h3`
    ${tw`font-montserrat font-semibold text-base m-0`}
`

export const Text = styled.p`
    ${tw`font-helvetica font-normal text-sm m-0`}
`
