import tw, { styled } from 'twin.macro'
import { Form } from 'react-bootstrap'

import { FormLabel as FormLabelApp, FormGroup as FormGroupApp } from '../../components/includes'

export const CtrPorfolioPurchaseCreditCard = styled.section`
    ${tw`mt-20 py-[15px] px-0`}
    ${tw`lg:pt-5 lg:pb-10 lg:px-0 lg:min-h-[600px]`}
`

export const TitleStep = styled.h4`
    ${tw`font-helvetica font-normal block text-dominant-dark text-base my-3`}
`

export const ParagraphStep = styled.p`
    ${tw`font-helvetica font-normal block text-black text-base my-3`}
`

export const SpaceStep = styled.div`
    ${tw`w-full h-1.5`}
`

export interface FormLabelProps {
    $colorMode?: 'light' | 'dark'
}

export const FormLabel = styled(FormLabelApp)<FormLabelProps>`
    ${tw`font-helvetica font-normal block text-dominant-dark text-sm my-3`}

    ${({ $colorMode }) => ($colorMode === 'dark' ? tw`text-black` : tw`text-dominant-dark`)}
`

export interface FormGroupProps {
    $heightSize?: string
}

export const FormGroup = styled(FormGroupApp)<FormGroupProps>`
    ${tw`p-0 my-2`}

    height: ${(props) => props.$heightSize};
`

export interface TopPosition {
    top?: string
}

export const Image = styled.img<TopPosition>`
    ${tw`z-[50]`}
    margin-top: ${(props) => (props.top ? props.top : '')};
`

export const FormMessageSelect = styled.p`
    ${tw`font-montserrat font-normal text-sm text-alert mt-[5px] mb-0`}
    ${tw`absolute bottom-0`}
`

export const FormSelect = styled(Form.Select)`
    ${tw`font-helvetica font-normal text-base text-[#425453] pl-10 border-none cursor-pointer`}
    ${tw`!absolute z-0 !left-0 !w-full !h-full bottom-0`}

    &:disabled {
        ${tw`bg-transparent`}
    }
`

export interface FormOptionProps {
    show?: boolean
}

export const FormOption = styled.option<FormOptionProps>`
    ${tw`text-base cursor-pointer h-12.5`}
    display: ${(props) => (props.show ? 'none' : 'block')};
`
