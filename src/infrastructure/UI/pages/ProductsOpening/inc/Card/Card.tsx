// styles
import { ContainerCard, CardImage, CardContent, CardTitle, CardText } from './card-styles'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    image: string
    title: string
    text: string
    isActive?: boolean
    onClick?: () => void
}

const Card: React.FC<CardProps> = ({
    image,
    title,
    text,
    onClick,
    isActive,
    ...props
}): JSX.Element => {
    return (
        <ContainerCard onClick={onClick} {...props} isActive={isActive}>
            <CardImage src={image} alt={title} />
            <CardContent>
                <CardTitle>{title}</CardTitle>
                <CardText>{text}</CardText>
            </CardContent>
        </ContainerCard>
    )
}

export default Card
