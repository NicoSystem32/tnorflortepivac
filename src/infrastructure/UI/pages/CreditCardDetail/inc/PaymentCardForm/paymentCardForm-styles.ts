import tw, { styled } from 'twin.macro'
import {
    OptionPay as OptionPayOr,
    ContentOptionCard as ContentOptionCardOr,
} from '../../../Payments/inc/FundsOrigin/fundsOrigin-styles'

import { InputCustom as InputCustomOr } from '../../../SavingsDetails/inc/SavingForm/savingForm-styles'

import { Button as ButtonOr } from '../../../../components'

export const PaymentCardFormContainer = styled.div`
    ${tw`mt-0 w-full`}
    ${tw`lg:max-w-[670px] lg:box-shadow[0px 3px 6px #00000029] lg:rounded-[10px] lg:p-[15px]`}
`
export const FormContainer = styled.div`
    ${tw`flex gap-5 flex-col`}
`

export const OptionsContainer = styled.div`
    ${tw`flex gap-2 flex-wrap`}
    .option-mobile {
        ${tw`flex lg:hidden`}
    }
    .option-desk {
        ${tw`lg:flex hidden`}
    }
`

export const OptionPay = styled(OptionPayOr)`
    ${tw`shadow-none lg:w-[calc(50% - 4px)] h-[65px] lg:h-[90px]`}
    &:first-child {
        ${tw`lg:w-full`}
    }
`

export const ContentOptionCard = styled(ContentOptionCardOr)`
    .title {
        ${tw`font-helvetica font-medium lg:text-base text-[14px] lg:color[var(--dominant-color-dark)] color[var(--text-opacity7)]`}
    }
    .sub-title {
        ${tw`font-montserrat lg:font-bold lg:text-black lg:text-base font-medium text-[20px] color[var(--text-opacity8)]`}
    }
    .text {
        ${tw`font-helvetica font-normal text-xs color[var(----text-opacity7)] lg:block hidden`}
    }
`
export const InputCustom = styled(InputCustomOr)`
    ${tw`lg:static lg:block hidden`}
`

export const Button = styled(ButtonOr)`
    ${tw`self-end lg:w-[200px] w-full`}
`

interface InputCustomProps {
    error?: boolean
}
export const InputContainerMobile = styled.div<InputCustomProps>`
    ${tw`relative mb-[20px]`}

    & input {
        ${tw`font-montserrat font-normal outline-none w-full h-[60px] px-2.5 py-0 rounded-[10px] color[var(--place-holder-color)] text-base `}

        border: ${(props) => (props.error ? '2px solid red' : '1px solid var(--text-opacity4)')};
    }

    & input:focus {
        border: ${(props) =>
            props.error ? '2px solid red' : '1px solid var(--dominant-color-ligth)'};
    }
`

export const ErrorMessage = styled.div`
    ${tw`self-end`}
    & > p {
        ${tw`text-sm text-alert font-montserrat font-normal m-0`}
    }
`

export const InputMobileContainer = styled.div`
    ${tw`flex flex-col gap-3`}
    & h3 {
        ${tw`font-montserrat font-bold text-center text-lg text-black`}
        & > span {
            ${tw`color[var(--dominant-color-dark)]`}
        }
    }
`
