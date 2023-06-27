import { styled } from 'twin.macro'

export const PublicityContainer = styled.div`
    margin: 20px 0;
    gap: 10px;
    display: flex;
    flex-direction: column;

    @media (min-width: 570px) and (max-width: 670px) {
        align-items: center;
    }

    @media (min-width: 670px) and (max-width: 1180px) {
        display: grid;
        grid-template-columns: 40% 50%;
    }

    @media (min-width: 1180px) and (max-width: 1450px) {
        display: grid;
        grid-template-columns: 50% 40%;
        gap: 10%;
        align-items: center;
    }

    @media (min-width: 1450px) {
        display: grid;
        grid-template-columns: 50% 40%;
        gap: 10%;
        align-items: center;
    }
`

export const TitlePublicity = styled.p`
    font-size: 18px;
    color: var(--text-opacity10);
    font-family: var(--font-main-bold);
    margin: 0;
    span {
        color: var(--dominant-color-dark) !important;
    }

    @media (max-width: 320px) {
        font-size: 17px;
    }

    @media (min-width: 1180px) and (max-width: 1450px) {
        font-size: 24px;
    }

    @media (min-width: 1450px) {
        font-size: 24px;
    }
`

export const OpenCredit = styled.div`
    display: flex;
    justify-content: end;
`

export const CardOpenCredit = styled.a`
    width: 360px;
    border-radius: 10px;
    cursor: pointer;
    padding: 25px;
    border: 1px solid var(--sub-dominant-color);
    display: grid;
    grid-template-columns: 95% 5%;
    grid-template-rows: 50% 50%;
    grid-template-areas: 'titleCto linkCto' 'subCto linkCto';
    text-decoration: none;

    &:hover {
        background-color: var(--sub-dominant-color);
        p {
            color: var(--background-color) !important;
        }
    }

    .title-card {
        font-size: 18px;
        font-family: var(--font-main-bold);
        color: var(--text-opacity9);
        margin: 0;
    }

    .subtitle-card {
        grid-area: subCto;
        font-size: 16px;
        font-family: var(--font-secundary-regular);
        color: var(--text-opacity9);
        margin: 0;
    }

    .img-card {
        grid-area: linkCto;
        margin: auto;
        transform: rotate(-90deg);
        width: 20px;
    }
`
