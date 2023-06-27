/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import * as yup from 'yup'

// validation schema
export const fourteenthStepSchema = yup
    .object({
        formatFile: yup.mixed().required('Archivo requerido'),
    })
    .required()

// type definitions
export type FourteenthStepType = yup.InferType<typeof fourteenthStepSchema>

interface IUseFourteenthStepArgs<F extends FieldValues = FourteenthStepType> {
    defaultValues?: DeepPartial<F | FourteenthStepType>
    validationSchema?: Resolver<F | FourteenthStepType>
}

export const useFourteenthStepForm = <TFieldValues extends FieldValues = FourteenthStepType>({
    defaultValues,
    validationSchema,
}: IUseFourteenthStepArgs<TFieldValues>) => {
    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | FourteenthStepType>({
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
