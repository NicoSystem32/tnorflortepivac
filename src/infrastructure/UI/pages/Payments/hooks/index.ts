import { useReducerCtx } from '../../../hooks'
import { ActionShape, PaymentsContext, StateShape } from '../context/PaymentsState'

export const useReducerPayments = (): [StateShape, React.Dispatch<ActionShape>] =>
    useReducerCtx<StateShape, ActionShape>(PaymentsContext)
