import tw, { styled } from 'twin.macro'

export const FirstStepWrapper = styled.section`
    ${tw`flex justify-center items-center py-2`}
`

export const FirstStepContent = styled.div`
    ${tw`p-5 lg:px-10 w-full max-w-[550px] lg:max-w-[600px] rounded-[10px] shadow-[0px 3px 6px #00000029]`}
`

export const SelectCtr = styled.div`
    ${tw`flex justify-between h-[86px]`}

    & div {
        ${tw`w-[30%]`}
    }

    & .input-group {
        ${tw`w-full p-0`}

        & select {
            ${tw`p-3.5`}
        }
    }
`
