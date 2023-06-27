import tw, { styled } from 'twin.macro'

export const SimulatorSection = styled.section`
    ${tw`bg-gray-custom-50 rounded-global p-2.5`}

    .simulator-title {
        ${tw`font-montserrat font-semibold text-lg text-gray-custom-500 pb-3.5 border-solid border-0 border-b-2 border-white`}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        ${tw`border border-solid border-gray-custom-200 py-5 px-7 mb-12.5`}

        .simulator-title {
            ${tw`font-bold`}
        }
    }
`

export const SimulatorContent = styled.div`
    ${tw`flex flex-col justify-between flex-nowrap gap-0`}

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        ${tw`flex-row justify-start gap-11`}
    }
`

export const DataSimulator = styled.dl`
    ${tw`m-0`}

    .data-label {
        ${tw`font-helvetica font-normal text-base text-gray-custom-500 mb-1`}
    }

    .data-value {
        ${tw`font-montserrat font-semibold text-[1.375rem] text-sub-dominant mb-3.5`}
    }
`
