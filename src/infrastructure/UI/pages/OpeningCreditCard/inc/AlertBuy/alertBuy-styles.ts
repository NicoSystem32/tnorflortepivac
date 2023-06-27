import tw, { styled } from 'twin.macro'

export const StyledCtr = styled.div`
    ${tw`w-full flex justify-center items-center`}
`

export const AlertFaiContainer = styled.div`
    ${tw`w-full lg:w-[550px] mb-1 p-4 flex items-center rounded-[5px]`}
    background-color: var(--alert-second);
`

export const Logo = styled.img`
    ${tw`w-8 mr-5`}
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
    color: var(--text-modal1);
`
