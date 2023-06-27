import type { ReactElement } from 'react'
import { components, StepTypeExtended } from '@reactour/tour'
import tw from 'twin.macro'

// base components
import { Button } from '../../../../components/includes'

// styled components
import { Controls, StyledNavigation, DotButton } from './navigation-styles'

// custom hooks
import useNavigation from '../../hooks/useNavigation'

type NavigationProps = Omit<React.ComponentProps<typeof components.Navigation>, 'steps'> & {
    steps: StepTypeExtended[]
}

const Navigation = ({
    styles = {},
    steps,
    currentStep,
    disableDots,
    hideDots,
    hideButtons,
    disableAll,
    rtl,
}: NavigationProps): ReactElement => {
    // initial declarations
    const stepsLength = steps.length

    // initial states
    const {
        disableIndexes,
        disableNext,
        disablePrev,
        loadingNext,
        handleNextNPrev,
        handleDot,
        handleFinalize,
    } = useNavigation({ disableDots, disableAll })

    return (
        <Controls style={styles.controls && styles.controls({})} dir={rtl ? 'rtl' : 'ltr'}>
            {!hideButtons && (
                <Button
                    variant="outline-cancel"
                    extend
                    aria-label="Go to prev step"
                    disabled={disablePrev}
                    onClick={handleNextNPrev('prev')}
                    css={`
                        ${currentStep === 0 && tw`hidden lg:invisible lg:block`}
                    `}
                >
                    Anterior
                </Button>
            )}

            {!hideDots && (
                <StyledNavigation style={styles.navigation && styles.navigation({})}>
                    {Array.from({ length: stepsLength }, (_, i) => i).map((index) => {
                        return (
                            <DotButton
                                key={`navigation_dot_${index}`}
                                className={index === currentStep ? 'current' : ''}
                                disabled={disableIndexes.some((idxDisabled) => index > idxDisabled)}
                                style={
                                    styles.dot &&
                                    styles.dot(
                                        {},
                                        {
                                            current: index === currentStep,
                                            disabled: disableDots || disableAll,
                                        }
                                    )
                                }
                                onClick={handleDot(index)}
                                aria-label={
                                    steps[index]?.navDotAriaLabel || `Go to step ${index + 1}`
                                }
                            />
                        )
                    })}
                </StyledNavigation>
            )}

            {stepsLength - 1 === currentStep
                ? !hideButtons && (
                      <Button
                          variant="sub-dominant"
                          extend
                          aria-label="Close tour"
                          onClick={handleFinalize}
                      >
                          Finalizar
                      </Button>
                  )
                : !hideButtons && (
                      <Button
                          variant="sub-dominant"
                          extend
                          aria-label="Go to next step"
                          disabled={disableNext || loadingNext}
                          isLoading={loadingNext}
                          onClick={handleNextNPrev('next')}
                      >
                          Siguiente
                      </Button>
                  )}
        </Controls>
    )
}

export default Navigation
