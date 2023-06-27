import { createStateCtx } from '../../../hooks'

// types definition
export type CreditDetailStateTypes = {
    show: boolean
    showInput: boolean
    isBigger: boolean
    isDisable: boolean
    otherValue: string
    item: { kindOfStand: string; another: string }
}

const [ctx, Provider] = createStateCtx<CreditDetailStateTypes>({
    show: false,
    showInput: true,
    isBigger: false,
    isDisable: false,
    item: { kindOfStand: '', another: 'another' },
    otherValue: '',
})
export const CreditDetailContext = ctx
export const CreditDetailStateProvider = Provider
