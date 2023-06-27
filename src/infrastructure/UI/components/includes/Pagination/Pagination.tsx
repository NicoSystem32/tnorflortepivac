import { PaginationApp, PaginationContainer } from './pagination-styles'
import type { PaginationProps as PaginationBsProps } from 'react-bootstrap/Pagination'

interface PaginationProps extends PaginationBsProps {
    onPrev?: () => void
    onNext?: () => void
    children: React.ReactNode
}

const Pagination: React.FC<PaginationProps> = ({ onPrev, onNext, children }): JSX.Element => {
    return (
        <PaginationContainer>
            <PaginationApp>
                <PaginationApp.Prev onClick={onPrev} />
                {children}
                <PaginationApp.Next onClick={onNext} />
            </PaginationApp>
        </PaginationContainer>
    )
}

export default Pagination
