import { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import * as yup from 'yup'

// selectors
import {
    useSelector,
    getCreditCardDataPerStepSelector,
    getClientValidationCCRequestSelector,
    validateUserStateSelector,
} from '../../../../selectors'

// actions
import { fillDataPerStepAction, saveTcContactAction } from '../../../../redux/openingTC'

// hooks
import { useReducerStep } from '.'

// models
import { SaveTCContact } from '../../../../../domain/models'

// validation schema
export const fourthStepSchema = yup
    .object({
        phone: yup.string().matches(/^\d?\d+$/, 'Por favor ingresar solo dígitos numéricos'),
        state: yup.string().required('Campo obligatorio'),
        city: yup.string().required('Campo obligatorio'),
        addressEdit: yup.boolean(),
        address1: yup.string().when('addressEdit', {
            is: true,
            then: yup.string().required('Campo obligatorio'),
        }),
        address2: yup.string().when('addressEdit', {
            is: true,
            then: yup.string().required('Campo obligatorio'),
        }),
        address3: yup.string().when('addressEdit', {
            is: true,
            then: yup.string().required('Campo obligatorio'),
        }),
        additionalIndications: yup.string(),
        neighborhood: yup.string().required('Campo obligatorio'),
        checkTyC: yup.boolean().isTrue().required('Campo obligatorio'),
    })
    .required()

// type definitions
export type FourthStepType = yup.InferType<typeof fourthStepSchema>

interface IUseFourthStepArgs<F extends FieldValues = FourthStepType> {
    defaultValues: DeepPartial<F | FourthStepType>
    validationSchema?: Resolver<F | FourthStepType>
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useFourthStepForm = <TFieldValues extends FieldValues = FourthStepType>({
    defaultValues,
    validationSchema,
}: IUseFourthStepArgs<TFieldValues>) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const dispatchStep = useReducerStep()[1]

    const [isLoadingSend, setIsLoadingSend] = useState(false)
    const [isLoadingSave, setIsLoadingSave] = useState(false)

    // selectors
    const { clientValidation } = useSelector(getClientValidationCCRequestSelector)
    const { validateUser } = useSelector(validateUserStateSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { fourthStep, twelfthStep } = createCreditCard

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | FourthStepType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    const prepareToSend = (dataToSend: FourthStepType): void => {
        setIsLoadingSend(true)
        saveTcContactData('4', (resp) => {
            dispatch(
                fillDataPerStepAction({
                    ...createCreditCard,
                    currentStep: 5,
                    fourthStep: {
                        ...fourthStep,
                        ...dataToSend,
                        address1: dataToSend.address1 ?? '',
                        address2: dataToSend.address2 ?? '',
                        address3: dataToSend.address3 ?? '',
                    },
                    twelfthStep: {
                        ...twelfthStep,
                        state: getValues('state'),
                        city: getValues('city'),
                        address1: getValues('address1') ?? null,
                        address2: getValues('address2') ?? null,
                        address3: getValues('address3') ?? null,
                        additionalData: getValues('additionalIndications'),
                        neighborhood: getValues('neighborhood'),
                    },
                })
            )
            dispatchStep({
                type: 'GO_TO_STEP',
                payload: {
                    step: 5,
                },
            })
            setIsLoadingSend(false)
        })
    }

    const prepareToSave = (): void => {
        setIsLoadingSave(true)
        saveTcContactData('3', () => {
            dispatch(
                fillDataPerStepAction({
                    ...createCreditCard,
                    currentStep: 4,
                    fourthStep: {
                        phone: getValues('phone'),
                        state: getValues('state'),
                        city: getValues('city'),
                        address1: getValues('address1') ?? null,
                        address2: getValues('address2') ?? null,
                        address3: getValues('address3') ?? null,
                        additionalIndications: getValues('additionalIndications'),
                        neighborhood: getValues('neighborhood'),
                        checkTyC: getValues('checkTyC'),
                    },
                    twelfthStep: {
                        ...twelfthStep,
                        state: getValues('state'),
                        city: getValues('city'),
                        address1: getValues('address1') ?? null,
                        address2: getValues('address2') ?? null,
                        address3: getValues('address3') ?? null,
                        additionalData: getValues('additionalIndications'),
                        neighborhood: getValues('neighborhood'),
                    },
                })
            )
            setIsLoadingSave(false)
            redirection('/home-wallet')
        })
    }

    const saveTcContactData = (
        requestStep: string,
        callback?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact
        }) => void
    ): void => {
        if (clientValidation?.validationData) {
            const id =
                'id' in clientValidation.validationData ? clientValidation?.validationData.id : 0
            dispatchTcContact(id, requestStep, callback)
        } else {
            dispatchTcContact(validateUser?.id ?? 0, requestStep, callback)
        }
    }

    const buildAddressChain = (): string => {
        if (getValues('address1') && getValues('address2') && getValues('address3')) {
            return `${getValues('address1')}|${getValues('address2')}|${getValues(
                'address3'
            )}|${getValues('additionalIndications')}`
        }
        return printInputValue()
    }

    const dispatchTcContact = (
        id: number,
        requestStep: string,
        callback?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact
        }) => void
    ): void => {
        dispatch(
            saveTcContactAction(
                {
                    RequestStep: requestStep,
                    Id: id,
                    Phone: getValues('phone') ?? '',
                    City: getValues('city') ?? '',
                    Department: getValues('state') ?? '',
                    Neighborhood: getValues('neighborhood') ?? '',
                    Authorize: getValues('checkTyC') ?? false,
                    Address: buildAddressChain(),
                },
                callback
            )
        )
    }

    const redirection = (url: string, state?: Record<string, string | number>): void => {
        history.push(url, state)
    }

    const printInputValue = (): string => {
        if (validateUser?.address && validateUser?.address !== '|||') {
            return validateUser?.address.replaceAll('|', '  ')
        }

        if (clientValidation?.validationData) {
            if (
                'address' in clientValidation.validationData &&
                clientValidation.validationData.address !== '|||'
            ) {
                return clientValidation.validationData.address
                    ? clientValidation.validationData.address.replaceAll('|', '  ')
                    : ''
            }
        }
        return ''
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
        clientValidation,
        isLoadingSend,
        isLoadingSave,
        printInputValue,
    }
}
