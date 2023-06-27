import { CreditDetailContext, CreditDetailStateTypes } from '../context/CreditDetailState'

// custom hooks
import { useStateCtx } from '../../../hooks'

export const useCreditDetailState = (): [
    CreditDetailStateTypes,
    React.Dispatch<React.SetStateAction<CreditDetailStateTypes>>
] => useStateCtx(CreditDetailContext)
