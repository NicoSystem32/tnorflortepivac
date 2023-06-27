/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useRef, useState } from 'react'
import { useForm, FieldValues, Resolver } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import moment from 'moment'

// actions
import { validateCRMAction, fillDataPerStepAction } from '../../../../redux/openingTC'

// hooks
import { useReducerStep } from '.'

// selectors
import { getCreditCardDataPerStepSelector, getCRMResponseSelector } from '../../../../selectors'

// validation schema
export const firstStepSchema = yup
    .object({
        identification: yup
            .string()
            .matches(/^\d{0,16}$/, 'Por favor ingresar solo dígitos numéricos')
            .required('Campo obligatorio'),
        day: yup.string().required('Obligatorio'),
        month: yup.string().required('Obligatorio'),
        year: yup.string().required('Obligatorio'),
        city: yup.string().required('Campo obligatorio'),
    })
    .required()

// type definitions
export type FirsStepType = yup.InferType<typeof firstStepSchema>

interface IUseFirsStepArgs<F extends FieldValues = FirsStepType> {
    validationSchema?: Resolver<F | FirsStepType>
}

export const useFirstStepForm = <TFieldValues extends FieldValues = FirsStepType>({
    validationSchema,
}: IUseFirsStepArgs<TFieldValues>) => {
    const dispatch = useDispatch()
    const dispatchStep = useReducerStep()[1]
    const [showModalError, setShowModalError] = useState(false)

    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { loading, error: errorCRM } = useSelector(getCRMResponseSelector)

    const { firstStep } = createCreditCard

    const defaultValuesRef = useRef({
        day: firstStep.expeditionDocumentDay ?? '',
        identification: firstStep.identification ?? '',
        month: firstStep.expeditionDocumentMonth ?? '',
        year: firstStep.expeditionDocumentYear ?? '',
        city: firstStep.dispatchCity ?? '',
    })

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | FirsStepType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues: defaultValuesRef.current,
        })

    const validateCRM = ({ identification, day, year, month, city }: FirsStepType) => {
        dispatch(
            validateCRMAction(
                {
                    StepDataValidation: 1,
                    Document: identification,
                    DocumentExpeditionDate: `${year}-${month}-${day}`,
                    DocumentExpeditionCity: city,
                },
                ({ data }) => {
                    if (data?.validData) {
                        dispatch(
                            fillDataPerStepAction({
                                ...createCreditCard,
                                currentStep: 2,
                                firstStep: {
                                    identification,
                                    expeditionDocumentDay: day,
                                    expeditionDocumentYear: year,
                                    expeditionDocumentMonth: month,
                                    dispatchCity: city,
                                },
                            })
                        )
                        dispatchStep({
                            type: 'GO_TO_STEP',
                            payload: {
                                step: 2,
                            },
                        })
                    } else {
                        onShowModalError()
                    }
                }
            )
        )
    }

    const onHireModalError = (): void => {
        setShowModalError(false)
    }

    const onShowModalError = (): void => {
        setShowModalError(true)
    }

    const buildTheDaysInMonth = (year?: string, month?: string): number => {
        if (year && month) {
            return moment(`${year}-${month}`, 'YYYY-MM').daysInMonth()
        }

        return 31
    }

    const buildTheLastYears = (untilYear: number) => {
        const thisYear = moment().year()
        const years: number[] = []

        for (let i = thisYear; i >= thisYear - untilYear; i--) {
            years.push(i)
        }

        return years
    }

    const buildTheMonthsInYear = () => [
        {
            name: 'Enero',
            numberMonth: '01',
        },
        {
            name: 'Febrero',
            numberMonth: '02',
        },
        {
            name: 'Marzo',
            numberMonth: '03',
        },
        {
            name: 'Abril',
            numberMonth: '04',
        },
        {
            name: 'Mayo',
            numberMonth: '05',
        },
        {
            name: 'Junio',
            numberMonth: '06',
        },
        {
            name: 'Julio',
            numberMonth: '07',
        },
        {
            name: 'Agosto',
            numberMonth: '08',
        },
        {
            name: 'Septiembre',
            numberMonth: '09',
        },
        {
            name: 'Octubre',
            numberMonth: '10',
        },
        {
            name: 'Noviembre',
            numberMonth: '11',
        },
        {
            name: 'Diciembre',
            numberMonth: '12',
        },
    ]

    return {
        handleSubmit,
        register,
        getValues,
        setValue,
        setError,
        clearErrors,
        control,
        watch,

        // ---
        buildTheLastYears,
        buildTheMonthsInYear,
        buildTheDaysInMonth,

        // ---
        onHireModalError,
        onShowModalError,
        showModalError,
        createCreditCard,
        validateCRM,

        // ---
        loading,
        errorCRM,
    }
}
