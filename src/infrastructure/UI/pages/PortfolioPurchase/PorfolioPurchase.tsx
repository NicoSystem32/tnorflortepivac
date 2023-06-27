import { ReactElement } from 'react'

// components
import { LayoutContent } from '../../transverse'
import { EntryModule } from './inc'

// context
import createStepPorfolioPurchaseProvider from './context/StateProvider'

// styles
import { CtrPorfolioPurchaseCreditCard } from './porfolioPurchase-styles'

const PorfolioPurchaseProvider = createStepPorfolioPurchaseProvider()

const PorfolioPurchase = (): ReactElement => {
    return (
        <PorfolioPurchaseProvider>
            <LayoutContent>
                <CtrPorfolioPurchaseCreditCard>
                    <EntryModule />
                </CtrPorfolioPurchaseCreditCard>
            </LayoutContent>
        </PorfolioPurchaseProvider>
    )
}

export default PorfolioPurchase
