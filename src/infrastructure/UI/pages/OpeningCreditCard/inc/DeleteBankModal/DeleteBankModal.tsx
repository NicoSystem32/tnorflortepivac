import { FC, ReactElement } from 'react'

// components
import { Button } from '../../../../components'

// styles
import {
    Modal,
    ModalImage,
    CtrButtons,
    TitleModal,
    TextModal,
    BankName,
} from './deleteBankModal-styles'

// Icons
import { BlockerSVG } from '../../../../utils/getIcons'

// selectors
import { getAllBanksSelector, useSelector } from '../../../../../selectors'

// models
import { BuyWallet } from '../../../../../../domain/models'

interface DeleteBankModalProps {
    show: boolean
    bank: BuyWallet
    onClose: () => void
    onDelete?: () => void
}

const DeleteBankModal: FC<DeleteBankModalProps> = ({
    show,
    onClose,
    onDelete,
    bank,
}): ReactElement => {
    const { banks } = useSelector(getAllBanksSelector)
    const bankToDelete = banks.find((item) => (bank ? item.tcbId === bank.bankEntityId : {}))

    return (
        <Modal
            show={show}
            onHide={onClose}
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <ModalImage src={BlockerSVG} alt="credit card" />
                <TitleModal>
                    Estás seguro que quieres eliminar el banco destino{' '}
                    <BankName> {bankToDelete?.tcbNombre} </BankName>
                </TitleModal>
                <TextModal></TextModal>

                <CtrButtons>
                    <Button variant="outline-cancel" type="submit" extend onClick={onDelete}>
                        Eliminar
                    </Button>
                    <Button variant="sub-dominant" type="submit" extend onClick={onClose}>
                        Cancelar
                    </Button>
                </CtrButtons>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteBankModal
