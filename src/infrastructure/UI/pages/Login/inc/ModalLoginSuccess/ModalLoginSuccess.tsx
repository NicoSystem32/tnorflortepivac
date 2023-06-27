import { Modal } from 'react-bootstrap'
import tw, { styled } from 'twin.macro'

// custom components
import { Modal as ModalBase } from '../../../../components'

// custom hooks
import { useLogin } from '../../hooks/useLogin'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const GifLogin = require('../../../../assets/gifts/gif-login.mp4')

export interface ModalLoginSuccessTypes {
    show: boolean
    onHide?: () => void
    className?: string
}

const UnstyledModalLoginSuccess: React.FC<ModalLoginSuccessTypes> = ({
    show,
    onHide,
    className,
}) => {
    const { loginMessages } = useLogin()

    return (
        <ModalBase
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            className={className}
            centered
        >
            <Modal.Body>
                <div className="content-video-login">
                    <video autoPlay width="320" height="180">
                        <source src={GifLogin} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <p className="title-modal-login">
                    {loginMessages.find((m) => m.name === 'popupLoginValidado')?.title}
                </p>
                <p className="text-modal-login">
                    {loginMessages.find((m) => m.name === 'popupLoginValidado')?.text}
                </p>
            </Modal.Body>
        </ModalBase>
    )
}

const ModalLoginSuccess = styled(UnstyledModalLoginSuccess)`
    .content-video-login {
        ${tw`text-center`}
    }

    .title-modal-login {
        ${tw`font-montserrat font-semibold text-base text-center text-gray-custom-500`}
    }

    .text-modal-login {
        ${tw`font-helvetica font-normal text-sm text-center text-gray-custom-500 whitespace-normal`}
    }
`

export default ModalLoginSuccess
