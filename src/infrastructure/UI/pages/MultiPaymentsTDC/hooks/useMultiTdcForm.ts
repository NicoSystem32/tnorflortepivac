/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import * as yup from 'yup'

// hooks
import { useReducerStep } from '.'
import { useAppTour } from '../../../hooks'

// actions
import { validIVRAction, sendOtpAction } from '../../../../redux/auth'

// utils
import { onKeyPress } from '../../../utils/formsUtils'

// validation schema
export const multiTdcSchema = yup
    .object({
        keyCodeIVR: yup
            .string()
            .matches(/^\d?\d+$/, 'Por favor ingresar solo dígitos numéricos')
            .max(8, 'La clave IVR debe contener máximo 8 caracteres')
            .required('Campo obligatorio'),
    })
    .required()

// type definitions
export type MultiTdcType = yup.InferType<typeof multiTdcSchema> & { amountFAI: string }

interface IUseTdcFormArgs<F extends FieldValues = MultiTdcType> {
    defaultValues: DeepPartial<F | MultiTdcType>
    validationSchema?: Resolver<F | MultiTdcType>
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMultiTdcForm = <TFieldValues extends FieldValues = MultiTdcType>({
    defaultValues,
    validationSchema,
}: IUseTdcFormArgs<TFieldValues>) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const dispatchStep = useReducerStep()[1]
    const matchMedia = useMediaQuery('(min-width: 1024px)')
    const { rideStep: rideTourStep } = useAppTour()

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | MultiTdcType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    const prepareNextState = (fields: MultiTdcType, amountTotal: number | undefined): void => {
        dispatch(
            validIVRAction(fields.keyCodeIVR, ({ response }) => {
                if (response === '200') {
                    dispatch(
                        sendOtpAction(({ response: resp, message }) => {
                            if (resp === '200') {
                                dispatchStep({
                                    type: 'SET_FEEDBACK',
                                    payload: {
                                        code: '200',
                                        message: setMessage(message),
                                        amountFAI: fields.amountFAI,
                                        amountPSE: amountTotal! - parseInt(fields.amountFAI),
                                    },
                                })
                                dispatchStep({ type: 'NEXT_STEP' })
                            } else {
                                dispatchStep({
                                    type: 'SET_FEEDBACK',
                                    payload: {
                                        code: '',
                                        message: 'isError',
                                        amountFAI: fields.amountFAI,
                                        amountPSE: amountTotal! - parseInt(fields.amountFAI),
                                    },
                                })
                                dispatchStep({ type: 'NEXT_STEP' })
                            }
                            rideTourStep(3)
                            redirectError(resp)
                        })
                    )
                }
            })
        )
    }

    const disableOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (!matchMedia) {
            onKeyPress(e)
        }
    }

    const redirectError = (resp: string | null): void => {
        if (resp === '500') {
            history.push('/not-response')
        }
    }

    const setMessage = (message: string | null): string => {
        return message ? message : ''
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

        prepareNextState,
        matchMedia,
        disableOnKeyPress,
    }
}
