import { createStateCtx } from '../../../hooks'

// types definition
export type LoginStateTypes = {
    showLoginSuccess: boolean
    showCloseSession: boolean
    showNewSession: boolean
    showMoreSession: boolean
    showCloseNewSession: boolean
    msjNewSession: string
    codeNewSession: string
    feedback: {
        code: number | string
        message: string
    }
}

const [ctx, Provider] = createStateCtx<LoginStateTypes>({
    showLoginSuccess: false,
    showCloseSession: false,
    showNewSession: false,
    showMoreSession: false,
    showCloseNewSession: false,
    msjNewSession: '',
    codeNewSession: '',
    feedback: {
        code: '',
        message: '',
    },
})
export const LoginContext = ctx
export const LoginStateProvider = Provider
