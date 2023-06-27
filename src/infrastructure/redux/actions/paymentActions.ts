import { types } from '../types/paymentType'

export const updatePayments = (products: any) => {
    let totalAux = '0'
    for (const item of products) {
        totalAux = (parseFloat(totalAux) + parseFloat(item.value)).toString()
    }
    return {
        type: types.update_payment,
        payload: {
            products,
            totalAux,
        },
    }
}
export const cleanPayments = () => {
    return {
        type: types.clean_payment,
    }
}
