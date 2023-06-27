import { FormEvent, useState } from 'react'
import { Form } from 'react-bootstrap'

// models
import { Detail } from '../../../../../../domain/models'

// Components
import { ErrorLabel } from '..'
import { AlertInformation } from '../../../../components'
import { Button } from '../../../../components/includes'

// utils
import {
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'

// Hooks
import { useFormProduct } from '../../../../hooks/useFormProducts'

// Styles
import {
    SavingFormFields,
    SavingButtonsContainer,
    CardInput,
    CustomInputContainer,
    InputCustom,
    InputContainerMobile,
    CheckInputOtherValueMobile,
} from './savingForm-styles'
import { parseStringToBoolean } from '../../../../utils/misc'

let optionSelected = ''
interface SavingFormProps {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeOther: (e: React.ChangeEvent<HTMLInputElement>) => void
    nextStep: () => void
    setShow: (set: boolean) => void
    item: Record<string, string>
    info: Detail
    isOther: boolean
    showInputs: boolean
    showErrors: boolean
    errorText: string
    isDisable: boolean
}

const enableSavingsPayment = process.env.REACT_APP_SAVINGS_PAYMENT_ENABLE as 'false' | 'true'

const SavingForm: React.FC<SavingFormProps> = ({
    handleSubmit,
    handleChange,
    onChangeOther,
    nextStep,
    setShow,
    item,
    info,
    isOther,
    showInputs,
    showErrors,
    errorText,
    isDisable,
}): JSX.Element => {
    const { validateExistence, handleKeyPress } = useFormProduct()

    const [isInvalidValue, setIsInvalidValue] = useState(false)

    const changeOption = (option: string): void => {
        optionSelected = option
        validValue()
    }

    const validValue = (): void => {
        if (optionSelected === 'total' && info.balanceTotal === 0) {
            setIsInvalidValue(true)
        } else if (optionSelected === 'mora' && info.delinquentBalance === 0) {
            setIsInvalidValue(true)
        } else if (optionSelected === 'cuota' && info.nextFeeValue === 0) {
            setIsInvalidValue(true)
        } else {
            setIsInvalidValue(false)
        }
    }

    return (
        <Form onSubmit={handleSubmit} data-tour-act="trigger-step-form">
            {showInputs && (
                <Form.Group controlId="kindOfStand">
                    <SavingFormFields data-tour="saving-payment-opts">
                        {/* Desk */}
                        <CardInput data-tour-hint="hint-action">
                            <div>
                                <Form.Check
                                    className="radio"
                                    value="cuota"
                                    type="radio"
                                    aria-label="radio 1"
                                    label="Valor cuota"
                                    onChange={handleChange}
                                    checked={item.kindOfStand === 'cuota'}
                                    disabled={validateExistence}
                                    onClick={() => {
                                        changeOption('cuota')
                                    }}
                                />
                                <span>
                                    $ {formatValue(info.nextFeeValue, 1)}
                                    <sup>{formatDecimalValue(info.nextFeeValue, 1)}</sup>
                                </span>
                            </div>
                        </CardInput>
                        {parseStringToBoolean(enableSavingsPayment) && (
                            <>
                                <CardInput>
                                    <div>
                                        <Form.Check
                                            className="radio"
                                            value="mora"
                                            type="radio"
                                            aria-label="radio 2"
                                            label="Valor mora"
                                            onChange={handleChange}
                                            checked={item.kindOfStand === 'mora'}
                                            disabled={validateExistence}
                                            onClick={() => {
                                                changeOption('mora')
                                            }}
                                        />
                                        <span>
                                            $ {formatValue(info.delinquentBalance, 1)}
                                            <sup>
                                                {formatDecimalValue(info.delinquentBalance, 1)}
                                            </sup>
                                        </span>
                                    </div>
                                </CardInput>

                                <CardInput>
                                    <div>
                                        <Form.Check
                                            className="radio"
                                            value="total"
                                            type="radio"
                                            aria-label="radio 3"
                                            label="Valor total"
                                            onChange={handleChange}
                                            checked={item.kindOfStand === 'total'}
                                            disabled={validateExistence}
                                            onClick={() => {
                                                changeOption('total')
                                            }}
                                        />
                                        <span>
                                            $ {formatValue(info.balanceTotal, 1)}
                                            <sup>{formatDecimalValue(info.balanceTotal, 1)}</sup>
                                        </span>
                                    </div>
                                </CardInput>
                            </>
                        )}
                        <CustomInputContainer>
                            <div>
                                <Form.Check
                                    className="radio"
                                    value="otro"
                                    type="radio"
                                    aria-label="radio 4"
                                    label="Otro valor"
                                    onChange={handleChange}
                                    checked={item.kindOfStand === 'otro'}
                                    disabled={validateExistence}
                                    onClick={() => {
                                        changeOption('otro')
                                    }}
                                />
                                <InputCustom
                                    error={
                                        showErrors &&
                                        item.kindOfStand === 'otro' &&
                                        errorText !== ''
                                    }
                                    placeholder="Ingresa un valor"
                                    onDrop={() => false}
                                    onPaste={(e) => e.preventDefault()}
                                    onChange={(e) => {
                                        if (isOther) {
                                            onChangeOther(e)
                                        }
                                    }}
                                    onKeyPress={handleKeyPress}
                                    disabled={item.kindOfStand !== 'otro'}
                                />
                            </div>
                            <ErrorLabel
                                text={errorText}
                                showErrors={
                                    showErrors && item.kindOfStand === 'otro' && errorText !== ''
                                }
                            />
                        </CustomInputContainer>
                        {/* mobile */}
                        <CheckInputOtherValueMobile>
                            <div>
                                <Form.Check
                                    className="radio"
                                    value="otro"
                                    type="radio"
                                    aria-label="radio 4"
                                    label="Otro valor"
                                    onClick={nextStep}
                                    onChange={handleChange}
                                    checked={item.kindOfStand === 'otro'}
                                    disabled={validateExistence}
                                />
                            </div>
                        </CheckInputOtherValueMobile>
                    </SavingFormFields>
                </Form.Group>
            )}
            {!showInputs && (
                <InputContainerMobile error={showErrors && item.kindOfStand === 'otro'}>
                    <input
                        placeholder="Ingresa un valor"
                        onChange={onChangeOther}
                        onDrop={() => false}
                        onPaste={() => false}
                        onKeyPress={handleKeyPress}
                    />
                    <ErrorLabel
                        text={errorText}
                        showErrors={showErrors && item.kindOfStand === 'otro'}
                    />
                </InputContainerMobile>
            )}
            <SavingButtonsContainer>
                {validateExistence && <AlertInformation />}

                {validateExistence ? (
                    <Button variant="primary" onClick={() => setShow(true)}>
                        Modificar concepto
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!isDisable || isInvalidValue}
                        data-tour="add-savings-to-payments"
                    >
                        Agregar Pagos
                    </Button>
                )}
            </SavingButtonsContainer>
        </Form>
    )
}

export default SavingForm
