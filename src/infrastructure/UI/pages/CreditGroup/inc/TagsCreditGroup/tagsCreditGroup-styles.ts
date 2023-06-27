import { styled } from 'twin.macro'

export const TagsCCG = styled.div`
    height: 40px;
    position: relative;
    & .caducity {
        position: absolute;
        left: -20px;
        background-color: var(--dominant-color-dark);
        border-radius: 0 10px 10px 0;
        font-family: var(--font-secundary-regular);
        font-size: 16px;
        color: var(--background-color);
        padding: 0 15px 0 30px;
        width: fit-content;
    }
    & .mora {
        background-color: var(--error-color);
        border-radius: 10px;
        font-family: var(--font-secundary-regular);
        font-size: 16px;
        color: var(--background-color) !important;
        padding: 0 15px;
        width: fit-content;
    }
    & .normal {
        background-color: var(--approved-color);
        border-radius: 10px;
        font-family: var(--font-secundary-regular);
        font-size: 16px;
        color: var(--background-color) !important;
        padding: 0 15px;
        width: fit-content;
    }
`
