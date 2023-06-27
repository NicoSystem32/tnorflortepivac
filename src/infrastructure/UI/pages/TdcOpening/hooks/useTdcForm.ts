/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FieldValues, DeepPartial, Resolver } from 'react-hook-form'
import * as yup from 'yup'

// selectors
import { settingTDCSelector } from '../../../../selectors'

// actions
import { actions } from '../../../../redux/tdc'

// validation schema
export const tdcSchema = yup
    .object({
        term: yup.string().required('Campo obligatorio'),
        checkModality: yup.string(),
        modality: yup.string().when('checkModality', {
            is: 'yes',
            then: yup.string().required('Campo obligatorio'),
        }),
        checkTyC: yup.boolean().isTrue().required('Campo obligatorio'),
    })
    .required()

// type definitions
export type TdcType = yup.InferType<typeof tdcSchema> & { amount: string }

interface IUseTdcFormArgs<F extends FieldValues = TdcType> {
    defaultValues: DeepPartial<F | TdcType>
    validationSchema?: Resolver<F | TdcType>
}

export const useTdcForm = <TFieldValues extends FieldValues = TdcType>({
    defaultValues,
    validationSchema,
}: IUseTdcFormArgs<TFieldValues>) => {
    const history = useHistory()
    const dispatch = useDispatch()

    // redux states
    const { parametersList } = useSelector(settingTDCSelector)

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, control, watch } =
        useForm<TFieldValues | TdcType>({
            mode: 'all',
            resolver: validationSchema,
            defaultValues,
        })

    const redirection = (url: string, data?: Record<string, string | number>): void => {
        history.push(url, data)
    }

    const prepareDataToBeSent = ({
        numberOfPayments,
        effectiveRate,
        yieldBeforeRetention,
        periodRetention,
        netYield,
        yieldAfterRetention,
        ratePeriod,
    }: Record<string, number>): void => {
        const findModality = !isNaN(parseInt(getValues('modality') ?? ''))
            ? parseInt(getValues('modality') ?? '')
            : parseInt(getValues('term'))

        const toSendModality = parametersList.find(
            (params) =>
                params.modalityDays === findModality && params.term === parseInt(getValues('term'))
        )

        if (toSendModality) {
            dispatch(
                actions.fillSimulateTDCAction({
                    modality: toSendModality.modality,
                    modalityDays: toSendModality.modalityDays,
                    value: parseFloat(getValues('amount')),
                    normaTdc: toSendModality.normaTdc,
                    isExpiration: getValues('checkModality') === 'not' ? 0 : 1,
                    term: parseInt(getValues('term')),
                    paymentsNumber: numberOfPayments,
                    rate: effectiveRate.toString(),
                    yieldBeforeRetention,
                    periodRetention,
                    yieldAfterRetention,
                    netYield,
                    ratePeriod,
                })
            )

            redirection('/payments', { type: 'TDC' })
        }
    }

    return {
        // useForm
        handleSubmit,
        register,
        getValues,
        setValue,
        setError,
        clearErrors,
        control,
        watch,

        // others
        redirection,
        prepareDataToBeSent,
    }
}
