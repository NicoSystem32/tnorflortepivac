import React from 'react'
import { createGlobalStyle, DefaultTheme } from 'styled-components/macro'

// global styles
import resetStyles from './reset'
import { getMontserratFont, getHelveticaFont, getKreditFont } from './webfonts'
import { ringsWaveAnimation } from './animations'

// type definitions
export type GlobalStyleProps = {
    reset?: boolean
}

export type CustomStylesProps<T = DefaultTheme> = GlobalStyleProps & {
    theme: T
}

// Create custom global styles component
const CustomStyles = createGlobalStyle<CustomStylesProps>`
    /* normalize boot styles */
    ${(props) => (props.reset ? resetStyles() : '')}

    /* load fonts */
    ${getMontserratFont()}
    ${getHelveticaFont()}
    ${getKreditFont()}

    html {
        font-size: ${(props) => props.theme['font-size-root']};
    }

    body {
        font-family: ${(props) => props.theme['font-family-base']};
        font-size: ${(props) => props.theme['font-size-base']};
    }

    a {
        cursor: pointer;
        color: ${(props) => props.theme.colors['sub-dominant'].DEFAULT}
    }

    sup {
        top: -0.3rem;
    }

    /* animations */
    ${ringsWaveAnimation()}
`

// Global style component
const GlobalStyle: React.FC<GlobalStyleProps> = ({ reset }) => (
    <>
        {/* <BaseStyles /> */}
        <CustomStyles reset={reset} />
    </>
)

export default GlobalStyle
