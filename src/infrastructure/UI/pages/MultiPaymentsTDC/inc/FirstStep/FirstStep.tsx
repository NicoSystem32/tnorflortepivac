import { ReactElement, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { OverlayTrigger } from 'react-bootstrap'

// components
import { TitleStep, ReturnButton, PaymentAmount, DigitKeyboardTDC } from '..'
import {
    Button,
    Form,
    FormGroup,
    InputGroup,
    InputGroupText,
    FormLabel,
    FormMessage,
    FormControl,
    Popover,
    InputMask,
} from '../../../../components'

// hooks
import { multiTdcSchema, MultiTdcType, useMultiTdcForm } from '../../hooks/useMultiTdcForm'

// selectors
import { faiAccountExistSelector } from '../../../../../selectors/products'
import { parametersTDCSelector, sendCodeOTPSelector } from '../../../../../selectors'

// styles
import {
    MultiPaymentTDCFirstStep,
    MultiPaymentTDCStepContent,
    FootPaymentStep,
    BodyMultiPaymentStep,
    TDCFormWrap,
    CtrForm,
} from './firstStep-styles'

// utils
import { formatValue } from '../../../../components/GlobalFuntions/globalFunction'

// icons
import { LockSVG, DollarDarkSVG } from '../../../../utils/getIcons'

const FirstStep = (): ReactElement => {
    const history = useHistory()

    const [showKeyboard, setShowKeyboard] = useState<boolean>(false)
    const [isFocus, setIsFocus] = useState(false)
    const defaultValuesRef = useRef({
        amountFAI: '',
        keyCodeIVR: '',
    })

    const {
        faiAccount: { balanceTotal },
    } = useSelector(faiAccountExistSelector)
    const { loading } = useSelector(sendCodeOTPSelector)
    const amountTotal = useSelector(parametersTDCSelector)?.value

    const newMultiTdcSchema = multiTdcSchema.concat(
        yup.object({
            amountFAI: yup
                .string()
                .matches(/^[1-9]?\d+$/, 'Por favor ingresar solo dígitos numéricos')
                .required('Campo obligatorio')
                .test(
                    'moreThan',
                    'Ingresa el valor a debitar de tu cuenta FAI',
                    (v) => parseInt(v ?? '') > 0
                )
                .test(
                    'lessThan',
                    `${
                        amountTotal && amountTotal > balanceTotal
                            ? 'El monto excede el saldo de tu cuenta FAI'
                            : 'El monto máximo para debitar con FAI es $' +
                              formatValue((amountTotal ?? 0) - 100, 1)
                    }`,
                    (v) => {
                        if (amountTotal && amountTotal > balanceTotal) {
                            return parseInt(v ?? '') <= balanceTotal
                        } else {
                            return parseInt(v ?? '') <= (amountTotal ?? 0) - 100
                        }
                    }
                ),
        })
    )

    const {
        handleSubmit,
        register,
        getValues,
        watch,
        setValue,
        control,
        setError,
        prepareNextState,
        matchMedia,
        disableOnKeyPress,
    } = useMultiTdcForm({
        validationSchema: yupResolver(newMultiTdcSchema),
        defaultValues: defaultValuesRef.current,
    })
    const { errors, isValid } = useFormState({ control })
    watch()

    const onFocusInput = (): void => {
        if (matchMedia) setShowKeyboard(true)
        setIsFocus(true)
    }

    const handleSeeKeyboard = (): void => {
        setShowKeyboard(false)
    }

    const handleInputDigit = (inputChanged: string): void => {
        setValue('keyCodeIVR', inputChanged)
        setError('keyCodeIVR', { type: 'focus' }, { shouldFocus: true })
    }

    const onSubmit = (inputs: MultiTdcType): void => {
        prepareNextState(inputs, amountTotal)
    }

    return (
        <>
            <ReturnButton
                onClick={() => {
                    history.push('/payments', { type: 'TDC' })
                }}
            />

            <MultiPaymentTDCFirstStep>
                <Form onSubmit={handleSubmit(onSubmit)} data-tour-act="trigger-step-form">
                    <MultiPaymentTDCStepContent>
                        <TitleStep
                            subtitle="Selecciona cuanto deseas debitar de cuenta FAI acompañado de tu clave IVR, el valor
                restante será pagado a través de PSE"
                        >
                            Pago por<strong>&nbsp;multipagos&nbsp;</strong>
                        </TitleStep>

                        <BodyMultiPaymentStep>
                            {amountTotal && (
                                <PaymentAmount
                                    amountFai={getValues('amountFAI')}
                                    amountTotal={amountTotal}
                                />
                            )}

                            <TDCFormWrap>
                                <CtrForm data-tour="fai-ivr-key">
                                    <FormGroup className="group-content" id="content-group-user">
                                        <FormLabel className="group-label">
                                            Monto a debitar cuenta FAI
                                        </FormLabel>
                                        <InputGroup hasValidation>
                                            <InputGroupText $inputError={!!errors.amountFAI}>
                                                <img
                                                    src={DollarDarkSVG}
                                                    alt="clave"
                                                    className="icon-input"
                                                />
                                            </InputGroupText>
                                            <InputMask
                                                {...register('amountFAI')}
                                                mask="num"
                                                blocks={{
                                                    num: {
                                                        mask: Number,
                                                        thousandsSeparator: '.',
                                                        signed: false,
                                                        scale: 0,
                                                    },
                                                }}
                                                unmask={true}
                                                placeholder="Ingresa el valor a debitar de tu cuenta FAI"
                                                onAccept={(value) => {
                                                    setValue('amountFAI', value.toString(), {
                                                        shouldValidate: true,
                                                    })
                                                }}
                                                isInvalid={!!errors.amountFAI}
                                            />
                                            <FormMessage type="invalid">
                                                {errors.amountFAI && errors.amountFAI.message}
                                            </FormMessage>
                                        </InputGroup>
                                    </FormGroup>

                                    <FormGroup className="group-content" id="content-group-user">
                                        <FormLabel className="group-label">Clave IVR</FormLabel>
                                        <OverlayTrigger
                                            show={showKeyboard}
                                            placement="right"
                                            overlay={
                                                <Popover noSpace>
                                                    <DigitKeyboardTDC
                                                        onMouseLeave={handleSeeKeyboard}
                                                        onChange={handleInputDigit}
                                                        defaultValue={getValues('keyCodeIVR')}
                                                    />
                                                </Popover>
                                            }
                                        >
                                            <InputGroup hasValidation>
                                                <InputGroupText $inputError={!!errors.keyCodeIVR}>
                                                    <img
                                                        src={LockSVG}
                                                        alt="clave"
                                                        className="icon-input"
                                                    />
                                                </InputGroupText>
                                                <FormControl
                                                    {...register('keyCodeIVR')}
                                                    id="ivr-field"
                                                    placeholder="Ingresa tu clave IVR"
                                                    onFocus={onFocusInput}
                                                    readOnly={matchMedia}
                                                    isInvalid={!!errors.keyCodeIVR}
                                                    onKeyPress={disableOnKeyPress}
                                                />
                                                <FormMessage type="invalid">
                                                    {errors.keyCodeIVR && errors.keyCodeIVR.message}
                                                </FormMessage>
                                            </InputGroup>
                                        </OverlayTrigger>
                                    </FormGroup>
                                </CtrForm>

                                {isFocus && (
                                    <div className="label-floating">
                                        Por tu seguridad utiliza el teclado virtual
                                    </div>
                                )}
                            </TDCFormWrap>
                        </BodyMultiPaymentStep>

                        <FootPaymentStep>
                            <Button
                                variant="outline-cancel"
                                onClick={() => {
                                    history.push('/home-wallet')
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="sub-dominant"
                                disabled={!isValid || loading}
                                isLoading={loading}
                                data-tour="confirm-fai-ivr"
                            >
                                Siguiente
                            </Button>
                        </FootPaymentStep>
                    </MultiPaymentTDCStepContent>
                </Form>
            </MultiPaymentTDCFirstStep>
        </>
    )
}

export default FirstStep
