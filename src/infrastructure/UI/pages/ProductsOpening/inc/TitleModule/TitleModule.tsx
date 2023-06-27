// styles
import { ContainerTitle, Title } from './titleModule-styles'

const TitleModule = (): JSX.Element => {
    return (
        <ContainerTitle>
            <Title>
                ¿Qué producto
                <span>
                    deseas
                    <br />
                    solicitar?
                </span>
            </Title>
        </ContainerTitle>
    )
}

export default TitleModule
