import tw, { styled } from 'twin.macro'

export const PaymentsContainer = styled.div`
    ${tw`m-0 mt-20 px-0 py-5`}
`

export const TitlePayments = styled.div`
    ${tw`mt-0 mx-0 mb-10`}
    ${tw`font-montserrat text-[24px] lg:text-2xl font-bold color[var(--text-opacity10)]`}
    strong {
        ${tw`!color[var(--dominant-color-dark)]`}
    }
    p {
        ${tw`font-helvetica text-[12px] font-medium lg:text-sm m-0 mt-[20px] lg:mt-[25px] color[var(--text-opacity10)]`}
    }
`

export const PaymentsOptions = styled.div`
    ${tw`flex flex-col-reverse gap-5`}
    ${tw`lg:flex-row lg:gap-10 lg:justify-end`}

    button {
        ${tw`w-[100%] lg:w-[225px]`}
    }

    .add-more {
        ${tw`text-decoration[underline] border[none] lg:border[1px solid rgba(112,112,112)]`}
    }
`
export const PaymentsList = styled.div`
    ${tw`rounded-[10px] mb-5 mt-5 relative`}
    ${tw`lg:pt-7.5 lg:px-4 lg:pb-7.5 lg:mt-10 lg:shadow-[0px 3px 6px var(--shadow-color)]`}

    & .toast-container {
        ${tw`relative mt-5 lg:mt-0 lg:absolute lg:top-[-70px] lg:right-[-20px]`}
    }

    & .toast {
        ${tw`w-full lg:w-[500px]`}

        & h4 {
            ${tw`font-montserrat text-base text-white font-bold`}
        }

        & p {
            ${tw`font-montserrat text-[12px] text-white m-0`}
        }
    }
`

export const OptionsContent = styled.div`
    ${tw`flex flex-col gap-7.5 mb-15 ml-0`}
    ${tw`lg:flex-row lg:gap-10 lg:mb-12.5 lg:ml-[2%]`}
`
