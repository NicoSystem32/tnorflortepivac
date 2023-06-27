import { MANAGE_MESSAGES } from './manage.types'
import { ManageState, ManageActionShape } from '../../../domain/models'

const initialManageState: ManageState = {
    messages: [],
    loading: false,
    error: {},
}

export const manageContentReducer = (
    state = initialManageState,
    action: ManageActionShape
): ManageState => {
    switch (action.type) {
        /* manage message */
        case MANAGE_MESSAGES.REQUEST:
            return { ...state, loading: true, error: {} }
        case MANAGE_MESSAGES.SUCCESS:
            return {
                ...state,
                messages: action.payload.data,
                loading: false,
                error: {},
            }
        case MANAGE_MESSAGES.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
