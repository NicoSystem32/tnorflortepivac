import { ReactElement, FC } from 'react'

// styles
import { Title, TitleSpan } from './titleModule-styles'

export interface TitleModuleProps {
    title?: string
}

const TitleModule: FC<TitleModuleProps> = ({ title }): ReactElement => {
    return (
        <Title>
            Compra de <TitleSpan>cartera</TitleSpan>
        </Title>
    )
}

export default TitleModule
