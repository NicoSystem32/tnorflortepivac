import { ReactElement, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormState } from 'react-hook-form'

// components
import {
    ChangeOfficeModal,
    ControlsButtons,
    HeadStep,
    NavigationStep,
    OfficeInfoCard,
    TyCModal,
} from '..'
import {
    Form,
    FormMessage,
    FormControl,
    InputGroupText,
    InputGroup,
    InputSelectGroup,
} from '../../../../components'

// styles
import {
    TwelfthStepWrapper,
    TwelfthStepCtr,
    ContainerCheck,
    CheckInputTdc,
    TermText,
    LinkTyC,
    InputGroupCheck,
    FormCheck,
    AddressCtr,
    AddressNumber,
    FieldCtr,
    OptionalFieldLabelCtr,
    AddressCheckShow,
    CheckInputAddressCtr,
    CheckInputLabel,
    CheckInputImg,
    CheckInputAddress,
} from './twelfthStep-styled'
import {
    FormGroup,
    FormLabel,
    Image,
    FormSelect,
    FormOption,
    FormMessageSelect,
} from '../../openingCreditCard-styles'
import { FormLabelDark } from '../FourthStep/fourthStep-styles'

// hooks
import {
    useTwelfthStepForm,
    TwelfthStepType,
    twelfthStepSchema,
} from '../../hooks/useTwelfthStepForm'

// Icons
import { EditInfoSVG, MiniCitySVG, MiniStateSVG, PickerMapSVG } from '../../../../utils/getIcons'

// selectors
import {
    getCreditCardDataPerStepSelector,
    getAllOfficesSelector,
    getNomenclatorSelector,
    validateUserStateSelector,
    useSelector,
    getClientValidationCCRequestSelector,
} from '../../../../../selectors'

// model
import { Nomenclator, OfficeData } from '../../../../../../domain/models'

const defaultValues = {
    billingDays: '30',
    placeToReceiveCard: 'office',
    extractCreditCardReceive: 'address-home',
    checkTyC: false,
    addressEdit: false,
    officeState: '',
    officeCity: '',
    officePlace: '',
    state: '',
    city: '',
    address1: '',
    address2: '',
    address3: '',
    additionalData: '',
    neighborhood: '',
    indications: '',
}

const TwelfthStep = (): ReactElement => {
    const matchMedia = useMediaQuery('(min-width: 1024px)')

    const [showTyCModal, setShowTyCModal] = useState<boolean>(false)
    const [showChangeOfficeModal, setShowChangeOfficeModal] = useState<boolean>(false)

    // selectors
    const { validateUser } = useSelector(validateUserStateSelector)
    const { clientValidation } = useSelector(getClientValidationCCRequestSelector)
    const { states, cities, address } = useSelector(getNomenclatorSelector)
    const { data: allOffices, loading: loadingOffices } = useSelector(getAllOfficesSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { twelfthStep } = createCreditCard

    const values = {
        billingDays: twelfthStep.billingDays,
        placeToReceiveCard: twelfthStep.placeToReceiveCard,
        extractCreditCardReceive: twelfthStep.extractCreditCardReceive,
        checkTyC: twelfthStep.checkTyC,
        addressEdit: false,
        officeState: twelfthStep.officeState,
        officeCity: twelfthStep.officeCity,
        officePlace: twelfthStep.officePlace,
        state: twelfthStep.state,
        city: twelfthStep.city,
        address1: twelfthStep.address1,
        address2: twelfthStep.address2,
        address3: twelfthStep.address3,
        additionalData: twelfthStep.additionalData,
        neighborhood: twelfthStep.neighborhood,
        indications: twelfthStep.indications,
    }

    const defaultValuesRef = useRef({
        ...defaultValues,
        ...JSON.parse(JSON.stringify(values, (...kv) => kv[1] ?? undefined)),
    })

    const {
        handleSubmit,
        register,
        watch,
        control,
        getValues,
        setValue,
        preparedToSave,
        preparedToSend,
        showAddressForm,
        isLoading,
        isLoadingContinue,
    } = useTwelfthStepForm({
        defaultValues: defaultValuesRef.current,
        validationSchema: yupResolver(twelfthStepSchema),
    })

    const { errors, isValid } = useFormState({ control })
    watch()

    // handlers
    const onSubmit = (dataToSend: TwelfthStepType): void => {
        preparedToSend(dataToSend)
    }

    const onCloseOrOpenTyCModal = (flag: boolean): void => {
        setShowTyCModal(flag)
    }

    const onCloseOrOpenChangeOfficeModal = (flag: boolean): void => {
        setShowChangeOfficeModal(flag)
    }

    const onSave = (): void => {
        preparedToSave()
    }

    const findCitiesByState = (statesArray: Nomenclator[]): Nomenclator[] => {
        const stateSelected = statesArray.find((state) => state.name === getValues('state'))
        const citiesByStateSelected = cities.filter((city) => city.parent === stateSelected?.id)
        return stateSelected ? citiesByStateSelected : []
    }

    const getOffice = (): OfficeData => {
        if (getValues('officePlace')) {
            return allOffices.filter(
                (office) => office.oFCAddress.trim() === getValues('officePlace')
            )[0]
        }
        return allOffices[1]
    }

    const isValidForm = (): boolean => {
        if (getValues('addressEdit') === false) {
            if (!validateUser?.address) {
                return !isValid && validateUser?.address !== '|||'
            }
        }
        return !isValid
    }

    const printInputValue = (): string => {
        if (validateUser?.address && validateUser?.address !== '|||') {
            return validateUser?.address.replaceAll('|', '  ')
        }

        if (clientValidation?.validationData) {
            if (
                'address' in clientValidation.validationData &&
                clientValidation.validationData.address !== '|||'
            ) {
                return clientValidation.validationData.address
                    ? clientValidation.validationData.address.replaceAll('|', '  ')
                    : ''
            }
        }
        return ''
    }

    return (
        <>
            <NavigationStep saveAndExit onSave={onSave} />
            <TwelfthStepWrapper>
                <TwelfthStepCtr>
                    <HeadStep title="Solicitud" paragraph="Vamos a configurar tu tarjeta" />
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <FormLabel $colorMode={matchMedia ? 'dark' : 'light'}>
                                Días de facturación
                            </FormLabel>
                            <InputGroupCheck>
                                <FormCheck
                                    label="30 de cada mes"
                                    value="30"
                                    type="radio"
                                    id="billingDays-30"
                                    {...register('billingDays')}
                                />
                                <FormCheck
                                    label="15 de cada mes"
                                    value="15"
                                    type="radio"
                                    id="billingDays-15"
                                    {...register('billingDays')}
                                />
                            </InputGroupCheck>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel $colorMode={matchMedia ? 'dark' : 'light'}>
                                ¿Dónde deseas recibir tu tarjeta?
                            </FormLabel>
                            <InputGroupCheck>
                                <FormCheck
                                    label="Oficina Cavipetrol"
                                    value="office"
                                    type="radio"
                                    id="office"
                                    {...register('placeToReceiveCard')}
                                />
                                <FormCheck
                                    label="Dirección de resistencia"
                                    value="home"
                                    type="radio"
                                    id="home"
                                    {...register('placeToReceiveCard')}
                                />
                            </InputGroupCheck>
                        </FormGroup>
                        <FormGroup>
                            {getValues('placeToReceiveCard') === 'office' && (
                                <>
                                    <FormLabel $colorMode={matchMedia ? 'dark' : 'light'}>
                                        Oficina asignada
                                    </FormLabel>
                                    <OfficeInfoCard
                                        office={getOffice()}
                                        loadingOffices={loadingOffices}
                                        onModifyOffice={() => onCloseOrOpenChangeOfficeModal(true)}
                                    />
                                </>
                            )}

                            {showAddressForm && (
                                <>
                                    <FormGroup $heightSize="105px">
                                        <FormLabel>Departamento</FormLabel>
                                        <InputSelectGroup $isError={!!errors.state} $haveImg>
                                            <Image src={MiniStateSVG} alt="clave" />
                                            <FormSelect size="lg" {...register('state')}>
                                                <FormOption disabled value="" show>
                                                    Selecciona una opción
                                                </FormOption>
                                                {states.map((state) => (
                                                    <FormOption key={state.id}>
                                                        {state.name}
                                                    </FormOption>
                                                ))}
                                            </FormSelect>
                                        </InputSelectGroup>
                                        <FormMessageSelect>
                                            {errors.state && errors.state.message}
                                        </FormMessageSelect>
                                    </FormGroup>
                                    <FormGroup $heightSize="105px">
                                        <FormLabel>Ciudad</FormLabel>
                                        <InputSelectGroup $isError={!!errors.city} $haveImg>
                                            <Image src={MiniCitySVG} alt="clave" />
                                            <FormSelect size="lg" {...register('city')}>
                                                <FormOption disabled value="" show>
                                                    Selecciona una opción
                                                </FormOption>
                                                {findCitiesByState(states).map((city) => (
                                                    <FormOption key={city.id}>
                                                        {city.name}
                                                    </FormOption>
                                                ))}
                                            </FormSelect>
                                        </InputSelectGroup>
                                        <FormMessageSelect>
                                            {errors.city && errors.city.message}
                                        </FormMessageSelect>
                                    </FormGroup>
                                    <AddressCheckShow>
                                        <FormGroup>
                                            <FormLabel>Dirección</FormLabel>
                                            <InputGroup>
                                                <InputGroupText />
                                                <FormControl
                                                    placeholder="Este campo es solo de lectura"
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
                                    {getValues('addressEdit') && (
                                        <AddressCtr>
                                            <FormGroup>
                                                <FormLabel>Dirección de residencia</FormLabel>
                                                <FieldCtr width="w-full">
                                                    <InputSelectGroup $isError={!!errors.address1}>
                                                        <FormSelect
                                                            size="lg"
                                                            {...register('address1')}
                                                        >
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
                                                            />
                                                            <FormControl
                                                                {...register('address2')}
                                                                placeholder="Ej. 123A"
                                                                isInvalid={!!errors.address2}
                                                            />
                                                            <FormMessage type="invalid">
                                                                {errors.address2 &&
                                                                    errors.address2.message}
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
                                                            />
                                                            <FormControl
                                                                {...register('address3')}
                                                                placeholder="Ej. 12 - 321"
                                                                isInvalid={!!errors.address3}
                                                            />
                                                            <FormMessage type="invalid">
                                                                {errors.address3 &&
                                                                    errors.address3.message}
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
                                                            $inputError={!!errors.additionalData}
                                                        >
                                                            <Image src={PickerMapSVG} alt="icono" />
                                                        </InputGroupText>
                                                        <FormControl
                                                            {...register('additionalData')}
                                                            placeholder="Casa o Torre 1, Apto 123"
                                                            isInvalid={!!errors.additionalData}
                                                        />
                                                        <FormMessage type="invalid">
                                                            {errors.additionalData &&
                                                                errors.additionalData.message}
                                                        </FormMessage>
                                                    </InputGroup>
                                                </FieldCtr>
                                            </FormGroup>
                                        </AddressCtr>
                                    )}
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
                                    <FormGroup>
                                        <OptionalFieldLabelCtr width={'w-full'}>
                                            <FormLabel>Indicaciones</FormLabel>
                                            <FormLabelDark>(Opcional)</FormLabelDark>
                                        </OptionalFieldLabelCtr>
                                        <InputGroup hasValidation>
                                            <InputGroupText $inputError={!!errors.indications} />
                                            <FormControl
                                                {...register('indications')}
                                                placeholder="¿Algo que debamos tener en cuenta?"
                                                isInvalid={!!errors.indications}
                                            />
                                            <FormMessage type="invalid">
                                                {errors.indications && errors.indications.message}
                                            </FormMessage>
                                        </InputGroup>
                                    </FormGroup>
                                </>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                ¿Cómo deseas recibir el extracto de tu tarjeta de crédito?
                            </FormLabel>
                            <InputGroupCheck>
                                <FormCheck
                                    label="Entrega en dirección de residencia"
                                    value="address-home"
                                    type="radio"
                                    id="address-home"
                                    {...register('extractCreditCardReceive')}
                                />
                                <FormCheck
                                    label="Digital (entrega vía correo electrónico)"
                                    value="address-email"
                                    type="radio"
                                    id="address-email"
                                    {...register('extractCreditCardReceive')}
                                />
                            </InputGroupCheck>
                        </FormGroup>

                        <ContainerCheck>
                            <CheckInputTdc type="checkbox" {...register('checkTyC')} />
                            <TermText>
                                Confirmo haber leído los
                                <LinkTyC onClick={() => onCloseOrOpenTyCModal(true)}>
                                    Términos,condiciones y políticas para la solicitud de productos
                                </LinkTyC>
                            </TermText>
                        </ContainerCheck>
                        <ControlsButtons
                            disable={isValidForm()}
                            isLoadingSave={isLoading}
                            isLoading={isLoadingContinue}
                            onSave={onSave}
                        />
                    </Form>

                    <TyCModal
                        showModalTC={showTyCModal}
                        handleClose={() => onCloseOrOpenTyCModal(false)}
                        onContinue={() => onCloseOrOpenTyCModal(false)}
                        disable={!getValues('checkTyC')}
                        checked={getValues('checkTyC')}
                        onChangeCheck={(e) =>
                            setValue('checkTyC', e.target.checked, { shouldValidate: true })
                        }
                    />
                    <ChangeOfficeModal
                        showChangeOffice={showChangeOfficeModal}
                        onNext={() => onCloseOrOpenChangeOfficeModal(false)}
                        onClose={() => onCloseOrOpenChangeOfficeModal(false)}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />
                </TwelfthStepCtr>
            </TwelfthStepWrapper>
        </>
    )
}

export default TwelfthStep
