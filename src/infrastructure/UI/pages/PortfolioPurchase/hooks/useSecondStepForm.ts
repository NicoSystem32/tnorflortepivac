/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import * as yup from 'yup'

// hooks
import { useReducerState } from '.'

// utils
import { getBase64 } from '../../../utils/misc'

// validation schema
export const secondStepSchema = yup
    .object({
        nameBank: yup.string().required('Campo obligatorio'),
        otherNameBank: yup.string().when('nameBank', {
            is: 'Otro',
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
export type SecondStepType = yup.InferType<typeof secondStepSchema> & { amountBuy: string }

export interface IUseSecondStepArgs<F extends FieldValues = SecondStepType> {
    defaultValues: DeepPartial<F | SecondStepType>
    validationSchema?: Resolver<F | SecondStepType>
}

export const useSecondStepForm = <TFieldValues extends FieldValues = SecondStepType>({
    validationSchema,
    defaultValues,
}: IUseSecondStepArgs<TFieldValues>) => {
    const [{ secondStep }, dispatchStep] = useReducerState()

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | SecondStepType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    const formatFileToSend = async ({ formatFile }: SecondStepType) => {
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

    const cleanSecondStep = (): void => {
        dispatchStep({
            type: 'SET_SECOND_STEP',
            payload: {
                ...secondStep,
                nameBank: '',
                otherNameBank: '',
                creditCardNumber: '',
                amountBuy: '',
            },
        })
        dispatchStep({
            type: 'SET_IS_EDIT',
            payload: {
                isEdit: false,
            },
        })
    }
    return {
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        clearErrors,
        control,
        watch,
        formatFileToSend,
        formatFile,
        cleanSecondStep,
    }
}
