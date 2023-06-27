import { ReactElement, useEffect } from 'react'
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
} from './finishModal-styled'

// icons
import { ReadySVG } from '../../../../utils/getIcons'

// actions
import { notifyCompletionAction } from '../../../../../redux/portfolioPurchaseTC'

const FinishModal = (): ReactElement => {
    const history = useHistory()
    const dispatch = useDispatch()

    const redirection = (url: string, data?: Record<string, string | number>): void => {
        history.push(url, data)
    }

    useEffect(() => {
        dispatch(notifyCompletionAction())
    }, [])

    return (
        <>
            <NavigationStep />
            <EndFlowWrapper>
                <EndFlowCtr>
                    <EndFlowContent>
                        <Image src={ReadySVG} alt="Logo" />
                        <TitleView>Todo listo</TitleView>
                        <ParagraphView>
                            La compra de cartera ha sido radicada con éxito, muy pronto un asesor se
                            comunicará contigo para validar la información. no puedes agregar más
                            productos para compra de cartera.
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
                    </EndFlowContent>
                </EndFlowCtr>
            </EndFlowWrapper>
        </>
    )
}

export default FinishModal
