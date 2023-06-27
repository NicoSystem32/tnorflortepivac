import { ReactElement } from 'react'

// components
import {
    FirstStep,
    SecondStep,
    ThirdStep,
    FourthStep,
    FifthStep,
    SixthStep,
    SeventhStep,
    EighthStep,
    NinthStep,
    TenthStep,
    EleventhStep,
    TwelfthStep,
    ThirteenthStep,
    FourteenthStep,
    FifteenthStep,
    SixteenthStep,
    ConnectionErrorView,
    EndFlow,
    CardQuotaRejected,
} from '..'

// hooks
import { useEntryModule } from '../../hooks/useEntryModule'

const EntryModule = (): ReactElement => {
    const { step } = useEntryModule()

    return (
        <>
            {
                {
                    1: <FirstStep />, // CRM validation
                    2: <SecondStep />, // CRM validation
                    3: <ThirdStep />, // OTP Validation
                    4: <FourthStep />, // Personal Data // save
                    5: <FifthStep />, // Personal Data: Civil Status // save
                    6: <SixthStep />, // Personal Data: Income // save
                    7: <SeventhStep />, // Take the Quote // save
                    8: <EighthStep />, // Check Quote // save
                    9: <NinthStep />, // Change the Quote
                    10: <TenthStep />, // Security policy
                    11: <EleventhStep />, // Security policy finish flow
                    12: <TwelfthStep />, // Credit Card configuration // save
                    13: <ThirteenthStep />, // Upload identification file
                    14: <FourteenthStep />, // Upload extracts file
                    15: <FifteenthStep />, // Buy wallet // save
                    16: <SixteenthStep />, // Buy wallet Upload
                    17: <EndFlow />, // End flow
                    18: <ConnectionErrorView />, // Connection Error
                    19: <CardQuotaRejected />,
                }[step.currentStep]
            }
        </>
    )
}

export default EntryModule
