import './payments.scss'
import ElipseBluePNG from '../../assets/icons/mini-elipse-blue.png'
import ElipseGreenPNG from '../../assets/icons/mini-elipse-green.png'
import ElipseYellowPNG from '../../assets/icons/mini-elipse-yellow.png'
import { DeclinedTransactionPNG, CheckTransactionPNG } from '../../utils/getIcons'
import { formatValue } from '../../components/GlobalFuntions/globalFunction'
import React from 'react'
import { Document, Page, View, Text, Image, StyleSheet, Font } from '@react-pdf/renderer'
import FontMontserratRegular from '../../assets/sources/Montserrat-Regular.ttf'
import FontHelveticaRegular from '../../assets/sources/Helvetica.ttf'
import FontMontserratMedium from '../../assets/sources/Montserrat-Medium.ttf'

const storageUrl = process.env.REACT_APP_STORAGE_URL
const storage = `${storageUrl}/assets/Icons`

// icons
const CreditUmbrellaSVG = `${storage}/credit-umbrella.svg`

Font.register({
    family: 'Montserrat-Regular',
    format: 'truetype',
    src: FontMontserratRegular,
    weight: '400',
})
Font.register({
    family: 'Helvetica-Regular',
    format: 'truetype',
    src: FontHelveticaRegular,
    weight: '800',
})
Font.register({
    family: 'Montserrat-Medium',
    format: 'truetype',
    src: FontMontserratMedium,
    weight: '500',
})

const styles = StyleSheet.create({
    contentResultPay: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '10px',
        marginRight: 'auto',
        marginTop: '30px',
        justifyContent: 'center',
    },
    contentResultPayImg: {
        width: '31px',
        height: '26px',
        marginRight: '10px',
    },
    itemTitle: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '10px',
        marginTop: '20px',
        gap: '30px',
    },
    itemRow: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '3px',
        border: '1px solid gray',
        borderRadius: '10px',
        paddingTop: '15px',
        paddingLeft: '15px',
    },
    rowSubResult: { marginTop: '10px', marginBottom: '5px' },
    rowSubResultEsp: {
        display: 'grid',
        gridTemplateColumns: '22% 22% 22% 27%',
        marginTop: '30px',
        gap: '25px',
        marginBottom: '30px',
    },
    sectTitleDctoPayments: { marginBottom: '45px' },
    subTitle: { fontSize: '12px', color: '#707070' },
    contentItem: { marginLeft: '28px', display: 'flex', flexDirection: 'column' },
    contentItemFailed: { marginTop: '28px' },
    textItemFailed: { fontSize: '18px' },
    textPayDeclined: { fontFamily: 'Helvetica-Regular', fontSize: '16px', color: '#000000' },
    textPayResult: {
        fontSize: '12px',
        fontFamily: 'Montserrat-Medium',
        color: '#000000',
        marginTop: '20px',
        marginBottom: '60px',
    },
    textPayItem: {
        fontSize: '10px',
        fontFamily: 'Montserrat-Medium',
        color: '#000000',
        marginTop: '10px',
        marginBottom: '30px',
    },
    textPayItemFirts: {
        fontSize: '10px',
        fontFamily: 'Montserrat-Medium',
        color: '#000000',
        marginTop: '10px',
    },
    textPayItemSecond: {
        marginTop: '5px',
        fontSize: '10px',
        fontFamily: 'Montserrat-Medium',
        color: '#000000',
    },
    textPayResultGreen: {
        fontSize: '10px',
        fontFamily: 'Montserrat-Medium',
        color: '#55B948',
        marginLeft: '5px',
        marginTop: '10px',
    },
    textPayResultRed: {
        fontSize: '10px',
        fontFamily: 'Montserrat-Medium',
        color: '#D5342F',
        marginLeft: '5px',
        marginTop: '10px',
    },
    textPayResultBlue: {
        fontSize: '10px',
        fontFamily: 'Montserrat-Medium',
        color: '#07539F',
        marginLeft: '5px',
        marginTop: '10px',
    },
    textPayResultYellow: {
        fontSize: '10px',
        fontFamily: 'Montserrat-Medium',
        color: '#F5A50B',
        marginLeft: '5px',
        marginTop: '10px',
    },
    textSectionResult: {
        color: '#000000',
        fontSize: '13px',
        marginLeft: '5%',
        marginTop: '10px',
        marginRight: '5%',
    },
    titleSectionResult: { fontSize: '14px', color: '#07539F', marginLeft: '5%' },
    titleTable: { fontSize: '14px', color: '#F5A50B', marginTop: '5px', marginLeft: '10px' },
    contentDetailCtoPayments: {
        width: '94%',
        border: '1px solid gray',
        borderRadius: '10px',
        borderTopColor: '#707070',
        margin: '20px 3%',
        height: '250px',
        paddingTop: '10px',
    },
    contentItemResult: { width: '100%', padding: '6.2px' },
    itemResultBasic: {
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    itemResultBasicArea4: {
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gridArea: 'area4',
    },
    itemWhitImage: {
        display: 'flex',
        flexDirection: 'row',
        gap: '5px',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    itemResultComp: { display: 'flex', justifyContent: 'center', alignItems: 'flex-start' },
    itemResultCompImg: { margin: 'auto 8px auto 0px', width: '25px', height: '25px' },
    itemResultState: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    itemResultStateImg: { marginTop: '13px', width: '5px', height: '5px' },
    transactionDeclined: {
        boxShadow: '0px 3px 6px #00000029',
        borderRadius: '10px',
        marginBottom: '20px',
        width: '533px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '30px',
    },
})

const PaymentsPDF = ({ info }) => {
    const { transaction, message } = info
    const listProducts = transaction ? transaction.pyments : []
    return (
        <Document>
            <Page size="A4">
                <View>
                    {info.status === '200' && (
                        <View>
                            <View style={styles.contentDetailCtoPayments}>
                                <Text style={styles.titleTable}>Comprobante</Text>
                                <View style={styles.sectTitleDctoPayments}>
                                    <View style={styles.contentResultPay}>
                                        <Image
                                            style={styles.contentResultPayImg}
                                            src={CheckTransactionPNG}
                                        />
                                        <Text style="font-size: 18px">
                                            Hemos recibido tu pago PSE
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.titleTable}>Resumen del pago</Text>
                                <View style={styles.rowSubResult}>
                                    <View style={styles.itemTitle}>
                                        <View>
                                            <Text style={styles.subTitle}>Medio de pago</Text>
                                            <Text style={styles.textPayResult}>PSE - ACH</Text>
                                        </View>
                                        <View style={styles.contentItem}>
                                            <Text style={styles.subTitle}>Número CUS</Text>
                                            <Text style={styles.textPayResult}>
                                                {transaction.trazabilityCode}
                                            </Text>
                                        </View>
                                        <View style={styles.contentItem}>
                                            <Text style={styles.subTitle}>Número IP</Text>
                                            <Text style={styles.textPayResult}>
                                                {transaction.ipAddress}
                                            </Text>
                                        </View>
                                        <View style={styles.contentItem}>
                                            <Text style={styles.subTitle}>Banco emisor</Text>
                                            <Text style={styles.textPayResult}>
                                                {transaction.bankName}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.titleSectionResult}>Detalle de tu pago</Text>
                            <Text style={styles.textSectionResult}>
                                Tu pago ha sido recibido, a continuación te mostraremos el detalle
                                de como ha sido aplicado este pago a cada uno de tus productos.
                            </Text>
                            {listProducts.length !== 0 &&
                                listProducts.map((product) => (
                                    <View
                                        style={styles.contentItemResult}
                                        key={product.externalTransactionId}
                                    >
                                        <View style={styles.itemRow}>
                                            <View>
                                                <Text style={styles.subTitle}>Producto</Text>
                                                <View style={styles.itemWhitImage}>
                                                    <Image
                                                        style={styles.itemResultCompImg}
                                                        src={
                                                            product.urlImage !== null
                                                                ? product.urlImage
                                                                : CreditUmbrellaSVG
                                                        }
                                                        alt=""
                                                    />
                                                    <View style={styles.itemResultComp}>
                                                        <Text style={styles.textPayItemFirts}>
                                                            {product.nameDocument}
                                                        </Text>
                                                        <Text style={styles.textPayItemSecond}>
                                                            {product.document}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.contentItem}>
                                                <Text style={styles.subTitle}>Valor recibido</Text>
                                                <Text style={styles.textPayItem}>
                                                    $ {formatValue(product.value, 1)}.00
                                                </Text>
                                            </View>
                                            <View style={styles.contentItem}>
                                                <Text style={styles.subTitle}>
                                                    Soporte contable
                                                </Text>
                                                <Text style={styles.textPayItem}>
                                                    {product.externalTransactionId}
                                                </Text>
                                            </View>
                                            <View style={styles.contentItem}>
                                                <Text style={styles.subTitle}>Estado del pago</Text>

                                                {product.status === '1' && (
                                                    <View style={styles.itemResultBasic}>
                                                        <View style={styles.itemResultState}>
                                                            <Image
                                                                style={styles.itemResultStateImg}
                                                                src={ElipseGreenPNG}
                                                                alt=""
                                                            />
                                                            <Text style={styles.textPayResultGreen}>
                                                                Completado
                                                            </Text>
                                                        </View>
                                                    </View>
                                                )}
                                                {product.status === 'REINTEGRO' && (
                                                    <View style={styles.itemResultBasic}>
                                                        <View style={styles.itemResultState}>
                                                            <Image
                                                                style={styles.itemResultStateImg}
                                                                src={ElipseBluePNG}
                                                                alt=""
                                                            />
                                                            <Text style={styles.textPayResultBlue}>
                                                                Enviado a reintegro
                                                            </Text>
                                                        </View>
                                                    </View>
                                                )}
                                                {product.status === '2' && (
                                                    <View style={styles.itemResultBasicArea4}>
                                                        <View style={styles.itemResultState}>
                                                            <Image
                                                                style={styles.itemResultStateImg}
                                                                src={ElipseYellowPNG}
                                                                alt=""
                                                            />
                                                            <Text
                                                                style={styles.textPayResultYellow}
                                                            >
                                                                Pendiente de aplicar
                                                            </Text>
                                                        </View>
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                ))}
                        </View>
                    )}

                    {info.status === '203' && (
                        <View style={styles.transactionDeclined}>
                            <Text style={styles.titleTable}>Comprobante</Text>
                            <View style={styles.contentResultPay}>
                                <Image
                                    src={DeclinedTransactionPNG}
                                    style={styles.contentResultPayImg}
                                />
                                <Text style={styles.textItemFailed}>{message?.split('|')[0]}</Text>
                            </View>
                            <Text style={styles.textSectionResult}>{message?.split('|')[1]}</Text>
                            <View style={styles.contentItemFailed}>
                                <View style={styles.contentItem}>
                                    <Text style={styles.subTitle}>Código de error</Text>
                                    <Text style={styles.textPayItem}>{transaction?.message}</Text>
                                </View>
                            </View>
                            <Text style={styles.textSectionResult}>
                                Si el problema persiste, comunícate con servicio al asociado.
                            </Text>
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    )
}
export default PaymentsPDF
