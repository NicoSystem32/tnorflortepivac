import { ChangeEvent, ReactElement, useCallback, useRef } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormState } from 'react-hook-form'
import { FileRejection } from 'react-dropzone'

// base components
import { Form, UploadFile } from '../../../../components'
import { ControlsButtons, HeadStep, ListFilesAndProgressBar, NavigationStep } from '..'

// styles
import {
    FourteenthStepWrapper,
    FourteenthStepContent,
    UploadInput,
    UploadSpan,
    UploadLabel,
} from './fourteenthStep-styles'
import { TitleStep } from '../../openingCreditCard-styles'

// hooks
import {
    useFourteenthStepForm,
    FourteenthStepType,
    fourteenthStepSchema,
} from '../../hooks/useFourteenthStepForm'

// utils
import { getBase64 } from '../../../../utils/misc'

const FourteenthStep = (): ReactElement => {
    const defaultValuesRef = useRef<{ formatFile: File[] | null }>({
        formatFile: null,
    })

    const { handleSubmit, register, watch, control, getValues, setValue } = useFourteenthStepForm({
        validationSchema: yupResolver(fourteenthStepSchema),
        defaultValues: defaultValuesRef.current,
    })
    const { ref, onBlur, name } = register('formatFile')

    const { isValid } = useFormState({ control })
    watch()

    const onDrop = useCallback((accFiles: File[], _: FileRejection[]) => {
        if (getValues('formatFile')) {
            setValue('formatFile', [...getValues('formatFile'), ...accFiles], {
                shouldValidate: true,
            })
        } else {
            setValue('formatFile', [...accFiles], {
                shouldValidate: true,
            })
        }
    }, [])

    const listFiles = (files: File[] | null): File[] => {
        if (!files) {
            return []
        }

        return [...files]
    }

    // handlers
    const onSubmit = async ({ formatFile }: FourteenthStepType): Promise<void> => {
        try {
            await getBase64(formatFile[0])
        } catch (error) {
            console.error(error)
        }
    }

    const onDelete = (nameFile: string): void => {
        if (getValues('formatFile')) {
            setValue(
                'formatFile',
                [...getValues('formatFile')].filter((file) => file.name !== nameFile),
                { shouldValidate: true }
            )
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!event.currentTarget.files) {
            return
        }

        if (getValues('formatFile')) {
            setValue(
                'formatFile',
                [...getValues('formatFile'), ...Array.from(event.currentTarget.files)],
                {
                    shouldValidate: true,
                }
            )
        } else {
            setValue('formatFile', [...Array.from(event.currentTarget.files)], {
                shouldValidate: true,
            })
        }
    }

    const onSave = (): void => {}

    return (
        <>
            <NavigationStep />
            <FourteenthStepWrapper>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FourteenthStepContent>
                        <HeadStep
                            title="Documentos"
                            paragraph="¡Ya casi todo está listo! Necesitamos algunos documentos para terminar tu solicitud"
                        />
                        <TitleStep>Por favor adjunta los últimos X desprendibles de pago</TitleStep>

                        {getValues('formatFile') && (
                            <ListFilesAndProgressBar
                                files={listFiles(getValues('formatFile'))}
                                onDelete={(nameFile) => onDelete(nameFile)}
                            />
                        )}

                        <UploadFile
                            fieldTexts={{
                                titleDnD:
                                    'Arrastra y suelta los archivos sobre esta área delimitada',
                                textExtension: 'xlsx, xlsm, xlsb, xltx de máximo 15mb',
                                instructionText:
                                    'O si prefieres busca tus archivos desde tu dispositivo',
                            }}
                            accept={{
                                'application/pdf': [],
                                'image/jpeg': ['.jpeg', '.png'],
                            }}
                            maxSize={15000000}
                            onDrop={onDrop}
                            multiple
                        >
                            <UploadLabel htmlFor="upload">
                                <UploadInput
                                    type="file"
                                    id="upload"
                                    multiple
                                    accept=".pdf,.jpeg,.jpg,.png"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    name={name}
                                    ref={ref}
                                />
                                <UploadSpan>Elegir archivo</UploadSpan>
                            </UploadLabel>
                        </UploadFile>

                        <ControlsButtons disable={!isValid} onSave={onSave} />
                    </FourteenthStepContent>
                </Form>
            </FourteenthStepWrapper>
        </>
    )
}

export default FourteenthStep
