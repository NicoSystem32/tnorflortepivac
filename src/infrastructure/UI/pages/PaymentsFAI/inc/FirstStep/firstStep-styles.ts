import tw, { styled } from 'twin.macro'

export const PaymentFAIFirstStep = styled.section`
    ${tw`p-3.5 pt-0`}
`

export const PaymentStepContent = styled.div`
    ${tw`w-full shadow-none rounded-global pb-[30px] mb-5`}

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        ${tw`p-7`}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`w-full rounded-global pt-5 pr-7.5 pb-7.5 pl-5`}
        box-shadow: 0px 3px 6px ${({ theme }) => theme.colors['dark-custom']['300']};
    }
`
/* Payment FAI step content head */
export const HeadPaymentStep = styled.div`
    ${tw`m-[0px 0 20px] `}

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`m-[0px 0 40px]`}
    }
`

export const TitleStep = styled.p`
    ${tw`font-helvetica font-normal text-base text-dominant-dark block`}
`

export const TitlePayment = styled.h3`
    ${tw`flex font-montserrat font-bold text-lg text-dark-custom-700 m-0`}

    strong {
        ${tw`text-dominant`}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`text-2xl`}
    }
`

export const SubtitlePayment = styled.p`
    ${tw`font-helvetica font-normal text-dark-custom-700 text-base mt-5`}
`

/* Payment FAI step content body */
export const BodyPaymentStep = styled.div`
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`grid grid-cols-[25% 50%] pb-33.5`}
    }
`

export const PaymentAmount = styled.div`
    ${tw`bg-gray-custom-50 p-5 mt-5 mb-5 rounded-global`}

    ${TitleStep} {
        ${tw`font-helvetica font-normal text-base block`}
    }

    .sub-indice {
        ${tw`top-[-0.35em] text-[0.65em]`}
    }

    p {
        ${tw`m-0`}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`bg-transparent p-0 mt-0 mb-0 rounded-none border-0 border-r-2 border-solid border-gray-custom-300 pb-[15%]`}

        ${TitleStep} {
            ${tw`mb-2.5`}
        }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
        ${tw`pb-[10%]`}
    }
`

export const FAIFormWrap = styled.div`
    ${tw`pb-6`}

    .label-floating {
        ${tw`hidden font-helvetica font-normal text-gray-custom-700 text-base`}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`ml-15 relative`}

        .label-floating {
            ${tw`block absolute mt-3 top-full left-0`}
        }
    }
`

/* Payment FAI step content foot */
export const FootPaymentStep = styled.div`
    ${tw`flex flex-col-reverse gap-5 py-0 px-[4%]`}

    .btn-form-type-light {
        ${tw`border-transparent no-underline`}
    }
    .btn-form-type-light:hover {
        ${tw`text-sub-dominant border-sub-dominant`}
    }

    button.secundary {
        ${tw`border border-solid border-gray-custom-300 rounded-lg text-gray-custom-300 no-underline h-[3.125rem] hover:border-sub-dominant hover:text-sub-dominant hover:underline`}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        ${tw`flex flex-row gap-5 justify-end`}
        text-align: end;

        button {
            ${tw`w-48`}
        }

        .btn-form-type-light {
            ${tw`border-gray-custom-600`}
        }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`flex flex-row justify-end gap-5 text-center pr-0`}
        text-align: end;

        button {
            ${tw`w-56`}
        }

        button.secundary {
            ${tw`no-underline`}
        }
        button.secundary:hover {
            ${tw`border border-solid border-sub-dominant text-sub-dominant`}
        }
        button.main {
            ${tw`ml-auto`}
        }

        .btn-form-type-light {
            ${tw`border-gray-custom-600`}
        }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
        ${tw`grid grid-cols-[48% 48%] gap-[8%] p-0 w-[45%] ml-auto`}
    }
`
