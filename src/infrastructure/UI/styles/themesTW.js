// Original variables for app styled theme
const rawOriginalTheme = {
    colors: {
        alert: '#FB2F3D',
        danger: '#FB2F3D',
        dominant: {
            DEFAULT: '#FACD34',
            dark: '#F5A50B',
            light: '#FBDF00',
        },
        'sub-dominant': {
            DEFAULT: '#512F8B',
            light: '#512F8B80',
            href: '##593990',
        },
        alternative: {
            DEFAULT: '#26346F',
            dark: '#0A1634',
            hover: '#19234B',
        },
        // gray scale
        'gray-custom': {
            DEFAULT: '#F9F9F9',
            50: '#FAFBFD',
            100: '#ECECEC',
            200: '#C4C2C2',
            300: '#707070',
            500: '#53595A',
            600: '#425453',
            700: '#444444',
            900: '#262626',
        },
        // darkness scale
        'dark-custom': {
            300: '#00000029',
            500: '#090909',
            600: '#090600',
            700: '#070500',
            800: '#030200',
        },
    },

    // global font styles
    fontFamily: {
        montserrat: "'Montserrat', sans-serif",
        helvetica: 'Helvetica',
        kredit: 'Kredit-Normal',
    },

    'font-family-base': (theme) => theme.fontFamily.montserrat,
    'font-size-root': '16px',
    'font-size-base': '1rem',

    // contents width and breakpoints
    'content-max-width': '1124px',

    breakpoints: {
        content: (theme) => theme['content-max-width'],
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },

    borderRadius: {
        global: '10px',
    },

    images: {
        'elipse-desk': 'var(--img-elipse-desk)',
        'elipse-mobile': 'var(--img-elipse-mobile)',
        'form-login': 'var(--img-form-login)',
        'register-header': 'var(--img-register-header)',
        'register-hover-header': 'var(--img-register-hover-header)',
        'banner-login': 'var(--img-banner-login)',
        'money-header': 'var(--icon-money-header)',
        'product-header': 'var(--icon-product-header)',
        'chart-header': 'var(--icon-chart-header)',
        'credit-header': 'var(--icon-credit-header)',
        'wallet-header': 'var(--icon-wallet-header)',
        'wallet-hover-header': 'var(--icon-wallet-hover-header)',
    },
}

// Use variant of themes with css variables
module.exports.overTheme = {
    colors: {
        dominant: {
            DEFAULT: 'var(--dominant-color)',
            dark: 'var(--dominant-color-dark)',
            light: 'var(--dominant-color-ligth)',
        },
        'sub-dominant': {
            DEFAULT: 'var(--sub-dominant-color)',
            light: 'var(--sub-dominant-color-ligth)',
            href: 'var(--sub-dominant-color-href)',
        },
        alternative: {
            DEFAULT: 'var(--button-color)',
            dark: 'var(--button-color-dark)',
            hover: 'var(--button-color-hover)',
        },
    },
}

const deepSpread = (obj = {}, ext = {}) => ({
    ...obj,
    ...Object.entries(ext).reduce(
        (acc, [attr, value]) => ({
            ...acc,
            ...(!Array.isArray(value) &&
            value instanceof Object &&
            !Array.isArray(obj[attr]) &&
            obj[attr] instanceof Object
                ? { [attr]: deepSpread(obj[attr], value) }
                : { [attr]: value }),
        }),
        {}
    ),
})

const execFuncValues = (obj = {}, origin = {}) =>
    Object.entries(obj).reduce((acc, [key, value]) => {
        if (typeof value === 'function') {
            return {
                ...acc,
                [key]: value(origin),
            }
        }

        return {
            ...acc,
            [key]:
                !Array.isArray(value) && value instanceof Object
                    ? execFuncValues(value, origin)
                    : value,
        }
    }, {})

// export original theme
const originalTheme = (module.exports.originalTheme = execFuncValues(
    rawOriginalTheme,
    rawOriginalTheme
))

/**
 * Create a new theme over original theme, overwriting its variables
 *
 * @param {Object} otherTheme:DefaultTheme
 *
 * @return {Object} overwritten theme: DefaultTheme
 */
module.exports.makeAppTheme = (otherTheme = {}) => {
    return deepSpread(originalTheme, execFuncValues(otherTheme, originalTheme))
}
