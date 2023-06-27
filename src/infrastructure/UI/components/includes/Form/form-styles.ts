import type { HTMLAttributes } from 'react'
import Form from 'react-bootstrap/Form'
import Feedback from 'react-bootstrap/Feedback'
import InputGroupBs from 'react-bootstrap/InputGroup'
import tw, { styled } from 'twin.macro'
import cn from 'classnames'

/* types definition */
export interface InputGroupTextProps extends HTMLAttributes<HTMLSpanElement> {
    $inputError?: boolean
}

/* form components extended */

export const FormMessage = styled(Feedback)`
    ${tw`font-montserrat font-normal text-sm text-alert mt-[5px]`}
`
export const InputGroupText = styled(InputGroupBs.Text).attrs<InputGroupTextProps>((props) => ({
    className: cn(props.className, { '_input-error': !!props.$inputError }),
}))`
    ${tw`border-gray-custom-200 border-r-0 bg-transparent rounded-[7px 0px 0px 7px] transition-colors duration-[0.15s] ease-in-out`}

    &.icon-action {
        ${tw`cursor-pointer`};
    }

    &._input-error {
        ${tw`border border-solid border-alert`};
    }

    .icon-eye {
        ${tw`max-w-[16px]`};
    }
`

export const FormCheck = styled(Form.Check)`
    ${tw``}
`

export const FormLabel = styled(Form.Label)`
    ${tw`font-montserrat font-normal text-base text-gray-custom-700 mb-[0.2rem]`}
`

export const FormControl = styled(Form.Control)`
    ${tw`pl-0 h-12.5 border border-solid border-gray-custom-200 border-l-0 rounded-[7px] opacity-100`}

    &::placeholder {
        ${tw`font-helvetica font-normal text-base`}
    }

    &[readonly] {
        ${tw`bg-white`}
    }

    &:focus {
        ${tw`outline-none shadow-none`}
    }

    &.has-suffix {
        ${tw`border-r-0 rounded-none`}
    }

    & ~ ${InputGroupText} {
        /* TODO: Quitar las reglas de (!)important cuando ya no se importe login.scss */
        ${tw`rounded-[0px 7px 7px 0px ${`!important`}] !border !border-solid !border-gray-custom-200 border-l-0`}
    }

    &.is-invalid {
        ${tw`pr-0`}
        background-image: none;

        ~ ${InputGroupText} {
            /* TODO: Quitar las reglas de (!)important cuando ya no se importe login.scss */
            ${tw`!border !border-solid !border-alert`}
        }

        &:focus {
            ${tw`outline-none shadow-none`}
        }
    }
`

export const CheckLabel = styled(Form.Check.Label)`
    ${tw`pt-2.5 pl-3.5`}
`

export const CheckInput = styled(Form.Check.Input)`
    ${tw`w-[25px] h-[25px] border border-solid border-gray-custom-300`}

    &:focus {
        ${tw`border-dominant outline-none shadow-none`}
    }
    &:checked {
        ${tw`bg-dominant border-dominant outline-none shadow-none`}
    }
`

export const InputGroup = styled(InputGroupBs)`
    &:hover {
        ${InputGroupText}, ${FormControl} {
            /* TODO: Quitar las reglas de (!)important cuando ya no se importe login.scss */
            ${tw`!border-dominant !shadow-none`}
        }
    }

    &.has-validation {
        ${tw`pb-6`}

        ${FormMessage} {
            ${tw`absolute top-full -mt-5`};
        }
    }
`

export const FormGroup = styled(Form.Group)`
    /* TODO: Quitar las reglas de (!)important cuando ya no se importe login.scss */
    ${tw`pt-5 px-5 pb-0 relative`}
`

export const StyledForm = styled(Form)``

interface ErrorField {
    $isError?: boolean
    $haveImg?: boolean
}

export const InputSelectGroup = styled(InputGroup)<ErrorField>`
    ${tw`relative  h-12.5 rounded-[8px] pl-2 border border-solid border-black overflow-hidden`}
    border-color: ${(props) =>
        props.$isError ? 'red' : 'rgba(196,194,194,var(--tw-border-opacity))'};

    ${({ $haveImg }) => ($haveImg ? tw`pl-3` : tw`pl-2`)}
`

export interface RangeProps {
    $bgSize?: number
}

export const Range = styled(Form.Range)<RangeProps>`
    ${tw`h-2 bg-[rgba(41, 213, 127, 0.2)] rounded-[5px] bg-no-repeat`}

    -webkit-appearance: none;
    background-image: linear-gradient(rgba(41, 213, 127, 1), rgba(41, 213, 127, 1));
    background-size: ${({ $bgSize }) => `${$bgSize}%`};

    &::-webkit-slider-thumb {
        ${tw`h-5 w-5 rounded-[50%] bg-[rgba(41, 213, 127, 1)] shadow-none`};
        -webkit-appearance: none;
    }

    &::-webkit-slider-runnable-track {
        ${tw`bg-transparent border-none shadow-none`};
        -webkit-appearance: none;
    }
`

export const FormText = styled(Form.Text)`
    ${tw``}
`
