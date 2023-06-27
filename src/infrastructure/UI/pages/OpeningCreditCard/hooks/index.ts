// custom hooks
import { useReducerCtx } from '../../../hooks'
import { ActionShape, StateShape, StepContext } from '../context/StepProvider'

export const useReducerStep = (): [StateShape, React.Dispatch<ActionShape>] =>
    useReducerCtx<StateShape, ActionShape>(StepContext)
