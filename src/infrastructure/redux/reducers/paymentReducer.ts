import { types } from '../types/paymentType'

const initialState = {
    products: [],
    total: 0,
}
export const paymentsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.update_payment:
            return {
                ...state,
                products: action.payload.products,
                total: action.payload.totalAux,
            }
        case types.clean_payment:
            return {
                ...initialState,
            }
        default:
            return state
    }
}
