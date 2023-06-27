/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string'

// actions
import { getDetailAction } from '../../redux/products'
import { useLocation } from 'react-router-dom'

// models
import { StoreApp } from '../../redux/store/store.interface'

export const useGetDetailForm = () => {
    const dispatch = useDispatch()
    const { search } = useLocation()

    const {
        detail,
        loading: isLoading,
        error,
    } = useSelector((store: StoreApp) => store.detailReducer)
    const { creditNumber: number, finishedNumber, typeDocumentProduct } = queryString.parse(search)

    useEffect(() => {
        if (
            typeof number === 'string' &&
            typeof typeDocumentProduct === 'string' &&
            typeof finishedNumber === 'string'
        ) {
            dispatch(
                getDetailAction({
                    typeDocument: typeDocumentProduct,
                    document: number,
                    finishedNumber,
                })
            )
        }
    }, [])

    return {
        detail,
        isLoading,
        error,
        number,
        finishedNumber,
        typeDocumentProduct,
    }
}
