/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useLocation } from 'react-router-dom'

const useQueryId = () => {
    const { search } = useLocation()
    const id = search.substring(4)
    return {
        id,
    }
}
export default useQueryId
