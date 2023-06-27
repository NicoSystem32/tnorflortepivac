/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// components
import {
    Form,
    InputGroup,
    InputSelectGroup,
    InputGroupText,
    Button,
    FormMessage,
    AlertInformation,
    SimulatorTDC,
    Loading,
    InputMask,
} from '../../../../components'
import { TyCModal, OpenTdcModal, AlertFai } from '..'

// styles
import {
    FormLabel,
    FormContent,
    FormGroup,
    FormCheck,
    FormSelect,
    ContainerButtons,
    InputGroupCheck,
    FormMessageSelect,
    FormOption,
    Image,
    CheckInputTdc,
    TermText,
    ContainerCheck,
    LinkTyC,
} from './openTdcForm-styles'

// hooks
import { useTdcForm, tdcSchema, TdcType } from '../../hooks/useTdcForm'
import { useSimulatorTDC } from '../../../../components/SimulatorTDC/hooks'
import { formatValue } from '../../../../components/GlobalFuntions/globalFunction'

// actions
import { actions } from '../../../../../redux/tdc'
import { getFaiAccountBalanceAction } from '../../../../../redux/products'

// selectors
import { settingTDCSelector, parametersAndTermsSelector } from '../../../../../selectors/tdc'
import { faiAccountExistSelector } from '../../../../../selectors/products'

// Icons
import { CashSVG, TimeSVG, MetroSVG } from '../../../../utils/getIcons'

const OpenTdcForm = (): JSX.Element => {
    // initial declarations
    const dispatch = useDispatch()

    // initial states
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [showTyC, setShowTyC] = useState(false)
    const defaultValuesRef = useRef({
        amount: '',
        term: '',
        checkModality: 'not',
        modality: '',
        checkTyC: false,
    })

    // redux states
    const { parametersList, loading: isLoading } = useSelector(settingTDCSelector)
    const { termsOrdered, parametersListOrdered } = useSelector(parametersAndTermsSelector)
    const { isAccountFai } = useSelector(faiAccountExistSelector)

    const newTdcSchema = tdcSchema.concat(
        yup.object({
            amount: yup
                .string()
                .matches(/^[1-9]?\d+$/, 'Por favor ingresar solo dígitos numéricos')
                .required('Campo obligatorio')
                .test(
                    'lessThan',
                    `Debe ser menor a $${formatValue(parametersList[0]?.amountMaximum || 0, 1)}`,
                    (v) => parseInt(v ?? '') <= parametersList[0]?.amountMaximum
                )
                .test(
                    'moreThan',
                    `Debe ser mayor a $${formatValue(parametersList[0]?.amountMinimum || 0, 1)}`,
                    (v) => parseInt(v ?? '') >= parametersList[0]?.amountMinimum
                ),
        })
    )

    // hooks
    const {
        handleSubmit,
        register,
        getValues,
        control,
        watch,
        setValue,
        redirection,
        prepareDataToBeSent,
    } = useTdcForm<TdcType>({
        defaultValues: defaultValuesRef.current,
        validationSchema: yupResolver(newTdcSchema),
    })
    const { errors, isValid } = useFormState({ control })

    const watchCheckModality = watch('checkModality')
    const watchTerm = watch('term')
    watch()
    const {
        numberOfPayments,
        netYield,
        effectiveRate,
        yieldBeforeRetention,
        periodRetention,
        yieldAfterRetention,
        ratePeriod,
    } = useSimulatorTDC({
        amount: parseFloat(getValues('amount')),
        term: parseInt(getValues('term')),
        modality: parseInt(getValues('modality') ?? ''),
    })

    // listeners
    useEffect(() => {
        dispatch(getFaiAccountBalanceAction())
        dispatch(actions.getSettingTdcAction())
    }, [])

    useEffect(() => {
        if (watchCheckModality === 'not') {
            setValue('modality', '')
        }
    }, [watchCheckModality])

    useEffect(() => {
        setValue('modality', '')
    }, [watchTerm])

    // events handlers
    const onSubmit = (): void => {
        setShowConfirmation(true)
    }

    return (
        <>
            <SimulatorTDC
                numberOfPayments={numberOfPayments}
                netYield={netYield}
                effectiveRate={effectiveRate}
            />

            <FormContent data-tour="create-tdc">
                {!isLoading ? (
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup data-tour="tdc-investment-field">
                            <FormLabel>Valor de la inversión</FormLabel>
                            <InputGroup hasValidation>
                                <InputGroupText $inputError={!!errors.amount}>
                                    <Image src={CashSVG} alt="icono" />
                                </InputGroupText>
                                <InputMask
                                    {...register('amount')}
                                    mask="[$]num"
                                    blocks={{
                                        num: {
                                            mask: Number,
                                            thousandsSeparator: '.',
                                            signed: false,
                                            scale: 0,
                                        },
                                    }}
                                    unmask={true}
                                    onAccept={(value) => {
                                        setValue('amount', value.toString(), {
                                            shouldValidate: true,
                                        })
                                    }}
                                    placeholder={`Valor mínimo de $${
                                        formatValue(parametersList[0]?.amountMinimum, 1) ||
                                        '500.000'
                                    }`}
                                    isInvalid={!!errors.amount}
                                />
                                <FormMessage type="invalid">
                                    {errors.amount && errors.amount.message}
                                </FormMessage>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup data-tour="tdc-term-field">
                            <FormLabel>Plazo</FormLabel>
                            <InputSelectGroup $haveImg $isError={!!errors.term}>
                                <Image src={TimeSVG} alt="clave" />
                                <FormSelect size="lg" {...register('term')}>
                                    <FormOption disabled value="" show>
                                        Selecciona una opción
                                    </FormOption>
                                    {termsOrdered.map((term) => (
                                        <FormOption key={`${term}-term`} value={term}>
                                            {term} días
                                        </FormOption>
                                    ))}
                                </FormSelect>
                            </InputSelectGroup>
                            <FormMessageSelect>
                                {errors.term && errors.term.message}
                            </FormMessageSelect>
                        </FormGroup>
                        <FormGroup data-tour="tdc-modality-check">
                            <FormLabel>¿Desea recibir el pago periódico de rendimientos?</FormLabel>
                            <InputGroupCheck>
                                <FormCheck
                                    label="Si"
                                    value="yes"
                                    type="radio"
                                    id="check-modality-yes"
                                    {...register('checkModality')}
                                    disabled={!isAccountFai}
                                />
                                <FormCheck
                                    label="No"
                                    value="not"
                                    type="radio"
                                    id="check-modality-not"
                                    {...register('checkModality')}
                                    disabled={!isAccountFai}
                                />
                            </InputGroupCheck>
                        </FormGroup>
                        {!isAccountFai && (
                            <AlertFai>
                                Si deseas recibir el pago periódico de tus rendimientos, ten en
                                cuenta que
                                <strong>necesitas una cuenta FAI.</strong>
                            </AlertFai>
                        )}
                        {isAccountFai &&
                            (getValues('checkModality') === 'not' ? (
                                <AlertInformation text="Recibirás el pago de rendimientos al vencimiento del TDC" />
                            ) : (
                                <>
                                    <FormGroup data-tour="tdc-modality-field">
                                        <FormLabel>Modalidad de rendimientos</FormLabel>
                                        <InputSelectGroup
                                            $haveImg
                                            $isError={!!errors.modality}
                                            hasValidation
                                        >
                                            <Image src={MetroSVG} alt="clave" top="15px" />
                                            <FormSelect size="lg" {...register('modality')}>
                                                <FormOption disabled value="" show>
                                                    Selecciona una opción
                                                </FormOption>
                                                {parametersListOrdered
                                                    .filter(
                                                        (parameter) =>
                                                            parameter.term ===
                                                            parseInt(getValues('term'))
                                                    )
                                                    .map((parameter) => (
                                                        <FormOption
                                                            key={`${parameter.modality}-modality`}
                                                            value={parameter.modalityDays}
                                                        >
                                                            {parameter.modality}
                                                        </FormOption>
                                                    ))}
                                            </FormSelect>
                                        </InputSelectGroup>
                                        <FormMessageSelect>
                                            {errors.modality && errors.modality.message}
                                        </FormMessageSelect>
                                    </FormGroup>
                                    <AlertFai
                                        title="Cuenta FAI"
                                        text="Recibirás el pago de tus rendimientos en tu cuenta FAI."
                                    />
                                </>
                            ))}
                        <ContainerCheck>
                            <CheckInputTdc {...register('checkTyC')} type="checkbox" />
                            <TermText>
                                Confirmo haber leído y estar de acuerdo con los
                                <LinkTyC
                                    onClick={() => {
                                        setShowTyC(true)
                                    }}
                                >
                                    términos y condiciones de TDC
                                </LinkTyC>
                            </TermText>
                        </ContainerCheck>
                        <ContainerButtons>
                            <Button
                                data-tour="finish-tdc"
                                variant="sub-dominant"
                                type="submit"
                                extend
                                disabled={!isValid}
                            >
                                Pagar TDC
                            </Button>
                            <Button
                                variant="outline-cancel"
                                extend
                                onClick={() => {
                                    redirection('/home-wallet')
                                }}
                            >
                                Cancelar
                            </Button>
                        </ContainerButtons>
                    </Form>
                ) : (
                    <Loading text="Aguarde un momento" />
                )}

                <TyCModal
                    showOpenTdc={showTyC}
                    handleClose={() => {
                        setShowTyC(false)
                    }}
                />
                <OpenTdcModal
                    showOpenTdc={showConfirmation}
                    handleClose={() => {
                        setShowConfirmation(false)
                    }}
                    cdtValue={parseFloat(getValues('amount'))}
                    handleNext={prepareDataToBeSent}
                    parameters={{
                        numberOfPayments,
                        effectiveRate,
                        yieldBeforeRetention,
                        periodRetention,
                        netYield,
                        yieldAfterRetention,
                        ratePeriod,
                    }}
                />
            </FormContent>
        </>
    )
}

export default OpenTdcForm
