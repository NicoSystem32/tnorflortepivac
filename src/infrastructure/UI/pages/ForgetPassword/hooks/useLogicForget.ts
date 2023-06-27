import { useRef, useState } from 'react'
// custom hooks
import { useReducerState } from '../hooks'
import { calPercentage } from '../../../utils/misc'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useLogicForget = () => {
    // initial declarations
    const dispatchStep = useReducerState()[1]
    const sampleInterval = useRef<NodeJS.Timer>()
    const startingMinutes = useRef(4)
    const startingSeconds = useRef(59)
    const [refresh, setRefresh] = useState(false)
    const [percentage, setPercentage] = useState(90)
    const [receivingKey, setReceivingKey] = useState(true)
    const [mins, setMinutes] = useState(startingMinutes.current)
    const [secs, setSeconds] = useState(startingSeconds.current)

    const controlInterval = (): NodeJS.Timer =>
        (sampleInterval.current = setInterval(() => {
            if (secs > 0) {
                setSeconds(secs - 1)
            }
            if (secs === 0) {
                if (mins === 0) {
                    clearInterval(sampleInterval.current)
                } else {
                    setMinutes(mins - 1)
                    setSeconds(59)
                }
            }
            if (mins === 4 && secs === 0) {
                setReceivingKey(false)

                dispatchStep({
                    type: 'SET_RETURN',
                    payload: {
                        returnScreen: true,
                    },
                })
            }
            if (mins === 0 && secs === 0) {
                setPercentage(0)
            }
            refreshPercentage(mins, secs)
        }, 1000))

    const refreshPercentage = (minsPerc: number, secsPerc: number): void => {
        setPercentage(
            calPercentage(
                startingMinutes.current + startingSeconds.current / 60,
                minsPerc + secsPerc / 60
            )
        )
    }

    return {
        controlInterval,
        setRefresh,
        setReceivingKey,
        setMinutes,
        setSeconds,
        sampleInterval,
        receivingKey,
        refresh,
        percentage,
        mins,
        secs,
    }
}

export default useLogicForget
