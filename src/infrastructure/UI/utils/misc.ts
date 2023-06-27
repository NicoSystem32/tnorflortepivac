/**
 * shuffles an array values
 *
 * @param {Array} arr
 *
 * @return {Array} shuffled array
 */
export const shuffleArray = <T>(arr: T[]): T[] => {
    const shuffled = Array.from(arr)
    const crypto = window.crypto
    for (let i = arr.length - 1; i > 0; i--) {
        const randomNumber = crypto.getRandomValues(new Uint32Array(1)).toString().slice(4, 5)
        const j = parseInt(randomNumber) //random index
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // swap
    }
    return shuffled
}
/**
 * return a string random
 *
 * @param {number} max
 *
 * @return {string} return string
 */
export const getRandom = (max: number): string => {
    const crypto = window.crypto
    return crypto.getRandomValues(new Uint32Array(1)).toString().slice(0, max)
}

/**
 * reduces an array and join up its items
 * according to a number and delimiter
 *
 * @param {Array} arr
 * @param {number} every
 * @param {string} delimiter
 *
 * @return {Array} reduced array
 */
export const reduceByCountNDelimiter = <T>(
    arr: T[],
    every: number,
    delimiter?: string
): string[] => {
    return arr.reduce<string[]>((acc, cur, idx) => {
        if (idx * every < arr.length) {
            acc.push(arr.slice(idx * every, idx * every + every).join(delimiter))
        }
        return acc
    }, [])
}

/**
 * calculate percentage based on base number
 *
 * @param {number} base
 * @param {number} from
 *
 * @return {number} calculated percentage - in base 100
 */
export const calPercentage = (base: number, from: number): number => (100 * from) / base

/**
 * makes an smooth scroll to element
 *
 * @param {HTMLElement} elem
 * @param {ScrollIntoViewOptions & object} options
 *
 * @returns Promise
 */
export const smoothScrollToElem = (
    elem: HTMLElement | null,
    {
        offset,
        ...options
    }: ScrollIntoViewOptions & {
        offset?: number
    }
): Promise<null> => {
    return new Promise((resolve) => {
        if (!(elem instanceof Element)) {
            throw new TypeError('Argument 1 must be an Element')
        }

        let same = 0
        let lastPos: undefined | null | number = null
        const scrollOptions: ScrollIntoViewOptions = { behavior: 'smooth', ...options }

        const check = (): void => {
            const newPos = elem.getBoundingClientRect().top

            if (newPos === lastPos) {
                if (same++ > 2) {
                    return resolve(null)
                }
            } else {
                same = 0
                lastPos = newPos
            }
            requestAnimationFrame(check)
        }

        elem.scrollIntoView(scrollOptions)
        if (offset) window.scroll(0, elem.offsetTop - offset)
        requestAnimationFrame(check)
    })
}

/**
 * slice time in an array
 *
 * @param time time in milliseconds
 * @returns [hours, minutes, seconds]
 */
export const getSliceTime = (time: number): [number, number, number] => {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((time % (1000 * 60)) / 1000)

    return [hours, minutes, seconds]
}

/**
 * convert a blob file to base64
 *
 * @param {Blob} file
 * @returns Promise<string>
 */
export const getBase64 = (file: Blob): Promise<string | ArrayBuffer | null> => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise((resolve, reject) => {
        reader.onload = () => {
            resolve(reader.result)
        }

        reader.onerror = () => {
            reject(reader.error)
        }
    })
}

/**
 * convert string 'false' or 'true' to boolean
 *
 * @param {'false' | 'true'} boolString
 * @returns {boolean} boolean
 */
export const parseStringToBoolean = (boolString: 'false' | 'true'): boolean => {
    if (boolString === 'true') return true
    return false
}

/**
 * Encodes a string of characters
 *
 * @param {string} keyToEncrypt
 * @returns {string} keyEncrypted
 */
export const encryptKey = (keyToEncrypt: string): string => {
    const now = new Date().toLocaleDateString()
    const valueComplete = now + '-' + keyToEncrypt + '' + getRandom(4)
    return btoa(valueComplete)
}

/**
 * Decodes an encrypted character string
 *
 * @param {string} keyEncrypted
 * @returns {string} keyDecrypted
 */
export const decryptKey = (keyEncrypted: string): string => {
    const valueString = atob(keyEncrypted).split('-')[1]
    return valueString.slice(0, valueString.length - 4)
}

/**
 * dispatch an element's specify event
 *
 * @param {Element} elem
 * @param {string} eventType
 */
export const dispatchEventType = (
    elem: Element | null,
    eventType: string,
    opts?: EventInit
): void => {
    const event = new Event(eventType, opts)
    elem?.dispatchEvent(event)
}
