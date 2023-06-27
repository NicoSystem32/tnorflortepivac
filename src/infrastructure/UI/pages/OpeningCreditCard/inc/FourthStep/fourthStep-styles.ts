import tw, { styled, css } from 'twin.macro'

import { CheckInput } from '../../../../components/includes'
import { FormLabel, FormGroup } from '../../openingCreditCard-styles'

export interface StyledWidthProps {
    width?: 'w-full' | 'w-1/2' | 'w-1/4' | 'w-11/12' | 'w-4/5'
}

export const StyledWidth = css<StyledWidthProps>`
    ${({ width }) => {
        switch (width) {
            case 'w-full':
                return tw`w-full`
            case 'w-1/2':
                return tw`w-1/2`
            case 'w-1/4':
                return tw`w-1/4`
            case 'w-11/12':
                return tw`w-11/12`
            case 'w-4/5':
                return tw`w-4/5`
            default:
                return tw`w-1/2`
        }
    }}
`

export const FourthStepWrapper = styled.section`
    ${tw`flex justify-center items-center py-2`}
`

export const FourthStepContent = styled.div`
    ${tw`p-5 lg:px-10 w-full max-w-[550px] lg:max-w-[924px] rounded-[10px] shadow-[0px 3px 6px #00000029]`}
`

export type OptionalFieldLabelCtrProps = StyledWidthProps

export const OptionalFieldLabelCtr = styled.div<OptionalFieldLabelCtrProps>`
    ${tw`flex justify-between`}
    ${StyledWidth}
`

export type FieldCtrProps = StyledWidthProps & {
    widthSize?: string
}

export const FieldCtr = styled.div<FieldCtrProps>`
    width: ${({ widthSize }) => widthSize};
`
export const FormLabelDark = styled(FormLabel)`
    ${tw`text-[#425453]`}
`

export const ContainerCheck = styled.div`
    ${tw`flex justify-between mt-5`}
`

export const CheckInputTdc = styled(CheckInput)`
    ${tw`block !w-6 !h-6 mr-3 cursor-pointer`}
`

export const TermText = styled.p`
    ${tw`text-sm font-helvetica font-medium text-[#53595A] w-[94%]`}
`

export const LinkTyC = styled.span`
    ${tw`pl-1 m-0 underline text-[var(--sub-dominant-color)] cursor-pointer`}
`

export const AddressCtr = styled.div`
    ${tw`flex flex-col lg:flex-row lg:justify-between lg:gap-5`}

    & > div:nth-child(1) {
        ${tw`lg:w-[27%] pb-5 lg:pb-0`}
        & .input-group {
            ${tw`pl-0`}
            & select {
                ${tw`pl-5`}
            }
        }
    }
    & > div:nth-child(2) {
        ${tw`flex gap-2 items-end h-26 lg:h-[136px]`}

        & div {
            ${tw`flex items-end`}
        }
        & div span {
            ${tw`!rounded-none border-t-0 border-l-0 border-r-0`}
        }
        & div input {
            ${tw`!rounded-none border-t-0 border-l-0 border-r-0`}
        }
    }

    & > div:nth-child(3) {
        ${tw`lg:w-[33%]`}
    }
`

export const AddressNumber = styled.div`
    ${tw`h-full mb-11 mx-2`}
`

export const AddressCheckShow = styled.div`
    ${tw`w-full relative z-10 flex justify-between items-end lg:w-1/2`}

    ${FormGroup} {
        ${tw`w-[90%]`}
    }
`

export const CheckInputAddressCtr = styled.div`
    ${tw`cursor-pointer mb-4`}
`

export const CheckInputLabel = styled.label`
    ${tw`cursor-pointer`}
`

export const CheckInputImg = styled.img`
    ${tw`w-8`}
`

export const CheckInputAddress = styled(CheckInput)`
    ${tw`hidden`}
`
