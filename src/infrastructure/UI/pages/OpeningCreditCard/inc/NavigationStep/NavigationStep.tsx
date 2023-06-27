import { ReactElement, FC } from 'react'

// components
import { SaveAndExit } from '..'
import { BreadcrumbApp } from '../../../../components'

// styles
import { SpaceStep } from '../../openingCreditCard-styles'
import { NavigationCtr } from './navigationStep-styles'

// hooks
import { useNavigationStep } from '../../hooks/useNavigationStep'

export interface NavigationStepProps {
    saveAndExit?: boolean
    onSave?: () => void
    validateException?: 1 | 2 | 3 | 4 | 5 | 6
}

const NavigationStep: FC<NavigationStepProps> = ({
    saveAndExit,
    onSave,
    validateException,
}): ReactElement => {
    const { breadcrumbs, onBack } = useNavigationStep(validateException)
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
