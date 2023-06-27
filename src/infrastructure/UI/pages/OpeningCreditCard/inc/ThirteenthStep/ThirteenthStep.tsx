import { ChangeEvent, ReactElement, useState, useCallback, useRef } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormState } from 'react-hook-form'
import { FileRejection } from 'react-dropzone'
import { useDispatch } from 'react-redux'

// base components
import { Form, UploadFile } from '../../../../components'
import { ControlsButtons, HeadStep, ListFilesAndProgressBar, NavigationStep } from '..'

// styles
import {
    ThirteenthStepWrapper,
    ThirteenthStepContent,
    UploadInput,
    UploadSpan,
    UploadLabel,
} from './thirteenthStep-styles'
import { TitleStep } from '../../openingCreditCard-styles'

// hooks
import {
    useThirteenthStepForm,
    ThirteenthStepType,
    thirteenthStepSchema,
} from '../../hooks/useThirteenthStepForm'
import { useReducerStep } from '../../hooks'

// utils
import { getBase64 } from '../../../../utils/misc'

// actions
import { savePdfIdAction } from '../../../../../redux/openingTC'

// selectors
import {
    getClientValidationCCRequestSelector,
    validateUserStateSelector,
    useSelector,
} from '../../../../../selectors'

// models
import { SaveTCContact } from '../../../../../../domain/models'

const urlFilePng = 'data:image/png;base64,'
const urlFileJpeg = 'data:image/jpeg;base64,'
const urlFilePdf = 'data:application/pdf;base64,'

const ThirteenthStep = (): ReactElement => {
    const dispatch = useDispatch()
    const dispatchStep = useReducerStep()[1]
    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [isLoadingContinue, setIsLoadingContinue] = useState(false)

    const MAX_SIZE = 15000000

    // Selectors
    const { clientValidation } = useSelector(getClientValidationCCRequestSelector)
    const { validateUser } = useSelector(validateUserStateSelector)

    const defaultValuesRef = useRef({
        formatFile: null,
    })

    const { handleSubmit, register, watch, control, setValue, getValues, redirection } =
        useThirteenthStepForm({
            validationSchema: yupResolver(thirteenthStepSchema),
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
    const onSubmit = async ({ formatFile }: ThirteenthStepType): Promise<void> => {
        const file = formatFile as File[]
        setIsLoadingContinue(true)
        await dispatchSaveFile(file, () => {
            setIsLoadingContinue(false)
            dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 17,
                },
            })
        })
    }

    const onDelete = (nameToDelete: string): void => {
        if (getValues('formatFile')) {
            setValue(
                'formatFile',
                [...getValues('formatFile')].filter((file) => file.name !== nameToDelete),
                { shouldValidate: true }
            )
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!event.currentTarget.files) {
            return
        }

        if (getValues('formatFile')) {
            if (event.currentTarget.files[0].size < MAX_SIZE) {
                setValue(
                    'formatFile',
                    [...getValues('formatFile'), ...Array.from(event.currentTarget.files)],
                    {
                        shouldValidate: true,
                    }
                )
            }
        } else {
            if (event.currentTarget.files[0].size < MAX_SIZE) {
                setValue('formatFile', [...Array.from(event.currentTarget.files)], {
                    shouldValidate: true,
                })
            }
        }
    }

    const onSave = async ({ formatFile }: ThirteenthStepType): Promise<void> => {
        const file = formatFile as File[]
        setIsLoadingSave(true)
        await dispatchSaveFile(file, () => {
            setIsLoadingSave(false)
            redirection('/home-wallet')
        })
    }

    const setIdRequest = (): number => {
        if (clientValidation?.validationData) {
            return 'id' in clientValidation.validationData ? clientValidation.validationData.id : 0
        }
        return validateUser?.id ?? 0
    }

    const dispatchSaveFile = async (
        formatFile: File[],
        callback?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact | null
        }) => void
    ): Promise<void> => {
        const filesBs64Arr = await buildArrFile(formatFile)

        dispatch(
            savePdfIdAction(
                {
                    RequestStep: '20',
                    Base64File: filesBs64Arr,
                    IdCreditCardRequest: setIdRequest(),
                },
                callback
            )
        )
    }

    const buildArrFile = async (files: File[]): Promise<string[]> => {
        const filesBs64Arr: string[] = []
        for (const i of files) {
            const bs64 = await getBase64(i)
            const bs64format = formatBs64(bs64 as string)
            filesBs64Arr.push(bs64format)
        }

        return filesBs64Arr
    }

    const formatBs64 = (bs64: string): string =>
        bs64.replace(urlFilePng, '').replace(urlFilePdf, '').replace(urlFileJpeg, '')

    return (
        <>
            <NavigationStep />
            <ThirteenthStepWrapper>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ThirteenthStepContent>
                        <HeadStep
                            title="Documentos"
                            paragraph="¡Ya casi todo está listo! Necesitamos algunos documentos para terminar tu solicitud"
                        />
                        <TitleStep>
                            Por favor adjunta la fotocopia de tú cédula por los dos lados
                        </TitleStep>

                        {getValues('formatFile') && (
                            <ListFilesAndProgressBar
                                files={listFiles(getValues('formatFile'))}
                                onDelete={(nameToDelete) => onDelete(nameToDelete)}
                            />
                        )}

                        <UploadFile
                            fieldTexts={{
                                titleDnD:
                                    'Arrastra y suelta los archivos sobre esta área delimitada',
                                textExtension: 'JPG, PNG, PDF de máximo 15mb',
                                instructionText:
                                    'O si prefieres busca tus archivos desde tu dispositivo',
                            }}
                            accept={{
                                'application/pdf': [],
                                'image/jpeg': ['.jpeg', '.png'],
                            }}
                            maxSize={MAX_SIZE}
                            onDrop={onDrop}
                            multiple={false}
                        >
                            <UploadLabel htmlFor="upload">
                                <UploadInput
                                    type="file"
                                    id="upload"
                                    multiple={false}
                                    accept=".pdf,.jpeg,.jpg,.png"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    name={name}
                                    ref={ref}
                                />
                                <UploadSpan>Elegir archivo</UploadSpan>
                            </UploadLabel>
                        </UploadFile>

                        <ControlsButtons
                            disable={
                                getValues('formatFile')
                                    ? getValues('formatFile').length <= 0
                                    : !isValid
                            }
                            isLoading={isLoadingContinue}
                            isLoadingSave={isLoadingSave}
                            onSave={() => {
                                onSave(getValues())
                            }}
                            nextText="Enviar"
                        />
                    </ThirteenthStepContent>
                </Form>
            </ThirteenthStepWrapper>
        </>
    )
}

export default ThirteenthStep
