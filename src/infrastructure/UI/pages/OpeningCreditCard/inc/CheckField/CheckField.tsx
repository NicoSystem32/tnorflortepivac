import { FC, ReactElement } from 'react'
import type { FormCheckProps as FormCheckPropsBs } from 'react-bootstrap/FormCheck'

// styles
import { CheckInputTdc, ContainerCheck, LinkTyC, TermText } from './checkField-styles'

export interface CheckFieldProps extends Omit<FormCheckPropsBs, 'as'> {
    onClickLink?: () => void
    text?: string
    viewTextLink?: string
}

const CheckField: FC<CheckFieldProps> = ({
    onClickLink,
    text,
    viewTextLink,
    ...props
}): ReactElement => {
    return (
        <ContainerCheck>
            <CheckInputTdc type="checkbox" {...props} />
            <TermText>
                {text}
                <LinkTyC onClick={onClickLink}>{viewTextLink || 'Ver más.'}</LinkTyC>
            </TermText>
        </ContainerCheck>
    )
}

export default CheckField
