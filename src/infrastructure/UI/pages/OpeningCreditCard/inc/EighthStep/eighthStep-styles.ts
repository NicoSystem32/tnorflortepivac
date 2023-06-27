import tw, { styled } from 'twin.macro'
import { TitleStep } from '../../openingCreditCard-styles'

export const EighthStepWrapper = styled.section`
    ${tw`flex justify-center items-center py-2`}
`

export const EighthStepContent = styled.div`
    ${tw`p-5 lg:px-10 w-full max-w-[550px] lg:max-w-[924px] rounded-[10px] shadow-[0px 3px 6px #00000029]`}
`

export const CreditCardsCtr = styled.div`
    ${tw`flex justify-center w-full lg:gap-10 lg:p-7 mt-5 lg:mt-0 mb-5 relative`}

    & > div {
        ${tw`w-full`}

        & .input-group {
            & > div {
                ${tw`w-full flex justify-center gap-10`}
            }
        }
    }

    & input {
        ${tw`!hidden`}
    }
`

export const CardsTabsCtr = styled.div`
    ${tw`rounded-[10px] shadow-[0px 3px 6px #00000029] w-full`}
`

export const CardsTabsCtrHead = styled.div`
    ${tw`flex justify-between items-center`}
`
export interface CardsTabCtrHeadProps {
    isActive?: boolean
    isLeft?: boolean
}

export const CardsTabCtrHead = styled.div<CardsTabCtrHeadProps>`
    ${tw`w-1/2`}

    & label {
        ${tw`m-0 w-full flex justify-center items-center cursor-pointer relative`}
        ${tw`h-14 p-3 flex justify-center items-center cursor-pointer`}
        ${tw`bg-[var(--background-secundary)] relative`}
        ${({ isLeft }) => (isLeft ? tw`rounded-tl-[10px]` : tw`rounded-tr-[10px]`)};
        ${({ isActive }) => (isActive ? tw`shadow-[0px 0px 2px #00000029]` : tw``)};
        border-bottom: ${({ isActive }) =>
            isActive ? '2px solid var(--dominant-color-dark)' : ''};
        background-color: ${({ isActive }) => (isActive ? 'white' : '')};
    }
`

export interface ImageTabActive {
    isActive?: boolean
}

export const ImageTab = styled.img<ImageTabActive>`
    ${tw`transition-[all] duration-[300ms] delay-[150ms] absolute`}
    ${({ isActive }) => (isActive ? tw`w-28` : tw`w-15`)}
    ${({ isActive }) => (isActive ? tw`bottom-[15%]` : tw`bottom-[25%]`)}
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

export const Amount = styled.p<TextAlign>`
    ${tw`font-montserrat font-semibold text-base mb-7.5 relative m-0`}

    text-align: ${({ txtAlign }) => txtAlign};
`

export const Sub = styled.sub`
    ${tw`absolute top-[40%]`}
`
