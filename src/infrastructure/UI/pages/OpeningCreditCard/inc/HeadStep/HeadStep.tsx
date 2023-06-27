import { ReactElement, FC } from 'react'

// styles
import { ParagraphStep, TitleStep, SpaceStep } from '../../openingCreditCard-styles'

export interface HeadStepProps {
    title: string
    paragraph: string
}

const HeadStep: FC<HeadStepProps> = ({ title, paragraph }): ReactElement => {
    return (
        <>
            <TitleStep>{title}</TitleStep>
            <SpaceStep />
            <ParagraphStep>{paragraph}</ParagraphStep>
            <SpaceStep />
        </>
    )
}

export default HeadStep
