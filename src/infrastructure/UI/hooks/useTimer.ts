import { useCountdown } from 'usehooks-ts'

// helpers
import { getSliceTime } from '../utils/misc'

/**
 * slice a time based at minutes to hours, minutes and seconds
 *
 * @param startTime time in minutes
 * @returns setter & status
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useTimer = (startTime: number) => {
    const _interval = 1000
    const [
        count,
        { startCountdown: startTimer, stopCountdown: stopTimer, resetCountdown: resetTimer },
    ] = useCountdown({
        countStart: 60 * startTime,
        intervalMs: _interval,
    })

    const [hours, minutes, seconds] = getSliceTime(count * 1000)

    return {
        hours,
        minutes,
        seconds,
        startTimer,
        stopTimer,
        resetTimer,
    }
}

export default useTimer
