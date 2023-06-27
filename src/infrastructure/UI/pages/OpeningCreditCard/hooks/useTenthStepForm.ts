/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import * as yup from 'yup'

// validation schema
export const tenthStepSchema = yup
    .object({
        formatFile: yup.mixed().required('Archivo requerido'),
    })
    .required()

// type definitions
export type TenthStepType = yup.InferType<typeof tenthStepSchema>

interface IUseTenthStepArgs<F extends FieldValues = TenthStepType> {
    defaultValues?: DeepPartial<F | TenthStepType>
    validationSchema?: Resolver<F | TenthStepType>
}

export const useTenthStepForm = <TFieldValues extends FieldValues = TenthStepType>({
    defaultValues,
    validationSchema,
}: IUseTenthStepArgs<TFieldValues>) => {
    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | TenthStepType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    return {
        handleSubmit,
        register,
        getValues,
        setValue,
        setError,
        clearErrors,
        control,
        watch,
    }
}
