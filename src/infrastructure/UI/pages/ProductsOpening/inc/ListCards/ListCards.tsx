// styles
import { ListCards as ListCardsContainer } from './listCard-styles'

interface ListCardsProps {
    children: React.ReactNode
}

const ListCards: React.FC<ListCardsProps> = ({ children }): JSX.Element => {
    return <ListCardsContainer>{children}</ListCardsContainer>
}

export default ListCards
