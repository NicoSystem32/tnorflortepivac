import { ReactElement, FC } from 'react'

// components
import { BreadcrumbApp } from '../../../../components'
import { SaveAndExit } from '../../../OpeningCreditCard/inc'

// styles
import { SpaceStep } from '../../porfolioPurchase-styles'
import { NavigationCtr } from './navigationStep-styles'

// hooks
import { useNavigationStep } from '../../hooks/useNavigationStep'

export interface NavigationStepProps {
    saveAndExit?: boolean
    onSave?: () => void
}

const NavigationStep: FC<NavigationStepProps> = ({ saveAndExit, onSave }): ReactElement => {
    const { breadcrumbs, onBack } = useNavigationStep()
    return (
        <>
            <NavigationCtr>
                <BreadcrumbApp breadcrumbs={breadcrumbs} onBack={onBack} />
                {saveAndExit && <SaveAndExit onSave={onSave} />}
            </NavigationCtr>
            <SpaceStep />
            <SpaceStep />
        </>
    )
}

export default NavigationStep
