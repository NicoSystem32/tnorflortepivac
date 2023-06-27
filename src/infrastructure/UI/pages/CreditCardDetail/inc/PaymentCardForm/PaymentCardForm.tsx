import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { CreditCardSelector } from '../../../../../selectors'
import {
    Button,
    ContentOptionCard,
    ErrorMessage,
    FormContainer,
    InputCustom,
    OptionPay,
    OptionsContainer,
    PaymentCardFormContainer,
} from './paymentCardForm-styles'

import {
    formatDateText,
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'
import { ChangeEvent, FormEvent } from 'react'
import { FormError, FormPay } from '../../CreditCardDetail'
import useQueryId from '../../../../hooks/useQueryId'
import { StoreApp } from '../../../../../redux/store/store.interface'

interface PaymentCardFormProps {
    setShowInput: (state: boolean) => void
    showInput?: boolean
    setFormPay: (state: FormPay) => void
    formPay: FormPay
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    formError: FormError
}

const PaymentCardForm: React.FC<PaymentCardFormProps> = ({
    setShowInput,
    showInput = false,
    formPay,
    setFormPay,
    handleChange,
    handleSubmit,
    formError,
}): JSX.Element => {
    const { id } = useQueryId()
    const { cardData: infoCard } = useSelector((store: StoreApp) =>
        CreditCardSelector(store, String(id))
    )
    return (
        <PaymentCardFormContainer>
            {infoCard && (
                <Form onSubmit={handleSubmit}>
                    <FormContainer>
                        <OptionsContainer>
                            <OptionPay>
                                <div className="radio-btn">
                                    <Form.Check
                                        className="radio"
                                        value="minPay"
                                        type="radio"
                                        label=""
                                        name="option"
                                        onChange={handleChange}
                                        checked={formPay.option === 'minPay'}
                                    />
                                </div>
                                <ContentOptionCard>
                                    <div>
                                        <p className="title">Pago mínimo</p>
                                        <p className="sub-title">
                                            $ {formatValue(infoCard.minimumPayment, 1)}
                                            <sup>
                                                {formatDecimalValue(infoCard.minimumPayment, 1)}
                                            </sup>
                                        </p>
                                        <p className="text">
                                            Para pago oportuno{' '}
                                            {formatDateText(infoCard.dateNextPayment)}
                                        </p>
                                    </div>
                                </ContentOptionCard>
                            </OptionPay>
                            <OptionPay>
                                <div className="radio-btn">
                                    <Form.Check
                                        className="radio"
                                        value="totalPay"
                                        type="radio"
                                        label=""
                                        name="option"
                                        onChange={handleChange}
                                        checked={formPay.option === 'totalPay'}
                                    />
                                </div>
                                <ContentOptionCard>
                                    <div>
                                        <p className="title">Pago total</p>
                                        <p className="sub-title">
                                            $ {formatValue(infoCard.totalPayment, 1)}
                                            <sup>
                                                {formatDecimalValue(infoCard.totalPayment, 1)}
                                            </sup>
                                        </p>
                                    </div>
                                </ContentOptionCard>
                            </OptionPay>
                            <OptionPay className="option-desk">
                                <div className="radio-btn">
                                    <Form.Check
                                        className="radio"
                                        value="other"
                                        type="radio"
                                        label=""
                                        name="option"
                                        onChange={handleChange}
                                        checked={formPay.option === 'other'}
                                    />
                                </div>
                                <ContentOptionCard>
                                    <div>
                                        <p className="title">Otro valor</p>
                                        <Form.Group>
                                            <InputCustom
                                                autoComplete="off"
                                                error={formError.error}
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
                                                disabled={formPay.option !== 'other'}
                                            />
                                        </Form.Group>
                                    </div>
                                </ContentOptionCard>
                            </OptionPay>
                            <OptionPay className="option-mobile">
                                <div className="radio-btn">
                                    <Form.Check
                                        className="radio"
                                        value="other"
                                        type="radio"
                                        label=""
                                        name="option"
                                        onChange={handleChange}
                                        onClick={() => setShowInput(true)}
                                    />
                                </div>
                                <ContentOptionCard>
                                    <div>
                                        <p className="title">Otro valor</p>
                                    </div>
                                </ContentOptionCard>
                            </OptionPay>
                        </OptionsContainer>
                        <ErrorMessage>{formError.error && <p>{formError.message}</p>}</ErrorMessage>
                        <Button
                            disabled={
                                formPay.option === 'other'
                                    ? formPay.other === '' || formError.error
                                    : formPay.option === ''
                            }
                            variant="sub-dominant"
                            type="submit"
                        >
                            Pagar
                        </Button>
                    </FormContainer>
                </Form>
            )}
        </PaymentCardFormContainer>
    )
}
export default PaymentCardForm
