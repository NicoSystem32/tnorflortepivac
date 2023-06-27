/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import * as yup from 'yup'

// hooks
import { useReducerStep } from '.'

// selects
import {
    getClientValidationCCRequestSelector,
    validateUserStateSelector,
    getCreditCardDataPerStepSelector,
    useSelector,
} from '../../../../selectors'

// actions
import { fillDataPerStepAction, saveTcCivilStatusAction } from '../../../../redux/openingTC'

// models
import { SaveTCContact } from '../../../../../domain/models'

// validation schema
export const fifthStepSchema = yup
    .object({
        civilStatus: yup.string().required('Campo obligatorio'),
    })
    .required()

// type definitions
export type FifthStepType = yup.InferType<typeof fifthStepSchema>

interface IUseFifthStepArgs<F extends FieldValues = FifthStepType> {
    defaultValues: DeepPartial<F | FifthStepType>
    validationSchema?: Resolver<F | FifthStepType>
}

export const useFifthStepForm = <TFieldValues extends FieldValues = FifthStepType>({
    defaultValues,
    validationSchema,
}: IUseFifthStepArgs<TFieldValues>) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const dispatchStep = useReducerStep()[1]

    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingContinue, setIsLoadingContinue] = useState(false)

    const { clientValidation } = useSelector(getClientValidationCCRequestSelector)
    const { validateUser } = useSelector(validateUserStateSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)

    const { fifthStep } = createCreditCard

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | FifthStepType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    const prepareToSend = (dataToSend: FifthStepType): void => {
        setIsLoadingContinue(true)
        saveTcCivilStatusData(dataToSend.civilStatus, '5', () => {
            dispatch(
                fillDataPerStepAction({
                    ...createCreditCard,
                    currentStep: 6,
                    fifthStep: {
                        ...fifthStep,
                        ...dataToSend,
                    },
                })
            )
            dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 6,
                },
            })
            setIsLoadingContinue(false)
        })
    }

    const prepareToSave = (): void => {
        setIsLoading(true)
        saveTcCivilStatusData(getValues('civilStatus'), '4', () => {
            dispatch(
                fillDataPerStepAction({
                    ...createCreditCard,
                    currentStep: 5,
                    fifthStep: {
                        civilStatus: getValues('civilStatus'),
                    },
                })
            )
            setIsLoading(false)
        })
        redirection('/home-wallet')
    }

    const saveTcCivilStatusData = (
        civilStatusName: string,
        requestStep: string,
        onCallback?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact | null
        }) => void
    ): void => {
        if (clientValidation?.validationData) {
            const id =
                'id' in clientValidation.validationData ? clientValidation?.validationData.id : 0
            dispatchTcContact(id, civilStatusName, requestStep, onCallback)
        } else {
            dispatchTcContact(validateUser?.id ?? 0, civilStatusName, requestStep, onCallback)
        }
    }

    const dispatchTcContact = (
        id: number,
        civilStatus: string,
        requestStep: string,
        onCallback?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact | null
        }) => void
    ) => {
        dispatch(
            saveTcCivilStatusAction(
                {
                    Id: id,
                    RequestStep: requestStep,
                    CivilStatus: civilStatus,
                },
                onCallback
            )
        )
    }

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

        // other props
        prepareToSend,
        prepareToSave,
        isLoading,
        isLoadingContinue,
    }
}
