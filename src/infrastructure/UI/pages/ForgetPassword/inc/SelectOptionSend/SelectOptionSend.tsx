// Icons
import { MessageSVG, EmailSVG } from '../../../../utils/getIcons'

// Styles
import './../../forgetPassword.scss'

// helpers
import { useReducerState, useStateForget } from '../../hooks'
import { useEffect, useState } from 'react'
import {
    EllipsisItem,
    LoadingEllipsis,
} from '../../../../components/includes/Loading/loading-styles'
import ErrorInformation from '../../../../components/ErrorInformation'

const SelectOptionSend = (): JSX.Element => {
    const [{ contact }] = useReducerState()
    const dispatchStep = useReducerState()[1]
    const { sendCodeForget, message, transactionFailed } = useStateForget()
    const [isLoadingCell, setIsLoadingCell] = useState(false)
    const [isLoadingEmail, setIsLoadingEmail] = useState(false)
    const [resultFailed, setResultFailed] = useState(false)
    const [msgError, setMsgError] = useState('')

    useEffect(() => {
        setResultFailed(transactionFailed)
        setMsgError(message)
    }, [transactionFailed])

    const cellSelected = (): void => {
        setIsLoadingCell(true)
        dispatchStep({
            type: 'SET_OPTION',
            payload: {
                optionSelected: 0,
            },
        })
        sendCodeForget(1, 0)
    }

    const emailSelected = (): void => {
        setIsLoadingEmail(true)
        dispatchStep({
            type: 'SET_OPTION',
            payload: {
                optionSelected: 1,
            },
        })
        sendCodeForget(1, 1)
    }

    return (
        <div className="content-step2">
            <div className="content-title-form-forget">
                <p className="title-form-forget">¿Cómo deseas</p>
                <p className="title-form-forget-high">&nbsp;recuperar tu&nbsp;</p>
            </div>
            <div className="content-subtitle-form-forget">
                <p className="title-form-forget-high">contraseña</p>
                <p className="title-form-forget">?</p>
            </div>
            <div className="global-recovery">
                <a
                    className={
                        isLoadingCell
                            ? 'content-recovery-option loading-option'
                            : 'content-recovery-option firts'
                    }
                    onClick={cellSelected}
                >
                    {isLoadingCell && (
                        <LoadingEllipsis>
                            <EllipsisItem />
                            <EllipsisItem />
                            <EllipsisItem />
                            <EllipsisItem />
                        </LoadingEllipsis>
                    )}
                    <img src={MessageSVG} alt="receive message" className="img-recovery-option" />
                    <p className="text-recovery-option">
                        Recibir mensaje de texto al celular terminado en {contact.cell}
                    </p>
                </a>
                <a
                    className={
                        isLoadingEmail
                            ? 'content-recovery-option loading-option'
                            : 'content-recovery-option'
                    }
                    onClick={emailSelected}
                >
                    {isLoadingEmail && (
                        <LoadingEllipsis>
                            <EllipsisItem />
                            <EllipsisItem />
                            <EllipsisItem />
                            <EllipsisItem />
                        </LoadingEllipsis>
                    )}
                    <img src={EmailSVG} alt="receive mail code" className="img-recovery-option" />
                    <p className="text-recovery-option">Recibir código al correo {contact.email}</p>
                </a>
            </div>
            <ErrorInformation text={resultFailed ? msgError : ''} />
        </div>
    )
}
export default SelectOptionSend
