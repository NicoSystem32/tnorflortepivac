import { useEffect, useState } from 'react'

// Bootstrap
import { Form } from 'react-bootstrap'

import { Button } from '../../../../components'

// Styles
import './../../forgetPassword.scss'

// helpers
import { useReducerState, useStateForget } from '../../hooks'

const ValidateDocument = (): JSX.Element => {
    const [{ feedback }] = useReducerState()
    const { cleanFailed } = useStateForget()
    const [isDisabled, setDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [documentReceived, setDocumentReceived] = useState('')
    const dispatchStep = useReducerState()[1]
    const { validateUser } = useStateForget()

    const onChangeDocument = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let targetValue = event.target.value.replace(/[^0-9\s]/g, '')
        targetValue = targetValue.replace(' ', '')
        setDocumentReceived(targetValue)
        dispatchStep({
            type: 'SET_DOCUMENT',
            payload: {
                document: targetValue,
            },
        })
        if (targetValue !== '') setDisabled(true)
        else setDisabled(false)
    }

    useEffect(() => {
        if (feedback.failed) setIsLoading(false)
    }, [feedback.failed])

    return (
        <div className="content-step1">
            {!feedback.failed ? (
                <div>
                    <div className="content-title-form-forget step1">
                        <p className="title-form-forget">Debemos validar</p>
                        <p className="title-form-forget-high">tu identidad</p>
                    </div>
                    <div className="content-inline step1">
                        <Form.Group className="group-content content-document">
                            <Form.Label className="group-label">Documento</Form.Label>
                            <Form.Control
                                id="input-document-forget"
                                placeholder="Número"
                                className="input-document"
                                onChange={onChangeDocument}
                                pattern={'{0,13}'}
                                maxLength={11}
                                value={documentReceived}
                            />
                        </Form.Group>
                    </div>
                    <div id="content-btn-continue" className="content-btn-document">
                        <Button
                            id="btnSubmit"
                            variant="sub-dominant"
                            disabled={!isDisabled}
                            isLoading={isLoading}
                            extend
                            onClick={() => {
                                validateUser()
                                setDocumentReceived('')
                                setDisabled(false)
                                setIsLoading(true)
                            }}
                        >
                            Continuar
                        </Button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="content-title-form-forget step1">
                        <p className="title-form-forget">
                            Lo sentimos{' '}
                            <span className="title-form-forget-high">&nbsp;no pudimos</span>
                        </p>
                        <p className="title-form-forget-high">validar tu identidad</p>
                    </div>
                    <p className="secundary-text-forget">
                        {String(feedback.message).split('|')[1]}
                    </p>
                    <div className="content-inline step1">
                        <Form.Group className="group-content content-document">
                            <Form.Label className="group-label">Documento</Form.Label>
                            <Form.Control
                                id="input-document-forget"
                                placeholder="Número"
                                className="input-document"
                                onChange={onChangeDocument}
                                pattern={'{0,13}'}
                                maxLength={11}
                                value={documentReceived}
                            />
                        </Form.Group>
                    </div>
                    <div id="content-btn-continue" className="content-btn-document">
                        <Button
                            id="btnSubmit"
                            variant="sub-dominant"
                            disabled={!isDisabled}
                            isLoading={isLoading}
                            extend
                            onClick={() => {
                                validateUser()
                                setDocumentReceived('')
                                cleanFailed()
                            }}
                        >
                            Continuar
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default ValidateDocument
