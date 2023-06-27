import React from 'react'

export type StateCtxType<T = any> = {
    state: T
    update: React.Dispatch<React.SetStateAction<T>>
}

/**
 * Custom hook for use a Context with useState
 *
 * @param ctx React context
 *
 * @returns [state, update] Current state and dispatcher to update
 */
export function useStateCtx<T = any>(
    ctx: React.Context<StateCtxType<T>>
): [StateCtxType<T>['state'], StateCtxType<T>['update']] {
    const c = React.useContext(ctx)
    if (!c) throw new Error(`useStateCtx must be inside a Provider with a value`)
    return [c.state, c.update]
}

/**
 * Create React context with a state
 *
 * @param {Mixed} defaultValue
 *
 * @returns [Context, Provider]
 */
export function createStateCtx<T>(
    defaultValue: T
): [React.Context<StateCtxType<T>>, React.FunctionComponent<Partial<{ state?: T }>>] {
    const defaultUpdate: StateCtxType<T>['update'] = () => defaultValue
    const ctx = React.createContext({ state: defaultValue, update: defaultUpdate })

    function Provider({
        children,
        ...props
    }: React.PropsWithChildren<{ state?: T }>): React.ReactElement {
        const [state, update] = React.useState(props.state || defaultValue)

        const providerValue = React.useMemo(
            () => ({
                state,
                update,
            }),
            [state]
        )

        return <ctx.Provider value={providerValue}>{children}</ctx.Provider>
    }

    return [ctx, Provider]
}
