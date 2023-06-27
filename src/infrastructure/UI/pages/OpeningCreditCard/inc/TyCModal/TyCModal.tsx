import { ReactElement, FC } from 'react'

// components
import { CheckField } from '..'
import { Button } from '../../../../components'

// styles
import { ModalContent, Modal, ModalHeader, CtrButton, ModalFooter } from './tycModal-styles'

export interface TyCModalProps {
    showModalTC: boolean
    handleClose: () => void
    onContinue: () => void
    disable: boolean
    onChangeCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void
    checked?: boolean
}

const TyCModal: FC<TyCModalProps> = ({
    showModalTC,
    handleClose,
    onContinue,
    disable,
    checked,
    onChangeCheck,
}): ReactElement => {
    return (
        <Modal show={showModalTC} onHide={handleClose} size="xl" keyboard={false} centered>
            <ModalHeader closeButton></ModalHeader>
            <ModalContent>
                <CheckField
                    viewTextLink="política de tratamiento de datos"
                    text="Autorizo a Cavipetrol a hacer uso de mis datos personales según la "
                    onClickLink={() => {
                        window.open(
                            'https://cavipetrolstorageaccount.blob.core.windows.net/assets/TÉRMINOS Y CONDICIONES DE TARJETA DE CRÉDITO CAVIPETROL.pdf',
                            'WindowName',
                            'noopener'
                        )
                    }}
                    onChange={onChangeCheck}
                    checked={checked}
                />

                <CtrButton>
                    <Button
                        variant="sub-dominant"
                        type="submit"
                        extend
                        disabled={disable}
                        onClick={onContinue}
                    >
                        Continuar
                    </Button>
                </CtrButton>
            </ModalContent>
            <ModalFooter></ModalFooter>
        </Modal>
    )
}

export default TyCModal
