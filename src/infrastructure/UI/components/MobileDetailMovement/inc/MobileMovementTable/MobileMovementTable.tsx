import { useState } from 'react'
import { Pagination as PaginationBootstrap } from 'react-bootstrap'

// components
import { Movement } from '../../../../../../domain/models'
import { formatDateComplete, formatValue } from '../../../GlobalFuntions/globalFunction'
import { Pagination } from '../../..'

// styles
import {
    MobileTableTitles,
    MobileTableOption,
    MobileTableRow,
    MobileTableTd,
} from './mobileMovementTable-styles'

interface MobileMovementTableProps {
    loading: boolean
    movements: Movement[]
}

const MobileMovementTable: React.FC<MobileMovementTableProps> = ({
    loading,
    movements,
}): JSX.Element => {
    const [countPage, setCountPage] = useState(1)

    const addCount = (): void => {
        if (countPage < 2 && countPage > 0) {
            setCountPage(countPage + 1)
        }
    }

    const removeCount = (): void => {
        if (countPage > 1 && countPage <= 2) {
            setCountPage(countPage - 1)
        }
    }

    return (
        <>
            <MobileTableTitles>
                <MobileTableOption>
                    {countPage === 1 && <p>Concepto</p>}
                    {countPage === 2 && <p>Medio de pago</p>}
                </MobileTableOption>
                <MobileTableOption>
                    {countPage === 1 && <p>Fecha</p>}
                    {countPage === 2 && <p>Comprobante</p>}
                </MobileTableOption>
            </MobileTableTitles>

            {!loading ? (
                movements.length > 0 ? (
                    <>
                        {movements.slice(0, 4).map((card) => (
                            <MobileTableRow
                                key={`${card.voucherMovement}-${card.dateMovement}-${card.valueMovement}`}
                            >
                                <MobileTableTd>
                                    {countPage === 1 && (
                                        <>
                                            <p className="concept">{card.classMovement}</p>
                                            <span>$ {formatValue(card.valueMovement, 1)}</span>
                                        </>
                                    )}
                                    {countPage === 2 && <p>{card.officeMovement}</p>}
                                </MobileTableTd>
                                <MobileTableTd>
                                    {countPage === 1 && (
                                        <p>{formatDateComplete(card.dateMovement.toString())}</p>
                                    )}
                                    {countPage === 2 && <p>{card.voucherMovement}</p>}
                                </MobileTableTd>
                            </MobileTableRow>
                        ))}
                        <Pagination onNext={addCount} onPrev={removeCount}>
                            <PaginationBootstrap.Item
                                onClick={() => {
                                    setCountPage(1)
                                }}
                                active={countPage === 1}
                            >
                                {1}
                            </PaginationBootstrap.Item>
                            <PaginationBootstrap.Item
                                onClick={() => {
                                    setCountPage(2)
                                }}
                                active={countPage === 2}
                            >
                                {2}
                            </PaginationBootstrap.Item>
                        </Pagination>
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

export default MobileMovementTable
