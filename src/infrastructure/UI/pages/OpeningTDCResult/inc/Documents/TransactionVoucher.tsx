import { Document, Page, View, Text, Image, DocumentProps } from '@react-pdf/renderer'

// models
import { Payment, Transaction, TransactionFAIResponse } from '../../../../../../domain/models'

import {
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'
import {
    CheckTransactionPNG,
    ElipseGreenPNG,
    ElipseYellowPNG,
    ProductIconDefault,
} from '../../../../utils/getIcons'

// styles
import { styles } from './transactionVoucher-styles'

interface TransactionVoucherProps extends DocumentProps {
    transaction: Transaction | TransactionFAIResponse['resultFaiPayments']
    payFai?: Payment | null
    payPSE?: Payment | null
}
const paymentFAI = (
    transaction: TransactionFAIResponse['resultFaiPayments'] | null
): React.ReactElement => {
    return (
        <View>
            <Text style={styles.textTitle}>Resumen del pago</Text>
            <View style={styles.paymentBody}>
                <View style={styles.paymentBodyItem}>
                    <Text style={styles.paymentBodyTitle}>Medio de pago</Text>
                    <Text style={styles.paymentBodySubTitle}>{transaction?.methodPayment}</Text>
                </View>
                <View style={styles.paymentBodyItem}>
                    <Text style={styles.paymentBodyTitle}>Número de cuenta</Text>
                    <Text style={styles.paymentBodySubTitle}>{transaction?.numberCount}</Text>
                </View>
                <View style={styles.paymentBodyItem}>
                    <Text style={styles.paymentBodyTitle}>Número de comprobante</Text>
                    <Text style={styles.paymentBodySubTitle}>{transaction?.transaction}</Text>
                </View>
                <View style={styles.paymentBodyItem}>
                    <Text style={styles.paymentBodyTitle}>Dirección IP</Text>
                    <Text style={styles.paymentBodySubTitle}>{transaction?.ipAddress}</Text>
                </View>
            </View>
        </View>
    )
}
const paymentPSE = (transaction: Transaction | null): React.ReactElement => {
    return (
        <View>
            <Text style={styles.textTitle}>Resumen del pago</Text>
            <View style={styles.paymentBody}>
                <View style={styles.paymentBodyItem}>
                    <Text style={styles.paymentBodyTitle}>Medio de pago</Text>
                    <Text style={styles.paymentBodySubTitle}>PSE - ACH</Text>
                </View>
                <View style={styles.paymentBodyItem}>
                    <Text style={styles.paymentBodyTitle}>Número CUS*</Text>
                    <Text style={styles.paymentBodySubTitle}>{transaction?.trazabilityCode}</Text>
                </View>
                <View style={styles.paymentBodyItem}>
                    <Text style={styles.paymentBodyTitle}>Banco emisor</Text>
                    <Text style={styles.paymentBodySubTitle}>{transaction?.bankName}</Text>
                </View>
                <View style={styles.paymentBodyItem}>
                    <Text style={styles.paymentBodyTitle}>Dirección IP</Text>
                    <Text style={styles.paymentBodySubTitle}>{transaction?.ipAddress}</Text>
                </View>
            </View>
            <Text style={styles.paymentHeadMessage}>
                *El número CUS es el código único de seguimiento y es la referencia de pago dentro
                del banco. Solo aplica para pagos realizados con PSE
            </Text>
        </View>
    )
}
const paymentMulti = (
    transaction?: Transaction,
    payPSE?: Payment | null,
    payFai?: Payment | null
): React.ReactElement => {
    return (
        <>
            <View>
                <Text style={styles.textTitle}>Resumen del pago por débito FAI</Text>
                <View style={styles.paymentBody}>
                    <View style={styles.paymentBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Monto del pago</Text>
                        <Text style={styles.paymentBodySubTitle}>
                            $ {formatValue(payFai?.value, 1) || 0}
                            <Text style={styles.textSup}>
                                {formatDecimalValue(payFai?.value, 1)}
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.paymentBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Número de cuenta</Text>
                        <Text style={styles.paymentBodySubTitle}>
                            {transaction?.accountFai || 0}
                        </Text>
                    </View>
                    <View style={styles.paymentBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Número de comprobante</Text>
                        <Text style={styles.paymentBodySubTitle}>
                            {payFai?.externalTransactionId || 0}
                        </Text>
                    </View>
                    <View style={styles.paymentBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Dirección IP</Text>
                        <Text style={styles.paymentBodySubTitle}>
                            {transaction?.ipAddress || 0}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.line}></View>
            <View>
                <Text style={styles.textTitle}>Resumen del pago por débito PSE</Text>
                <View style={styles.paymentBody}>
                    <View style={styles.paymentBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Monto del pago</Text>
                        <Text style={styles.paymentBodySubTitle}>
                            $ {formatValue(payPSE?.value, 1) || 0}
                            <Text style={styles.textSup}>
                                {formatDecimalValue(payPSE?.value, 1)}
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.paymentBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Número CUS*</Text>
                        <Text style={styles.paymentBodySubTitle}>
                            {payPSE?.externalTransactionId || 0}
                        </Text>
                    </View>
                    <View style={styles.paymentBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Banco emisor</Text>
                        <Text style={styles.paymentBodySubTitle}>{transaction?.bankName || 0}</Text>
                    </View>
                </View>
                <Text style={styles.paymentHeadMessage}>
                    *El número CUS es el código único de seguimiento y es la referencia de pago
                    dentro del banco. Solo aplica para pagos realizados con PSE
                </Text>
            </View>
        </>
    )
}

const ProductSummary = (product: Payment): JSX.Element => {
    if (product.isTdc === 1) {
        return (
            <>
                <View style={styles.productHead}>
                    <Text style={styles.paymentBodyTitle}>Producto</Text>
                    <View style={styles.productHeadDescriptionContainer}>
                        <Image
                            style={styles.productHeadImg}
                            src={product.urlImage || ProductIconDefault}
                        />
                        <Text style={styles.productHeadDescriptionTDC}>TDC</Text>
                    </View>
                </View>
                <View style={styles.productBody}>
                    <View style={styles.productBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Valor de la inversión</Text>
                        <Text style={styles.paymentBodySubTitle}>
                            $ {formatValue(product.value, 1) || 0}
                            <Text style={styles.textSup}>
                                {formatDecimalValue(product.value, 1)}
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.productBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Tasa de interés EA</Text>
                        <Text style={styles.paymentBodySubTitle}>
                            {(parseFloat(product.rate) * 100).toFixed(2) || 0}%
                        </Text>
                    </View>

                    <View style={styles.productBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Número de pagos</Text>
                        <Text style={styles.paymentBodySubTitle}>
                            {product.paymentsNumber || 0}
                        </Text>
                    </View>
                    <View style={styles.productBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Número título digital</Text>
                        <Text style={styles.paymentBodySubTitle}>{product.tdcNumber || 0}</Text>
                    </View>
                    <View style={styles.productBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Documento único</Text>
                        <Text style={styles.paymentBodySubTitle}>
                            {product.physicalNumber || 0}
                        </Text>
                    </View>

                    <View style={styles.productBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Modalidad de pagos</Text>
                        <Text style={styles.paymentBodySubTitle}>
                            {product.modality || 'Termino'}
                        </Text>
                    </View>
                </View>
            </>
        )
    } else {
        return (
            <>
                <View style={styles.productHead}>
                    <Text style={styles.paymentBodyTitle}>Producto</Text>
                    <View style={styles.productHeadDescriptionContainer}>
                        <Image
                            style={styles.productHeadImg}
                            src={product.urlImage || ProductIconDefault}
                        />
                        <View style={styles.productBodyItem}>
                            <Text style={styles.productHeadDescription}>
                                {product.nameDocument}
                            </Text>
                            <Text style={styles.textSup}>* {product.finishedNumber}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.productBody}>
                    <View style={styles.productBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Valor recibido</Text>
                        <Text style={styles.paymentBodySubTitle}>
                            $ {formatValue(product.value, 1) || 0}
                            <Text style={styles.textSup}>
                                {formatDecimalValue(product.value, 1)}
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.productBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Soporte Contable</Text>
                        <Text style={styles.paymentBodySubTitle}>
                            {product.externalTransactionId || 0}
                        </Text>
                    </View>

                    <View style={styles.productBodyItem}>
                        <Text style={styles.paymentBodyTitle}>Estado del pago</Text>
                        <Text style={styles.paymentBodySubTitle}>
                            {product.status === '1' && (
                                <View style={styles.itemResultState}>
                                    <Image style={styles.itemResultStateImg} src={ElipseGreenPNG} />
                                    <Text style={styles.textPayResultGreen}>Completado</Text>
                                </View>
                            )}
                            {product.status === '2' && (
                                <View style={styles.itemResultState}>
                                    <Image
                                        style={styles.itemResultStateImg}
                                        src={ElipseYellowPNG}
                                    />
                                    <Text style={styles.textPayResultYellow}>
                                        Pendiente de aplicar
                                    </Text>
                                </View>
                            )}
                        </Text>
                    </View>
                </View>
            </>
        )
    }
}

const TransactionTitle = (
    transaction: Transaction | TransactionFAIResponse['resultFaiPayments']
): JSX.Element => {
    switch (
        transaction !== null && 'methodPayment' in transaction
            ? transaction?.methodPayment
            : transaction?.paymentMethod
    ) {
        case 4:
        case 'Cuenta Fai':
            return (
                <View style={styles.paymentHeadContainer}>
                    <Text style={styles.paymentHeadTitle}>
                        Hemos debitado el pago de tu tarjeta de crédito de tu cuenta FAI
                    </Text>
                </View>
            )
        case 3:
        case 2:
            return (
                <View style={styles.paymentHeadContainer}>
                    <Text style={styles.paymentHeadTitle}>Hemos recibido tu pago PSE</Text>
                </View>
            )
        case 0:
            return (
                <View style={styles.paymentHeadContainer}>
                    <Text style={styles.paymentHeadTitle}>
                        Todo listo, tu TDC ha sido constituido con éxito
                    </Text>
                    <Text style={styles.paymentHeadSubTitle}>
                        Recibirás una notificación a tu correo electrónico con más información.
                    </Text>
                </View>
            )
        default:
            return (
                <View style={styles.paymentHeadContainer}>
                    <Text style={styles.paymentHeadTitle}>Hemos recibido tu pago</Text>
                </View>
            )
    }
}

const TransactionVoucher = ({
    transaction,
    payPSE,
    payFai,
    ...props
}: TransactionVoucherProps): React.ReactElement => {
    const listProducts = transaction?.pyments
    const selectPayment = (): JSX.Element => {
        const transactionType =
            transaction && 'methodPayment' in transaction
                ? transaction.methodPayment
                : transaction?.paymentMethod
        switch (transactionType) {
            case 'Cuenta Fai':
            case 4:
                return paymentFAI(
                    transaction && 'methodPayment' in transaction ? transaction : null
                )
            case 2:
            case 3:
                return paymentPSE(
                    transaction && !('methodPayment' in transaction) ? transaction : null
                )
            case 0:
                return paymentMulti(
                    transaction && !('methodPayment' in transaction) ? transaction : null,
                    payPSE,
                    payFai
                )
            default:
                return <></>
        }
    }
    return (
        <Document {...props}>
            <Page size="A4">
                <View style={styles.container}>
                    <View style={styles.detailPayment}>
                        <Text style={styles.textTitle}>Comprobante</Text>
                        <View style={styles.paymentHead}>
                            <Image style={styles.paymentHeadImg} src={CheckTransactionPNG} />
                            {TransactionTitle(transaction)}
                        </View>
                        {selectPayment()}
                    </View>
                    {listProducts?.map((product) => (
                        <View style={styles.detailProduct} key={product.externalTransactionId}>
                            {ProductSummary(product)}
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    )
}
export default TransactionVoucher
