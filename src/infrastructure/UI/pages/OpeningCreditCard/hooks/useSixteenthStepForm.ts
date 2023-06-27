/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import * as yup from 'yup'

// utils
import { getBase64 } from '../../../utils/misc'

// validation schema
export const sixteenthStepSchema = yup
    .object({
        nameBank: yup.string().required('Campo obligatorio'),
        otherNameBank: yup.string().when('nameBank', {
            is: 'OTROS',
            then: yup.string().required('Campo obligatorio'),
        }),
        creditCardNumber: yup
            .string()
            .required('Campo obligatorio')
            .length(16, 'El campo debe contener 16 caracteres'),
        formatFile: yup.mixed().required('Campo requerido'),
    })
    .required()

// type definitions
export type SixteenthStepType = yup.InferType<typeof sixteenthStepSchema> & {
    amountBuy: string
}

interface IUseSixthStepArgs<F extends FieldValues = SixteenthStepType> {
    defaultValues: DeepPartial<F | SixteenthStepType>
    validationSchema?: Resolver<F | SixteenthStepType>
}

export const useSixteenthStepForm = <TFieldValues extends FieldValues = SixteenthStepType>({
    defaultValues,
    validationSchema,
}: IUseSixthStepArgs<TFieldValues>) => {
    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | SixteenthStepType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    const formatFileToSend = async ({ formatFile }: SixteenthStepType) => {
        const fileBase64 = await getBase64(formatFile[0] ?? formatFile)
        return fileBase64
            ?.toString()
            .replace('data:image/png;base64,', '')
            .replace('data:text/html;base64,', '')
            .replace('data:application/pdf;base64,', '')
    }

    const formatFile = async (file: File[]) => {
        const fileBase64 = await getBase64(file[0] ?? file)
        return fileBase64
            ?.toString()
            .replace('data:image/png;base64,', '')
            .replace('data:text/html;base64,', '')
            .replace('data:application/pdf;base64,', '')
    }

    return {
        handleSubmit,
        register,
        getValues,
        setValue,
        setError,
        clearErrors,
        control,
        watch,
        formatFileToSend,
        formatFile,
    }
}
