import type { ButtonProps as ButtonPropsBS } from 'react-bootstrap/Button'
import cn from 'classnames'
import { LoadingEllipsis, EllipsisItem } from './../Loading/loading-styles'

import { StyledButton } from './button-styles'

export interface ButtonProps extends Omit<ButtonPropsBS, 'variant'> {
    variant?: 'dominant' | 'sub-dominant' | 'outline-cancel' | ButtonPropsBS['variant']
    extend?: boolean
    isLoading?: boolean
}

const Button = ({ children, className, extend, isLoading, ...props }: ButtonProps): JSX.Element => {
    const classnames = cn(className, { extend: !!extend, 'is-loading': !!isLoading })

    return (
        <StyledButton className={classnames} {...props}>
            {children}
            {isLoading && (
                <LoadingEllipsis>
                    <EllipsisItem />
                    <EllipsisItem />
                    <EllipsisItem />
                    <EllipsisItem />
                </LoadingEllipsis>
            )}
        </StyledButton>
    )
}

export default Button
