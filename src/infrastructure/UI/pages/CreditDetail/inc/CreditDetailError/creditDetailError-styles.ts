import { styled } from 'twin.macro'

export const ErrorContainer = styled.div`
    position: relative;
    right: 5px;
    text-align: end;
    p {
        color: var(--error-color);
        font-family: var(--font-secundary-regular);
        font-size: 13px;
        margin: 0;
    }
    @media (min-width: 670px) and (max-width: 1180px) {
        position: absolute;
        bottom: -25px;
        width: 150%;
    }

    @media (min-width: 1180px) and (max-width: 1450px) {
        position: absolute;
        bottom: -25px;
        width: 150%;
        p {
            font-size: 15px;
        }
    }
    @media (min-width: 1450px) {
        position: absolute;
        bottom: -25px;
        width: 150%;
        p {
            font-size: 15px;
        }
    }
`
