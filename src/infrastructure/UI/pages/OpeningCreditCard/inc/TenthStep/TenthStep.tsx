import { ChangeEvent, ReactElement, useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormState } from 'react-hook-form'
import { FileRejection } from 'react-dropzone'
import { AxiosResponse } from 'axios'

// components
import { Button, Form, UploadFile } from '../../../../components'
import { NavigationStep, FileAndProgressBar } from '..'

// styles
import {
    TenthStepWrapper,
    TenthStepContent,
    ButtonsCtr,
    LinkText,
    UploadLabel,
    UploadInput,
    UploadSpan,
} from './tenthStep-styles'
import { ParagraphStep, SpaceStep, TitleStep } from '../../openingCreditCard-styles'

// hooks
import { useReducerStep } from '../../hooks'
import { useTenthStepForm, TenthStepType, tenthStepSchema } from '../../hooks/useTenthStepForm'

// utils
import { getBase64 } from '../../../../utils/misc'

// actions
import { saveTcInsurancePoliceAction } from '../../../../../redux/openingTC'

// selects
import {
    getClientValidationCCRequestSelector,
    validateUserStateSelector,
    useSelector,
} from '../../../../../selectors'

const urlFile = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'

const TenthStep = (): ReactElement => {
    const dispatchStep = useReducerStep()[1]
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)

    const MAX_SIZE = 15000000

    const defaultValuesRef = useRef<{ formatFile: File | null }>({
        formatFile: null,
    })

    const { clientValidation } = useSelector(getClientValidationCCRequestSelector)
    const { validateUser } = useSelector(validateUserStateSelector)

    const { handleSubmit, register, watch, control, setValue, getValues } = useTenthStepForm({
        validationSchema: yupResolver(tenthStepSchema),
        defaultValues: defaultValuesRef.current,
    })
    const { isValid } = useFormState({ control })
    watch()
    const { ref, onBlur, name } = register('formatFile')

    const onDrop = useCallback((accFiles: File[], _: FileRejection[]) => {
        setValue('formatFile', accFiles[0], {
            shouldValidate: true,
        })
    }, [])

    const fileName = (): string =>
        getValues('formatFile')
            ? (getValues('formatFile') as File).name ?? (getValues('formatFile') as File[])[0].name
            : ''

    // handlers
    const onSubmit = async ({ formatFile }: TenthStepType): Promise<void> => {
        const fileBase64 = await getBase64(formatFile[0] ?? formatFile)
        const fileToSend = fileBase64?.toString().replace(urlFile, '')
        if (typeof fileBase64 === 'string') {
            setIsLoading(true)
            dispatch(
                saveTcInsurancePoliceAction(
                    {
                        Base64File: fileToSend ?? fileBase64,
                        IdCreditCardRequest: checkCreditCardId(),
                    },
                    (resp) => {
                        setIsLoading(false)
                        if (resp.data !== null) {
                            return dispatchStep({
                                type: 'GO_TO_STEP',
                                payload: {
                                    step: 11,
                                },
                            })
                        }

                        const { status } = resp.response as unknown as AxiosResponse

                        if ([400, 500].includes(status)) {
                            return dispatchStep({
                                type: 'GO_TO_STEP',
                                payload: {
                                    step: 18,
                                },
                            })
                        }
                    }
                )
            )
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!event.currentTarget.files) {
            return
        }

        if (event.currentTarget.files[0].size < MAX_SIZE) {
            setValue('formatFile', event.currentTarget.files[0], {
                shouldValidate: true,
            })
        }
    }

    const onDelete = (): void => {
        setValue('formatFile', null, { shouldValidate: true })
    }

    const checkCreditCardId = (): number => {
        if (clientValidation?.validationData) {
            const id =
                'id' in clientValidation.validationData ? clientValidation?.validationData.id : 0
            return id
        }
        return validateUser?.id ?? 0
    }

    return (
        <>
            <NavigationStep />
            <TenthStepWrapper>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TenthStepContent>
                        <TitleStep>Póliza de seguro</TitleStep>
                        <SpaceStep />
                        <TitleStep>Formato de asegurabilidad manual</TitleStep>
                        <ParagraphStep>
                            1. Diligencia el formato de Excel que se descargará automáticamente, de
                            lo contrario
                            <LinkText
                                href="https://cavipetrolstorageaccount.blob.core.windows.net/assets/7.SOLICITUD%20VIDA%20GRUPO%20DEUDORES%20FORMATO%20MANUAL%20(Abril%202022).xlsx"
                                download="Formato_solicitud_grupo_deudores"
                            >
                                haz clic aquí para descargarlo
                            </LinkText>
                        </ParagraphStep>
                        <ParagraphStep>
                            2. Carga el formato diligenciado, asegúrate que este totalmente
                            diligenciado
                        </ParagraphStep>

                        {getValues('formatFile') && (
                            <FileAndProgressBar fileName={fileName()} onDelete={onDelete} />
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
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                                    [],
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
                                    accept=".xlsx,.xlsm,.xlsb,.xltx"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    name={name}
                                    ref={ref}
                                />
                                <UploadSpan>Elegir archivo</UploadSpan>
                            </UploadLabel>
                        </UploadFile>

                        <ButtonsCtr>
                            <Button
                                variant="sub-dominant"
                                isLoading={isLoading}
                                type="submit"
                                disabled={!isValid}
                            >
                                Enviar
                            </Button>
                        </ButtonsCtr>
                    </TenthStepContent>
                </Form>
            </TenthStepWrapper>
        </>
    )
}

export default TenthStep
