import { Button } from '..'
import { ButtonsContent } from './buttonsMovementDetail-styles'

interface ButtonsMovementDetailProps {
    handleOpenDetails: () => void
    handleOpenMovements: () => void
    showDetailMovement: {
        detail: boolean
        movement: boolean
    }
}

const ButtonsMovementDetail: React.FC<ButtonsMovementDetailProps> = ({
    handleOpenDetails,
    handleOpenMovements,
    showDetailMovement,
}): JSX.Element => {
    return (
        <ButtonsContent
            btnOneActive={showDetailMovement.detail}
            btnTwoActive={showDetailMovement.movement}
        >
            <Button variant="sub-dominant" extend onClick={handleOpenDetails}>
                {!showDetailMovement.detail ? 'Ver detalles' : 'Volver'}
            </Button>
            <Button variant="sub-dominant" extend onClick={handleOpenMovements}>
                {!showDetailMovement.movement ? 'Ver movimientos' : 'Volver'}
            </Button>
        </ButtonsContent>
    )
}

export default ButtonsMovementDetail
