// custom hooks
import { useReducerCtx } from '../../../hooks'
import { ActionShape, StateForget, StateContext } from '../context/StateProvider'
export { default as useStateForget } from './useStateForget'

export const useReducerState = (): [StateForget, React.Dispatch<ActionShape>] =>
    useReducerCtx<StateForget, ActionShape>(StateContext)
