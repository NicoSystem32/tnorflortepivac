import tw, { styled } from 'twin.macro'
import { TitleStep } from '../../openingCreditCard-styles'

export const CreditCardTabsCtr = styled.div`
    ${tw`rounded-[10px]  w-full flex flex-col`}
    ${tw`transition-[all] duration-[300ms] delay-[150ms]`}
`

export interface CreditCardTabProps {
    isActive?: boolean
    isLeft?: boolean
}

export const CreditCardTab = styled.div<CreditCardTabProps>`
    ${tw`w-1/2 h-14 p-3 flex justify-center items-center cursor-pointer`}
    ${tw`bg-[var(--background-secundary)] relative`}
    ${({ isLeft }) => (isLeft ? tw`rounded-tl-[10px]` : tw`rounded-tr-[10px]`)};
    ${({ isActive }) => (isActive ? tw`shadow-[0px 0px 2px #00000029]` : tw``)};
    border-bottom: ${({ isActive }) => (isActive ? '2px solid var(--dominant-color-dark)' : '')};
    background-color: ${({ isActive }) => (isActive ? 'white' : '')};
`

export const Tabs = styled.div`
    ${tw`flex`}
`

export const Amount = styled.p<TextAlign>`
    ${tw`font-montserrat font-semibold text-base mb-7.5 relative m-0`}

    text-align: ${({ txtAlign }) => txtAlign};
`

export const TabInfo = styled.div`
    ${tw`flex flex-col p-3 shadow-[0px 3px 6px #00000029] rounded-b-[10px]`}

    & ${TitleStep} {
        ${tw`m-0`}
    }
`
export interface TextAlign {
    txtAlign: 'center' | 'start' | 'end'
}

export const Sub = styled.sub`
    ${tw`absolute top-[40%]`}
`

export interface ImageCardActive {
    isActive?: boolean
}

export const ImageCard = styled.img<ImageCardActive>`
    ${tw`transition-[all] duration-[300ms] delay-[150ms] absolute`}
    ${({ isActive }) => (isActive ? tw`w-28` : tw`w-15`)}
    ${({ isActive }) => (isActive ? tw`bottom-[15%]` : tw`bottom-[25%]`)}
`
