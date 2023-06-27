// custom hooks
import { useStateCtx } from '../../../../hooks'
import { ManageContext, ManageStateTypes } from '../context'

export const useManage = (): [
    ManageStateTypes,
    React.Dispatch<React.SetStateAction<ManageStateTypes>>
] => useStateCtx(ManageContext)
