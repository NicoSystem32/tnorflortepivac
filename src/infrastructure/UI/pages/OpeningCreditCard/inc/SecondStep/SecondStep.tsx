import { ReactElement, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormState } from 'react-hook-form'

// components
import {
    Form,
    FormMessage,
    InputGroupText,
    InputGroup,
    InputMask,
    FormControl,
} from '../../../../components'
import { ButtonsCtr, ErrorCRMModal, HeadStep, NavigationStep } from '..'

// styles
import { Image, FormGroup, FormLabel } from '../../openingCreditCard-styles'
import { SecondStepWrapper, SecondStepContent } from './secondStep-styles'

// hooks
import { useSecondStepForm, secondStepSchema, SecondStepType } from '../../hooks/useSecondStepForm'
import { useReducerStep } from '../../hooks'

// Icons
import { MiniCellPhoneSVG, MiniMailSVG } from '../../../../utils/getIcons'

// actions
import { validateCRMAction, resetValidateCRMAction } from '../../../../../redux/openingTC'

// selectors
import { getCreditCardDataPerStepSelector } from '../../../../../selectors'

const SecondStep = (): ReactElement => {
    const dispatch = useDispatch()
    const dispatchStep = useReducerStep()[1]

    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { firstStep, secondStep } = createCreditCard

    const defaultValuesRef = useRef({
        cellPhone: secondStep.cellPhone ?? '',
        email: secondStep.email ?? '',
    })

    const {
        handleSubmit,
        register,
        watch,
        control,
        setValue,
        showModalError,
        onHireModalError,
        onSuccessValidateCRM,
        loadingSendCode,
        loadingCRM,
        errorCRM,
    } = useSecondStepForm({
        validationSchema: yupResolver(secondStepSchema),
        defaultValues: defaultValuesRef.current,
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
    const onSubmit = ({ cellPhone, email }: SecondStepType): void => {
        dispatch(
            validateCRMAction(
                {
                    StepDataValidation: 2,
                    Document: firstStep.identification ?? '',
                    DocumentExpeditionDate: `${firstStep.expeditionDocumentYear}-${firstStep.expeditionDocumentMonth}-${firstStep.expeditionDocumentDay}`,
                    DocumentExpeditionCity: firstStep.dispatchCity ?? '',
                    Phone: cellPhone,
                    Email: email,
                },
                (resp) => {
                    onSuccessValidateCRM(email, cellPhone, resp)
                }
            )
        )
    }

    return (
        <>
            <NavigationStep />
            <SecondStepWrapper>
                <SecondStepContent>
                    <HeadStep
                        title="Validación"
                        paragraph="Por seguridad confirmar tus datos de contacto"
                    />
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <FormLabel>Celular</FormLabel>
                            <InputGroup hasValidation>
                                <InputGroupText $inputError={!!errors.cellPhone}>
                                    <Image src={MiniCellPhoneSVG} alt="icono" />
                                </InputGroupText>
                                <InputMask
                                    {...register('cellPhone')}
                                    mask="num"
                                    blocks={{
                                        num: {
                                            mask: '000 000 0000',
                                        },
                                    }}
                                    unmask={true}
                                    onAccept={(value) => {
                                        setValue('cellPhone', value.toString(), {
                                            shouldValidate: true,
                                        })
                                    }}
                                    defaultValue={defaultValuesRef.current.cellPhone}
                                    placeholder="Ej. 300 123 4567"
                                    isInvalid={!!errors.cellPhone}
                                />
                                <FormMessage type="invalid">
                                    {errors.cellPhone && errors.cellPhone.message}
                                </FormMessage>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Correo electrónico</FormLabel>
                            <InputGroup hasValidation>
                                <InputGroupText $inputError={!!errors.email}>
                                    <Image src={MiniMailSVG} alt="icono" />
                                </InputGroupText>
                                <FormControl
                                    {...register('email')}
                                    placeholder="Ej. nombre@dominio.com"
                                    isInvalid={!!errors.email}
                                />
                                <FormMessage type="invalid">
                                    {errors.email && errors.email.message}
                                </FormMessage>
                            </InputGroup>
                        </FormGroup>

                        <ButtonsCtr
                            disabled={!isValid || loadingSendCode || loadingCRM}
                            isLoading={loadingSendCode || loadingCRM}
                        />
                    </Form>
                    <ErrorCRMModal show={showModalError} onClose={onHireModalError} />
                </SecondStepContent>
            </SecondStepWrapper>
        </>
    )
}

export default SecondStep
