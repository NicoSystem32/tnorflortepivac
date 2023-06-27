// styled components
import { LoadingContainer, LoadingEllipsis, EllipsisItem } from './loading-styles'

interface LoadingProps {
    text?: string
}

const Loading = ({ text }: LoadingProps): JSX.Element => {
    return (
        <LoadingContainer>
            <LoadingEllipsis>
                <EllipsisItem />
                <EllipsisItem />
                <EllipsisItem />
                <EllipsisItem />
            </LoadingEllipsis>
            {text && <p>{text}</p>}
        </LoadingContainer>
    )
}

export default Loading
