import tw, { styled } from 'twin.macro'

export const SavingFormFields = styled.div`
    ${tw`mb-[10%]`}
    ${tw`md:grid md:gap-[4%] md:mb-[3%] md:grid-template-columns[48% 48%]`}
    ${tw`lg:grid-template-columns[22% 22% 22% 22%]`}
`

export const CardInput = styled.div`
    ${tw`grid-template-columns[75% 25%] grid h-[60px] px-2.5 pt-0 pb-[5px] mb-[10px] rounded-[10px] relative`}
    ${tw`md:h-[115px] md:grid-template-columns[85% 15%] md:px-5 md:pt-0 md:pb-[5px]`}
    border: 1px solid var(--text-opacity4);

    p {
        ${tw`!m-0`}
    }

    span {
        ${tw`block text-xl text-black pl-[35px] font-normal font-montserrat`}
        ${tw`md:text-[15px] md:pt-[37px] md:pl-[25px] md:font-semibold`}

        sup {
            ${tw`!top-[-0.35em] !text-[0.65em]`}
        }
    }

    .radio {
        ${tw`relative`}

        .form-check-input {
            ${tw`!w-[19px] !h-[19px] absolute bottom-[-12px]`}
            ${tw`md:rounded-[50%] md:float-left md:ml-[-1.5em] md:!bottom-[-60px]`}
        }
        .form-check-label {
            ${tw`m-0 !p-0 !pl-[12px] font-helvetica font-normal text-sm color[var(--text-opacity5)]`}
            ${tw`md:text-base md:!p-0 md:top-5 md:absolute md:color[var(--dominant-color-dark)]`}
        }
    }
`
export const CustomInputContainer = styled.div`
    ${tw`hidden mb-2.5 px-2.5 pt-0 pb-[5px] h-[60px] relative rounded-[10px] grid-template-columns[75% 25%]`}
    ${tw`md:block md:h-[115px] md:grid-template-columns[85% 15%] px-5 pt-0 pb-[5px]`}
    border: 1px solid var(--text-opacity4);

    & > div {
        ${tw`!hidden !relative`}
        ${tw`md:!block`}

        & .radio {
            ${tw`relative`}
            .form-check-input {
                ${tw`!w-[19px] !h-[19px] bottom-[-12px] absolute`}
                ${tw`md:rounded-[50%] md:float-left md:ml-[-1.5em] md:!bottom-[-60px]`}
            }
            .form-check-label {
                ${tw`m-0 text-sm !p-0 !pl-[12px] font-normal font-helvetica color[var(--text-opacity5)]`}
                ${tw`text-base absolute left-0 !p-0 top-5 color[var(--dominant-color-dark)]`}
            }
        }
    }
`

export const SavingButtonsContainer = styled.div`
    ${tw`flex flex-col`}
    ${tw`md:flex-row md:items-center md:justify-end`}
    & button {
        ${tw`!opacity-100 my-2.5 cursor-pointer !border-none mx-0 min-w-[200px] text-[var(--background-color)] h-[50px]`}
        background-color: var(--sub-dominant-color) !important;

        &:disabled {
            ${tw`!opacity-80 border-none`}
        }
    }
`

interface InputCustomProps {
    error?: boolean
}

export const InputCustom = styled.input<InputCustomProps>`
    ${tw`font-normal font-montserrat text-base absolute top[55px] left[30px] py-0 px-2.5 h-[40px] border-none rounded-[10px] w-[155px]`}
    background-color: var(--header-color);
    color: var(--place-holder-color);
    outline: none;

    border: ${(props) => (!props.error ? '' : '2px solid red')};

    &:focus {
        border: ${(props) =>
            !props.error ? '2px solid var(--dominant-color-ligth)' : '2px solid red'};
    }

    &:disabled:focus {
        ${tw`!border-none`}
        outline: transparent auto 1px !important;
        outline-color: transparent !important;
    }
`

export const InputContainerMobile = styled.div<InputCustomProps>`
    ${tw`relative`}

    & input {
        ${tw`font-montserrat font-normal outline-none w-full h-[60px] px-2.5 py-0 rounded-[10px] color[var(--place-holder-color)] text-base`}

        border: ${(props) => (props.error ? '2px solid red' : '1px solid var(--text-opacity4)')};
    }

    & input:focus {
        border: ${(props) => (props.error ? '2px solid red' : '1px solid var(--text-opacity4)')};
    }
`
export const CheckInputOtherValueMobile = styled.div`
    ${tw`grid rounded-[10px] h-[60px] px-2.5 pt-0 pb-[5px] mb-[10px] grid-template-columns[75% 25%]`}
    ${tw`md:hidden`}
    border: 1px solid var(--text-opacity4);

    & .radio {
        ${tw`flex items-center h-full`}
        ${tw`md:hidden`}

        .form-check-input {
            ${tw`!w-[19px] !h-[19px]`}
        }

        .form-check-label {
            ${tw`text-sm m-0 px-0 pt-0 pl-[14px] font-helvetica font-normal`}
        }
    }
`
