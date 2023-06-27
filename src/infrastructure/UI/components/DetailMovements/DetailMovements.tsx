import { useState } from 'react'

// components
import { DetailData, MovementTable } from './inc'

// hooks
import { useDetailMovements } from '../../hooks'

// Styles
import { DetailMovementContent, Options, OptionText, Option } from './detailMovements-styles'

interface DetailMovementsProps {
    titles?: [string?, string?]
    flow: 'credit' | 'saving' | 'scheduledSavings'
}

const DetailMovements: React.FC<DetailMovementsProps> = ({
    titles = ['Movimientos', 'Detalles'],
    flow,
}): JSX.Element => {
    const [isActive, setIsActive] = useState(true)
    const [movements, detail] = titles

    const handleSelect = (): void => {
        setIsActive(!isActive)
    }

    const { movementsData, movementLoading, detailData, detailLoading } = useDetailMovements()

    return (
        <DetailMovementContent>
            <Options>
                <Option isActive={isActive} onClick={handleSelect}>
                    <OptionText isActive={isActive}>{movements}</OptionText>
                </Option>
                <Option isActive={!isActive} onClick={handleSelect}>
                    <OptionText isActive={!isActive}>{detail}</OptionText>
                </Option>
            </Options>
            {isActive ? (
                <MovementTable
                    optionsHead={['Concepto', 'Fecha', 'Oficina', 'Comprobante']}
                    movements={movementsData}
                    Loading={movementLoading}
                />
            ) : (
                <DetailData flow={flow} loading={detailLoading} details={detailData} />
            )}
        </DetailMovementContent>
    )
}

export default DetailMovements
