import React from 'react'
import { ThemeProvider, DefaultTheme } from 'styled-components/macro'
import GlobalStyle from './GlobalStyle'
import { appTheme } from './app-theme'

// type definition
export interface AppThemeProviderProps {
    theme: DefaultTheme
    injectGlobal?: boolean
    reset?: boolean
}

/**
 * custom provider to pass app's theme
 */
const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
    theme = appTheme,
    injectGlobal = false,
    reset = false,
    children,
}) => {
    return (
        <ThemeProvider theme={theme}>
            {injectGlobal && <GlobalStyle reset={reset} />}
            {children}
        </ThemeProvider>
    )
}

export default AppThemeProvider
