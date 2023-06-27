// hooks
import { useDetailMovements } from '../../hooks'

// components
import { MobileMovementTable, MobileDetailTable } from './inc'

// Styles
import { MobileContent, MobileTableTitle, MobileTableBody } from './mobileDetailMovements-styles'

interface MobileDetailMovementsProps {
    title?: 'Movimientos' | 'Detalles'
    flow: 'saving' | 'credit' | 'scheduledSavings'
}

const MobileDetailMovements: React.FC<MobileDetailMovementsProps> = ({
    title,
    flow,
}): JSX.Element => {
    const { movementsData, movementLoading, detailData, detailLoading } = useDetailMovements()

    return (
        <MobileContent>
            <MobileTableTitle>
                <p>{title}</p>
            </MobileTableTitle>
            <MobileTableBody>
                {title?.includes('Movimientos') ? (
                    <MobileMovementTable loading={movementLoading} movements={movementsData} />
                ) : (
                    <MobileDetailTable loading={detailLoading} detail={detailData} flow={flow} />
                )}
            </MobileTableBody>
        </MobileContent>
    )
}

export default MobileDetailMovements
