/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAuthRoute = () => {
    // initial declarations
    const history = useHistory()
    const { search } = useLocation()
    const searchParams = new URLSearchParams(search)

    // initial state
    const { refreshToken } = useSelector((store: any) => store.auth)

    const manageRouteActions = useCallback((): void => {
        const routeActions: Record<string, () => void> = {
            'continue-tc-request'() {
                setTimeout(() => {
                    history.replace('/product-opening', { from: 'continue-tc-request' })
                }, 1)
            },
            'activate-card'() {
                setTimeout(() => {
                    history.replace('/activate-card', { from: 'continue-activate-card' })
                }, 1)
            },
            default: () => void 0,
        }

        if (searchParams.has('action') && refreshToken) {
            const action = searchParams.get('action') ?? ''
            const fn = routeActions[action] ?? routeActions.default

            fn()
        }
    }, [refreshToken, searchParams])

    useEffect(() => {
        manageRouteActions()
    }, [manageRouteActions])
}

export default useAuthRoute
