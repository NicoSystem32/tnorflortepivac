import { ReactElement, useRef } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormState } from 'react-hook-form'

// components
import { Form, InputSelectGroup } from '../../../../components'
import { HeadStep, ControlsButtons, NavigationStep } from '..'

// styles
import { FifthStepWrapper, FifthStepContent } from './fifthStep-styles'
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
import { MiniRingSVG } from '../../../../utils/getIcons'

// hooks
import { fifthStepSchema, FifthStepType, useFifthStepForm } from '../../hooks/useFifthStepForm'

// selectors
import {
    getCreditCardDataPerStepSelector,
    getNomenclatorSelector,
    useSelector,
} from '../../../../../selectors'

const FifthStep = (): ReactElement => {
    // selectors
    const { civilStatus } = useSelector(getNomenclatorSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { fifthStep } = createCreditCard

    const defaultValuesRef = useRef({
        civilStatus: fifthStep.civilStatus ?? '',
    })

    const {
        handleSubmit,
        register,
        watch,
        control,
        prepareToSend,
        prepareToSave,
        isLoading,
        isLoadingContinue,
    } = useFifthStepForm({
        validationSchema: yupResolver(fifthStepSchema),
        defaultValues: defaultValuesRef.current,
    })

    const { errors, isValid } = useFormState({ control })
    watch()

    // handlers
    const onSubmit = (dataToSend: FifthStepType): void => {
        prepareToSend(dataToSend)
    }

    const onSave = (): void => {
        prepareToSave()
    }

    return (
        <>
            <NavigationStep saveAndExit onSave={onSave} />
            <FifthStepWrapper>
                <FifthStepContent>
                    <HeadStep title="Solicitud" paragraph="Cuéntanos un poco más sobre ti" />
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup $heightSize="105px">
                            <FormLabel>¿Cuál es tu estado civil?</FormLabel>
                            <InputSelectGroup $isError={!!errors.civilStatus} $haveImg>
                                <Image src={MiniRingSVG} alt="clave" />
                                <FormSelect size="lg" {...register('civilStatus')}>
                                    <FormOption disabled value="" show>
                                        Selecciona una opción
                                    </FormOption>
                                    {civilStatus.map((status) => (
                                        <FormOption key={status.id}>{status.name}</FormOption>
                                    ))}
                                </FormSelect>
                            </InputSelectGroup>
                            <FormMessageSelect>
                                {errors.civilStatus && errors.civilStatus.message}
                            </FormMessageSelect>
                        </FormGroup>
                        <SpaceStep />

                        <ControlsButtons
                            disable={!isValid || isLoadingContinue}
                            isLoadingSave={isLoading}
                            isLoading={isLoadingContinue}
                            onSave={onSave}
                        />
                    </Form>
                </FifthStepContent>
            </FifthStepWrapper>
        </>
    )
}

export default FifthStep
