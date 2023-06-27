import { ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormState } from 'react-hook-form'

// components
import {
    Form,
    FormControl,
    FormMessage,
    InputGroupText,
    InputGroup,
    InputSelectGroup,
} from '../../../../components'
import { ButtonsCtr, HeadStep, ErrorCRMModal, NavigationStep } from '..'

// styles
import { FirstStepWrapper, FirstStepContent, SelectCtr } from './firstStep-styles'
import {
    SpaceStep,
    FormGroup,
    FormLabel,
    Image,
    FormSelect,
    FormOption,
    FormMessageSelect,
} from '../../openingCreditCard-styles'

// hooks
import { useFirstStepForm, firstStepSchema, FirsStepType } from '../../hooks/useFirstStepForm'
import { useReducerStep } from '../../hooks'

// Icons
import { MiniIdentificationSVG, PickerMapSVG } from '../../../../utils/getIcons'

// actions
import { resetValidateCRMAction } from '../../../../../redux/openingTC'

const FirstStep = (): ReactElement => {
    const dispatch = useDispatch()
    const dispatchStep = useReducerStep()[1]
    const {
        handleSubmit,
        register,
        watch,
        control,
        getValues,
        buildTheLastYears,
        buildTheMonthsInYear,
        buildTheDaysInMonth,
        onHireModalError,
        showModalError,
        validateCRM,
        loading,
        errorCRM,
    } = useFirstStepForm({
        validationSchema: yupResolver(firstStepSchema),
    })

    const { errors, isValid } = useFormState({ control })
    watch()

    // listener
    useEffect(() => {
        return () => {
            dispatch(resetValidateCRMAction())
        }
    }, [])

    useEffect(() => {
        if (errorCRM.errorData && errorCRM.errorData.response === '500') {
            dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 18,
                },
            })
        }
    }, [errorCRM])

    // handlers
    const onSubmit = ({ identification, day, year, month, city }: FirsStepType): void => {
        validateCRM({ identification, day, year, month, city })
    }

    return (
        <>
            <NavigationStep />
            <FirstStepWrapper>
                <FirstStepContent>
                    <HeadStep
                        title="Validación"
                        paragraph="Para comenzar ingresa los datos de tu documento."
                    />
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <FormLabel>Cédula de ciudadanía / extranjería</FormLabel>
                            <InputGroup hasValidation>
                                <InputGroupText $inputError={!!errors.identification}>
                                    <Image src={MiniIdentificationSVG} alt="icono" />
                                </InputGroupText>
                                <FormControl
                                    {...register('identification')}
                                    placeholder="Ej. 123123123"
                                    isInvalid={!!errors.identification}
                                />
                                <FormMessage type="invalid">
                                    {errors.identification && errors.identification.message}
                                </FormMessage>
                            </InputGroup>
                        </FormGroup>
                        <SpaceStep />
                        <FormLabel>Fecha de expedición</FormLabel>
                        <SelectCtr>
                            <FormGroup>
                                <InputSelectGroup $isError={!!errors.day}>
                                    <FormSelect size="lg" {...register('day')}>
                                        <FormOption disabled value="" show>
                                            Día
                                        </FormOption>
                                        {[
                                            ...Array(
                                                buildTheDaysInMonth(
                                                    getValues('year'),
                                                    getValues('month')
                                                )
                                            ),
                                        ].map((item, i) => {
                                            const unique = `${item}-${i}`
                                            return <FormOption key={unique}>{i + 1}</FormOption>
                                        })}
                                    </FormSelect>
                                </InputSelectGroup>
                                <FormMessageSelect>
                                    {errors.day && errors.day.message}
                                </FormMessageSelect>
                            </FormGroup>
                            <FormGroup>
                                <InputSelectGroup $isError={!!errors.month}>
                                    <FormSelect size="lg" {...register('month')}>
                                        <FormOption disabled value="" show>
                                            Mes
                                        </FormOption>
                                        {buildTheMonthsInYear().map((month) => (
                                            <FormOption key={month.name} value={month.numberMonth}>
                                                {month.name}
                                            </FormOption>
                                        ))}
                                    </FormSelect>
                                </InputSelectGroup>
                                <FormMessageSelect>
                                    {errors.month && errors.month.message}
                                </FormMessageSelect>
                            </FormGroup>
                            <FormGroup>
                                <InputSelectGroup $isError={!!errors.year}>
                                    <FormSelect size="lg" {...register('year')}>
                                        <FormOption disabled value="" show>
                                            Año
                                        </FormOption>
                                        {buildTheLastYears(100).map((year) => (
                                            <FormOption key={year} value={year}>
                                                {year}
                                            </FormOption>
                                        ))}
                                    </FormSelect>
                                </InputSelectGroup>
                                <FormMessageSelect>
                                    {errors.year && errors.year.message}
                                </FormMessageSelect>
                            </FormGroup>
                        </SelectCtr>
                        <SpaceStep />
                        <FormGroup>
                            <FormLabel>Ciudad de expedición</FormLabel>
                            <InputGroup hasValidation>
                                <InputGroupText $inputError={!!errors.city}>
                                    <Image src={PickerMapSVG} alt="icono" />
                                </InputGroupText>
                                <FormControl
                                    {...register('city')}
                                    placeholder="Ej. Bogotá D.C"
                                    isInvalid={!!errors.city}
                                />
                                <FormMessage type="invalid">
                                    {errors.city && errors.city.message}
                                </FormMessage>
                            </InputGroup>
                        </FormGroup>

                        <SpaceStep />

                        <ButtonsCtr disabled={!isValid || loading} isLoading={loading} />
                    </Form>

                    <ErrorCRMModal show={showModalError} onClose={onHireModalError} />
                </FirstStepContent>
            </FirstStepWrapper>
        </>
    )
}

export default FirstStep
