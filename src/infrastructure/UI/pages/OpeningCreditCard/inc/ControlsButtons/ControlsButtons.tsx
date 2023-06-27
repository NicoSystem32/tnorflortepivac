import { ReactElement, FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'

// components
import { Button } from '../../../../components'

// styles
import { ButtonsCtr, ButtonsRightCtr, ButtonsLeftCtr } from './controlsButtons-styles'

export interface ControlsButtonsProps {
    disable: boolean
    isLoading?: boolean
    isLoadingSave?: boolean
    nextText?: string
    isSave?: boolean
    onSave?: () => void
    onNext?: () => void
    onCancel?: () => void
}

const ControlsButtons: FC<ControlsButtonsProps> = ({
    onNext,
    isSave = true,
    isLoading,
    isLoadingSave,
    onSave,
    disable,
    nextText,
    onCancel,
}): ReactElement => {
    const history = useHistory()
    const matchMedia = useMediaQuery('(min-width: 1024px)')

    const redirection = (url: string, data?: Record<string, string | number>): void => {
        history.push(url, data)
    }
    return (
        <ButtonsCtr>
            <ButtonsLeftCtr>
                <Button
                    variant={matchMedia ? 'link' : 'outline-cancel'}
                    type="submit"
                    extend
                    disabled={false}
                    onClick={() => {
                        if (onCancel) {
                            return onCancel()
                        }
                        redirection('/product-opening')
                    }}
                >
                    Cancelar
                </Button>
            </ButtonsLeftCtr>
            <ButtonsRightCtr isSave={!isSave}>
                {isSave && (
                    <Button
                        className="save"
                        variant="outline-cancel"
                        type="button"
                        extend
                        isLoading={isLoadingSave}
                        disabled={false}
                        onClick={onSave}
                    >
                        Guardar y salir
                    </Button>
                )}
                <Button
                    variant="sub-dominant"
                    type="submit"
                    extend
                    onClick={onNext}
                    disabled={disable}
                    isLoading={isLoading}
                >
                    {nextText ? nextText : 'Continuar'}
                </Button>
            </ButtonsRightCtr>
        </ButtonsCtr>
    )
}

export default ControlsButtons
