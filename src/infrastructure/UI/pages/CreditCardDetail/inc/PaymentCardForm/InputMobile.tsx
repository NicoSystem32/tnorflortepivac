import { ChangeEvent, FormEvent } from 'react'
import { formatValue } from '../../../../components/GlobalFuntions/globalFunction'
import { FormError, FormPay } from '../../CreditCardDetail'
import {
    Button,
    ErrorMessage,
    InputContainerMobile,
    InputMobileContainer,
} from './paymentCardForm-styles'

interface InputMobileProps {
    setShowInput?: (state: boolean) => void
    showInput?: boolean
    setFormPay: (state: FormPay) => void
    formPay: FormPay
    handleSubmit: (e?: FormEvent<HTMLFormElement>) => void
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    formError: FormError
}

const InputMobile: React.FC<InputMobileProps> = ({
    formPay,
    handleChange,
    handleSubmit,
    formError,
}): JSX.Element => {
    return (
        <InputMobileContainer>
            <h3>
                Ingresa otro <span>valor a pagar</span>
            </h3>
            <InputContainerMobile error={false}>
                <input
                    autoComplete="off"
                    placeholder="Ingresa un valor"
                    onChange={handleChange}
                    name="other"
                    value={formatValue(formPay.other, 1)}
                    onDrop={() => false}
                    onPaste={(e) => e.preventDefault()}
                    onKeyDown={(e) => {
                        if (
                            ![
                                '0',
                                '1',
                                '2',
                                '3',
                                '4',
                                '5',
                                '6',
                                '7',
                                '8',
                                '9',
                                'Backspace',
                            ].includes(e.key)
                        ) {
                            e.preventDefault()
                        }
                    }}
                />
                <ErrorMessage>{formError.error && <p>{formError.message}</p>}</ErrorMessage>
            </InputContainerMobile>
            <Button
                disabled={
                    formPay.option === 'other'
                        ? formPay.other === '' || formError.error
                        : formPay.option === ''
                }
                variant="sub-dominant"
                onClick={() => handleSubmit()}
            >
                Pagar
            </Button>
        </InputMobileContainer>
    )
}
export default InputMobile
