import { forwardRef } from 'react'
import type { PopoverProps as PopoverPropsBS } from 'react-bootstrap/Popover'
import cn from 'classnames'

// styled components
import { StyledPopover } from './popover-styles'

export interface PopoverProps extends Omit<PopoverPropsBS, 'as'> {
    hasKeyboard?: boolean
    slim?: boolean
    noSpace?: boolean
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
    ({ children, hasKeyboard, slim, noSpace, className, ...props }, ref): JSX.Element => {
        const classnames = cn(className, {
            'has-keyboard': !!hasKeyboard,
            'is-slim': !!slim,
            'no-space': !!noSpace,
        })

        return (
            <StyledPopover ref={ref} className={classnames} {...props}>
                {children}
            </StyledPopover>
        )
    }
)

export default Popover
