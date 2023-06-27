import { ReactElement, FC } from 'react'
import { useHistory } from 'react-router-dom'

// styles
import {
    MoraCardBottom,
    MoraCardTop,
    MoraCardTopRight,
    MoraCard as Card,
    ExceptionCtrImage,
    ExceptionImage,
} from './moraCard-styles'
import { ParagraphStep, TitleStep } from '../../openingCreditCard-styles'

export interface MoraCardProps {
    image: string
    title: string
    value: string
    url: string
    type: 'credit' | 'saving'
}

const MoraCard: FC<MoraCardProps> = ({ image, title, value, url, type }): ReactElement => {
    const history = useHistory()

    const redirection = (path: string, data?: Record<string, string | number>): void => {
        history.push(path, data)
    }
    return (
        <Card>
            <MoraCardTop>
                <ExceptionCtrImage>
                    <ExceptionImage src={image} alt="image" />
                </ExceptionCtrImage>
                <MoraCardTopRight>
                    <TitleStep>{title}</TitleStep>
                    <ParagraphStep>${value}</ParagraphStep>
                </MoraCardTopRight>
            </MoraCardTop>
            <MoraCardBottom
                onClick={() => {
                    redirection(url)
                }}
            >
                <ParagraphStep>
                    Ir a productos de {type === 'credit' ? 'créditos' : 'ahorros'}
                </ParagraphStep>
            </MoraCardBottom>
        </Card>
    )
}

export default MoraCard
