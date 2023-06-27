// custom hooks
import { createReducerCtx, ReducerCtxType } from '../../../hooks'

// types declaration
export type StateShape = {
    currentStep: number
    lastStep: boolean
    totalSteps: number
}

export type ActionShape =
    | {
          type: 'NEXT_STEP'
      }
    | {
          type: 'PREV_STEP'
      }
    | {
          type: 'GO_TO_STEP'
          payload: {
              step: number
          }
      }

// define initial
const initialState: StateShape = {
    currentStep: 1,
    lastStep: false,
    totalSteps: 2,
}

const reducer = (state: StateShape, action: ActionShape): StateShape => {
    switch (action.type) {
        case 'NEXT_STEP':
            return {
                ...state,
                currentStep: state.currentStep + 1,
                lastStep: state.currentStep + 1 >= state.totalSteps,
            }
        case 'PREV_STEP':
            return {
                ...state,
                currentStep: state.currentStep - 1,
                lastStep: state.currentStep - 1 >= state.totalSteps,
            }
        case 'GO_TO_STEP':
            return {
                ...state,
                currentStep: action.payload.step,
                lastStep: action.payload.step >= state.totalSteps,
            }
        default:
            return state
    }
}

export let PaymentsContext: React.Context<ReducerCtxType<StateShape, ActionShape>>

const createPaymentsProvider = (): React.FunctionComponent<Partial<StateShape>> => {
    const [ctx, PaymentsProvider] = createReducerCtx(reducer, initialState)
    PaymentsContext = ctx

    return PaymentsProvider
}

export default createPaymentsProvider
