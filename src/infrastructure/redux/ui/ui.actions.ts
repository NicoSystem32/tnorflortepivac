// models & interfaces
import { Theme } from '../../../domain/models/ui/ui'
import { AppDispatch } from '../store/store'

// redux types
import { UI_THEME } from './ui.types'

export const setModeAction = (mode: Theme) => (dispatch: AppDispatch) => {
    dispatch({
        type: UI_THEME.SET_MODE,
        payload: mode,
    })
}
