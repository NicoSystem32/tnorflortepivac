import React from 'react'
import { FormProps as FormPropsBS } from 'react-bootstrap/Form'

// styled components
import { StyledForm } from './form-styles'

export type FormProps = Omit<FormPropsBS, 'as'>

const Form = (props: FormProps): React.ReactElement => {
    return <StyledForm as="form" {...props} />
}

export default Form
