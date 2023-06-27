import { Dispatch, FormEvent, SetStateAction } from 'react'
import { Button, Form } from 'react-bootstrap'

// models
import { Detail } from '../../../../../../domain/models'

// utils
import {
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'

// hooks
import { useFormProduct } from '../../../../hooks/useFormProducts'

// components
import { TarDetailDangerMessages } from '..'

// Styles
import {
    ButtonsContainer,
    ButtonContainer,
    FieldInputContainer,
    FieldRadioButton,
} from './tarDetailForm-styles'

interface TarDetailFormProps {
    info: Detail
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setShow: Dispatch<SetStateAction<boolean>>
    isDisable?: boolean
}

const TarDetailForm: React.FC<TarDetailFormProps> = ({
    info,
    handleSubmit,
    handleChange,
    setShow,
    isDisable,
}): JSX.Element => {
    const { validateExistence } = useFormProduct()

    return (
        <form onSubmit={handleSubmit}>
            <Form.Group className="step2-not-see" controlId="kindOfStand">
                <FieldInputContainer>
                    <FieldRadioButton>
                        <div>
                            <Form.Check
                                className="radio"
                                value="cuota"
                                type="radio"
                                aria-label="radio 1"
                                label="Valor cuota"
                                onChange={handleChange}
                                disabled={validateExistence}
                            />
                            <p>
                                $ {formatValue(info.nextFeeValue, 1)}
                                <sup>{formatDecimalValue(info.nextFeeValue, 1)}</sup>
                            </p>
                        </div>
                    </FieldRadioButton>
                </FieldInputContainer>
            </Form.Group>
            <ButtonsContainer>
                <TarDetailDangerMessages alreadyProduct={validateExistence} />
                {validateExistence ? (
                    <ButtonContainer>
                        <Button variant="primary" onClick={() => setShow(true)}>
                            Modificar concepto
                        </Button>
                    </ButtonContainer>
                ) : (
                    <ButtonContainer>
                        <Button variant="primary" type="submit" disabled={isDisable}>
                            Agregar a Pagos
                        </Button>
                    </ButtonContainer>
                )}
            </ButtonsContainer>
        </form>
    )
}

export default TarDetailForm
