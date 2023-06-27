import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'

// components
import { Button } from '../../../../components'
import { NavigationStep } from '..'

// styles
import {
    EndFlowWrapper,
    EndFlowContent,
    EndFlowCtr,
    Image,
    TitleView,
    ParagraphView,
} from './endFlow-styled'

// icons
import { ReadySVG } from '../../../../utils/getIcons'

// actions
import { notifyCompletionAction } from '../../../../../redux/portfolioPurchaseTC'

// selectors
import { getCreditCardDataPerStepSelector, useSelector } from '../../../../../selectors'

const EndFlow = (): ReactElement => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { fifteenthStep } = createCreditCard

    const redirection = (url: string, data?: Record<string, string | number>): void => {
        history.push(url, data)
    }

    return (
        <>
            <NavigationStep />
            <EndFlowWrapper>
                <EndFlowCtr>
                    <EndFlowContent>
                        <Image src={ReadySVG} alt="Logo" />
                        <TitleView>Todo listo</TitleView>
                        <ParagraphView>
                            Tu solicitud de tarjeta de crédito fue enviada con éxito, muy pronto un
                            asesor se comunicará contigo para validar información
                        </ParagraphView>
                        <Button
                            variant="sub-dominant"
                            type="submit"
                            onClick={() => {
                                if (fifteenthStep.buyWallet === 'yes') {
                                    dispatch(notifyCompletionAction())
                                }
                                redirection('/home-wallet')
                            }}
                        >
                            Finalizar
                        </Button>
                    </EndFlowContent>
                </EndFlowCtr>
            </EndFlowWrapper>
        </>
    )
}

export default EndFlow
