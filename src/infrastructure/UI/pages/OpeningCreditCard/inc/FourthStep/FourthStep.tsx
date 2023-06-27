import { ReactElement, useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'usehooks-ts'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormState } from 'react-hook-form'

// components
import {
    Form,
    FormMessage,
    FormControl,
    InputGroupText,
    InputGroup,
    InputMask,
    InputSelectGroup,
} from '../../../../components'
import { HeadStep, ControlsButtons, PersonalDataModal, NavigationStep } from '..'

// styles
import {
    FourthStepWrapper,
    FourthStepContent,
    ContainerCheck,
    CheckInputTdc,
    TermText,
    LinkTyC,
    FieldCtr,
    OptionalFieldLabelCtr,
    FormLabelDark,
    AddressCtr,
    AddressNumber,
    AddressCheckShow,
    CheckInputAddress,
    CheckInputAddressCtr,
    CheckInputLabel,
    CheckInputImg,
} from './fourthStep-styles'
import {
    SpaceStep,
    FormGroup,
    FormLabel,
    Image,
    FormSelect,
    FormOption,
    FormMessageSelect,
} from '../../openingCreditCard-styles'

// Icons
import {
    MiniCitySVG,
    MiniStateSVG,
    PickerMapSVG,
    MiniPhoneSVG,
    EditInfoSVG,
} from '../../../../utils/getIcons'

// hooks
import { useFourthStepForm, fourthStepSchema, FourthStepType } from '../../hooks/useFourthStepForm'
import { useReducerStep } from '../../hooks'

// selectos
import {
    getCreditCardDataPerStepSelector,
    getNomenclatorSelector,
    validateUserStateSelector,
} from '../../../../../selectors'

// models
import { Nomenclator } from '../../../../../../domain/models'

const FourthStep = (): ReactElement => {
    const [
        {
            feedback: { message },
        },
        dispatchStep,
    ] = useReducerStep()

    const matchMedia = useMediaQuery('(min-width: 1024px)')
    const [showModal, setShowModal] = useState<boolean>(false)

    // selectors
    const { validateUser } = useSelector(validateUserStateSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { states, cities, address } = useSelector(getNomenclatorSelector)
    const { fourthStep } = createCreditCard

    const defaultValuesRef = useRef({
        phone: fourthStep.phone ?? '',
        state: fourthStep.state ?? '',
        city: fourthStep.city ?? '',
        addressEdit: false,
        address1: fourthStep.address1 ?? '',
        address2: fourthStep.address2 ?? '',
        address3: fourthStep.address3 ?? '',
        additionalIndications: fourthStep.additionalIndications ?? '',
        neighborhood: fourthStep.neighborhood ?? '',
        checkTyC: fourthStep.checkTyC ?? false,
    })

    const {
        handleSubmit,
        register,
        watch,
        control,
        setValue,
        getValues,
        prepareToSend,
        prepareToSave,
        printInputValue,
        isLoadingSave,
        isLoadingSend,
    } = useFourthStepForm({
        validationSchema: yupResolver(fourthStepSchema),
        defaultValues: defaultValuesRef.current,
    })
    const { errors, isValid } = useFormState({ control })
    watch()

    // listeners
    useEffect(() => {
        return () => {
            dispatchStep({
                type: 'SET_FEEDBACK',
                payload: {
                    code: '',
                    message: '',
                },
            })
        }
    }, [])

    // handlers
    const onSubmit = (dataToSend: FourthStepType): void => {
        prepareToSend(dataToSend)
    }

    const onSave = (): void => {
        prepareToSave()
    }

    const onCloseOrOpenModal = (flag: boolean): void => {
        setShowModal(flag)
    }

    const findCitiesByState = (statesArray: Nomenclator[]): Nomenclator[] => {
        const stateSelected = statesArray.find((state) => state.name === getValues('state'))
        const citiesByStateSelected = cities.filter((city) => city.parent === stateSelected?.id)
        return stateSelected ? citiesByStateSelected : []
    }

    const isValidForm = (): boolean => {
        if (getValues('addressEdit') === false) {
            if (message.length > 0) {
                return !isValid && message !== '|||'
            }

            if (!validateUser?.address || validateUser?.address === '|||') {
                return !isValid && validateUser?.address !== '|||'
            }
        }
        return !isValid
    }

    return (
        <>
            <NavigationStep saveAndExit onSave={onSave} />
            <FourthStepWrapper>
                <FourthStepContent>
                    <HeadStep
                        title="Solicitud"
                        paragraph="Queremos mantenernos en contacto contigo, confirma que tus datos son correctos"
                    />
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <OptionalFieldLabelCtr width={!matchMedia ? 'w-full' : 'w-1/2'}>
                                <FormLabel>Teléfono</FormLabel>
                                <FormLabelDark>(Opcional)</FormLabelDark>
                            </OptionalFieldLabelCtr>
                            <FieldCtr widthSize={!matchMedia ? '100%' : '50%'}>
                                <InputGroup hasValidation>
                                    <InputGroupText $inputError={!!errors.phone}>
                                        <Image src={MiniPhoneSVG} alt="icono" />
                                    </InputGroupText>
                                    <InputMask
                                        {...register('phone')}
                                        mask="num"
                                        blocks={{
                                            num: {
                                                mask: '(000) 000 0000',
                                            },
                                        }}
                                        unmask={true}
                                        onAccept={(value) => {
                                            setValue('phone', value.toString(), {
                                                shouldValidate: true,
                                            })
                                        }}
                                        defaultValue={defaultValuesRef.current.phone}
                                        placeholder="Ej. (300)123 4567"
                                        isInvalid={!!errors.phone}
                                    />
                                    <FormMessage type="invalid">
                                        {errors.phone && errors.phone.message}
                                    </FormMessage>
                                </InputGroup>
                            </FieldCtr>
                        </FormGroup>
                        <FormGroup $heightSize="105px">
                            <FormLabel>Departamento</FormLabel>
                            <InputSelectGroup $isError={!!errors.state} $haveImg>
                                <Image src={MiniStateSVG} alt="clave" />
                                <FormSelect size="lg" {...register('state')}>
                                    <FormOption disabled value="" show>
                                        Selecciona una opción
                                    </FormOption>
                                    {states.map((state) => (
                                        <FormOption key={state.id}>{state.name}</FormOption>
                                    ))}
                                </FormSelect>
                            </InputSelectGroup>
                            <FormMessageSelect>
                                {errors.state && errors.state.message}
                            </FormMessageSelect>
                        </FormGroup>
                        <SpaceStep />
                        <FormGroup $heightSize="105px">
                            <FormLabel>Ciudad</FormLabel>
                            <InputSelectGroup $isError={!!errors.city} $haveImg>
                                <Image src={MiniCitySVG} alt="clave" />
                                <FormSelect size="lg" {...register('city')}>
                                    <FormOption disabled value="" show>
                                        Selecciona una opción
                                    </FormOption>
                                    {findCitiesByState(states).map((city) => (
                                        <FormOption key={city.id}>{city.name}</FormOption>
                                    ))}
                                </FormSelect>
                            </InputSelectGroup>
                            <FormMessageSelect>
                                {errors.city && errors.city.message}
                            </FormMessageSelect>
                        </FormGroup>
                        <SpaceStep />
                        <AddressCheckShow>
                            <FormGroup>
                                <FormLabel>Dirección</FormLabel>
                                <InputGroup>
                                    <InputGroupText />
                                    <FormControl
                                        placeholder="Dirección de residencia"
                                        value={printInputValue()}
                                        readOnly
                                    />
                                </InputGroup>
                            </FormGroup>
                            <CheckInputAddressCtr>
                                <CheckInputLabel htmlFor="addressEdit">
                                    <CheckInputImg src={EditInfoSVG} alt="Edit" />
                                </CheckInputLabel>
                                <CheckInputAddress
                                    id="addressEdit"
                                    type="checkbox"
                                    {...register('addressEdit')}
                                />
                            </CheckInputAddressCtr>
                        </AddressCheckShow>
                        <SpaceStep />
                        {getValues('addressEdit') && (
                            <AddressCtr>
                                <FormGroup>
                                    <FormLabel>Dirección de residencia</FormLabel>
                                    <FieldCtr width="w-full">
                                        <InputSelectGroup $isError={!!errors.address1}>
                                            <FormSelect size="lg" {...register('address1')}>
                                                <FormOption disabled value="" show>
                                                    Selecciona una opción
                                                </FormOption>
                                                {address.map((item) => (
                                                    <FormOption key={item.id}>
                                                        {item.name}
                                                    </FormOption>
                                                ))}
                                            </FormSelect>
                                        </InputSelectGroup>
                                        <FormMessageSelect>
                                            {errors.address1 && errors.address1.message}
                                        </FormMessageSelect>
                                    </FieldCtr>
                                </FormGroup>
                                <div>
                                    <FormGroup>
                                        <FieldCtr width="w-full">
                                            <InputGroup hasValidation>
                                                <InputGroupText
                                                    $inputError={!!errors.address2}
                                                ></InputGroupText>
                                                <FormControl
                                                    {...register('address2')}
                                                    placeholder="Ej. 123A"
                                                    isInvalid={!!errors.address2}
                                                />
                                                <FormMessage type="invalid">
                                                    {errors.address2 && errors.address2.message}
                                                </FormMessage>
                                            </InputGroup>
                                        </FieldCtr>
                                    </FormGroup>
                                    <AddressNumber>#</AddressNumber>
                                    <FormGroup>
                                        <FieldCtr width="w-full">
                                            <InputGroup hasValidation>
                                                <InputGroupText
                                                    $inputError={!!errors.address3}
                                                ></InputGroupText>
                                                <FormControl
                                                    {...register('address3')}
                                                    placeholder="Ej. 12 - 321"
                                                    isInvalid={!!errors.address3}
                                                />
                                                <FormMessage type="invalid">
                                                    {errors.address3 && errors.address3.message}
                                                </FormMessage>
                                            </InputGroup>
                                        </FieldCtr>
                                    </FormGroup>
                                </div>
                                <FormGroup>
                                    <OptionalFieldLabelCtr width="w-full">
                                        <FormLabel>Datos adicionales</FormLabel>
                                        <FormLabelDark>(Opcional)</FormLabelDark>
                                    </OptionalFieldLabelCtr>
                                    <FieldCtr width="w-full">
                                        <InputGroup hasValidation>
                                            <InputGroupText
                                                $inputError={!!errors.additionalIndications}
                                            />
                                            <FormControl
                                                {...register('additionalIndications')}
                                                placeholder="Casa o Torre 1, Apto 123"
                                                isInvalid={!!errors.additionalIndications}
                                            />
                                            <FormMessage type="invalid">
                                                {errors.additionalIndications &&
                                                    errors.additionalIndications.message}
                                            </FormMessage>
                                        </InputGroup>
                                    </FieldCtr>
                                </FormGroup>
                            </AddressCtr>
                        )}

                        <SpaceStep />
                        <FormGroup>
                            <FormLabel>Barrio</FormLabel>
                            <InputGroup hasValidation>
                                <InputGroupText $inputError={!!errors.neighborhood}>
                                    <Image src={PickerMapSVG} alt="icono" />
                                </InputGroupText>
                                <FormControl
                                    {...register('neighborhood')}
                                    placeholder="Puente Largo"
                                    isInvalid={!!errors.neighborhood}
                                />
                                <FormMessage type="invalid">
                                    {errors.neighborhood && errors.neighborhood.message}
                                </FormMessage>
                            </InputGroup>
                        </FormGroup>

                        <ContainerCheck>
                            <CheckInputTdc type="checkbox" {...register('checkTyC')} />
                            <TermText>
                                Autorizo a Cavipetrol para que consulte y reporte mi información en
                                centrales de riesgo y realice el tratamiento de mis datos
                                personales.
                                <LinkTyC onClick={() => onCloseOrOpenModal(true)}>Ver más.</LinkTyC>
                            </TermText>
                        </ContainerCheck>

                        <ControlsButtons
                            disable={isValidForm()}
                            isLoadingSave={isLoadingSave}
                            isLoading={isLoadingSend}
                            onSave={onSave}
                        />
                    </Form>

                    <PersonalDataModal
                        showOpenTdc={showModal}
                        handleClose={() => onCloseOrOpenModal(false)}
                        onContinue={() => onCloseOrOpenModal(false)}
                        disable={!getValues('checkTyC')}
                        checked={getValues('checkTyC')}
                        onChangeCheck={(e) =>
                            setValue('checkTyC', e.target.checked, { shouldValidate: true })
                        }
                    />
                </FourthStepContent>
            </FourthStepWrapper>
        </>
    )
}

export default FourthStep
