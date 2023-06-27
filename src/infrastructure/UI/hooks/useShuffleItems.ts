import { useState } from 'react'

import { shuffleArray } from '../utils/misc'

/**
 * shuffle array items
 *
 * @param {Array} initialArr
 * @return [shuffled, setShuffled]
 */
const useShuffleItems = <T>(initialArr: T[]): [T[], () => void] => {
    const [shuffled, _setShuffled] = useState(shuffleArray(initialArr))

    const setShuffled = (): void => {
        _setShuffled(shuffleArray(initialArr))
    }

    return [shuffled, setShuffled]
}

export default useShuffleItems
