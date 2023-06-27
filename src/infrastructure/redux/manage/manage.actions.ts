// services
import { manageServices } from '../../../domain/services'

// models & interfaces
import { AppDispatch } from '../store/store'

// action types
import { MANAGE_MESSAGES } from './manage.types'

export const getMessagesAction = () => (dispatch: AppDispatch) => {
    dispatch(
        manageServices.getMessages([
            MANAGE_MESSAGES.REQUEST,
            MANAGE_MESSAGES.SUCCESS,
            MANAGE_MESSAGES.FAILURE,
        ])()
    )
}
