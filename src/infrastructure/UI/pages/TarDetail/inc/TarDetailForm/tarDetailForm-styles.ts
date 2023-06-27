import tw, { styled } from 'twin.macro'

export const ButtonsContainer = styled.div`
    ${tw`flex flex-col gap-7.5`}
    ${tw`lg:grid lg:grid-template-columns[25% 45% 20%] lg:gap-[5%] lg:items-center`}
    @media (min-width: 1024px) {
        grid-template-areas: '. alertDetail btnDetail';
    }
`

export const ButtonContainer = styled.div`
    ${tw`grid-area[btnDetail] text-center`}
    ${tw`md:text-align[end]`}

    & button {
        ${tw`w-full !opacity-100 my-2.5 cursor-pointer !border-none mx-0 min-w-[200px] color[var(--background-color)] h-[50px]`}
        background-color: var(--sub-dominant-color) !important;

        &:disabled {
            ${tw`!opacity-80 border-none`}
        }
    }
`

export const FieldInputContainer = styled.div`
    margin-bottom: 10%;

    @media (min-width: 670px) {
        display: grid;
        grid-template-columns: 48% 48%;
        gap: 4%;
        margin-bottom: 3%;
    }

    @media (min-width: 1180px) {
        grid-template-columns: 22% 22% 22% 22%;
    }

    @media (min-width: 1450px) {
        grid-template-columns: 18% 18% 18% 18%;
    }
`

export const FieldRadioButton = styled.div`
    ${tw`grid-template-columns[75% 25%] grid h-[60px] px-2.5 pt-0 pb-[5px] mb-[10px] rounded-[10px]`}
    ${tw`md:h-[115px] md:grid-template-columns[100%] md:px-5 md:pt-0 md:pb-[5px]`}
    border: 1px solid var(--text-opacity4);

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

    p {
        ${tw`block text-xl text-black pl-[35px] font-normal font-montserrat`}
        ${tw`md:text-[15px] md:pt-[37px] md:pl-[25px] md:font-semibold`}


        sup {
            ${tw`!top-[-0.35em] !text-[0.65em]`}
        }
    }
`
