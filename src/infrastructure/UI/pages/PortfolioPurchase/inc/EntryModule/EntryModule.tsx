import { ReactElement } from 'react'

// components
import { FirstStep, SecondStep } from '..'

// hooks
import { useReducerState } from '../../hooks'
import FinishModal from '../FinishModal'

const EntryModule = (): ReactElement => {
    const [step] = useReducerState()

    return (
        <>
            {
                {
                    1: <FirstStep />,
                    2: <SecondStep />,
                    3: <FinishModal />,
                }[step.currentStep]
            }
        </>
    )
}

export default EntryModule
