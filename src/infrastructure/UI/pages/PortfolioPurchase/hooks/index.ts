// custom hooks
import { useReducerCtx } from '../../../hooks'
import { ActionShape, StatePortfolio, StateContext } from '../context/StateProvider'

export const useReducerState = (): [StatePortfolio, React.Dispatch<ActionShape>] =>
    useReducerCtx<StatePortfolio, ActionShape>(StateContext)
