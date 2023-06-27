import { transactionService } from '../../../../../domain/services/User.service'

// custom hooks
import { useReducerState } from '../hooks'

import { getRandom } from '../../../utils/misc'
import { useEffect, useState } from 'react'

const useStateForget = () => {
    // initial declarations
    const [
        {
            document,
            optionSelected,
            codeReceived,
            newPassword,
            retriesCode,
            createCodeDate,
            codeService,
            feedback,
        },
    ] = useReducerState()
    const dispatchStep = useReducerState()[1]
    const [transactionFailed, setTransactionFailed] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        setTransactionFailed(feedback.failed)
        setMessage(feedback.message)
    }, [feedback.failed, feedback.message])

    const encriptedDocument = (value: string): string => {
        const now = new Date().toLocaleDateString()
        const valueComplete = now + '-' + value + '' + getRandom(4)
        return btoa(valueComplete)
    }

    const codificateDocument = (value: string, value2: string): string => {
        const now = new Date().toLocaleDateString()
        const valueComplete = now + '-' + value + '' + getRandom(4) + '-' + value2
        return btoa(valueComplete)
    }

    const cleanFailed = (): void => {
        dispatchStep({
            type: 'SET_FEEDBACK',
            payload: {
                code: '',
                message: '',
                failed: false,
            },
        })
    }

    const validateUser = (): void => {
        transactionService
            .postTransactionPublic('/api/User/GetUserData', encriptedDocument(document))
            .then((response: any) => {
                if (response.data.Response === '200') {
                    dispatchStep({
                        type: 'SET_CONTACT',
                        payload: {
                            cell: response.data.Data.Cellphone,
                            email: response.data.Data.Email,
                        },
                    })
                    dispatchStep({ type: 'NEXT_STEP' })
                } else {
                    dispatchStep({
                        type: 'SET_FEEDBACK',
                        payload: {
                            code: response.data.Response,
                            message: response.data.Message,
                            failed: true,
                        },
                    })
                }
            })
    }

    const sendCodeForget = (site: any, medium: any): void => {
        const objectSend = {
            Document: encriptedDocument(document),
            CreateCodeDate: createCodeDate,
            RetriesCode: retriesCode,
            TransmissionMedium: medium,
            Code: '',
        }
        transactionService
            .postTransactionPublic('/api/User/SendCodeOtp', objectSend)
            .then((response: any) => {
                if (response.data !== undefined) {
                    if (response.data.Response === '200') {
                        dispatchStep({
                            type: 'SET_CREATE_DATE',
                            payload: {
                                createCodeDate: response.data.Message.split('|')[4],
                            },
                        })
                        dispatchStep({
                            type: 'SET_FEEDBACK',
                            payload: {
                                code: response.data.Response,
                                message: response.data.Message,
                                failed: false,
                            },
                        })
                        dispatchStep({
                            type: 'SET_CODE_SERVICE',
                            payload: {
                                codeService: response.data.Message.split('|')[2],
                            },
                        })

                        dispatchStep({
                            type: 'SET_RETRIES_CODE',
                            payload: {
                                retriesCode: response.data.Message.split('|')[3],
                            },
                        })
                        if (site === 1) dispatchStep({ type: 'NEXT_STEP' })
                    } else {
                        dispatchStep({
                            type: 'SET_FEEDBACK',
                            payload: {
                                code: response.data.Message,
                                message: response.data.Message,
                                failed: true,
                            },
                        })
                    }
                } else {
                    dispatchStep({
                        type: 'SET_FEEDBACK',
                        payload: {
                            code: response.Response,
                            message: response.Message,
                            failed: true,
                        },
                    })
                }
            })
    }

    const validateCodeForget = (): void => {
        cleanFailed()
        const objectSend = {
            Document: codificateDocument(document, codeService),
            CreateCodeDate: createCodeDate,
            RetriesCode: retriesCode,
            TransmissionMedium: optionSelected,
            Code: codeReceived,
        }
        transactionService
            .postTransactionPublic('/api/User/ValidOtp', objectSend)
            .then((response: any) => {
                if (response.data !== undefined) {
                    if (response.data.Response === '200') {
                        dispatchStep({ type: 'NEXT_STEP' })
                        dispatchStep({
                            type: 'SET_RETURN',
                            payload: {
                                returnScreen: true,
                            },
                        })

                        dispatchStep({
                            type: 'SET_FEEDBACK',
                            payload: {
                                code: '',
                                message: '',
                                failed: false,
                            },
                        })
                    }
                } else {
                    dispatchStep({
                        type: 'SET_FEEDBACK',
                        payload: {
                            code: codeReceived,
                            message: response.Message,
                            failed: true,
                        },
                    })
                    dispatchStep({
                        type: 'SET_RETURN',
                        payload: {
                            returnScreen: true,
                        },
                    })
                }
            })
    }

    const resetPasswordForget = (): void => {
        const objectSend = {
            Document: encriptedDocument(document),
            NewPassword: encriptedDocument(newPassword),
        }
        transactionService
            .postTransactionPublic('/api/User/ResetPassword', objectSend)
            .then((response: any) => {
                if (response.data.Response === '200') {
                    dispatchStep({
                        type: 'FINISHED',
                        payload: {
                            showFinish: true,
                        },
                    })
                    dispatchStep({
                        type: 'SET_RETURN',
                        payload: {
                            returnScreen: true,
                        },
                    })
                } else {
                    dispatchStep({
                        type: 'SET_FEEDBACK',
                        payload: {
                            code: response.data.Response,
                            message: response.data.Message,
                            failed: true,
                        },
                    })
                }
            })
    }

    return {
        encriptedDocument,
        validateUser,
        sendCodeForget,
        validateCodeForget,
        resetPasswordForget,
        cleanFailed,
        transactionFailed,
        message,
    }
}

export default useStateForget
