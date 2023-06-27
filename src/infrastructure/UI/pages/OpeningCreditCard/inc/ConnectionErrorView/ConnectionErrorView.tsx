import { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// components
import { Button } from '../../../../components'
import { NavigationStep } from '..'

// styles
import {
    ConnectErrorWrapper,
    ConnectErrorContent,
    ConnectErrorImage,
    ConnectErrorTitle,
    ConnectErrorCtrBtn,
} from './connectionErrorView-styles'

// icons
import { ConnectionErrorSVG } from '../../../../utils/getIcons'

// hooks
import { useReducerStep } from '../../hooks'

const ConnectionErrorView = (): ReactElement => {
    const history = useHistory()

    const [
        {
            feedback: { message },
        },
        dispatchStep,
    ] = useReducerStep()

    useEffect(() => {
        return () => {
            dispatchStep({
                type: 'SET_FEEDBACK',
                payload: {
                    code: '',
                    message: '',
                },
            })
        }
    }, [])

    const redirection = (url: string, data?: Record<string, string | number>): void => {
        history.push(url, data)
    }

    return (
        <>
            <NavigationStep />
            <ConnectErrorWrapper>
                <ConnectErrorContent>
                    <ConnectErrorImage src={ConnectionErrorSVG} alt="Error connect" />

                    <ConnectErrorTitle>
                        {message
                            ? message
                            : 'En este momento no tenemos conexión, por favor intenta mas tarde'}
                    </ConnectErrorTitle>

                    <ConnectErrorCtrBtn>
                        <Button
                            variant="sub-dominant"
                            type="submit"
                            extend
                            onClick={() => {
                                redirection('home-wallet')
                            }}
                        >
                            Volver al home
                        </Button>
                    </ConnectErrorCtrBtn>
                </ConnectErrorContent>
            </ConnectErrorWrapper>
        </>
    )
}

export default ConnectionErrorView
