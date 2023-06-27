/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { IconReported } from '../../../../utils/getIcons'
import { cleanStatusChangeTCAction, sendCodeOtpTCAction } from '../../../../../redux/tc'

//hooks
import { CreditCardSelector, SendCodeOtpTCSelector } from '../../../../../selectors'
import { useReducerActivateCard } from '../../hooks'

//styles
import { FirstStepContainer, InformationCard, InformationText } from './firstStep-styles'
import { Buttons, SubTitle, Title } from '../../activateCard-styles'

//components
import { Button, CreditCard, ModalGeneric } from '../../../../components'

//models
import { StoreApp } from '../../../../../redux/store/store.interface'
import { CardStates } from '../../../../../../domain/models'
import useQueryId from '../../../../hooks/useQueryId'

const FirstStep = (): ReactElement => {
    const dispatch = useDispatch()
    const history = useHistory()
    const setActivateCardState = useReducerActivateCard()[1]
    const {
        loading: loadingOtp,
        status: statusOtp,
        message: messageOtp,
        error: errorOtp,
    } = useSelector(SendCodeOtpTCSelector)
    const [showModal, setShowModal] = useState(false)
    const { id } = useQueryId()
    const { cardData: infoCard } = useSelector((store: StoreApp) =>
        CreditCardSelector(store, String(id))
    )

    const validUrl = (): void => {
        if (id === undefined || !infoCard || infoCard.lockType !== CardStates.POR_ACTIVAR) {
            history.push('/home-wallet')
        }
    }

    const validStatusOtp = (): void => {
        if (statusOtp === '200' && !loadingOtp) {
            setShowModal(false)
            setActivateCardState({ type: 'NEXT_STEP' })
        } else if (
            statusOtp !== '200' &&
            (statusOtp !== null || errorOtp?.errorData?.message) &&
            !loadingOtp
        ) {
            setShowModal(true)
        }
    }

    useEffect(() => {
        validUrl()
    }, [])

    useEffect(() => {
        validStatusOtp()
    }, [loadingOtp])

    const handleClose = (): void => {
        setShowModal(false)
        // dispatch(sendCodeOtpTCAction)
    }

    const nextStep = (): void => {
        dispatch(sendCodeOtpTCAction())
        dispatch(cleanStatusChangeTCAction())
        // setActivateCardState({ type: 'NEXT_STEP' })
    }

    const pushMessageModal = (): string => {
        if (messageOtp) {
            return messageOtp
        } else if (
            errorOtp?.errorData?.message &&
            !errorOtp?.errorData?.message?.toLowerCase().includes('internal server')
        ) {
            return errorOtp?.errorData?.message
        } else {
            return 'Se produjo un error, intenta nuevamente'
        }
    }

    return (
        <FirstStepContainer>
            <InformationText>
                Para activar tu tarjeta confirma que los datos en el plástico sean correctos
            </InformationText>
            <InformationCard>
                <picture>
                    <CreditCard
                        lastFourDigits={infoCard?.lastFourDigits}
                        dateExpired={infoCard?.dateExpiredCard}
                        nameCard={infoCard?.nameCard}
                    />
                </picture>
                <div>
                    <div>
                        <Title>Tipo de tarjeta</Title>
                        <SubTitle>{infoCard?.nameCard}</SubTitle>
                    </div>
                    <div>
                        <Title>Cuatro últimos dígitos</Title>
                        <SubTitle>{infoCard?.lastFourDigits}</SubTitle>
                    </div>
                </div>
            </InformationCard>
            <Buttons>
                <Button
                    variant="outline-cancel"
                    extend
                    onClick={() => history.push('/home-wallet')}
                    disabled={loadingOtp}
                >
                    Cancelar
                </Button>
                <Button
                    variant="sub-dominant"
                    extend
                    onClick={nextStep}
                    disabled={loadingOtp}
                    isLoading={loadingOtp}
                >
                    Continuar
                </Button>
            </Buttons>
            <ModalGeneric
                show={showModal}
                handleClose={handleClose}
                img={IconReported}
                textTitle=""
                textBody={pushMessageModal()}
                handleButton={handleClose}
                textButton="Aceptar"
            />
        </FirstStepContainer>
    )
}
export default FirstStep
