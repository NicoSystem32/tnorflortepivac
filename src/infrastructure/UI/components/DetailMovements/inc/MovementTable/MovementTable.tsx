import { useState } from 'react'
import { Pagination as PaginationBs } from 'react-bootstrap'

// models
import { Movement } from '../../../../../../domain/models'

// utils
import {
    formatDateComplete,
    formatDecimalValue,
    formatValue,
} from '../../../GlobalFuntions/globalFunction'

// components
import { Pagination } from '../../../includes'

// styles
import {
    TableContainer,
    THead,
    TBody,
    ValueMovement,
    PaginatorContainer,
} from './movementTable-styles'

interface MovementTableProps {
    optionsHead: [string, string, string?, string?]
    movements: Movement[]
    Loading?: boolean
}

const MovementTable: React.FC<MovementTableProps> = ({
    optionsHead,
    movements,
    Loading,
}): JSX.Element => {
    const [movementsByPage] = useState(12)
    const [currentPage, setCurrentPage] = useState(1)

    const generateArray = (transactions: Movement[], transactionsByPage: number): number[] => {
        const pageArr: number[] = []
        const pages = Math.ceil(transactions.length / transactionsByPage)

        for (let i = 0; i < pages; i++) {
            pageArr.push(i + 1)
        }

        return pageArr
    }

    const onNext = (): void => {
        if (currentPage < Math.ceil(movements.length / movementsByPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    const onPrev = (): void => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <>
            <TableContainer>
                <THead>
                    <tr>
                        {optionsHead.map((opt) => (
                            <th key={`${opt}-option`}>
                                <h4>{opt}</h4>
                            </th>
                        ))}
                    </tr>
                </THead>
                {!Loading && (
                    <TBody>
                        {movements
                            .slice(
                                movementsByPage * (currentPage - 1),
                                movementsByPage * currentPage
                            )
                            .map((move) => (
                                <tr key={move.voucherMovement}>
                                    <td>
                                        <p>{move.classMovement}</p>
                                        <ValueMovement isDanger={move.valueMovement < 0}>
                                            $ {formatValue(move.valueMovement, 1)}
                                            <sup>{formatDecimalValue(move.valueMovement, 1)}</sup>
                                        </ValueMovement>
                                    </td>
                                    <td>
                                        <p>{formatDateComplete(move.dateMovement.toString())}</p>
                                    </td>
                                    <td>
                                        <p>{move.officeMovement}</p>
                                    </td>
                                    <td>
                                        <p>{move.voucherMovement}</p>
                                    </td>
                                </tr>
                            ))}
                    </TBody>
                )}
            </TableContainer>

            {/* Pagination */}
            {!Loading && Math.ceil(movements.length / movementsByPage) > 1 && (
                <PaginatorContainer>
                    <Pagination onPrev={onPrev} onNext={onNext}>
                        {generateArray(movements, movementsByPage).map((item) => (
                            <PaginationBs.Item
                                key={item}
                                active={item === currentPage}
                                onClick={() => {
                                    setCurrentPage(item)
                                }}
                            >
                                {item}
                            </PaginationBs.Item>
                        ))}
                    </Pagination>
                </PaginatorContainer>
            )}
        </>
    )
}

export default MovementTable
