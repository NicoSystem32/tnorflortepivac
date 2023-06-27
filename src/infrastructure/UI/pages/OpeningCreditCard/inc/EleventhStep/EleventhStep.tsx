import { ReactElement } from 'react'
import { useHistory } from 'react-router'

// components
import { Button } from '../../../../components'
import { NavigationStep } from '..'

// styles
import {
    EleventhStepWrapper,
    EleventhStepContent,
    EleventhStepCtr,
    Image,
    TitleView,
    ParagraphView,
} from './eleventhStep-styled'
import { TitleStep } from '../../openingCreditCard-styles'

// icons
import { CreditCardFlowSVG } from '../../../../utils/getIcons'

const EleventhStep = (): ReactElement => {
    const history = useHistory()

    const redirection = (url: string, data?: Record<string, string | number>): void => {
        history.push(url, data)
    }
    return (
        <>
            <NavigationStep />
            <EleventhStepWrapper>
                <EleventhStepCtr>
                    <TitleStep>Póliza de seguro</TitleStep>
                    <EleventhStepContent>
                        <Image src={CreditCardFlowSVG} alt="" />

                        <TitleView>Todo listo</TitleView>
                        <ParagraphView>
                            Tu solicitud de póliza ha sido enviada correctamente, podrás consultar
                            el estado en tus solicitudes
                        </ParagraphView>
                        <Button
                            variant="sub-dominant"
                            type="submit"
                            onClick={() => {
                                redirection('/home-wallet')
                            }}
                        >
                            Finalizar
                        </Button>
                    </EleventhStepContent>
                </EleventhStepCtr>
            </EleventhStepWrapper>
        </>
    )
}

export default EleventhStep
