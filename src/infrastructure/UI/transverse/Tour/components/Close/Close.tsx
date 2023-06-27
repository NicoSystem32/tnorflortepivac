import React from 'react'
import { components } from '@reactour/tour'

// styled components
import { CloseButton } from './close-styles'

type CloseProps = React.ComponentProps<typeof components.Close>

const Close = ({ onClick, disabled }: CloseProps): React.ReactElement => {
    return (
        <CloseButton variant="link" onClick={onClick} disabled={disabled}>
            Saltar tutorial
        </CloseButton>
    )
}

export default Close
