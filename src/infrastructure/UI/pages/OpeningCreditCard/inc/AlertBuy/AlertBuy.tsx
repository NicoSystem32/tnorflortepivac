import { ReactElement } from 'react'

// Icons
import { AlertSVG } from '../../../../utils/getIcons'

// styles
import { AlertFaiContainer, Logo, Text, Content, StyledCtr } from './alertBuy-styles'

const AlertBuy = (): ReactElement => {
    return (
        <StyledCtr>
            <AlertFaiContainer>
                <Logo src={AlertSVG} alt="logo" />
                <Content>
                    <Text>Haz alcanzado tu cupo disponible, no puedes agregar más productos</Text>
                </Content>
            </AlertFaiContainer>
        </StyledCtr>
    )
}

export default AlertBuy
