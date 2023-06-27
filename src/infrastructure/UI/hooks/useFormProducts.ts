/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useSelector } from 'react-redux'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import { validateIsInto, onKeyPress } from '../utils/formsUtils'

export const useFormProduct = () => {
    const { search } = useLocation()
    const { products } = useSelector((store: any) => store.products)
    const { creditNumber: number, finishedNumber: finish } = queryString.parse(search)

    return {
        validateExistence: validateIsInto(products, number, finish),
        handleKeyPress: onKeyPress,
    }
}
