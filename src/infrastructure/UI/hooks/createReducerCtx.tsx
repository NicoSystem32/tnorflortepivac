import React from 'react'

// types definition
export type Action = { type: string; [payload: string | number | symbol]: unknown }

export type ReducerCtxType<S = any, A = Action> = {
    state: S
    dispatch: React.Dispatch<A>
}

/**
 * Custom hook for use a Context with useReducer
 *
 * @param ctx React context
 *
 * @returns [state, dispatch] Current reducer state and dispatcher
 */
export function useReducerCtx<S = any, A extends Action = Action>(
    ctx: React.Context<ReducerCtxType<S, A>>
): [S, React.Dispatch<A>] {
    const c = React.useContext(ctx)
    if (!c) throw new Error(`useReducerCtx must be inside a Provider with a value`)
    return [c.state, c.dispatch]
}

/**
 * Create a React context with useReducer
 *
 * @param reducer
 * @param initialState
 *
 * @returns [Context, Provider]
 */
export function createReducerCtx<StateType, ActionType>(
    reducer: React.Reducer<StateType, ActionType>,
    initialState: StateType
): [
    React.Context<ReducerCtxType<StateType, ActionType>>,
    React.FunctionComponent<Partial<StateType>>
] {
    const defaultDispatch: React.Dispatch<ActionType> = () => initialState // we never actually use this
    const ctx = React.createContext({
        state: initialState,
        dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optional
    })

    function Provider({
        children,
        ...props
    }: React.PropsWithChildren<Partial<StateType>>): React.ReactElement {
        const [state, dispatch] = React.useReducer<React.Reducer<StateType, ActionType>>(reducer, {
            ...initialState,
            ...props,
        })

        const providerValue = React.useMemo(
            () => ({
                state,
                dispatch,
            }),
            [state]
        )

        return <ctx.Provider value={providerValue}>{children}</ctx.Provider>
    }
    return [ctx, Provider]
}
