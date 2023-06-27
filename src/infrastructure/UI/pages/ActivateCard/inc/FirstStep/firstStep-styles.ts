import tw, { styled } from 'twin.macro'

export const FirstStepContainer = styled.div`
    ${tw`lg:box-shadow[0px 3px 6px #00000029] lg:rounded-[10px] self-center lg:w-[570px] lg:px-[40px] lg:py-[30px] p-[15px]`}

    ${tw`flex flex-col gap-[25px]`}
`
export const InformationText = styled.p`
    ${tw`font-helvetica font-medium text-base m-0`}
`

export const InformationCard = styled.div`
    ${tw`flex flex-col gap-4 w-full`}
    ${tw`lg:flex-row lg:gap-2`}

    & > picture {
        ${tw`lg:w-1/2 w-[80%] self-center flex justify-center`}
    }

    & > div {
        ${tw`lg:w-1/2 flex flex-col gap-3 lg:pl-[25px]`}
    }
`
