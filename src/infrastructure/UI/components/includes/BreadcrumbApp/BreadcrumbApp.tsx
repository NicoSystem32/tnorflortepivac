import { Breadcrumb } from 'react-bootstrap'

// styles
import { BreadcrumbContainer, ArrowBlack } from './breadcrumbApp-styles'

// Icons
import { ArrowCircleSVG } from '../../../utils/getIcons'

interface BreadcrumbAppProps {
    onBack?: () => void
    breadcrumbs: Breadcrumbs[]
}

interface Breadcrumbs {
    text: string
    active: boolean
    onClick?: () => void
}

const BreadcrumbApp: React.FC<BreadcrumbAppProps> = ({ onBack, breadcrumbs }): JSX.Element => {
    return (
        <>
            <BreadcrumbContainer>
                <Breadcrumb>
                    {breadcrumbs.map(({ text, onClick, active }) => (
                        <Breadcrumb.Item key={`${text}-text`} onClick={onClick} active={active}>
                            {text}
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </BreadcrumbContainer>
            {onBack && (
                <ArrowBlack onClick={onBack}>
                    <img src={ArrowCircleSVG} alt="black" />
                    <p>Volver</p>
                </ArrowBlack>
            )}
        </>
    )
}

export default BreadcrumbApp
