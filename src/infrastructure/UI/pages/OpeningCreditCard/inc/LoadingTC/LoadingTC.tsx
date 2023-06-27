import { ReactElement, FC } from 'react'

// components
import { Loading } from '../../../../components'

// styles
import { Modal, ModalBody, ModalText } from './loadingTC-styles'

export interface LoadingTCProps {
    title?: string
    text?: string
    show: boolean
}

const LoadingTC: FC<LoadingTCProps> = ({ title, text, show }): ReactElement => {
    return (
        <Modal show={show} backdrop="static" keyboard={false} centered>
            <ModalBody>
                <Loading text={title || 'Pronto conocerás tu próxima tarjeta'} />

                <ModalText>
                    {text || 'Aguarda un momento, estamos validando la información'}
                </ModalText>
            </ModalBody>
        </Modal>
    )
}

export default LoadingTC
