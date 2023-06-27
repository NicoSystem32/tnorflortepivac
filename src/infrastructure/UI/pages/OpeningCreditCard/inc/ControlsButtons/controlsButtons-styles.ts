import tw, { styled } from 'twin.macro'

export const ButtonsCtr = styled.div`
    ${tw`flex flex-col-reverse gap-3 lg:flex-row items-center justify-between my-3`}
`

export interface ButtonsProps {
    isSave?: boolean
}

export const ButtonsRightCtr = styled.div<ButtonsProps>`
    ${tw`w-full flex items-center justify-between lg:w-[60%] gap-10`}

    ${({ isSave }) => (isSave ? tw`lg:w-[25%]` : tw`lg:w-[60%]`)}

    & .save {
        ${tw`hidden lg:block`}
    }
`

export const ButtonsLeftCtr = styled.div`
    ${tw`w-full flex items-center justify-start lg:w-[25%]`}
`
