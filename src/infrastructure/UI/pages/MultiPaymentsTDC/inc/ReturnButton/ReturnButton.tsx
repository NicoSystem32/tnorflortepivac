import { ReactElement } from 'react'

// styles
import { ReturnButton as ReturnCtr } from './returnButton-styles'

// icons
import { ArrowCircleSVG } from '../../../../utils/getIcons'

export type ReturnButtonProps = {
    onClick: () => void
}

const ReturnButton = ({ onClick }: ReturnButtonProps): ReactElement => {
    return (
        <ReturnCtr onClick={onClick} data-tour="prev_fai_step">
            <img src={ArrowCircleSVG} alt="volver" className="return-img" />
            <p>Volver</p>
        </ReturnCtr>
    )
}

export default ReturnButton
