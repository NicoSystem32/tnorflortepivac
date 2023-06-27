import { ReactElement, FC } from 'react'

// styles
import { ExceptionTitle, ExceptionParagraph } from './cardExceptionError-styles'

export interface CardExceptionErrorProps {
    children?: React.ReactNode
    title: string
    text: string
    txtAlign: 'center' | 'start' | 'end'
}

const CardExceptionError: FC<CardExceptionErrorProps> = ({
    children,
    title,
    text,
    txtAlign,
}): ReactElement => {
    return (
        <>
            <ExceptionTitle>{title}</ExceptionTitle>
            <ExceptionParagraph txtAlign={txtAlign}>{text}</ExceptionParagraph>
            {children}
        </>
    )
}

export default CardExceptionError
