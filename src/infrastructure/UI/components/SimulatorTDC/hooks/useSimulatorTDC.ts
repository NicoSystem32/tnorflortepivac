import { useEffect, useState, useCallback, useRef } from 'react'

// selectos
import { useSelector, settingTDCSelector } from '../../../../selectors'

type simulatorTDCArgs = {
    amount: number
    term: number
    modality?: number
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useSimulatorTDC = ({ amount, term, modality }: simulatorTDCArgs) => {
    const yieldBeforeRetention = useRef(0)
    const periodRetention = useRef(0)
    const yieldAfterRetention = useRef(0)
    const [effectiveRate, setEffectiveRate] = useState(0)
    const numberOfPayments = useRef(0)
    const netYield = useRef(0)
    const ratePeriod = useRef(0)
    const { retentionPercentage, exponentYear, exponentDay, parametersList } =
        useSelector(settingTDCSelector)

    const getRate = useCallback(
        (): number => parametersList.find((params) => params.term === term)?.rate ?? 0,
        [parametersList, term]
    )

    useEffect(() => {
        setEffectiveRate(getRate())
    }, [getRate])

    ratePeriod.current = exponentYear / (modality || term)

    yieldBeforeRetention.current =
        (Math.pow(exponentDay + effectiveRate, exponentDay / ratePeriod.current) - exponentDay) *
        amount
    periodRetention.current = (yieldBeforeRetention.current * retentionPercentage) / 100
    yieldAfterRetention.current = yieldBeforeRetention.current - periodRetention.current

    if (!isNaN(term)) numberOfPayments.current = term / (modality || term)

    if (yieldAfterRetention.current !== undefined && !isNaN(yieldAfterRetention.current)) {
        netYield.current = yieldAfterRetention.current * numberOfPayments.current
    }

    return {
        effectiveRate,
        numberOfPayments: parseFloat(numberOfPayments.current.toFixed(2)),
        netYield: parseFloat(netYield.current.toFixed(2)),
        yieldBeforeRetention: parseFloat(yieldBeforeRetention.current.toFixed(2)),
        periodRetention: parseFloat(periodRetention.current.toFixed(2)),
        yieldAfterRetention: parseFloat(yieldAfterRetention.current.toFixed(2)),
        ratePeriod: parseFloat(ratePeriod.current.toFixed(2)),
    }
}

export default useSimulatorTDC
