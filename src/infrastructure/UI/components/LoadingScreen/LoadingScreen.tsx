import { useEffect, useRef } from 'react'
import ModalBody from 'react-bootstrap/ModalBody'

// base components
import { Loading, Modal } from '../includes'

// styles
import './loading-screen.scss'

const LoadingScreen = (): JSX.Element => {
    const showRef = useRef(true)

    useEffect(() => {
        return () => {
            showRef.current = false
        }
    }, [])

    return (
        <Modal
            className="loading-screen"
            show={showRef.current}
            backdrop="static"
            keyboard={false}
            centered
        >
            <ModalBody>
                <Loading text="Aguarda un momento" />
            </ModalBody>
        </Modal>
    )
}

export default LoadingScreen
