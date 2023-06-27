import { styled } from 'twin.macro'

export const DetailBodyContainer = styled.div``
export const OptionsPayContent = styled.div`
    margin-bottom: 10%;
    .option-desk {
        display: none;
    }

    @media (min-width: 670px) and (max-width: 1180px) {
        display: grid;
        grid-template-columns: 48% 48%;
        gap: 4%;
        margin-bottom: 3%;
        .option-mob {
            display: none;
        }
        .option-desk {
            display: block;
        }
    }
    @media (min-width: 1180px) and (max-width: 1450px) {
        display: grid;
        grid-template-columns: 22% 22% 22% 22%;
        gap: 4%;
        margin-bottom: 3%;
        .option-mob {
            display: none;
        }
        .option-desk {
            display: block;
        }
    }
    @media (min-width: 1450px) {
        display: grid;
        grid-template-columns: 22% 22% 22% 22%;
        gap: 4%;
        margin-bottom: 3%;
        .option-mob {
            display: none;
        }
        .option-desk {
            display: block;
        }
    }
`
interface OptionPayProps {
    error?: boolean
}
export const OptionPay = styled.div<OptionPayProps>`
    border: 1px solid var(--text-opacity4);
    border-radius: 10px;
    display: grid;
    grid-template-columns: 75% 25%;
    padding: 0 10px 5px;
    margin-bottom: 10px;
    height: 60px;
    position: relative;
    p {
        margin: 0 !important;
    }

    .other-value-info .form-check-input {
        bottom: 18px !important;
    }
    .other-value-info .form-check-label {
        margin: 18px 0 !important;
    }

    .radio-button {
        position: relative;
        .form-check-input {
            width: 19px !important;
            height: 19px !important;
            position: absolute;
            bottom: -12px;
        }
        .form-check-label {
            padding: 0 !important;
            font-family: var(--font-secundary-regular);
            font-size: 14px;
            color: var(--text-opacity5);
            padding-left: 12px !important;
            margin: 0;
        }
        .form-check-input:focus {
            border-color: var(--dominant-color) !important;
            outline: 0;
            box-shadow: none !important;
        }
        .form-check-input:checked {
            background-color: var(--dominant-color) !important;
            border-color: var(--dominant-color) !important;
        }
    }

    .value-pay {
        font-family: var(--font-main-regular);
        font-size: 20px;
        color: var(--text-opacity9);
        padding-left: 35px;
    }

    .sub-indice {
        top: -0.35em !important;
        font-size: 0.65em !important;
    }

    .card-desk {
        position: relative !important;
    }

    .content-tooltip {
        display: flex;
        justify-content: end;
        align-items: center;
    }

    .other-value-input {
        border-radius: 10px;
        /* border: none; */
        background-color: var(--header-color);
        width: 155px;
        height: 40px;
        padding: 0 10px;
        position: absolute;
        top: 55px;
        left: 30px;
        font-size: 16px;
        font-family: var(--font-main-regular);
        color: var(--place-holder-color);
        outline: none;
        border: ${(props) => (props.error ? '2px solid red' : 'none')};
    }

    .other-value-input:focus,
    .other-value-input:focus-visible,
    .other-value-input:hover {
        border: ${(props) =>
            props.error ? '2px solid red' : '1px solid var(--dominant-color-ligth)'};
    }
    .other-value-input[disabled]:focus,
    .other-value-input[disabled]:focus-visible,
    .other-value-input[disabled]:hover {
        border: none !important;
    }

    @media (max-width: 300px) {
        .radio-button .form-check-label {
            font-size: 13px;
            padding-left: 2px !important;
        }
        .value-pay {
            font-size: 12px;
            padding-left: 25px;
        }
    }

    @media (min-width: 670px) and (max-width: 1180px) {
        height: 115px;
        grid-template-columns: 85% 15%;
        padding: 0 20px 5px;

        .other-value-info .form-check-label {
            margin: 0 !important;
        }

        .radio-button .form-check-input {
            bottom: -60px !important;
        }
        .radio-button .form-check-label {
            font-size: 16px;
            color: var(--dominant-color-dark);
            padding: 0 !important;
            position: absolute;
            left: 0;
            top: 20px;
        }

        .value-pay {
            font-family: var(--font-main-semibold);
            font-size: 15px;
            color: var(--text-opacity10);
            padding-top: 37px;
        }

        .content-tooltip {
            align-items: start;
            padding-top: 20px;
        }
    }
    @media (min-width: 1180px) and (max-width: 1450px) {
        height: 115px;
        grid-template-columns: 85% 15%;
        padding: 0 20px 5px;

        .other-value-info .form-check-label {
            margin: 0 !important;
        }

        .radio-button .form-check-input {
            bottom: -60px !important;
        }
        .radio-button .form-check-label {
            font-size: 16px;
            color: var(--dominant-color-dark);
            padding: 0 !important;
            position: absolute;
            left: 0;
            top: 20px;
        }

        .value-pay {
            font-family: var(--font-main-semibold);
            font-size: 15px;
            color: var(--text-opacity10);
            padding-top: 37px;
            padding-left: 25px;
        }

        .content-tooltip {
            align-items: start;
            padding-top: 20px;
        }
    }
    @media (min-width: 1450px) {
        height: 115px;
        grid-template-columns: 85% 15%;
        padding: 0 20px 5px;

        .other-value-info .form-check-label {
            margin: 0 !important;
        }

        .radio-button .form-check-input {
            bottom: -60px !important;
        }

        .radio-button .form-check-label {
            font-size: 16px;
            color: var(--dominant-color-dark);
            padding: 0 !important;
            position: absolute;
            left: 0;
            top: 20px;
        }

        .value-pay {
            font-family: var(--font-main-semibold);
            font-size: 15px;
            color: var(--text-opacity10);
            padding-top: 37px;
            padding-left: 25px;
        }

        .content-tooltip {
            align-items: start;
            padding-top: 20px;
        }
    }
`
interface InputMobileContainerProps {
    error?: boolean
}
export const InputMobileContainer = styled.div<InputMobileContainerProps>`
    position: relative;

    & input {
        height: 50px;
        width: 100%;
        font-size: 15px;
        padding: 0 10px;
        border: 1px solid var(--text-opacity4);
        border-radius: 10px;
        position: relative;
        font-family: var(--font-main-regular);
        color: var(--place-holder-color);
        outline: none;
        border: ${(props) => (props.error ? '2px solid red' : '1px solid var(--text-opacity4)')};
    }
    & input:focus {
        border: ${(props) =>
            props.error ? '2px solid red' : '1px solid var(--dominant-color-ligth)'};
    }
`

export const CreditDetailOptions = styled.div`
    display: flex;
    gap: 30px;
    flex-direction: column;
    .alert-detail {
        grid-area: alertDetail;
    }
    .btn-detail {
        grid-area: btnDetail;
    }

    @media (min-width: 1180px) and (max-width: 1450px) {
        display: grid;
        grid-template-columns: 25% 45% 20%;
        gap: 5%;
        grid-template-areas: '. alertDetail btnDetail';
        align-items: center;
    }
    @media (min-width: 1450px) {
        display: grid;
        grid-template-columns: 25% 45% 20%;
        gap: 5%;
        grid-template-areas: '. alertDetail btnDetail';
        align-items: center;
    }
`

export const OptionsButtonContainer = styled.div`
    grid-area: btnDetail;
    text-align: center;
    padding-right: 0 !important;
    margin-bottom: 10px;

    button {
        width: 100%;
        height: 50px;
        background-color: var(--sub-dominant-color);
        border-color: transparent !important;
        font-family: var(--font-main-regular);
        color: var(--background-color);

        &:hover {
            background-color: var(--sub-dominant-color) !important;
        }

        &:focus {
            background-color: var(--sub-dominant-color) !important;
        }

        &:disabled {
            color: var(--background-color);
            background-color: var(--sub-dominant-color-ligth) !important;
            pointer-events: none;
            opacity: 0.65;
        }

        &:focus {
            background-color: var(--sub-dominant-color) !important;
        }
    }

    text-align: center;
    padding-right: 0;

    @media (min-width: 670px) and (max-width: 1180px) {
        button {
            width: 210px;
        }
        text-align: end;
    }

    @media (min-width: 1180px) and (max-width: 1450px) {
        button {
            width: 210px;
        }
        padding-right: 4%;
        text-align: end;
    }

    @media (min-width: 1450px) {
        button {
            width: 210px;
        }
        padding-right: 16%;
        text-align: end;
    }
`

export const CheckRefund = styled.div`
    .radio-button {
        position: relative;
        .form-check-input {
            width: 26px !important;
            height: 26px !important;
            position: absolute;
            border: 1px solid var(--text-opacity5);
            bottom: calc(50% - 13px);
        }
        .form-check-label {
            padding: 0 !important;
            font-family: var(--font-main-medium);
            font-size: 14px;
            color: var(--text-opacity5);
            padding-left: 12px !important;
            margin: 0;
        }

        .form-check-input:focus {
            border-color: var(--dominant-color) !important;
            outline: 0;
            box-shadow: none !important;
        }
        .form-check-input:checked {
            background-color: var(--dominant-color) !important;
            border-color: var(--dominant-color) !important;
        }
    }
`
