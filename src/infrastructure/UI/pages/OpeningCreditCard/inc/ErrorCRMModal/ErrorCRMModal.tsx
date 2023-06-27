import { FC, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// components
import { Button } from '../../../../components'

// styles
import { Modal, ModalImage, CtrButtons, TitleModal, TextModal } from './errorCRMModal-styles'

// icons
import { CreditCardFlowSVG } from '../../../../utils/getIcons'

// selectors
import { getCRMResponseSelector } from '../../../../../selectors'

interface ErrorCRMModalProps {
    show: boolean
    onClose: () => void
}

const ErrorCRMModal: FC<ErrorCRMModalProps> = ({ show, onClose }): ReactElement => {
    const { message } = useSelector(getCRMResponseSelector)
    const formatMessage = message?.replace('{', '').replace('}', '')

    return (
        <Modal
            show={show}
            onHide={onClose}
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <ModalImage src={CreditCardFlowSVG} alt="credit card" />
                <TitleModal>
                    {formatMessage?.split('|')[0] ?? 'Parece que los datos no coinciden'}
                </TitleModal>
                <TextModal>
                    {formatMessage?.split('|')[1].split('link')[0] ??
                        'Los datos ingresados no concuerdan con los registrados en nuestro sistema, por favor comunícate con '}
                    <Link to="/support-private">
                        {formatMessage?.split('|')[1].split('link')[1] ?? 'servicio al asociado'}
                    </Link>
                </TextModal>

                <CtrButtons>
                    <Button variant="sub-dominant" type="submit" extend onClick={onClose}>
                        Modifica los datos
                    </Button>
                </CtrButtons>
            </Modal.Body>
        </Modal>
    )
}

export default ErrorCRMModal
