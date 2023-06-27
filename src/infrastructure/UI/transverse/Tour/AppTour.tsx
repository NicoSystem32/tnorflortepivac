import React, { useState, useCallback } from 'react'
import { ProviderProps } from '@reactour/tour'
import { useLockedBody } from 'usehooks-ts'

// styled components
import { StyledAppTour } from './appTour-styles'

// Onboarding tour components
import { overviewSteps } from './steps/steps'
import { Close, Navigation } from '../Tour/components'
interface AppTourProps extends Pick<ProviderProps, 'onClickMask'> {
    children: React.ReactNode
    disableScroll?: boolean
}

const AppTour = ({ children, disableScroll, onClickMask }: AppTourProps): React.ReactElement => {
    const bodyClasses = document.body.classList
    const [locked, setLocked] = useState(false)
    useLockedBody(locked, 'root')

    const disableBody = useCallback(() => {
        if (disableScroll) {
            setTimeout(() => {
                setLocked(true)
            }, 1100)
        }
    }, [disableScroll])

    const enableBody = useCallback(() => {
        if (disableScroll) {
            setTimeout(
                () => {
                    setLocked(false)
                },
                bodyClasses.contains('modal-open') ? 400 : 0
            )
        }
    }, [bodyClasses, disableScroll])

    return (
        <StyledAppTour
            steps={overviewSteps}
            components={{ Close, Navigation }}
            afterOpen={disableBody}
            beforeClose={enableBody}
            onClickMask={onClickMask}
            disableKeyboardNavigation={['left', 'right']}
            onClickClose={({ setIsOpen }) => {
                if (locked || !disableScroll) {
                    setIsOpen(false)
                }
            }}
            styles={{
                maskWrapper: (base) => ({
                    ...base,
                    opacity: '0.5',
                    color: '#204F57',
                }),
            }}
        >
            {children}
        </StyledAppTour>
    )
}

export default AppTour
