import tw, { styled } from 'twin.macro'

export const ContentOptionCard = styled.div`
    ${tw`flex flex-row gap-3 items-center`}

    & > img {
        ${tw`w-7`}
    }
    .pse {
        ${tw`w-[42px] lg:w-[50px]`}
    }
    .title {
        ${tw`text-base font-montserrat font-bold color[var(--text-opacity9)]`}
    }

    .text {
        ${tw`text-lg font-montserrat font-medium color[var(--text-opacity9)]`}
    }

    sub {
        ${tw`top-[-0.36em] text-[.65em]`}
    }

    .mora {
        ${tw`color[var(--error-color)] flex items-center gap-1.5`}
        img {
            ${tw`w-4`}
        }
    }
`

export const OptionsContent = styled.div`
    ${tw`flex flex-col gap-7.5 mb-15 ml-0`}
    ${tw`lg:flex-row lg:gap-5 lg:mb-12.5`}
`

export const OptionPay = styled.div`
    ${tw`border[1px solid var(--text-opacity4)] rounded-[10px] shadow-[0px 3px 6px var(--shadow-color)] h-[96px] w-[100%]  relative flex gap-4 py-1 pl-4 pr-3`}
    ${tw`lg:w-[350px] lg:relative`}

    p {
        ${tw`m-0`}
    }

    .radio-btn {
        ${tw`flex justify-start items-center`}
    }

    .radio {
        ${tw`relative`}
        .form-check-input {
            ${tw`!w-[19px] !h-[19px] bottom-0 absolute`}
            ${tw`md:rounded-[50%] md:float-left md:ml-[-1.5em]`}
        }
        .form-check-label {
            ${tw`m-0 text-sm !p-0 !pl-[12px] font-normal font-helvetica color[var(--text-opacity5)]`}
            ${tw`text-base absolute left-0 !p-0 top-5 color[var(--dominant-color-dark)]`}
        }
    }
    span {
        ${tw`absolute top-[-12px] py-0 px-4 shadow-[0px 3px 6px var(--shadow-color)] right-4 rounded-[10px] color[var(--background-color)] bg-[var(--approved-color)] font-helvetica font-normal text-sm`}
    }
`

export const NotFoundOrigins = styled.div`
    ${tw`flex flex-col lg:flex-row justify-between gap-4 lg:gap-5 m-2 lg:m-7.5`}
    & > div:first-child {
        ${tw`flex flex-col items-center lg:items-start lg:pr-12.5`}

        & > h2 {
            ${tw`font-montserrat text-[25px] lg:text-[40px] font-bold color[var(--text-opacity10)] mb-6`}
            & > span {
                ${tw`color[var(--dominant-color-dark)]`}
            }
        }
        & > img {
            ${tw`max-w-[220px] self-center`}
        }
    }
    & > div:last-child {
        ${tw`w-full lg:w-[35%] self-end lg:pb-2.5`}
    }
`
