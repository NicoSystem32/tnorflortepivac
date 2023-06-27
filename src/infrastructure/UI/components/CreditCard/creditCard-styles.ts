import tw, { styled } from 'twin.macro'

interface CreditCardProps {
    isDisable?: boolean
}
export const CreditCardContainer = styled.div<CreditCardProps>`
    ${tw`max-w-[300px] max-h-[180px] relative`}
    opacity: ${(props) => (!props.isDisable ? 1 : 0.5)};

    & > picture > img {
        ${tw`w-full relative`}
    }
`
export const CardContainer = styled.div`
    ${tw`flex flex-col gap-1 absolute justify-between top-0 w-full h-full p-[8px] pb-[3px] pt-[6px]`}
    & > picture > img {
        ${tw`w-[35%]`}
    }
`
export const CardBody = styled.div`
    ${tw`flex flex-col w-full ml-[10px]`}
    & > picture > img {
        ${tw`w-[22%]`}
    }
    & > p {
        ${tw`font-kredit font-bold text-[#efefef]  text-[20px] m-0`}
    }
`
export const CardFooter = styled.div`
    ${tw`flex flex-row`}
    & > div:nth-child(1) {
        ${tw`flex flex-row w-1/2 justify-end items-center h-[25px]`}
        & > h4 {
            ${tw`font-helvetica font-medium text-[10px] text-white m-0 w-[40px] border-0 border-r border-solid border-white mr-[5px]`}
        }
        & > h3 {
            ${tw`font-helvetica font-medium text-[14px] text-white m-0`}
        }
    }
    & > div:nth-child(2) {
        ${tw`flex flex-col w-1/2 gap-0 items-end`}
        & > img {
            ${tw`w-[42%] bg-white `}
        }
        & > p {
            ${tw`font-helvetica text-white text-[10px] m-0`}
        }
    }
`
