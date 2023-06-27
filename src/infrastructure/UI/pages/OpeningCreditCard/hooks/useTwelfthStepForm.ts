import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

// actions
import { fillDataPerStepAction, saveTcConfigAction } from '../../../../redux/openingTC'

// hooks
import { useReducerStep } from '.'

// selectors
import {
    getAllOfficesSelector,
    getClientValidationCCRequestSelector,
    getCreditCardDataPerStepSelector,
    useSelector,
    validateUserStateSelector,
} from '../../../../selectors'

// models
import { SaveTCContact } from '../../../../../domain/models'

export const checkRequired = (value: string, isEqual: string, isEdit?: boolean): boolean => {
    if (value === isEqual && isEdit) {
        return true
    }
    return false
}

// validation schema
export const twelfthStepSchema = yup
    .object({
        billingDays: yup.string().required('Campo obligatorio'),
        placeToReceiveCard: yup.string().required('Campo obligatorio'),
        extractCreditCardReceive: yup.string().required('Campo obligatorio'),
        checkTyC: yup.boolean().isTrue().required('Campo obligatorio'),
        officeState: yup.string(),
        officeCity: yup.string(),
        officePlace: yup.string(),
        addressEdit: yup.boolean(),
        state: yup.string().when(['placeToReceiveCard', 'addressEdit'], {
            is: (value: string, isEdit: boolean) => checkRequired(value, 'home', isEdit),
            then: yup.string().required('Campo obligatorio'),
        }),
        city: yup.string().when(['placeToReceiveCard', 'addressEdit'], {
            is: (value: string, isEdit: boolean) => checkRequired(value, 'home', isEdit),
            then: yup.string().required('Campo obligatorio'),
        }),
        address1: yup.string().when(['placeToReceiveCard', 'addressEdit'], {
            is: (value: string, isEdit: boolean) => checkRequired(value, 'home', isEdit),
            then: yup.string().required('Campo obligatorio'),
        }),
        address2: yup.string().when(['placeToReceiveCard', 'addressEdit'], {
            is: (value: string, isEdit: boolean) => checkRequired(value, 'home', isEdit),
            then: yup.string().required('Campo obligatorio'),
        }),
        address3: yup.string().when(['placeToReceiveCard', 'addressEdit'], {
            is: (value: string, isEdit: boolean) => checkRequired(value, 'home', isEdit),
            then: yup.string().required('Campo obligatorio'),
        }),
        neighborhood: yup.string().when(['placeToReceiveCard', 'addressEdit'], {
            is: (value: string, isEdit: boolean) => checkRequired(value, 'home', isEdit),
            then: yup.string().required('Campo obligatorio'),
        }),
        additionalData: yup.string(),
        indications: yup.string(),
    })
    .required()

// type definitions
export type TwelfthStepType = yup.InferType<typeof twelfthStepSchema>

interface IUseTwelfthStepArgs<F extends FieldValues = TwelfthStepType> {
    defaultValues: DeepPartial<F | TwelfthStepType>
    validationSchema?: Resolver<F | TwelfthStepType>
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useTwelfthStepForm = <TFieldValues extends FieldValues = TwelfthStepType>({
    defaultValues,
    validationSchema,
}: IUseTwelfthStepArgs<TFieldValues>) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [{ currentStep }, dispatchStep] = useReducerStep()
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingContinue, setIsLoadingContinue] = useState(false)

    // selectors
    const { clientValidation } = useSelector(getClientValidationCCRequestSelector)
    const { validateUser } = useSelector(validateUserStateSelector)
    const { data: allOffices } = useSelector(getAllOfficesSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { twelfthStep } = createCreditCard

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | TwelfthStepType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    const showAddressForm = getValues('placeToReceiveCard') === 'home'

    const preparedToSend = (dataToSend: TwelfthStepType): void => {
        setIsLoadingContinue(true)
        dispatch(
            fillDataPerStepAction({
                ...createCreditCard,
                currentStep,
                twelfthStep: {
                    ...twelfthStep,
                    ...dataToSend,
                    officeState: dataToSend.officeState ? dataToSend.officeState : '',
                    officeCity: dataToSend.officeCity ? dataToSend.officeCity : '',
                    officePlace: dataToSend.officePlace ? dataToSend.officePlace : '',
                    state: dataToSend.state ? dataToSend.state : '',
                    city: dataToSend.city ? dataToSend.city : '',
                    address1: dataToSend.address1 ? dataToSend.address1 : '',
                    address2: dataToSend.address2 ? dataToSend.address2 : '',
                    address3: dataToSend.address3 ? dataToSend.address3 : '',
                    additionalData: dataToSend.additionalData ? dataToSend.additionalData : '',
                    neighborhood: dataToSend.neighborhood ? dataToSend.neighborhood : '',
                    indications: dataToSend.indications ? dataToSend.indications : '',
                },
            })
        )
        saveTcConfigData('14', (resp) => {
            if (resp.response === '200') {
                dispatchStep({
                    type: 'GO_TO_STEP',
                    payload: {
                        step: 15,
                    },
                })
            }

            setIsLoadingContinue(false)
        })
    }

    const preparedToSave = (): void => {
        dispatch(
            fillDataPerStepAction({
                ...createCreditCard,
                currentStep,
                twelfthStep: {
                    ...twelfthStep,
                    billingDays: getValues('billingDays'),
                    placeToReceiveCard: getValues('placeToReceiveCard'),
                    extractCreditCardReceive: getValues('extractCreditCardReceive'),
                    checkTyC: getValues('checkTyC'),
                    officeState: getValues('officeState') ?? '',
                    officeCity: getValues('officeCity') ?? '',
                    officePlace: getValues('officePlace') ?? '',
                    state: getValues('state') ?? '',
                    city: getValues('city') ?? '',
                    address1: getValues('address1') ?? '',
                    address2: getValues('address2') ?? '',
                    address3: getValues('address3') ?? '',
                    additionalData: getValues('additionalData') ?? '',
                    neighborhood: getValues('neighborhood') ?? '',
                    indications: getValues('indications') ?? '',
                },
            })
        )

        setIsLoading(true)
        saveTcConfigData('11', () => {
            setIsLoading(false)
            redirection('/home-wallet')
        })
    }

    const saveTcConfigData = (
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
            dispatchTcConfig(id, requestStep, onCallback)
        } else {
            dispatchTcConfig(validateUser?.id ?? 0, requestStep, onCallback)
        }
    }

    const dispatchTcConfig = (
        id: number,
        requestStep: string,
        onCallback?: (res: {
            isSuccess: boolean
            message: string | null
            response: string | null
            data: SaveTCContact | null
        }) => void
    ): void => {
        dispatch(
            saveTcConfigAction(
                {
                    RequestStep: requestStep,
                    IdCreditCardRequest: id,
                    BillingDay: parseInt(getValues('billingDays')),
                    CardDeliveryAddress: preparedToAddressDeliveryToSendCard(),
                    ExtractCardDelivery:
                        getValues('extractCreditCardReceive') === 'address-home' ? 0 : 1,
                    TermsCondition: getValues('checkTyC'),
                },
                onCallback
            )
        )
    }

    const preparedToAddressDeliveryToSendCard = (): string => {
        const nomenclator = `${getValues('state')}|${getValues('city')}`
        const address = `${getValues('address1')}|${getValues('address2')}|${getValues('address3')}`
        const addInfo = `${getValues('additionalData')}|${getValues('neighborhood')}|${getValues(
            'indications'
        )}`

        if (getValues('placeToReceiveCard') === 'home') {
            return `${nomenclator}|${address}|${addInfo}`
        }

        if (getValues('officeState') && getValues('officeCity') && getValues('officePlace')) {
            return `${getValues('officeState')}|${getValues('officeCity')}|${getValues(
                'officePlace'
            )}`
        }

        return `${allOffices[1].oFCDepartment}|${allOffices[1].oFCCity}|${allOffices[1].oFCAddress}`
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
        preparedToSave,
        preparedToSend,
        showAddressForm,
        isLoading,
        isLoadingContinue,
    }
}
