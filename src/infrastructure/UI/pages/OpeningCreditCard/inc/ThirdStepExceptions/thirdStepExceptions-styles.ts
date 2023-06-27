import tw, { styled } from 'twin.macro'
import { Link } from 'react-router-dom'

export const ThirdStepExceptionsContent = styled.div`
    ${tw`p-5 w-full max-w-[450px] rounded-[10px] shadow-[0px 3px 6px #00000029]`}
    ${tw`lg:p-7.5 lg:max-w-[530px]`}
`

export const ExceptionCtr = styled.div`
    ${tw`flex flex-col items-center`}

    & button {
        ${tw`px-15`}
    }
`

export const ExceptionImg = styled.img`
    ${tw`w-28 mb-7.5`}
`

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

export const ExceptionImage = styled.img`
    ${tw`mr-5`}
`

export const ExceptionNavigateLink = styled(Link)`
    ${tw`w-full flex`}
    text-decoration: none;
`
