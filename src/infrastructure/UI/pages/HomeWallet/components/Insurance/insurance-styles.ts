import tw, { styled } from 'twin.macro'

export const InsuranceContent = styled.div`
    ${tw`lg:w-[360px] w-full`}
    .content {
        margin: auto;
        display: grid;
        position: relative;
        padding: 4%;
        gap: 6%;
        border-radius: 10px;
        border: 1px solid var(--sub-dominant-color);
    }

    .link-btn {
        text-align: center;
        font-size: 14px;
        color: var(--text-opacity9);
        font-family: var(--font-main-regular);
        text-decoration: none;
        padding: 4% 0 5% 0 !important;
        margin-top: 4% !important;
        border-top: 1px solid #e6e7e8;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title {
        font-family: var(--font-main-bold);
        font-size: 16px;
        color: var(--text-opacity9);
        margin: 0;
    }

    .subtitle {
        font-family: var(--font-secundary-regular);
        font-size: 14px;
        color: var(--text-opacity9);
        margin: 0;
    }

    @media (min-width: 1180px) {
        .title {
            font-size: 18px;
        }

        .subtitle,
        .link-btn {
            font-size: 16px;
        }
    }
`
