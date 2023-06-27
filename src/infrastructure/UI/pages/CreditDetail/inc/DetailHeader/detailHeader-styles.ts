import { styled } from 'twin.macro'

export const DetailHeaderContainerDesk = styled.div`
    display: none;

    @media (min-width: 670px) and (max-width: 1180px) {
        display: grid;
        grid-template-columns: 34% 23% 33%;
        gap: 5%;
    }
    @media (min-width: 1180px) and (max-width: 1450px) {
        display: grid;
        grid-template-columns: 30% 20% 33%;
        gap: 8%;
    }
    @media (min-width: 1450px) {
        display: grid;
        grid-template-columns: 25% 18% 37%;
        gap: 10%;
    }
`
export const DetailHeaderContainerMob = styled.div`
    border-bottom: 1px solid var(--text-opacity5);
    margin-bottom: 30px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;

    @media (min-width: 670px) {
        display: none;
    }
`

export const TitleHeader = styled.div`
    display: grid;
    grid-template-columns: 15% 85%;
    grid-template-rows: 50% 50%;
    grid-template-areas: 'iconCtf titleCtf' 'iconCtf numberCtf';
    margin-bottom: 20px;

    & img {
        grid-area: iconCtf;
        width: 90%;
    }

    .title {
        width: 98%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        grid-area: titleCtf;
        font-size: 18px;
        font-family: var(--font-main-bold);
        color: var(--text-opacity9);
        margin: 0;
    }

    .number {
        grid-area: numberCtf;
        margin: 0;
        font-size: 16px;
        font-family: var(--font-secundary-regular);
        color: var(--text-opacity9);
        margin: 0;
    }

    @media (max-width: 300px) {
        .title {
            font-size: 13px;
        }
    }

    @media (min-width: 670px) and (max-width: 1180px) {
        .title {
            font-size: 16px;
        }
        .number {
            font-size: 15px;
        }
    }
    @media (min-width: 1180px) and (max-width: 1450px) {
        display: grid;
        grid-template-columns: 20% 80%;
        grid-template-rows: 50% 50%;
        grid-template-areas: 'iconCtf titleCtf' 'iconCtf numberCtf';
        margin-bottom: 20px;
    }
    @media (min-width: 1450px) {
        display: grid;
        grid-template-colutext-infomns: 17% 83%;
        grid-template-rows: 50% 50%;
        grid-template-areas: 'iconCtf titleCtf' 'iconCtf numberCtf';
        margin-bottom: 20px;
    }
`
export const InfoHeader = styled.div`
    .text-info {
        font-family: var(--font-secundary-regular);
        font-size: 14px;
        color: var(--dominant-color) !important;
        margin: 0;
    }

    .value-info {
        font-family: var(--font-main-regular);
        font-size: 18px;
        color: var(--text-opacity9);
        margin: 0;
    }

    .date-info {
        font-family: var(--font-secundary-regular);
        font-size: 14px;
        color: var(--footer-color);
        margin: 0;
    }

    .sub-indice {
        top: -0.35em !important;
        font-size: 0.65em !important;
    }

    .title {
        grid-area: titleCtf;
        font-size: 18px;
        font-family: var(--font-main-bold);
        color: var(--text-opacity9);
        margin: 0;
    }

    .mora {
        color: var(--error-color) !important;
    }

    .number {
        grid-area: numberCtf;
        margin: 0;
        font-size: 16px;
        font-family: var(--font-secundary-regular);
        color: var(--text-opacity9);
    }

    @media (max-width: 300px) {
        .title {
            font-size: 13px;
        }
    }

    @media (min-width: 670px) and (max-width: 1180px) {
        .title {
            font-size: 16px;
        }
        .number {
            font-size: 15px;
        }
        .date-info {
            font-family: var(--font-secundary-regular);
            font-size: 14px;
            color: var(--footer-color);
            margin: 0;
        }
        .value-info {
            font-size: 22px;
        }
    }
    @media (min-width: 1180px) and (max-width: 1450px) {
    }
    @media (min-width: 1450px) {
    }
`

export const HeadContent = styled.div`
    display: flex;
    justify-content: space-between;

    & div:last-child {
        width: 40%;
    }
`
