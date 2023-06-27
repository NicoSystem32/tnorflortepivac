import { useHistory } from 'react-router-dom'

// components
import { LayoutContent } from '../../transverse'
import { BreadcrumbApp } from '../../components'
import { Title, FormContainer, OpenTdcForm } from './inc'

// styles
import { ContainerSimulator } from './TdcOpening-styles'

// hooks
import { useAppTour } from '../../hooks'

const TdcOpening = (): JSX.Element => {
    const history = useHistory()
    useAppTour()

    const redirection = (url: string): void => {
        history.push(url)
    }
    const breadcrumbs = [
        {
            text: 'Inicio',
            active: false,
            onClick: () => {
                redirection('/home-wallet')
            },
        },
        {
            text: 'solicitud de productos',
            active: true,
        },
    ]

    return (
        <LayoutContent>
            <ContainerSimulator>
                <BreadcrumbApp
                    breadcrumbs={breadcrumbs}
                    onBack={() => {
                        redirection('/product-opening')
                    }}
                />

                <Title />

                <FormContainer>
                    <OpenTdcForm />
                </FormContainer>
            </ContainerSimulator>
        </LayoutContent>
    )
}

export default TdcOpening
