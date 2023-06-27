import tw, { styled } from 'twin.macro'

export const TitleCreditDetailContainer2 = styled.div`
    grid-area: titleCredit;
    margin: 30px 0;

    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;

    /* .title-detail-sav {
        grid-area: titleDetail;
    }
    .title-detail-sav {
        grid-area: titleDetail;
    } */
    .title-desk {
        display: none;
    }

    .title-info {
        display: flex;
        font-size: 18px;
        color: var(--text-opacity10);
        font-family: var(--font-main-bold);
        margin: 0;
        strong {
            color: var(--dominant-color-dark) !important;
        }
    }

    @media (min-width: 670px) and (max-width: 1180px) {
        margin: 50px 0 40px;
    }
    @media (min-width: 1180px) and (max-width: 1450px) {
        margin: 50px 0 40px;
        display: grid;
        grid-template-columns: 30% 10% 60%;
        gap: 0;
        grid-template-areas: 'titleDetail . alertMora';

        .title-mob {
            display: none;
        }

        .title-desk {
            display: block;
        }

        .title-info {
            font-size: 24px;
        }
    }
    @media (min-width: 1450px) {
        margin: 50px 0 40px;

        display: grid;
        grid-template-columns: 30% 30% 40%;
        gap: 0;
        grid-template-areas: 'titleDetail . alertMora';

        .title-mob {
            display: none;
        }

        .title-desk {
            display: block;
        }

        .title-info {
            font-size: 24px;
        }
    }
`

export const TitleCreditDetailContainer = styled.div`
    grid-area: titleCredit;
    ${tw`mt-5 lg:mt-0`}
`

export const TitleCreditDetailDesk = styled.p`
    ${tw`hidden text-[18px] text-black font-bold font-montserrat my-2.5 mx-0`}
    ${tw`lg:flex lg:text-2xl`}

    strong {
        ${tw`!color[var(--dominant-color-dark)]`}
    }
`

export const TitleCreditDetailMobile = styled.p`
    ${tw`flex text-[18px] text-black font-bold font-montserrat my-2.5 mx-0`}
    ${tw`lg:hidden lg:text-2xl`}


    strong {
        ${tw`!color[var(--dominant-color-dark)]`}
    }
`
