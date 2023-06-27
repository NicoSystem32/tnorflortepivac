import tw, { styled } from 'twin.macro'

export interface CardActive {
    isActive?: boolean
}

export const ContainerCard = styled.div<CardActive>`
    ${tw`my-5 p-4 border border-solid border-[#C4C2C2] cursor-pointer rounded-[10px] flex items-center max-w-[500px]`}
    ${tw`lg:shadow-[0px 3px 6px #00000029]`}
    ${({ isActive }) => (isActive ? tw`opacity-100` : tw`opacity-40`)}
`

export const CardImage = styled.img`
    ${tw`w-12 h-12 mx-1.5 md:mx-3 lg:mx-5`}
`

export const CardContent = styled.div`
    ${tw`p-1`}
`

export const CardTitle = styled.h5`
    ${tw`font-montserrat font-semibold text-sm md:text-base text-black m-0 mb-2`}
`

export const CardText = styled.p`
    ${tw`font-helvetica font-normal text-sm md:text-base text-black m-0`}
`
