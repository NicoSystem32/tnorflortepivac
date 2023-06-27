import { LoginStateTypes, LoginContext } from '../context/LoginState'

// resources
import { useSelector, loginMessagesSelector } from '../../../../selectors'

// custom hooks
import { useStateCtx } from '../../../hooks'

export const useLoginState = (): [
    LoginStateTypes,
    React.Dispatch<React.SetStateAction<LoginStateTypes>>
] => useStateCtx(LoginContext)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useLogin = () => {
    const loginMessages = useSelector(loginMessagesSelector)

    return {
        loginMessages,
    }
}
