import { useReducerCtx } from '../../../hooks'
import { ActionShape, ActivateCardContext, StateShape } from '../context/ActivateCardState'

export const useReducerActivateCard = (): [StateShape, React.Dispatch<ActionShape>] =>
    useReducerCtx<StateShape, ActionShape>(ActivateCardContext)
