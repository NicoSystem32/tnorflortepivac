/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useHistory } from 'react-router'
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import * as yup from 'yup'

// validation schema
export const thirteenthStepSchema = yup
    .object({
        formatFile: yup.mixed().required('Archivo requerido'),
    })
    .required()

// type definitions
export type ThirteenthStepType = yup.InferType<typeof thirteenthStepSchema>

interface IUseThirteenthStepArgs<F extends FieldValues = ThirteenthStepType> {
    defaultValues?: DeepPartial<F | ThirteenthStepType>
    validationSchema?: Resolver<F | ThirteenthStepType>
}

export const useThirteenthStepForm = <TFieldValues extends FieldValues = ThirteenthStepType>({
    defaultValues,
    validationSchema,
}: IUseThirteenthStepArgs<TFieldValues>) => {
    const history = useHistory()

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | ThirteenthStepType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    const redirection = (url: string, state?: Record<string, string | number>): void => {
        history.push(url, state)
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
        redirection,
    }
}
