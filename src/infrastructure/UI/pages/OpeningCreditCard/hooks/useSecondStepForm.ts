/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import { AxiosResponse } from 'axios'
import * as yup from 'yup'

// models
import { ValidateCRMState } from '../../../../../domain/models'

// actions
import { fillDataPerStepAction, sendCodeOtpCreditCardAction } from '../../../../redux/openingTC'

// hooks
import { useReducerStep } from '.'

// selectors
import {
    getCreditCardDataPerStepSelector,
    getCRMResponseSelector,
    sendCodeOtpCreditCardSelector,
} from '../../../../selectors'

// validation schema
export const secondStepSchema = yup
    .object({
        cellPhone: yup
            .string()
            .matches(/^\d?\d+$/, 'Por favor ingresar solo dígitos numéricos')
            .required('Campo obligatorio'),
        email: yup.string().email('Debe ser un correo valido').required('Campo obligatorio'),
    })
    .required()

// type definitions
export type SecondStepType = yup.InferType<typeof secondStepSchema>

interface IUseSecondStepArgs<F extends FieldValues = SecondStepType> {
    defaultValues: DeepPartial<F | SecondStepType>
    validationSchema?: Resolver<F | SecondStepType>
}

export const useSecondStepForm = <TFieldValues extends FieldValues = SecondStepType>({
    defaultValues,
    validationSchema,
}: IUseSecondStepArgs<TFieldValues>) => {
    const dispatch = useDispatch()
    const [{ currentStep }, dispatchStep] = useReducerStep()
    const [showModalError, setShowModalError] = useState(false)

    const { error: errorCRM, loading: loadingCRM } = useSelector(getCRMResponseSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { loading: loadingSendCode } = useSelector(sendCodeOtpCreditCardSelector)

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | SecondStepType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    const onSuccessValidateCRM = (
        email: string,
        cellPhone: string,
        resp: Omit<ValidateCRMState, 'loading' | 'error'>
    ) => {
        if (resp.data?.validData) {
            dispatch(
                sendCodeOtpCreditCardAction('5', (resp) => {
                    if (resp.response === '200') {
                        onSuccessResponse(email, cellPhone, resp.message)
                        return
                    }
                    const { data, status } = resp.response as unknown as AxiosResponse
                    if (status === 400) {
                        onErrorResponse(data.Message)
                    }
                })
            )
        } else {
            onShowModalError()
        }
    }

    const onHireModalError = (): void => {
        setShowModalError(false)
    }

    const onShowModalError = (): void => {
        setShowModalError(true)
    }

    const onSuccessResponse = (email: string, cellPhone: string, message: string | null) => {
        dispatch(
            fillDataPerStepAction({
                ...createCreditCard,
                currentStep,
                secondStep: {
                    email,
                    cellPhone,
                },
            })
        )
        dispatchStep({
            type: 'SET_FEEDBACK',
            payload: {
                code: '200',
                message: message ?? '',
            },
        })
        dispatchStep({
            type: 'GO_TO_STEP',
            payload: {
                step: 3,
            },
        })
    }

    const onErrorResponse = (message: string) => {
        dispatchStep({
            type: 'SET_FEEDBACK',
            payload: {
                code: '400',
                message,
            },
        })
        dispatchStep({
            type: 'GO_TO_STEP',
            payload: {
                step: 3,
            },
        })
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

        // ----
        setShowModalError,
        showModalError,
        onHireModalError,
        onShowModalError,
        onSuccessValidateCRM,
        loadingSendCode,
        loadingCRM,
        errorCRM,
    }
}
