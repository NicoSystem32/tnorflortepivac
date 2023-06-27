/**
 * Determines if an object is inside an array
 *
 * @param {Array} arrayProducts
 * @param {string | (string | null)[] | null} index
 *
 * @return {boolean} reduced array
 */
export const validateIsInto = (
    arrayProducts: Record<string, string | number>[],
    index: string | (string | null)[] | null,
    finish?: string | (string | null)[] | null
): boolean => {
    let isInto
    if (arrayProducts) {
        for (const product of arrayProducts) {
            if (
                (finish && product.finishedNumber === finish && product.number === index) ||
                (!finish && product.number === index)
            ) {
                isInto = true
            }
        }
    }
    return isInto ?? false
}

/**
 * Enable the keyboard only to write numeric
 * digits and the delete option
 *
 * @param {React.KeyboardEvent<HTMLInputElement>} event
 *
 * @return {boolean} reduced array
 */
export const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): boolean => {
    if (event.charCode === 8) {
        return true
    } else if (event.charCode >= 48 && event.charCode <= 57) {
        return true
    } else {
        event.preventDefault()
        return false
    }
}
