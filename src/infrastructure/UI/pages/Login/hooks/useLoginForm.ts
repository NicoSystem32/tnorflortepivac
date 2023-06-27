import { useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useForm, FieldValues, Resolver, DeepPartial } from 'react-hook-form'

// custom hooks
import { useLoginState } from '../hooks'

// types definition
type TLoginFields = Record<'username' | 'password', string>

interface IUseLoginArgs<F extends FieldValues = TLoginFields> {
    defaultValues: DeepPartial<F | TLoginFields>
    validationSchema: Resolver<F | TLoginFields>
    messages: Record<
        'userNotExists' | 'pwdNotExits' | 'pwdTried',
        {
            type: string
            message?: string
        }
    >
}

interface ResponseData {
    Data: Record<string | number | symbol, any>
    Message: string
    Response: string | number
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useLoginForm = <TFieldValues extends FieldValues = TLoginFields>({
    defaultValues,
    validationSchema,
    messages,
}: IUseLoginArgs<TFieldValues>) => {
    /* initial declarations */
    const { url: urlMatch } = useRouteMatch()
    const history = useHistory()

    // states definition
    const [userVerified, setUserVerified] = useState(false)
    const setLoginState = useLoginState()[1]

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control } = useForm<
        TFieldValues | TLoginFields
    >({
        mode: 'all',
        resolver: validationSchema,
        defaultValues,
    })

    const redirectionWithInfo = (
        url: string,
        data: Record<string | number | symbol, unknown> | string
    ): void => {
        history.push({
            pathname: url,
            search: data,
            state: { detail: 'some_value' },
        })
    }

    const handleMultisesion = (isShow: boolean): void => {
        setLoginState((m) => ({ ...m, showNewSession: isShow }))
    }

    const handleMoreSession = (isShow: boolean): void => {
        setLoginState((m) => ({ ...m, showMoreSession: isShow }))
    }

    const handleMsjMultisesion = (msj: string): void => {
        setLoginState((m) => ({ ...m, msjNewSession: msj }))
    }

    const handleCodeMultisesion = (code: string): void => {
        setLoginState((m) => ({ ...m, codeNewSession: code }))
    }

    const actionsSuccessfulContinue = (): void => {
        clearErrors('username')
        setUserVerified(true)
    }

    const actionsFailedContinue = (errorType: string | number, resp: ResponseData): void => {
        if (['400', '404'].includes(errorType as string)) {
            if (resp.Message) messages.userNotExists.message = resp.Message
            setError('username', messages.userNotExists)
        } else if (errorType === '401') {
            history.push(`${urlMatch}/login-failed`, '')
        } else {
            history.push('/not-response')
        }
    }

    const validateErrorLogin = (errorType: string | number, resp: ResponseData): void => {
        switch (errorType) {
            case '435':
                if (resp.Message) messages.userNotExists.message = resp.Message
                setError('username', messages.userNotExists, { shouldFocus: true })
                setUserVerified(false)
                break

            case '436':
                if (resp.Message) messages.pwdNotExits.message = resp.Message
                setError('password', messages.pwdNotExits, { shouldFocus: true })
                break

            case '429':
                setLoginState((s) => ({
                    ...s,
                    feedback: {
                        code: errorType,
                        message: resp.Message,
                    },
                }))
                clearErrors()
                history.push(`${urlMatch}/login-failed`, '')
                break

            case '437':
                if (resp.Message) messages.pwdTried.message = resp.Message
                setError('password', messages.pwdTried, { shouldFocus: true })
                break

            case '438':
            case '439':
                setLoginState((s) => ({
                    ...s,
                    feedback: {
                        code: errorType,
                        message: resp.Message,
                    },
                }))
                clearErrors()
                redirectionWithInfo(`${urlMatch}/login-failed`, errorType)
                break
            case '500':
                clearErrors()
                history.push('/not-response')
                break
            case '406':
                handleMsjMultisesion(resp.Message)
                handleCodeMultisesion(resp.Data.Code)
                handleMultisesion(true)
                break
            case '00':
                handleMoreSession(true)
                break
            default:
                clearErrors()
                break
        }
    }

    const handleLoginModal = (isShow: boolean): void => {
        setLoginState((s) => ({ ...s, showLoginSuccess: isShow }))
    }

    return {
        actionsSuccessfulContinue,
        actionsFailedContinue,
        validateErrorLogin,
        redirectionWithInfo,
        handleLoginModal,

        userVerified,
        setUserVerified,

        handleSubmit,
        register,
        control,
        getValues,
        setValue,
    }
}

export default useLoginForm
