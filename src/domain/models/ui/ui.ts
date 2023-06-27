import { UI_THEME } from '../../../infrastructure/redux/ui'

/**
 * Typings definition reducers
 */

export interface ThemesState {
    themes: Theme[]
    theme: Theme
}

export interface Theme {
    id: string
    name: string
    class: string
}

export type ThemesActionShape = {
    type: typeof UI_THEME.SET_MODE
    payload: Theme
}
