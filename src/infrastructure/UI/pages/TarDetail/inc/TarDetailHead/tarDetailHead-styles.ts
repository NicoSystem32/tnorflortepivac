import tw, { styled } from 'twin.macro'

export const TarHeadContainerDesk = styled.div`
    display: none;

    @media (min-width: 670px) {
        display: grid;
        grid-template-columns: 34% 19% 26% 21%;
        gap: 0;
    }
`
export const TarHeadContainerMob = styled.div`
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

export const TitleHead = styled.div`
    display: grid;
    grid-template-columns: 15% 85%;
    grid-template-rows: 50% 50%;
    grid-template-areas: 'iconCtf titleCtf' 'iconCtf numberCtf';
    margin-bottom: 20px;

    & img {
        grid-area: iconCtf;
    }

    .title {
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
        grid-template-columns: 17% 83%;
        grid-template-rows: 50% 50%;
        grid-template-areas: 'iconCtf titleCtf' 'iconCtf numberCtf';
        margin-bottom: 20px;
    }
`
export const InfoHead = styled.div`
    margin-right: 2px;
    .text-info {
        font-family: var(--font-secundary-regular);
        font-size: 14px;
        color: var(--dominant-color) !important;
        margin: 0;
    }

    .value-info {
        font-family: var(--font-main-regular);
        font-size: 22px;
        color: var(--text-opacity9);
        margin: 0;
    }

    .sub-indice {
        top: -0.35em !important;
        font-size: 0.65em !important;
    }

    .mora {
        color: var(--error-color) !important;
    }

    .date-info {
        font-family: var(--font-secundary-regular);
        font-size: 14px;
        color: var(--footer-color);
        margin: 0;
    }

    .blue-text {
        color: var(--text-modal1) !important;
    }

    @media (min-width: 670px) {
        .text-info {
            font-size: 18px;
            font-family: var(--font-main-bold);
            color: var(--text-opacity9) !important;
            margin: 0;
        }
        .value-info {
            margin: 0;
            font-size: 16px;
            font-family: var(--font-secundary-regular);
            color: var(--text-opacity9);
        }
    }
`

export const HeadDetailMovements = styled.div`
    ${tw`flex justify-between`}

    .value-info {
        ${tw`text-base`}
    }

    .date-info {
        ${tw`text-[12px]`}
    }
`
