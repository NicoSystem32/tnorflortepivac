export function arrayRemove(arr: any, value: any) {
    return arr.filter(function (ele: any) {
        return ele.number != value
    })
}

export function arrayRemoveEsp(arr: any, value: any, finish: any) {
    return arr.filter(function (ele: any) {
        return !(ele.number == value && ele.finishedNumber == finish)
    })
}

export function difference(date1: any, date2: any): number {
    const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
    const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())
    const day = 1000 * 60 * 60 * 24
    return (date2utc - date1utc) / day
}

export function differenceToday(date: any): boolean {
    const dateToday = new Date()
    const dateTodayString =
        dateToday.getFullYear() + '-' + dateToday.getMonth() + '-' + dateToday.getDate()
    if (Date.parse(date) < Date.parse(dateTodayString)) {
        return true
    } else {
        return false
    }
}

export function formatDate(value: string): string {
    const date = new Date(value)
    const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ]
    return date.getDate() + ' de ' + months[date.getMonth()]
}
export function formatDateText(value: string): string {
    const date = new Date(value)
    const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ]
    return date.getDate() + ' de ' + months[date.getMonth()] + ' del ' + date.getFullYear()
}

export function formatDateComplete(value: string): string {
    const date = new Date(value)
    const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ]
    return date.getDate() + ' de ' + months[date.getMonth()] + ' ' + date.getFullYear()
}

export function formatValue(value: any, type: any): string {
    let valueChar = String(value)
    let valueReturn = valueChar
    if (valueChar.includes('.') && type == 1) {
        valueChar = valueChar.split('.')[0]
    }
    if (
        (valueChar.includes('.') || valueChar.includes('´') || valueChar.includes(',')) &&
        type === 2
    ) {
        valueChar = valueChar.replaceAll('.', '')
        valueChar = valueChar.replace('´', '')
        valueChar = valueChar.split(',')[0]
    } else {
        valueChar = valueChar.toString()
    }
    if (valueChar.substring(0, 1) === '-') {
        valueChar = valueChar.substring(1, valueChar.length)
    }
    if (valueChar.length < 7) {
        const last = valueChar.length
        valueReturn = valueChar.substring(0, last - 3) + '.' + valueChar.substring(last - 3, last)
    }
    if (valueChar.length < 4) {
        valueReturn = valueChar.toString()
    }
    if (valueChar.length === 7) {
        valueReturn =
            valueChar.substring(0, 1) +
            '´' +
            valueChar.substring(1, 4) +
            '.' +
            valueChar.substring(4, 7)
    }
    if (valueChar.length === 8) {
        valueReturn =
            valueChar.substring(0, 2) +
            '´' +
            valueChar.substring(2, 5) +
            '.' +
            valueChar.substring(5, 8)
    }
    if (valueChar.length === 9) {
        valueReturn =
            valueChar.substring(0, 3) +
            '´' +
            valueChar.substring(3, 6) +
            '.' +
            valueChar.substring(6, 9)
    }
    if (valueChar.length === 10) {
        valueReturn =
            valueChar.substring(0, 1) +
            '´' +
            valueChar.substring(1, 4) +
            '.' +
            valueChar.substring(4, 7) +
            '.' +
            valueChar.substring(7, 10)
    }
    if (valueChar.length === 11) {
        valueReturn =
            valueChar.substring(0, 2) +
            '´' +
            valueChar.substring(2, 5) +
            '.' +
            valueChar.substring(5, 8) +
            '.' +
            valueChar.substring(8, 11)
    }
    if (valueChar.length === 12) {
        valueReturn =
            valueChar.substring(0, 3) +
            '´' +
            valueChar.substring(3, 6) +
            '.' +
            valueChar.substring(6, 9) +
            '.' +
            valueChar.substring(9, 12)
    }
    return valueReturn
}

export function formatValueDecimal(value: any): string {
    let valueChar = String(value)
    if (valueChar.includes('.')) {
        valueChar = valueChar.split('.')[1]
    } else {
        valueChar = '00'
    }
    return valueChar
}

export function formatDecimalValue(value: any, type: any): string {
    let valueChar = String(value)
    let decimal = ''
    if (valueChar.includes('.') && type == 1) {
        decimal = valueChar.split('.')[1]
        valueChar = valueChar.split('.')[0]
    }
    if (
        (valueChar.includes('.') || valueChar.includes('´') || valueChar.includes(',')) &&
        type == 2
    ) {
        valueChar = valueChar.replaceAll('.', '')
        valueChar = valueChar.replace('´', '')
        decimal = valueChar.split(',')[1]
    }
    if (decimal != '') {
        return '.' + decimal.substring(0, 2)
    } else {
        return '.00'
    }
}

export const validateDateSavingsGroup = (date: any): boolean => {
    const dateReceived = new Date(date)
    const dateNow = new Date()
    const time_difference = difference(dateNow, dateReceived)

    if (time_difference < 6) {
        return true
    } else {
        return false
    }
}

export const validNumber = (inputChanged: string): boolean => {
    const numbers = '0123456789'
    let notNumber = 1

    for (let i = 0; i < inputChanged.length; i++) {
        if (numbers.indexOf(inputChanged.charAt(i), 0) !== -1) {
            notNumber = 0
        }
    }
    if (notNumber === 1) return false
    else return true
}

export const validUpper = (inputChanged: string): boolean => {
    let notUpper = 1
    const uppers = 'ABCDEFGHYJKLMNÑOPQRSTUVWXYZ'
    for (let i = 0; i < inputChanged.length; i++) {
        if (uppers.indexOf(inputChanged.charAt(i), 0) !== -1) {
            notUpper = 0
        }
    }
    if (notUpper === 1) return false
    else return true
}

export function formatDateES(value: string): string {
    const date = new Date(value)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const getNameCreditCard = (cardName: string): string => {
    const cardNames = ['Signature', 'Classic', 'Platinum', 'Gold', 'Platino']
    const newCardName = cardNames.find((name) =>
        cardName.toLowerCase().includes(name.toLowerCase())
    )
    return newCardName ? newCardName : cardNames[0]
}

export function formatValueNegative(value: any): number {
    let valueChar = String(value)
    if (valueChar.includes('-')) {
        valueChar = valueChar.split('-')[1]
    }
    return parseFloat(valueChar)
}
