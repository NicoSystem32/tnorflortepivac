import tw, { styled } from 'twin.macro'

export const CreditDetailContainer = styled.div`
    ${tw`mt-[80px] py-[15px] px-0 min-h-[70vh]`}
`
export const LoadingContainer = styled.div`
    ${tw`mt-[20vh]`}
`
export const CreditDetailFormTitle = styled.p`
    ${tw`font-montserrat font-normal color[var(--text-modal1)] text-sm`}
    ${tw`md:text-base`}
    ${tw`2xl:text-[18px]`}
`

export const CreditDetailFormContainer = styled.div`
    ${tw`w-full box-shadow[0px 3px 6px #00000029] rounded-[10px] py-[30px] px-[15px]`}
    ${tw`md:p-[30px]`}
`

export const CreditDetailsHead = styled.div`
    ${tw`flex flex-col gap-7.5 items-center mb-2.5`}
    ${tw`lg:mx-0 lg:mt-[50px] lg:mb-[40px] lg:grid lg:grid-template-columns[30% 20% 50%] lg:gap-0 lg:grid-template-areas['titleCredit . alertMora']`}
`

interface ButtonsContentProps {
    btnOneActive?: boolean
    btnTwoActive?: boolean
}

export const ButtonsContent = styled.section<ButtonsContentProps>`
    ${tw`flex flex-col`}
    ${tw`md:hidden`}

    & button {
        ${tw`my-2.5 mx-0 py-3 rounded-[5px]  border[1px solid var(--sub-dominant-color)] !outline-none !box-shadow[none]`}
    }

    & button:first-child {
        background-color: ${(props) =>
            props.btnOneActive ? 'var(--sub-dominant-color) !important' : 'white !important'};
        color: ${(props) =>
            props.btnOneActive ? 'white !important' : 'var(--sub-dominant-color) !important'};
    }

    & button:last-child {
        background-color: ${(props) =>
            props.btnTwoActive ? 'var(--sub-dominant-color) !important' : 'white !important'};
        color: ${(props) =>
            props.btnTwoActive ? 'white !important' : 'var(--sub-dominant-color) !important'};
    }
`
