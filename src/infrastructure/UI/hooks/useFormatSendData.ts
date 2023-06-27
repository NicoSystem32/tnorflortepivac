import { Pay as PayProduct, PaymentTransaction, SendTDCParameters } from '../../../domain/models'
export interface IProduct extends Partial<Omit<SendTDCParameters, 'value'>> {
    typeDocument: string
    finishedNumber: string
    number?: string
    document?: string
    description?: string
    optionSelected?: string
    typePay: number
    paymentMethodTdc?: 'PSE' | 'FAI' | 'pse' | 'fai'
    paymentMethod?: 'PSE' | 'FAI' | 'pse' | 'fai'
    isTdc: number
    nameDocument?: string
    name?: string
    idProduct?: string
    value: string | number
}
interface FormatTransactionDataType {
    totalValue: string | number
    paymentMethod: 0 | 1 | 2 | 3 | 4 // 0: multipago, 1: FAI, 2: PSE, 3: PSE TC, 4: FAI TC
    productsList: IProduct[]
    totalValuePSE?: string | number
    totalValueFAI?: string | number
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useFormatSendData = () => {
    const buildPayProduct = (
        product: IProduct,
        {
            valueFloat,
            paymentMethod,
        }: Pick<FormatTransactionDataType, 'paymentMethod'> & { valueFloat: number }
    ): PayProduct => {
        const defaultValues = {
            document: product.document,
            description: product.description,
            typePay: paymentMethod,
            Term: 0,
            Rate: '0',
            PaymentMethod: '',
            PaymentMethodTdc: '',
            NormaTdc: '',
            IsTdc: 0,
            NameDocument: '',
            IdProduct: '',
            IsExpiration: 0,
            Modality: '',
            PaymentsNumber: 0,
            yieldBeforeRetention: 0,
            periodRetention: 0,
            yieldAfterRetention: 0,
            netYield: 0,
            modalityDays: 0,
            RatePeriod: 0,
        }

        const settedValues = {
            TypeDocument: product.typeDocument,
            FinishedNumber: product.finishedNumber,
            Number: product.finishedNumber,
            document: product.number,
            description: product.optionSelected,
            value: valueFloat.toString(),
            typePay: product.typePay,
            origenPayment:
                product.paymentMethodTdc === 'FAI' ||
                product.paymentMethodTdc === 'fai' ||
                product.paymentMethod === 'fai' ||
                product.paymentMethod === 'FAI'
                    ? 1
                    : 2,
            Term: product.term,
            Rate: product.rate,
            PaymentMethod: product.paymentMethod,
            PaymentMethodTdc: product.paymentMethodTdc,
            NormaTdc: product.normaTdc,
            IsTdc: product.isTdc,
            NameDocument: product.name || product.nameDocument,
            IdProduct: product.idProduct,
            IsExpiration: product.isExpiration,
            Modality: product.modality?.toUpperCase(),
            PaymentsNumber: product.paymentsNumber,
            yieldBeforeRetention: product.yieldBeforeRetention,
            periodRetention: product.periodRetention,
            yieldAfterRetention: product.yieldAfterRetention,
            netYield: product.netYield,
            modalityDays: product.modalityDays,
            RatePeriod: product.ratePeriod,
        }

        return {
            ...defaultValues,
            ...JSON.parse(JSON.stringify(settedValues, (...kv) => kv[1] ?? undefined)),
        }
    }

    const formatTransactionData = ({
        totalValue,
        totalValuePSE,
        totalValueFAI,
        paymentMethod,
        productsList,
    }: FormatTransactionDataType): PaymentTransaction => {
        const pays: PayProduct[] = []
        for (const itemArray of productsList) {
            const valueTemporal = parseFloat(itemArray.value.toString()).toFixed(2)
            const valueFloat = parseFloat(valueTemporal)

            pays.push(
                buildPayProduct(itemArray, {
                    valueFloat,
                    paymentMethod,
                })
            )
        }

        const totalTemporal = parseFloat(totalValue.toString()).toFixed(2)
        const totalFloat = parseFloat(totalTemporal)

        const validateValuePSE =
            (paymentMethod === 2 || paymentMethod === 3 ? totalFloat : 0) ||
            parseFloat(totalValuePSE ? totalValuePSE.toString() : '0')

        const validateValueFAI =
            (paymentMethod === 1 || paymentMethod === 4 ? totalFloat : 0) ||
            parseFloat(totalValueFAI ? totalValueFAI.toString() : '0')

        return {
            totalValue: totalFloat,
            totalValuePSE: validateValuePSE,
            totalValueFAI: validateValueFAI,
            paymentMethod: paymentMethod,
            IsTdc: !!productsList[0]?.isTdc || false,
            pays: pays,
            NormaTdc: '',
            IsExpiration: false,
        }
    }

    return { formatTransactionData }
}

export default useFormatSendData
