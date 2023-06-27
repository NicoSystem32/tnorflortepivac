import { createReducerCtx, ReducerCtxType } from '../../../hooks'

// types declaration
export type StatePortfolio = {
    currentStep: number
    lastStep: boolean
    totalSteps: number
    feedback: {
        code: number | string
        message: string
        failed: boolean
    }
    firstStep: {
        amountOfFees: string
    }
    secondStep: {
        nameBank: string
        otherNameBank: string
        creditCardNumber: string
        amountBuy: string
        formatFile: File | null
    }
    isEdit: boolean
    idPurchase: number
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
              failed: boolean
          }
      }
    | {
          type: 'SET_IS_EDIT'
          payload: {
              isEdit: boolean
          }
      }
    | {
          type: 'SET_ID_PORTFOLIO'
          payload: {
              idPurchase: number
          }
      }
    | {
          type: 'SET_FIRST_STEP'
          payload: {
              amountOfFees: string
          }
      }
    | {
          type: 'SET_SECOND_STEP'
          payload: {
              nameBank: string
              otherNameBank: string
              creditCardNumber: string
              amountBuy: string
              formatFile: File | null
          }
      }

// define initial
const initialState: StatePortfolio = {
    currentStep: 1,
    lastStep: false,
    totalSteps: 4,
    feedback: {
        code: '',
        message: '',
        failed: false,
    },
    firstStep: {
        amountOfFees: '',
    },
    secondStep: {
        nameBank: '',
        otherNameBank: '',
        creditCardNumber: '',
        amountBuy: '',
        formatFile: null,
    },
    isEdit: false,
    idPurchase: 0,
}

const reducer = (state: StatePortfolio, action: ActionShape): StatePortfolio => {
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
                    failed: action.payload.failed,
                },
            }
        case 'SET_IS_EDIT':
            return {
                ...state,
                isEdit: action.payload.isEdit,
            }
        case 'SET_ID_PORTFOLIO':
            return {
                ...state,
                idPurchase: action.payload.idPurchase,
            }
        case 'SET_FIRST_STEP':
            return {
                ...state,
                firstStep: {
                    ...state.firstStep,
                    amountOfFees: action.payload.amountOfFees,
                },
            }
        case 'SET_SECOND_STEP':
            return {
                ...state,
                secondStep: {
                    ...state.secondStep,
                    nameBank: action.payload.nameBank,
                    otherNameBank: action.payload.otherNameBank,
                    creditCardNumber: action.payload.creditCardNumber,
                    amountBuy: action.payload.amountBuy,
                    formatFile: action.payload.formatFile,
                },
            }
        default:
            return state
    }
}

export let StateContext: React.Context<ReducerCtxType<StatePortfolio, ActionShape>>

const createStateProvider = (): React.FunctionComponent<Partial<StatePortfolio>> => {
    const [ctx, StateProvider] = createReducerCtx(reducer, initialState)
    StateContext = ctx

    return StateProvider
}

export default createStateProvider
