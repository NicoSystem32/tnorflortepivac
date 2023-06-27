import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'

// base components
import { Button, Modal as ModalBase } from '../../../../components'

// helpers
import {
    formatValue,
    formatDecimalValue,
} from '../../../../components/GlobalFuntions/globalFunction'
import './../../paymentsFai.css'

// resources
import { CreditCardPaymentSelector, parametersTDCSelector } from '../../../../../selectors'

// icons
import { IconModalSVG } from '../../../../utils/getIcons'

type ConfirmPaymentFAIProps = {
    show?: boolean
    handleClose?: () => void
    handleSubmit?: () => void
}

const ConfirmPaymentFAI = ({
    show,
    handleClose,
    handleSubmit,
}: ConfirmPaymentFAIProps): React.ReactElement => {
    const history = useHistory()
    const location = useLocation()
    const state = useSelector((stateRef: any) => stateRef)
    const tdcParameters = useSelector(parametersTDCSelector)
    const { dataPayment } = useSelector(CreditCardPaymentSelector)
    const [isLoading, setIsLoading] = useState(false)

    const paymentData = useRef<{ total: number }>({
        total: state.products.total,
    })
    if (location.state.from === 'TDC' && tdcParameters !== null) {
        paymentData.current.total = tdcParameters.value
    }
    if (location.state.from === 'TC' && dataPayment !== null) {
        paymentData.current.total = dataPayment.value
    }

    const finalPayment = (): void => {
        setIsLoading(true)
        if (typeof handleSubmit === 'function') handleSubmit()
    }

    return (
        <ModalBase
            kind="alternative"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className="modal-contact-footer modal-center"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="content-video-login">
                    <img src={IconModalSVG} alt="pago cuenta FAI" className="return-img" />
                </div>
                <p className="title-modal-login">¿Realizar pago?</p>
                <p className="text-modal-login text-confirmation-pay">
                    Estás a punto de realizar un pago por un valor de <br />
                    {formatValue(paymentData.current.total, 1)}
                    <sup className="sub-indice">
                        {formatDecimalValue(paymentData.current.total, 1)}
                    </sup>
                    <br />
                    <br />
                    Te recomendamos validar que tienes los fondos suficientes antes de continuar.
                </p>
                <div className="modal-base-footer">
                    <Button
                        variant="outline-cancel"
                        extend
                        onClick={() => {
                            history.push('/home-wallet')
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="sub-dominant"
                        extend
                        onClick={finalPayment}
                        disabled={isLoading}
                        isLoading={isLoading}
                    >
                        Continuar
                    </Button>
                </div>
            </Modal.Body>
        </ModalBase>
    )
}

export default ConfirmPaymentFAI
