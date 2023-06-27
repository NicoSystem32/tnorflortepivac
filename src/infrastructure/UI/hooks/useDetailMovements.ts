/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string'

import { getMovementsAction, getMovementsDetailAction } from '../../redux/products'
import { movementsDetailsSelector } from '../../selectors/products'

export const useDetailMovements = () => {
    const { search } = useLocation()
    const dispatch = useDispatch()

    const { creditNumber: number, finishedNumber, typeDocumentProduct } = queryString.parse(search)

    const {
        movementLoading,
        movementsData,
        movementsError,
        detailLoading,
        detailData,
        detailError,
    } = useSelector(movementsDetailsSelector)

    useEffect(() => {
        if (
            typeof number === 'string' &&
            typeof typeDocumentProduct === 'string' &&
            typeof finishedNumber === 'string'
        ) {
            dispatch(
                getMovementsAction({
                    typeDocument: typeDocumentProduct,
                    document: number,
                    finishedNumber,
                })
            )

            dispatch(
                getMovementsDetailAction({
                    typeDocument: typeDocumentProduct,
                    document: number,
                    finishedNumber,
                })
            )
        }
    }, [])

    return {
        movementsData,
        movementLoading,
        movementsError,
        detailData,
        detailLoading,
        detailError,
    }
}
