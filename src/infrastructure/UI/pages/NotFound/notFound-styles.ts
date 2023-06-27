import { styled } from 'twin.macro'

export const NotFoundContent = styled.div`
    @media (min-width: 1180px) and (max-width: 1400px) {
        display: grid;
        grid-template-columns: 53% 45%;
        grid-template-areas: 'info404 img404';
    }

    @media (min-width: 1400px) {
        display: grid;
        grid-template-columns: 52% 50%;
        grid-template-areas: 'info404 img404';
        margin: 3% 15%;
    }
`
export const NotFoundContentImg = styled.div`
    width: 80%;
    margin: 5% 10%;
    background-image: url(../../assets/icons/big-stain.png);
    background-repeat: no-repeat;
    background-size: contain;
    grid-area: img404;
    background-position: bottom;

    .img-not-found {
        width: 100%;
    }

    @media (min-width: 570px) and (max-width: 1180px) {
        background-size: 80%;

        .img-not-found {
            width: 80%;
        }
    }

    @media (min-width: 1180px) and (max-width: 1400px) {
        margin: 5% 0% 0 0;
        padding: 0 22% 8% 0;
        background-size: 345px;
        background-position: right;

        .img-not-found {
            width: 115%;
        }
    }

    @media (min-width: 1400px) {
        margin: 5% 0% 0 0;
        padding: 0 5% 16% 0;
        background-size: 510px;
        background-position: right;

        .img-not-found {
            width: 80%;
        }
    }
`
export const NotFoundContentInfo = styled.div`
    background-image: url(../../assets/icons/small-stain.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 65%;
    width: 90%;
    margin: 0 5%;
    padding: 10% 0 15% 0;
    grid-area: info404;

    .title-404 {
        font-size: 125px;
        font-family: var(--font-main-bold);
        color: var(--text-opacity9);
        margin: auto;

        span {
            color: var(--dominant-color-dark) !important;
        }
    }

    subtitle-404 {
        font-size: 14px;
        font-family: var(--font-secundary-regular);
        color: var(--text-opacity9);
        strong {
            font-family: var(--font-secundary-bold);
        }
    }

    .content-position {
        text-align: center;
    }

    @media (min-width: 570px) and (max-width: 1180px) {
        width: 70%;
        margin: 0 15%;
    }

    @media (min-width: 1180px) and (max-width: 1400px) {
        background-position: left;
        background-size: 40%;
        padding: 10% 24% 15% 0%;
        margin-left: 25%;

        .content-position {
            text-align: start;
        }

        subtitle-404 {
            font-size: 16px;
        }
    }

    @media (min-width: 1400px) {
        background-position: left;
        background-size: 40%;
        padding: 10% 24% 15% 0%;
        margin-left: 25%;

        .content-position {
            text-align: start;
        }

        subtitle-404 {
            font-size: 16px;
        }
    }
`
