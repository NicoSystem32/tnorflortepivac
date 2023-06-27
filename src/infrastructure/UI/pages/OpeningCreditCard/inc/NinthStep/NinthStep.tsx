import { ReactElement } from 'react'
import { useSelector } from 'react-redux'

// components
import { Button } from '../../../../components'
import { NavigationStep } from '..'

// styles
import {
    NinthStepWrapper,
    NinthStepContent,
    Image,
    TitleView,
    ParagraphView,
    SpanView,
} from './ninthStep-styles'
import { SpaceStep } from '../../openingCreditCard-styles'

// icons
import { CreditCardFlowSVG } from '../../../../utils/getIcons'

// hooks
import { useReducerStep } from '../../hooks'

// selectors
import {
    getCreditCardDataPerStepSelector,
    validateUserStateSelector,
} from '../../../../../selectors'

// utils
import { formatValue } from '../../../../components/GlobalFuntions/globalFunction'

const NinthStep = (): ReactElement => {
    const dispatchStep = useReducerStep()[1]

    const { validateUser } = useSelector(validateUserStateSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { seventhStep, eighthStep } = createCreditCard

    // handlers
    const onNext = (): void => {
        dispatchStep({
            type: 'GO_TO_STEP',
            payload: {
                step: 10,
            },
        })
    }

    const onBack = (): void => {
        dispatchStep({
            type: 'GO_TO_STEP',
            payload: {
                step: 7,
            },
        })
    }

    return (
        <>
            <NavigationStep />
            <NinthStepWrapper>
                <NinthStepContent>
                    <Image src={CreditCardFlowSVG} alt="" />
                    <TitleView>Tu cupo supera el monto para póliza automática</TitleView>
                    <ParagraphView>
                        Tu cupo de ${formatValue(seventhStep.cardQuote, 1)} supera el monto máximo
                        para tener una póliza de seguro automática, puedes continuar con él cupo
                        elegido y diligenciar el formato de asegurabilidad y demás requisitos
                        solicitados por la aseguradora,
                        <SpanView>
                            si disminuyes tu cupo a $
                            {formatValue(
                                validateUser?.autoFee ? validateUser?.autoFee : eighthStep.autoFee,
                                1
                            )}{' '}
                            tu póliza será automática
                        </SpanView>
                    </ParagraphView>
                    <Button variant="sub-dominant" type="submit" onClick={onBack}>
                        Reducir mi cupo a $
                        {formatValue(
                            validateUser?.autoFee ? validateUser?.autoFee : eighthStep.autoFee,
                            1
                        )}
                    </Button>
                    <SpaceStep />
                    <Button
                        variant="link"
                        type="submit"
                        className="link-dynamic-passw"
                        onClick={onNext}
                    >
                        Iniciar proceso de estudio de asegurabilidad
                    </Button>
                </NinthStepContent>
            </NinthStepWrapper>
        </>
    )
}

export default NinthStep
