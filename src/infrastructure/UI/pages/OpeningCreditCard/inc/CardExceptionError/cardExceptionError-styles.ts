import tw, { styled } from 'twin.macro'

export const ExceptionTitle = styled.h5`
    ${tw`font-montserrat font-semibold text-center text-[18px] mb-5`}
`

export interface TextAlign {
    txtAlign: 'center' | 'start' | 'end'
}

export const ExceptionParagraph = styled.p<TextAlign>`
    ${tw`font-helvetica font-normal text-base mb-7.5`}

    text-align: ${({ txtAlign }) => txtAlign}
`
