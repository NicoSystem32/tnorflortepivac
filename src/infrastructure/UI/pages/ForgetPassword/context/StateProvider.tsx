import { createReducerCtx, ReducerCtxType } from '../../../hooks'

// types declaration
export type StateForget = {
    currentStep: number
    lastStep: boolean
    totalSteps: number
    document: string
    optionSelected: number
    codeReceived: string
    newPassword: string
    showFinish: boolean
    returnScreen: boolean
    retriesCode: number
    contact: {
        cell: string
        email: string
    }
    otp: string
    feedback: {
        code: number | string
        message: string
        failed: boolean
    }
    createCodeDate: string
    codeService: string
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
          type: 'SET_RETURN'
          payload: {
              returnScreen: boolean
          }
      }
    | {
          type: 'SET_DOCUMENT'
          payload: {
              document: string
          }
      }
    | {
          type: 'SET_OPTION'
          payload: {
              optionSelected: number
          }
      }
    | {
          type: 'SET_CONTACT'
          payload: {
              cell: string
              email: string
          }
      }
    | {
          type: 'SET_CODE'
          payload: {
              codeReceived: string
          }
      }
    | {
          type: 'SET_RETRIES_CODE'
          payload: {
              retriesCode: number
          }
      }
    | {
          type: 'SET_CREATE_DATE'
          payload: {
              createCodeDate: string
          }
      }
    | {
          type: 'SET_CODE_SERVICE'
          payload: {
              codeService: string
          }
      }
    | {
          type: 'SET_NEW_PASSWORD'
          payload: {
              newPassword: string
          }
      }
    | {
          type: 'FINISHED'
          payload: {
              showFinish: boolean
          }
      }

// define initial
const initialState: StateForget = {
    currentStep: 1,
    lastStep: false,
    returnScreen: true,
    totalSteps: 4,
    document: '',
    optionSelected: 1,
    codeReceived: '',
    newPassword: '',
    showFinish: false,
    retriesCode: 0,
    contact: {
        cell: '',
        email: '',
    },
    otp: '',
    feedback: {
        code: '',
        message: '',
        failed: false,
    },
    createCodeDate: '2022-12-15T13:52:18.437Z',
    codeService: '',
}

const reducer = (state: StateForget, action: ActionShape): StateForget => {
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
        case 'SET_RETURN':
            return {
                ...state,
                returnScreen: action.payload.returnScreen,
            }
        case 'SET_OPTION':
            return {
                ...state,
                optionSelected: action.payload.optionSelected,
            }
        case 'SET_DOCUMENT':
            return {
                ...state,
                document: action.payload.document,
            }
        case 'SET_CONTACT':
            return {
                ...state,
                contact: {
                    cell: action.payload.cell,
                    email: action.payload.email,
                },
            }
        case 'SET_CODE':
            return {
                ...state,
                codeReceived: action.payload.codeReceived,
            }
        case 'SET_RETRIES_CODE':
            return {
                ...state,
                retriesCode: action.payload.retriesCode,
            }
        case 'SET_CREATE_DATE':
            return {
                ...state,
                createCodeDate: action.payload.createCodeDate,
            }
        case 'SET_CODE_SERVICE':
            return {
                ...state,
                codeService: action.payload.codeService,
            }
        case 'SET_NEW_PASSWORD':
            return {
                ...state,
                newPassword: action.payload.newPassword,
            }
        case 'FINISHED':
            return {
                ...state,
                showFinish: action.payload.showFinish,
            }
        default:
            return state
    }
}

export let StateContext: React.Context<ReducerCtxType<StateForget, ActionShape>>

const createStateProvider = (): React.FunctionComponent<Partial<StateForget>> => {
    const [ctx, StateProvider] = createReducerCtx(reducer, initialState)
    StateContext = ctx

    return StateProvider
}

export default createStateProvider
