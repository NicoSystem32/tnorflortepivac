import { ReactElement, useRef } from 'react'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormState } from 'react-hook-form'

// components
import { ControlsButtons, HeadStep, LoadingTC, NavigationStep } from '..'
import {
    Form,
    FormMessage,
    InputGroup,
    InputGroupText,
    InputMask,
    InputSelectGroup,
} from '../../../../components'
import {
    FormMessageSelect,
    FormLabel,
    FormOption,
    FormSelect,
    Image,
    FormGroup,
    SpaceStep,
} from '../../openingCreditCard-styles'

// styles
import {
    SixthStepWrapper,
    SixthStepContent,
    InputGroupCheck,
    FormCheck,
    FieldsMiddleCtr,
} from './sixthStep-styles'

// Icons
import { DollarDarkSVG, MiniBagSVG } from '../../../../utils/getIcons'

// hooks
import { sixthStepSchema, SixthStepType, useSixthStepForm } from '../../hooks/useSixthStepForm'

// selectors
import { getCreditCardDataPerStepSelector, getNomenclatorSelector } from '../../../../../selectors'

const SixthStep = (): ReactElement => {
    const { economicActivity } = useSelector(getNomenclatorSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { sixthStep } = createCreditCard

    const defaultValuesRef = useRef({
        economicActivity: sixthStep.economicActivity ?? '',
        mainIncome: sixthStep.mainIncome ?? '',
        additionalIncome: sixthStep.additionalIncome ?? '',
        haveAdditionalIncome: sixthStep.haveAdditionalIncome ?? 'not',
    })

    const {
        handleSubmit,
        register,
        watch,
        control,
        setValue,
        getValues,
        showLoadingView,
        isLoadingSave,
        preparedToSave,
        preparedToSend,
    } = useSixthStepForm({
        validationSchema: yupResolver(sixthStepSchema),
        defaultValues: defaultValuesRef.current,
    })
    const { errors, isValid } = useFormState({ control })
    watch()

    // handlers
    const onSubmit = (dataToSend: SixthStepType): void => {
        preparedToSend(dataToSend)
    }

    const onSave = (): void => {
        preparedToSave()
    }

    return (
        <>
            <NavigationStep saveAndExit onSave={onSave} />
            <SixthStepWrapper>
                <SixthStepContent>
                    <HeadStep title="Solicitud" paragraph="Cuéntanos a que te dedicas" />

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup $heightSize="105px">
                            <FormLabel>¿Cuál es tu actividad económica?</FormLabel>
                            <InputSelectGroup $isError={!!errors.economicActivity} $haveImg>
                                <Image src={MiniBagSVG} alt="clave" />
                                <FormSelect size="lg" {...register('economicActivity')}>
                                    <FormOption disabled value="" show>
                                        Selecciona una opción
                                    </FormOption>
                                    {economicActivity.map((item) => (
                                        <FormOption key={item.id}>{item.name}</FormOption>
                                    ))}
                                </FormSelect>
                            </InputSelectGroup>
                            <FormMessageSelect>
                                {errors.economicActivity && errors.economicActivity.message}
                            </FormMessageSelect>
                        </FormGroup>
                        <SpaceStep />
                        <FieldsMiddleCtr>
                            <FormGroup>
                                <FormLabel>
                                    Cuanto suman los ingresos de tu actividad económica principal
                                </FormLabel>
                                <InputGroup hasValidation>
                                    <InputGroupText $inputError={!!errors.mainIncome}>
                                        <Image src={DollarDarkSVG} alt="icono" />
                                    </InputGroupText>
                                    <InputMask
                                        {...register('mainIncome')}
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
                                        onAccept={(value) => {
                                            setValue('mainIncome', value.toString(), {
                                                shouldValidate: true,
                                            })
                                        }}
                                        defaultValue={defaultValuesRef.current.mainIncome}
                                        placeholder="Ej. $2'000.000"
                                        isInvalid={!!errors.mainIncome}
                                    />
                                    <FormMessage type="invalid">
                                        {errors.mainIncome && errors.mainIncome.message}
                                    </FormMessage>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>¿Tienes otros ingresos?</FormLabel>
                                <InputGroupCheck>
                                    <FormCheck
                                        label="Si"
                                        value="yes"
                                        type="radio"
                                        id="check-additional-income-yes"
                                        {...register('haveAdditionalIncome')}
                                    />
                                    <FormCheck
                                        label="No"
                                        value="not"
                                        type="radio"
                                        id="check-additional-income-not"
                                        {...register('haveAdditionalIncome')}
                                    />
                                </InputGroupCheck>
                            </FormGroup>
                        </FieldsMiddleCtr>
                        <SpaceStep />
                        {getValues('haveAdditionalIncome') === 'yes' && (
                            <FieldsMiddleCtr>
                                <FormGroup>
                                    <FormLabel>Cuanto suman tus ingresos adicionales</FormLabel>
                                    <InputGroup hasValidation>
                                        <InputGroupText $inputError={!!errors.additionalIncome}>
                                            <Image src={DollarDarkSVG} alt="icono" />
                                        </InputGroupText>
                                        <InputMask
                                            {...register('additionalIncome')}
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
                                            onAccept={(value) => {
                                                setValue('additionalIncome', value.toString(), {
                                                    shouldValidate: true,
                                                })
                                            }}
                                            defaultValue={defaultValuesRef.current.additionalIncome}
                                            placeholder="Ej. $2'000.000"
                                            isInvalid={!!errors.additionalIncome}
                                        />
                                        <FormMessage type="invalid">
                                            {errors.additionalIncome &&
                                                errors.additionalIncome.message}
                                        </FormMessage>
                                    </InputGroup>
                                </FormGroup>
                            </FieldsMiddleCtr>
                        )}
                        <SpaceStep />

                        <ControlsButtons
                            disable={!isValid}
                            isLoadingSave={isLoadingSave}
                            onSave={onSave}
                        />
                    </Form>
                    <LoadingTC show={showLoadingView} />
                </SixthStepContent>
            </SixthStepWrapper>
        </>
    )
}

export default SixthStep
