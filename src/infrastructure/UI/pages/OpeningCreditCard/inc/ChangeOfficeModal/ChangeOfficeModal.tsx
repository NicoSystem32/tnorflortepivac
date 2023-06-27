import { ReactElement, useState, useRef, useEffect } from 'react'
import type { FieldErrorsImpl, UseFormRegister, UseFormSetValue } from 'react-hook-form'

// components
import { Button, Modal, DefaultSelect, InputSelectGroup } from '../../../../components'

// icons
import { CreditCardFlowSVG, MiniCitySVG, MiniStateSVG } from '../../../../utils/getIcons'

// styles
import {
    ModalContent,
    ContainerButtons,
    ContainerHeader,
    ModalImage,
    ModalTitle,
    Image,
} from './changeOfficeModal-styles'

import {
    FormGroup,
    FormLabel,
    FormMessageSelect,
    FormOption,
    FormSelect,
} from '../../openingCreditCard-styles'

// hooks
import { TwelfthStepType } from '../../hooks/useTwelfthStepForm'
import { getAllOfficesSelector, useSelector } from '../../../../../selectors'
import { getAllOfficesAction } from '../../../../../redux/openingTC'
import { useDispatch } from 'react-redux'

export interface ChangeOfficeModalProps {
    showChangeOffice: boolean
    onClose?: () => void
    onNext: () => void
    register: UseFormRegister<TwelfthStepType>
    errors: FieldErrorsImpl<TwelfthStepType>
    setValue: UseFormSetValue<TwelfthStepType>
}

const ChangeOfficeModal: React.FC<ChangeOfficeModalProps> = ({
    showChangeOffice,
    onClose,
    onNext,
    register,
    errors,
    setValue,
}): ReactElement => {
    const dispatch = useDispatch()
    const isValid = useRef(false)
    const [showSelect, setShowSelect] = useState({
        state: false,
        city: false,
        office: false,
    })
    const [fieldsSelect, setFieldsSelect] = useState({
        state: '',
        city: '',
        office: '',
    })

    const { data: allOffices } = useSelector(getAllOfficesSelector)

    isValid.current =
        fieldsSelect.state !== '' && fieldsSelect.city !== '' && fieldsSelect.office !== ''

    // listeners
    useEffect(() => {
        dispatch(getAllOfficesAction())
    }, [])

    useEffect(() => {
        setFieldsSelect({
            state: '',
            city: '',
            office: '',
        })
        setShowSelect({
            state: false,
            city: false,
            office: false,
        })
    }, [showChangeOffice])

    // handlers
    const onShowOrHideSearchSelect = ({ state, city, office }: Record<string, boolean>): void => {
        if (state !== undefined)
            return setShowSelect({
                ...showSelect,
                state,
            })

        if (city !== undefined)
            return setShowSelect({
                ...showSelect,
                city,
            })

        if (office !== undefined)
            return setShowSelect({
                ...showSelect,
                office,
            })
    }

    const getDepartments = (): string[] => {
        return allOffices.reduce((a: string[], office) => {
            if (!a.includes(office.oFCDepartment.toString())) {
                return [...a, office.oFCDepartment]
            }
            return [...a]
        }, [])
    }

    const getCities = (dep: string): string[] => {
        return allOffices
            .filter((of) => of.oFCDepartment === dep)
            .reduce((a: string[], office) => {
                if (!a.includes(office.oFCCity.toString())) {
                    return [...a, office.oFCCity]
                }
                return [...a]
            }, [])
    }

    const getOfficeAddress = (city: string): string[] => {
        return allOffices
            .filter((of) => of.oFCCity === city)
            .reduce((a: string[], office) => {
                if (!a.includes(office.oFCAddress.toString())) {
                    return [...a, office.oFCAddress]
                }
                return [...a]
            }, [])
    }

    return (
        <Modal show={showChangeOffice} onHide={onClose} keyboard={false} centered>
            <ModalContent>
                <ContainerHeader>
                    <ModalImage src={CreditCardFlowSVG} alt="logo" />
                    <ModalTitle>Modificar oficina</ModalTitle>
                </ContainerHeader>
                <FormGroup $heightSize="105px">
                    <FormLabel>Departamento</FormLabel>
                    <InputSelectGroup
                        $isError={!!errors.officeState}
                        $haveImg
                        onClick={() => onShowOrHideSearchSelect({ state: !showSelect.state })}
                    >
                        <Image src={MiniStateSVG} alt="clave" />
                        <FormSelect
                            size="lg"
                            readOnly
                            disabled={showSelect.state}
                            {...register('officeState')}
                            value={fieldsSelect.state}
                        >
                            <FormOption disabled value="" show>
                                Selecciona una opción
                            </FormOption>
                            {getDepartments().map((item) => (
                                <FormOption
                                    key={`${item}-first-option`}
                                    style={{ display: 'none' }}
                                >
                                    {item}
                                </FormOption>
                            ))}
                        </FormSelect>
                    </InputSelectGroup>
                    <FormMessageSelect>
                        {errors.officeState && errors.officeState.message}
                    </FormMessageSelect>
                    {showSelect.state && (
                        <DefaultSelect
                            onChange={(newValue: any) => {
                                setFieldsSelect({
                                    state: newValue.value,
                                    city: '',
                                    office: '',
                                })
                                onShowOrHideSearchSelect({ state: !showSelect.state })
                            }}
                            options={getDepartments().map((e) => ({
                                value: e.trim(),
                                label: e.trim(),
                            }))}
                        />
                    )}
                </FormGroup>

                <FormGroup>
                    <FormLabel>Ciudad</FormLabel>
                    <InputSelectGroup
                        $isError={!!errors.officeCity}
                        $haveImg
                        onClick={() => onShowOrHideSearchSelect({ city: !showSelect.city })}
                    >
                        <Image src={MiniCitySVG} alt="clave" />
                        <FormSelect
                            size="lg"
                            disabled={showSelect.city}
                            {...register('officeCity')}
                            value={fieldsSelect.city}
                        >
                            <FormOption disabled value="" show>
                                Selecciona una opción
                            </FormOption>
                            {getCities(fieldsSelect.state).map((item) => (
                                <FormOption
                                    key={`${item}-second-option}`}
                                    style={{ display: 'none' }}
                                >
                                    {item}
                                </FormOption>
                            ))}
                        </FormSelect>
                    </InputSelectGroup>
                    <FormMessageSelect>
                        {errors.officeCity && errors.officeCity.message}
                    </FormMessageSelect>
                    {showSelect.city && (
                        <DefaultSelect
                            onChange={(value: any) => {
                                setFieldsSelect((prevState) => ({
                                    ...prevState,
                                    city: value.value,
                                    office: '',
                                }))
                                onShowOrHideSearchSelect({ city: !showSelect.city })
                            }}
                            options={getCities(fieldsSelect.state).map((e) => ({
                                value: e.trim(),
                                label: e.trim(),
                            }))}
                        />
                    )}
                </FormGroup>
                <FormGroup>
                    <FormLabel>Oficina</FormLabel>
                    <InputSelectGroup
                        $isError={!!errors.officePlace}
                        $haveImg
                        onClick={() => onShowOrHideSearchSelect({ office: !showSelect.office })}
                    >
                        <Image src={MiniCitySVG} alt="clave" />
                        <FormSelect
                            size="lg"
                            disabled={showSelect.office}
                            {...register('officePlace')}
                            value={fieldsSelect.office}
                        >
                            <FormOption disabled value="" show>
                                Selecciona una opción
                            </FormOption>
                            {getOfficeAddress(fieldsSelect.city).map((item) => (
                                <FormOption
                                    key={`${item}-third-option`}
                                    style={{ display: 'none' }}
                                >
                                    {item}
                                </FormOption>
                            ))}
                        </FormSelect>
                    </InputSelectGroup>
                    <FormMessageSelect>
                        {errors.officePlace && errors.officePlace.message}
                    </FormMessageSelect>
                    {showSelect.office && (
                        <DefaultSelect
                            onChange={(value: any) => {
                                setFieldsSelect((prevState) => ({
                                    ...prevState,
                                    office: value.value,
                                }))
                                onShowOrHideSearchSelect({ office: !showSelect.office })
                            }}
                            options={getOfficeAddress(fieldsSelect.city).map((e) => ({
                                value: e.trim(),
                                label: e.trim(),
                            }))}
                        />
                    )}
                </FormGroup>
                <ContainerButtons>
                    <Button
                        variant="sub-dominant"
                        disabled={!isValid.current}
                        extend
                        onClick={() => {
                            setValue('officeState', fieldsSelect.state, { shouldValidate: true })
                            setValue('officeCity', fieldsSelect.city, { shouldValidate: true })
                            setValue('officePlace', fieldsSelect.office, { shouldValidate: true })
                            onNext()
                        }}
                    >
                        Elegir oficina
                    </Button>
                    <Button variant="outline-cancel" extend onClick={onClose}>
                        Cancelar
                    </Button>
                </ContainerButtons>
            </ModalContent>
        </Modal>
    )
}

export default ChangeOfficeModal
