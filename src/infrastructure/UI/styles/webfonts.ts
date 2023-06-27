/**
 * Montserrat fonts from @font-face
 */
export const getMontserratFont = (): string => `
    @font-face {
        src: url("../src/infrastructure/UI/assets/sources/Montserrat-Regular.ttf") format("woff2");
        font-family: "Montserrat";
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        src: url("../src/infrastructure/UI/assets/sources/Montserrat-Medium.ttf") format("woff2");
        font-family: "Montserrat";
        font-weight: 500;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        src: url("../src/infrastructure/UI/assets/sources/Montserrat-SemiBold.ttf") format("woff2");
        font-family: "Montserrat";
        font-weight: 600;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        src: url("../src/infrastructure/UI/assets/sources/Montserrat-Bold.ttf") format("woff2");
        font-family: "Montserrat";
        font-weight: 700;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        src: url("../src/infrastructure/UI/assets/sources/Montserrat-ExtraBold.ttf") format("woff2");
        font-family: "Montserrat";
        font-weight: 800;
        font-style: normal;
        font-display: swap;
    }
`
/**
 * Helvetica fonts from @font-face
 */
export const getHelveticaFont = (): string => `
    @font-face {
        src: url("../src/infrastructure/UI/assets/sources/Helvetica.ttf") format("woff2");
        font-family: "Helvetica";
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        src: url("../src/infrastructure/UI/assets/sources/Helvetica-Bold.ttf") format("woff2");
        font-family: "Helvetica";
        font-weight: 800;
        font-style: normal;
        font-display: swap;
    }
`
export const getKreditFont = (): string => `
    @font-face {
        src: url("../src/infrastructure/UI/assets/sources/kredit back.otf") format("woff2");
        font-family: "Kredit-Bold";
        font-weight: 400;
    }
    @font-face {
        src: url("../src/infrastructure/UI/assets/sources/kredit front.otf") format("woff2");
        font-family: "Kredit-Normal";
        font-weight: 400;
    }
`
