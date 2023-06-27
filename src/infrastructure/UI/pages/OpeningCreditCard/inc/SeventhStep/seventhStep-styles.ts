import tw, { styled } from 'twin.macro'

export const SeventhStepWrapper = styled.section`
    ${tw`flex justify-center items-center py-2`}
`

export const SeventhStepContent = styled.div`
    ${tw`p-5 lg:px-10 w-full max-w-[550px] lg:max-w-[924px] rounded-[10px] shadow-[0px 3px 6px #00000029]`}
`
export interface TextAlign {
    txtAlign: 'center' | 'start' | 'end'
}

export const WrapperTop = styled.div`
    ${tw`flex flex-col lg:flex-row lg:my-5 lg:gap-10`}
`

export const WrapperTopLeftImage = styled.div`
    ${tw`w-full lg:w-[35%] flex justify-center items-center my-5 lg:justify-start`}
`

export const WrapperTopRightSlide = styled.div`
    ${tw`flex flex-col justify-start w-full h-full mb-10 lg:my-5`}
`

export const RangeCtr = styled.div`
    ${tw`relative`}
`

export const TextCtr = styled.div`
    ${tw`mb-10`}

    & p {
        ${tw`m-0`}
    }

    & h4 {
        ${tw`my-1`}
    }
`

export const Image = styled.img`
    ${tw`w-[260px]`}
`

export const Sub = styled.sub`
    ${tw`absolute top-[40%]`}
`

export interface TooltipAmountProps {
    left: number
}

export const TooltipAmount = styled.div<TooltipAmountProps>`
    ${tw`absolute min-w-[80px] bottom-[-30px]`}

    left: ${({ left }) => `calc(${left}% - 20px)`};

    & p {
        ${tw`m-0 font-helvetica text-[#29D57F] text-[11px] font-normal`}
    }
`

export const Amount = styled.p<TextAlign>`
    ${tw`font-montserrat font-semibold text-base mb-7.5 relative`}

    text-align: ${({ txtAlign }) => txtAlign};
`

export const CtrValues = styled.div`
    ${tw`flex items-center justify-between`}

    & p {
        ${tw`m-0 font-helvetica text-[10px] font-normal text-[#425453]`}
        & sub {
            ${tw`top-[50%]`}
        }
    }

    & p:last-child {
        ${tw`mr-2`}
    }
`
