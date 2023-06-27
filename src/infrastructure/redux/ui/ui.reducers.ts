import { UI_THEME } from './ui.types'

import { ThemesState, ThemesActionShape } from '../../../domain/models/ui'

const initialThemeState: ThemesState = {
    themes: [
        {
            id: 'default',
            name: 'Yellow Stone',
            class: 'theme-mode-default',
        },
        {
            id: 'green',
            name: 'Esmerald',
            class: 'theme-mode-green',
        },
        {
            id: 'azul',
            name: 'Robbin Turquoise',
            class: 'theme-mode-azul',
        },
    ],
    theme: {
        id: 'default',
        name: 'Yellow Stone',
        class: 'theme-mode-default',
    },
}

export const themeReducer = (state = initialThemeState, action: ThemesActionShape): ThemesState => {
    if (action.type === UI_THEME.SET_MODE) {
        return {
            ...state,
            theme: action.payload,
        }
    } else {
        return state
    }
}
