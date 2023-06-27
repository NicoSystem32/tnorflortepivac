import tw, { styled } from 'twin.macro'
import { Form } from 'react-bootstrap'

import {
    FormLabel as FormLabelApp,
    FormGroup as FormGroupApp,
    InputGroup as InputGroupApp,
    CheckInput,
} from '../../../../components/includes'

export const FormContent = styled.div`
    ${tw`p-2`}
`

export const FormLabel = styled(FormLabelApp)`
    ${tw`font-helvetica font-normal block text-dominant-dark text-sm my-3`}
`

export const FormGroup = styled(FormGroupApp)`
    ${tw`p-0 my-2`}
`

export const InputGroupCheck = styled(InputGroupApp)`
    ${tw`flex items-center justify-start mb-6`}
`

export const FormCheck = styled(Form.Check)`
    ${tw`w-2/5 flex items-center`}

    .form-check-input {
        ${tw`!w-6 !h-6 mr-3 cursor-pointer`}
    }

    .form-check-label {
        ${tw`!p-0 mt-1 cursor-pointer`}
    }
`

export const ContainerButtons = styled.div`
    ${tw`gap-1 my-5 flex flex-col justify-between lg:flex-row-reverse`}

    & button {
        ${tw`lg:!w-[46%]`}
    }
`

interface TopPosition {
    top?: string
}

export const Image = styled.img<TopPosition>`
    ${tw`z-[50]`}margin-top: ${(props) => (props.top ? props.top : '')};
`

export const FormMessageSelect = styled.p`
    ${tw`font-montserrat font-normal text-sm text-alert mt-[5px]`}
`

export const FormSelect = styled(Form.Select)`
    ${tw`font-helvetica font-normal text-base text-[#425453] pl-10 border-none cursor-pointer`}
    ${tw`!absolute z-0 !left-0 !w-full !h-full bottom-0`}
`

interface FormOptionProps {
    show?: boolean
}

export const FormOption = styled.option<FormOptionProps>`
    ${tw`text-base cursor-pointer h-12.5`}
    display: ${(props) => (props.show ? 'none' : 'block')};
`

export const ContainerCheck = styled.div`
    ${tw`flex justify-between mt-8`}
`

export const CheckInputTdc = styled(CheckInput)`
    ${tw`block !w-6 !h-6 mr-3 cursor-pointer`}
`

export const TermText = styled.p`
    ${tw`text-sm font-montserrat font-medium text-[#53595A] w-[90%]`}
`

export const LinkTyC = styled.span`
    ${tw`pl-1 m-0 underline text-[var(--sub-dominant-color)] cursor-pointer`}
`
