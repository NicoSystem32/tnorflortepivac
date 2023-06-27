import { FC, ReactElement } from 'react'

// styles
import { SaveAndExitImage, SaveAndExitP, StyledSaveAndExit } from './saveAndExit-styles'

// icons
import { MiniSaveSVG } from '../../../../utils/getIcons'

export interface SaveAndExitProps {
    onSave?: () => void
}

const SaveAndExit: FC<SaveAndExitProps> = ({ onSave }): ReactElement => {
    return (
        <StyledSaveAndExit onClick={onSave}>
            <SaveAndExitP>Guardar y Salir</SaveAndExitP>
            <SaveAndExitImage src={MiniSaveSVG} alt="save" />
        </StyledSaveAndExit>
    )
}

export default SaveAndExit
