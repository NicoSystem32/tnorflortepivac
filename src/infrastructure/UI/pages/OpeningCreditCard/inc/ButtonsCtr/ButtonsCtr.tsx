import { ReactElement, FC } from 'react'
import { useHistory } from 'react-router-dom'

// components
import { Button } from '../../../../components'

// styles
import { ContainerButtons } from './buttonsCtr-styles'

export interface ButtonsCtrProps {
    onNext?: () => void
    disabled: boolean
    isLoading?: boolean
}

const ButtonsCtr: FC<ButtonsCtrProps> = ({ onNext, disabled, isLoading }): ReactElement => {
    const history = useHistory()

    const redirection = (url: string, data?: Record<string, string | number>): void => {
        history.push(url, data)
    }

    return (
        <ContainerButtons>
            <Button
                variant="sub-dominant"
                type="submit"
                extend
                disabled={disabled}
                onClick={onNext}
                isLoading={isLoading}
            >
                Continuar
            </Button>
            <Button
                variant="outline-cancel"
                extend
                onClick={() => {
                    redirection('/product-opening')
                }}
            >
                Cancelar
            </Button>
        </ContainerButtons>
    )
}

export default ButtonsCtr
