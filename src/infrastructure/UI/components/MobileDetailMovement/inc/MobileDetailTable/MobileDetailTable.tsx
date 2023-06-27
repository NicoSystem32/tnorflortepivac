import { useState } from 'react'

// models
import { MovementDetail } from '../../../../../../domain/models'

// components
import { MobileDetailCredit, MobileDetailSaving, MobileDetailScheduled } from '..'

interface MobileDetailTableProps {
    loading: boolean
    detail: MovementDetail[]
    flow: 'saving' | 'credit' | 'scheduledSavings'
}

const MobileDetailTable: React.FC<MobileDetailTableProps> = ({
    loading,
    detail,
    flow,
}): JSX.Element => {
    const [countPage, setCountPage] = useState(1)

    const addCount = (): void => {
        if (countPage < detail.length && countPage > 0) {
            setCountPage(countPage + 1)
        }
    }

    const removeCount = (): void => {
        if (countPage > 1 && countPage <= detail.length) {
            setCountPage(countPage - 1)
        }
    }

    return (
        <>
            {!loading ? (
                detail.length ? (
                    <>
                        {/* Flow Credit */}
                        {flow === 'credit' && (
                            <MobileDetailCredit
                                detail={detail}
                                countPage={countPage}
                                addCount={addCount}
                                removeCount={removeCount}
                                setCountPage={setCountPage}
                            />
                        )}

                        {/* Flow Saving */}
                        {flow === 'saving' && (
                            <MobileDetailSaving detail={detail} countPage={countPage} />
                        )}

                        {/* Flow scheduledSavings */}
                        {flow === 'scheduledSavings' && (
                            <MobileDetailScheduled detail={detail} countPage={countPage} />
                        )}
                    </>
                ) : (
                    <p>Sin data</p>
                )
            ) : (
                <p>Cargando...</p>
            )}
        </>
    )
}

export default MobileDetailTable
