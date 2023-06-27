// Icons
import { TDCIconFormSVG } from '../../../../utils/getIcons'

// styles
import { AlertFaiContainer, Logo, Text, Title, Content } from './alertFai-styles'

interface AlertFaiProps {
    title?: string
    text?: string
    children?: React.ReactNode
}

const AlertFai: React.FC<AlertFaiProps> = ({ title, text, children }): JSX.Element => {
    return (
        <AlertFaiContainer>
            <Logo src={TDCIconFormSVG} alt="logo" />
            <Content>
                {title && <Title>{title}</Title>}
                {text && <Text>{text}</Text>}
                {children}
            </Content>
        </AlertFaiContainer>
    )
}

export default AlertFai
