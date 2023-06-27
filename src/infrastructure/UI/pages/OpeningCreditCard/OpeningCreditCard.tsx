import { ReactElement } from 'react'

// components
import { LayoutContent } from '../../transverse'
import { EntryModule } from './inc'

// context
import createStepOpeningCreditCardProvider from './context/StepProvider'

// styles
import { CtrOpeningCreditCard } from './openingCreditCard-styles'

const OpeningCreditCardProvider = createStepOpeningCreditCardProvider()

const OpeningCreditCard = (): ReactElement => {
    return (
        <OpeningCreditCardProvider>
            <LayoutContent>
                <CtrOpeningCreditCard>
                    <EntryModule />
                </CtrOpeningCreditCard>
            </LayoutContent>
        </OpeningCreditCardProvider>
    )
}

export default OpeningCreditCard
