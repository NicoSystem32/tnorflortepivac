// models
import { MovementDetail } from '../../../../../../domain/models'

// components
import { DetailSaving, DetailCredit, DetailScheduledSaving } from '..'

// styles
import { DetailContent } from './detailData-styles'

interface DetailDataProps {
    flow: 'credit' | 'saving' | 'scheduledSavings'
    loading: boolean
    details: MovementDetail[]
}

const DetailData: React.FC<DetailDataProps> = ({ flow, loading, details }): JSX.Element => {
    const [detail] = details
    return (
        <DetailContent>
            {!loading ? (
                <>
                    {flow === 'saving' &&
                        (detail ? <DetailSaving detail={detail} /> : <p>Sin data</p>)}

                    {flow === 'scheduledSavings' &&
                        (detail ? <DetailScheduledSaving detail={detail} /> : <p>Sin data</p>)}

                    {flow === 'credit' &&
                        (details.length > 0 ? <DetailCredit details={details} /> : <p>Sin data</p>)}
                </>
            ) : (
                'Cargando...'
            )}
        </DetailContent>
    )
}
export default DetailData
