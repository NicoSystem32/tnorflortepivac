import { useState } from 'react'
import { Form } from 'react-bootstrap'

import {
    formatValue,
    formatDecimalValue,
} from '../../../../components/GlobalFuntions/globalFunction'

// models
import { Detail } from '../../../../../../domain/models'

//components
import { ToolTipDetail, CreditDetailError } from '..'
import { AlertInformation, Button } from '../../../../components'

//hooks
import { useFormProduct } from '../../../../hooks/useFormProducts'
import { useCreditDetailState } from '../../hooks/useCreditDetail'
import { useCreditForm } from './hook/useCreditForm'

//styles
import {
    CheckRefund,
    CreditDetailOptions,
    DetailBodyContainer,
    InputMobileContainer,
    OptionPay,
    OptionsButtonContainer,
    OptionsPayContent,
} from './detailForm-styles'

interface DetailBodyProps {
    detail: Detail
}

let checkRefund = false
let optionSelected = ''

const DetailForm: React.FC<DetailBodyProps> = ({ detail }): JSX.Element => {
    const { validateExistence, handleKeyPress } = useFormProduct()
    const detailNew = {
        ...detail,
        isRefund: checkRefund,
        valueRefund: detail.nextFeeValue - detail.refund,
    }
    const {
        isDisable,
        isBigger,
        kindOfStand,
        handleChange,
        handleSubmit,
        onChangeOther,
        messageError,
    } = useCreditForm(detailNew)
    const [, setShow] = useCreditDetailState()
    const [{ showInput }, setShowInput] = useCreditDetailState()
    const [valeChanged, setValeChanged] = useState(detail.nextFeeValue)
    const [isInvalidValue, setIsInvalidValue] = useState(false)

    const nextStep = (): void => {
        setShowInput((s) => ({ ...s, showInput: false }))
    }

    const changeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
        checkRefund = event.target.checked
        if (checkRefund) {
            if (detail.refund > 0 && detail.refund < detail.nextFeeValue) {
                const value = detail.nextFeeValue - detail.refund
                setValeChanged(value)
            } else {
                setValeChanged(0)
            }
        } else {
            setValeChanged(detail.nextFeeValue)
        }
        validValue()
    }

    const changeOption = (option: string): void => {
        optionSelected = option
        validValue()
    }

    const validValue = (): void => {
        if (optionSelected === 'total' && detail.balanceTotal === 0) {
            setIsInvalidValue(true)
        } else if (optionSelected === 'mora' && detail.delinquentBalance <= 0) {
            setIsInvalidValue(true)
        } else if (
            (checkRefund && optionSelected === 'cuota' && detail.refund >= detail.nextFeeValue) ||
            (optionSelected === 'cuota' && detail.nextFeeValue === 0)
        ) {
            setIsInvalidValue(true)
        } else {
            setIsInvalidValue(false)
        }
    }

    return (
        <DetailBodyContainer data-tour="credit-payment-opts">
            <Form onSubmit={handleSubmit}>
                {showInput && (
                    <Form.Group controlId="kindOfStand" data-tour="credit-payment-opts-mob">
                        <OptionsPayContent>
                            <OptionPay>
                                <div>
                                    <Form.Check
                                        className="radio-button"
                                        value="cuota"
                                        type="radio"
                                        aria-label="radio 1"
                                        label="Valor cuota"
                                        onChange={handleChange}
                                        checked={kindOfStand === 'cuota'}
                                        disabled={validateExistence}
                                        onClick={() => {
                                            changeOption('cuota')
                                        }}
                                    />
                                    <p className="value-pay">
                                        $ {formatValue(valeChanged, 1)}
                                        <sup className="sub-indice">
                                            {formatDecimalValue(valeChanged, 1)}
                                        </sup>
                                    </p>
                                </div>
                            </OptionPay>
                            <OptionPay>
                                <div>
                                    <Form.Check
                                        className="radio-button"
                                        value="mora"
                                        type="radio"
                                        aria-label="radio 2"
                                        label="Saldo mora"
                                        onChange={handleChange}
                                        checked={kindOfStand === 'mora'}
                                        disabled={validateExistence}
                                        onClick={() => {
                                            changeOption('mora')
                                        }}
                                    />
                                    <p className="value-pay">
                                        $ {formatValue(detail.delinquentBalance, 1)}
                                        <sup className="sub-indice">
                                            {formatDecimalValue(detail.delinquentBalance, 1)}
                                        </sup>
                                    </p>
                                </div>
                                <ToolTipDetail info={detail} optionPay="mora" />
                            </OptionPay>
                            <OptionPay data-tour="credit-payment-info-mob">
                                <div>
                                    <Form.Check
                                        className="radio-button"
                                        value="total"
                                        type="radio"
                                        aria-label="radio 3"
                                        label="Valor total"
                                        onChange={handleChange}
                                        checked={kindOfStand === 'total'}
                                        disabled={validateExistence}
                                        onClick={() => {
                                            changeOption('total')
                                        }}
                                    />
                                    <p className="value-pay">
                                        $ {formatValue(detail.balanceTotal, 1)}
                                        <sup className="sub-indice">
                                            {formatDecimalValue(detail.balanceTotal, 1)}
                                        </sup>
                                    </p>
                                </div>
                                <ToolTipDetail
                                    info={detail}
                                    optionPay="total"
                                    data-tour="credit-payment-info"
                                />
                            </OptionPay>
                            <OptionPay
                                className="option-desk"
                                error={messageError !== '' && kindOfStand === 'otro' ? true : false}
                            >
                                <div className="card-desk">
                                    <Form.Check
                                        className="radio-button other-value-info"
                                        value="otro"
                                        type="radio"
                                        aria-label="radio 4"
                                        label="Otro valor"
                                        onChange={handleChange}
                                        checked={kindOfStand === 'otro'}
                                        disabled={validateExistence}
                                        onClick={() => {
                                            changeOption('otro')
                                        }}
                                    />
                                    <input
                                        className="other-value-input"
                                        placeholder="Ingresa un valor"
                                        onChange={onChangeOther}
                                        onDrop={() => false}
                                        onPaste={(e) => e.preventDefault()}
                                        onKeyPress={handleKeyPress}
                                        disabled={kindOfStand !== 'otro'}
                                    />
                                </div>
                                {messageError !== '' && kindOfStand === 'otro' && (
                                    <CreditDetailError message={messageError} />
                                )}
                            </OptionPay>
                            <OptionPay className="option-mob">
                                <div>
                                    <Form.Check
                                        className="radio-button other-value-info"
                                        value="otro"
                                        type="radio"
                                        aria-label="radio 4"
                                        label="Otro valor"
                                        onClick={nextStep}
                                        onChange={handleChange}
                                        checked={kindOfStand === 'otro'}
                                        disabled={validateExistence}
                                    />
                                </div>
                            </OptionPay>
                        </OptionsPayContent>
                        {detail.refund > 0 && detail.refund !== null && (
                            <CheckRefund>
                                <Form.Check
                                    id="checkRefund"
                                    className="radio-button other-value-info"
                                    value="refund"
                                    type="checkbox"
                                    label="Deseo incluir el saldo de reintegro en el pago de la siguiente cuota."
                                    aria-label="checkbox 1"
                                    onChange={changeValue}
                                    // eslint-disable-next-line react/jsx-no-duplicate-props
                                    // onChange={handleChange}
                                    // checked={kindOfStand === 'otro'}
                                    // disabled={validateExistence()}
                                />
                            </CheckRefund>
                        )}
                    </Form.Group>
                )}
                {!showInput && (
                    <InputMobileContainer error={messageError ? true : false}>
                        <input
                            placeholder="Ingresa un valor"
                            onChange={onChangeOther}
                            onDrop={() => false}
                            onPaste={(e) => e.preventDefault()}
                            onKeyPress={handleKeyPress}
                        />
                        {messageError !== '' && <CreditDetailError message={messageError} />}
                    </InputMobileContainer>
                )}
                <CreditDetailOptions>
                    <div className="alert-detail">
                        {isBigger && <AlertInformation isBigger />}
                        {validateExistence && <AlertInformation />}
                    </div>
                    <OptionsButtonContainer>
                        {validateExistence ? (
                            <Button
                                variant="primary"
                                onClick={() => setShow((s) => ({ ...s, show: true }))}
                            >
                                Modificar concepto
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={!isDisable || isInvalidValue}
                            >
                                Agregar a Pagos
                            </Button>
                        )}
                    </OptionsButtonContainer>
                </CreditDetailOptions>
            </Form>
        </DetailBodyContainer>
    )
}

export default DetailForm
