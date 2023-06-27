import tw, { styled } from 'twin.macro'
import { Form } from 'react-bootstrap'

import { InputGroup as InputGroupApp } from '../../../../components/includes'

export const FirstStepWrapper = styled.section`
    ${tw`flex justify-center items-center py-2`}
`

export const FirstStepContent = styled.div`
    ${tw`p-5 lg:px-10 w-full max-w-[550px] lg:max-w-[924px] rounded-[10px] shadow-[0px 3px 6px #00000029]`}
`

export const InputGroupCheck = styled(InputGroupApp)`
    ${tw`flex flex-col lg:flex-row lg:items-center lg:justify-start mb-6`}
`

export const FormCheck = styled(Form.Check)`
    ${tw`w-2/5 flex items-center mb-3 lg:mb-0`}

    .form-check-input {
        ${tw`!w-6 !h-6 mr-3 cursor-pointer`}
    }

    .form-check-label {
        ${tw`!p-0 mt-1 cursor-pointer`}
    }
`

export interface ActiveAddCreditCardBtn {
    active: boolean
}

export const AddCreditCardBtn = styled.div<ActiveAddCreditCardBtn>`
    ${tw`flex flex-row justify-center items-center p-2.5 my-3 cursor-pointer`}
    ${tw`border-2 border-dashed border-[#C6CCCE] bg-[#FAFBFD] rounded-[4px]`}
    ${tw`lg:my-10`}
    ${({ active }) => (active ? tw`opacity-100` : tw`opacity-40`)}

    & h4 {
        ${tw`font-montserrat`}
    }
`

export const ImageAdd = styled.img`
    ${tw`mr-4`}
`

export const FieldCtr = styled.div`
    ${tw`my-5 w-full lg:w-1/4`}
`

export const BankCardList = styled.div`
    ${tw`flex flex-col gap-1.5 my-5 lg:my-10`}
`
