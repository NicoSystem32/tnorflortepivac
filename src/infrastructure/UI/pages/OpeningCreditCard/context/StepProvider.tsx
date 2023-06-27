import { createReducerCtx, ReducerCtxType } from '../../../hooks'

// types declaration
export type StateShape = {
    currentStep: number
    lastStep: boolean
    totalSteps: number
    feedback: {
        isEditBuyWallet: boolean
        idPurchase: number | null
        code: number | string
        message: string
        minRange: number | null
        maxRange: number | null
    }
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
    | {
          type: 'SET_FEEDBACK'
          payload: {
              code: number | string
              message: string
              isEditBuyWallet?: boolean
              idPurchase?: number
              minRange?: number
              maxRange?: number
          }
      }

// define initial
const initialState: StateShape = {
    currentStep: 1,
    lastStep: false,
    totalSteps: 5,
    feedback: {
        isEditBuyWallet: false,
        idPurchase: null,
        code: '',
        message: '',
        minRange: null,
        maxRange: null,
    },
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
        case 'SET_FEEDBACK':
            return {
                ...state,
                feedback: {
                    code: action.payload.code,
                    message: action.payload.message,
                    isEditBuyWallet: action.payload.isEditBuyWallet ?? false,
                    idPurchase: action.payload.idPurchase ?? null,
                    minRange: action.payload.minRange ?? null,
                    maxRange: action.payload.maxRange ?? null,
                },
            }
        default:
            return state
    }
}

export let StepContext: React.Context<ReducerCtxType<StateShape, ActionShape>>

const createStepProvider = (): React.FunctionComponent<Partial<StateShape>> => {
    const [ctx, StepProvider] = createReducerCtx(reducer, initialState)
    StepContext = ctx

    return StepProvider
}

export default createStepProvider
