// import original module declarations
import 'styled-components/macro'

// and extend them!
declare module 'styled-components' {
    declare type HashOrString = Record<string | number | symbol, string> | string

    export type OverwriteWithTheme<T, O = T> = T extends Record<infer K, any>
        ? {
              [key in K]: T[key] extends object
                  ? OverwriteWithTheme<T[key], O>
                  : T[key] | ((theme: O) => string)
          }
        : never

    export type ThemeWithFunc = OverwriteWithTheme<DefaultTheme>
    export interface DefaultTheme {
        colors: {
            alert: string
            danger: string
            dominant: Extract<HashOrString, object>
            'sub-dominant': Extract<HashOrString, object>
            alternative: Extract<HashOrString, object>
            'gray-custom': Extract<HashOrString, object>
            'dark-custom': Extract<HashOrString, object>
        }

        fontFamily: {
            montserrat: string
            helvetica: string
        }

        // global font styles
        'font-family-base': string
        'font-size-root': string
        'font-size-base': string

        // contents width and breakpoints
        'content-max-width': string

        breakpoints: {
            content: string
            sm: string
            md: string
            lg: string
            xl: string
            '2xl': string
        }

        borderRadius: {
            global: string
        }

        images: Extract<HashOrString, object>
    }
}
