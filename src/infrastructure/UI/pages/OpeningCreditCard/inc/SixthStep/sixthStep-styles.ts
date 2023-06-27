import tw, { styled } from 'twin.macro'
import { Form } from 'react-bootstrap'

import { InputGroup as InputGroupApp } from '../../../../components/includes'

export const SixthStepWrapper = styled.section`
    ${tw`flex justify-center items-center py-2`}
`

export const SixthStepContent = styled.div`
    ${tw`p-5 lg:px-10 w-full max-w-[550px] lg:max-w-[924px] rounded-[10px] shadow-[0px 3px 6px #00000029]`}
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

export const FieldsMiddleCtr = styled.div`
    ${tw`flex flex-col lg:flex-row`}

    & > div {
        ${tw`w-full lg:w-1/2`}
    }

    & > div:nth-child(2) {
        ${tw`lg:pl-10`}
    }
`
