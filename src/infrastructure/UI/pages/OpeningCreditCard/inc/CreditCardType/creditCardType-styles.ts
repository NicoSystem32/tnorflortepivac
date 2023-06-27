import tw, { styled } from 'twin.macro'
import { TitleStep } from '../../openingCreditCard-styles'

export interface CreditCardCtrProps {
    isActive?: boolean
}

export const CreditCardCtr = styled.div<CreditCardCtrProps>`
    ${tw`w-72 flex flex-col items-center shadow-[0px 3px 6px #00000029]`}
    ${tw`p-3 overflow-hidden cursor-pointer rounded-[10px] h-70`}
    ${tw`transition-[all] duration-[300ms] delay-[150ms]`}
    ${tw`hover:h-[460px]`}

    ${({ isActive }) => (isActive ? tw`h-[460px] border border-solid border-dominant` : tw`h-70`)}
`

export const Image = styled.img`
    ${tw`w-full`}
`

export const ImageCtr = styled.div`
    ${tw`w-[260px] h-[200px]`}
`

export const InformationCtr = styled.div`
    ${tw``}
`

export const CreditCardContent = styled.div`
    ${tw`w-[260px] my-3`}

    ${TitleStep} {
        ${tw`my-0`}
    }
`

export const HrCustom = styled.hr`
    ${tw``}
`

export const Amount = styled.p<TextAlign>`
    ${tw`font-montserrat font-semibold text-base mb-7.5 relative m-0 text-black`}

    text-align: ${({ txtAlign }) => txtAlign};
`

export const AdditionalInfo = styled.div`
    ${tw`flex flex-col items-center`}

    ${Amount} {
        ${tw`w-full`}
    }
`

export const Sub = styled.sub`
    ${tw`absolute top-[40%]`}
`
export interface TextAlign {
    txtAlign: 'center' | 'start' | 'end'
}

export const CardType = styled.h4`
    ${tw`font-montserrat font-bold text-base mb-7.5 relative my-3`}
`

export const ImageLogo = styled.img`
    ${tw`w-10 mb-2`}
`
