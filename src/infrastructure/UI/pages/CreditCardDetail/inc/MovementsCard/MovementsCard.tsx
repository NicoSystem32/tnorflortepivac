import { ChangeEvent, Fragment, useRef, useState } from 'react'
import {
    ContentTable,
    ContentTableMobile,
    FormSelect,
    MessageBlock,
    MessageNotMovements,
    MovementsCardContainer,
    MovementsHead,
    TableContainer,
    TBody,
    THead,
} from './movementsCard-styles'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CreditCardSelector } from '../../../../../selectors'
import { CardStates, MovementCard } from '../../../../../../domain/models'
import {
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'
import { IconReported } from '../../../../utils/getIcons'
import { StoreApp } from '../../../../../redux/store/store.interface'
import useQueryId from '../../../../hooks/useQueryId'

const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
]
export function formatDateCreditCard(value: string): string {
    const date = new Date(value)
    return months[date.getMonth()] + ' ' + date.getDate()
}

const MovementsCard = (): JSX.Element => {
    const history = useHistory()
    const { id } = useQueryId()
    const { cardData: infoCard, movements } = useSelector((store: StoreApp) =>
        CreditCardSelector(store, String(id))
    )
    const [monthFilter, setMonthFilter] = useState('0')
    const [yearFilter, setYearFilter] = useState('0')
    const month = useRef(0)
    const monthHeader = (m: number): string => {
        month.current = m
        return months[m - 1]
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        month.current = 0
        setMonthFilter(e.target.value)
    }
    const handleChange2 = (e: ChangeEvent<HTMLInputElement>): void => {
        month.current = 0
        setYearFilter(e.target.value)
        setMonthFilter('0')
    }

    const ListMonths = (): string[] => {
        return YearFilter().reduce((a: string[], mov) => {
            if (!a.includes(mov.dateMovement.substring(4, 6))) {
                return [...a, mov.dateMovement.substring(4, 6)]
            }
            return [...a]
        }, [])
    }
    const ListYears = (): string[] =>
        movements.reduce((a: string[], mov) => {
            if (!a.includes(mov.dateMovement.substring(0, 4))) {
                return [...a, mov.dateMovement.substring(0, 4)]
            }
            return [...a]
        }, [])

    const YearFilter = (): MovementCard[] => {
        if (yearFilter === '0') {
            return movements
        }
        return movements.filter((movement) =>
            yearFilter === movement.dateMovement.substring(0, 4) ? true : false
        )
    }

    const MountsFilter = (yearMovements: MovementCard[]): MovementCard[] => {
        if (monthFilter === '0') {
            return yearMovements
        }
        return yearMovements.filter((ele) =>
            monthFilter === ele.dateMovement.substring(4, 6) ? true : false
        )
    }

    const ListFilter = (): MovementCard[] => MountsFilter(YearFilter())

    if (infoCard && infoCard.lockType === CardStates.BLOQUEO_PERDIDA_O_HURTO) {
        return (
            <MovementsCardContainer>
                <MessageBlock>
                    <picture>
                        <img src={IconReported} alt="" />
                    </picture>
                    <div>
                        <h3>Reportaste esta tarjeta como perdida o robada</h3>
                        <p>
                            Recibimos tu solicitud de bloqueo, por seguridad migraremos todos tus
                            datos a una nueva tarjeta que podrás consultar desde la{' '}
                            <a href=" " onClick={() => history.push('./home-wallet')}>
                                pantalla de inicio
                            </a>
                            .
                        </p>
                    </div>
                </MessageBlock>
            </MovementsCardContainer>
        )
    }

    if (
        infoCard &&
        infoCard.lockType !== CardStates.BLOQUEO_PERDIDA_O_HURTO &&
        movements.length === 0
    ) {
        return (
            <MovementsCardContainer>
                <MessageNotMovements>No tienes movimientos</MessageNotMovements>
            </MovementsCardContainer>
        )
    }

    return (
        <MovementsCardContainer>
            {infoCard?.movementsCard && (
                <>
                    <MovementsHead>
                        <h3>Tus movimientos y transacciones de los últimos 6 meses</h3>
                        <FormSelect value={monthFilter} onChange={handleChange}>
                            <option value="0">Mes</option>
                            {ListMonths().map((m: string) => (
                                <option value={m} key={`${m}-months`}>
                                    {months[parseInt(m) - 1]}
                                </option>
                            ))}
                        </FormSelect>
                        <FormSelect value={yearFilter} onChange={handleChange2}>
                            <option value="0">Año</option>
                            {ListYears().map((year) => (
                                <option value={year} key={`${year}-year`}>
                                    {year}
                                </option>
                            ))}
                        </FormSelect>
                    </MovementsHead>
                    <div>
                        <TableContainer>
                            <THead>
                                <tr>
                                    <td>Fecha</td>
                                    <td>Descripción</td>
                                    <td>Monto</td>
                                </tr>
                            </THead>
                            <TBody>
                                {ListFilter().map((movement: MovementCard) => (
                                    <Fragment
                                        key={`${movement.dateMovement}-${movement.description}-${movement.amount}`}
                                    >
                                        {month.current !==
                                            parseInt(movement.dateMovement.substring(4, 6)) && (
                                            <>
                                                <ContentTable className="head-month">
                                                    <td colSpan={3}>
                                                        <p>
                                                            {monthHeader(
                                                                parseInt(
                                                                    movement.dateMovement.substring(
                                                                        4,
                                                                        6
                                                                    )
                                                                )
                                                            )}
                                                        </p>
                                                    </td>
                                                </ContentTable>
                                                <ContentTableMobile className="head-month">
                                                    <td colSpan={2}>
                                                        <p>
                                                            {monthHeader(
                                                                parseInt(
                                                                    movement.dateMovement.substring(
                                                                        4,
                                                                        6
                                                                    )
                                                                )
                                                            )}
                                                        </p>
                                                    </td>
                                                </ContentTableMobile>
                                            </>
                                        )}
                                        <ContentTable>
                                            <td>
                                                <p>
                                                    {
                                                        months[
                                                            parseInt(
                                                                movement.dateMovement.substring(
                                                                    4,
                                                                    6
                                                                )
                                                            ) - 1
                                                        ]
                                                    }{' '}
                                                    {movement.dateMovement.substring(6, 8)}
                                                </p>
                                            </td>
                                            <td>
                                                <p>{movement.description}</p>
                                                {movement.establishment && (
                                                    <h4>{movement.establishment}</h4>
                                                )}
                                            </td>
                                            <td>
                                                <p>
                                                    ${' '}
                                                    {formatValue(
                                                        parseFloat(movement.amount) / 100,
                                                        1
                                                    )}
                                                    <sup>
                                                        {formatDecimalValue(
                                                            parseFloat(movement.amount) / 100,
                                                            1
                                                        )}
                                                    </sup>
                                                </p>
                                            </td>
                                        </ContentTable>
                                        <ContentTableMobile>
                                            <td>
                                                <h5>
                                                    {
                                                        months[
                                                            parseInt(
                                                                movement.dateMovement.substring(
                                                                    4,
                                                                    6
                                                                )
                                                            ) - 1
                                                        ]
                                                    }{' '}
                                                    {movement.dateMovement.substring(6, 8)}
                                                </h5>
                                                <p>{movement.description.toLowerCase()}</p>
                                                {movement.establishment && (
                                                    <h4>{movement.establishment}</h4>
                                                )}
                                            </td>
                                            <td>
                                                <p>
                                                    ${' '}
                                                    {formatValue(
                                                        parseFloat(movement.amount) / 100,
                                                        1
                                                    )}
                                                    <sup>
                                                        {formatDecimalValue(
                                                            parseFloat(movement.amount) / 100,
                                                            1
                                                        )}
                                                    </sup>
                                                </p>
                                            </td>
                                        </ContentTableMobile>
                                    </Fragment>
                                ))}
                            </TBody>
                        </TableContainer>
                    </div>
                </>
            )}
        </MovementsCardContainer>
    )
}
export default MovementsCard
