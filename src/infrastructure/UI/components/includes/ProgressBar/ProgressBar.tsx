import { ReactElement } from 'react'
import type { ProgressBarProps as ProgressBarPropsBs } from 'react-bootstrap/ProgressBar'

import { ExpirationProgress } from './progressBar-styles'

export interface ProgressBarProps extends ProgressBarPropsBs {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [extraProps: string]: any
}

const ProgressBar: React.FC<ProgressBarProps> = ({ now, variant }): ReactElement => {
    return <ExpirationProgress now={now} variant={variant} />
}

export default ProgressBar
