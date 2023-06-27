import { Document, Page, View, Text, Image, DocumentProps } from '@react-pdf/renderer'

import './payments.scss'
import ElipseGreenPNG from '../../../../assets/icons/mini-elipse-green.png'
import ElipseYellowPNG from '../../../../assets/icons/mini-elipse-yellow.png'
import { formatValue } from '../../../../components/GlobalFuntions/globalFunction'
import { DeclinedTransactionPNG, CheckTransactionPNG } from '../../../../utils/getIcons'

// styles
import { styles } from './paymentsFaiPDF-styles'
import { CreateTransactionState } from '../../../../../../domain/models'

interface PaymentsFaiPDFProps extends DocumentProps {
    info: Omit<CreateTransactionState, 'urlPayment'>
}

const PaymentsFaiPDF = ({ info, ...props }: PaymentsFaiPDFProps): React.ReactElement => {
    const { transaction, message } = info
    const listProducts = transaction ? transaction.pyments : []

    return (
        <Document {...props}>
            <Page size="A4">
                <View>
                    {info.status === '200' ? (
                        <View>
                            <View style={styles.contentDetailCtoPayments}>
                                <Text style={styles.titleTable}>Comprobante</Text>
                                <View style={styles.sectTitleDctoPayments}>
                                    <View style={styles.contentResultPay}>
                                        <Image
                                            style={styles.contentResultPayImg}
                                            src={CheckTransactionPNG}
                                        />
                                        <Text style={{ fontSize: '18px' }}>
                                            Hemos debitado el pago de tu cuenta FAI
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.titleTable}>Resumen del pago</Text>
                                <View style={styles.rowSubResult}>
                                    <View style={styles.itemTitle}>
                                        <View>
                                            <Text style={styles.subTitle}>Medio de pago</Text>
                                            <Text style={styles.textPayResult}>
                                                {transaction?.methodPayment}
                                            </Text>
                                        </View>
                                        <View style={styles.contentItem}>
                                            <Text style={styles.subTitle}>Número de cuenta</Text>
                                            <Text style={styles.textPayResult}>
                                                {transaction?.numberCount}
                                            </Text>
                                        </View>
                                        <View style={styles.contentItem}>
                                            <Text style={styles.subTitle}>
                                                Número de comprobante
                                            </Text>
                                            <Text style={styles.textPayResult}>
                                                {transaction?.transaction}
                                            </Text>
                                        </View>
                                        <View style={styles.contentItem}>
                                            <Text style={styles.subTitle}>Dirección IP</Text>
                                            <Text style={styles.textPayResult}>
                                                {transaction?.ipAddress}
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
                            {listProducts.length !== 0
                                ? listProducts.map((product) => (
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
                                                          src={product.urlImage ?? ElipseGreenPNG}
                                                          //   alt=""
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
                                                  <Text style={styles.subTitle}>
                                                      Valor recibido
                                                  </Text>
                                                  <Text style={styles.textPayItem}>
                                                      $ {formatValue(product.value, 1)}.00
                                                  </Text>
                                              </View>
                                              <View style={styles.contentItem}>
                                                  <Text style={styles.subTitle}>
                                                      {product.status === '1'
                                                          ? 'Soporte contable'
                                                          : 'Id de la transacción'}
                                                  </Text>
                                                  <Text style={styles.textPayItem}>
                                                      {product.externalTransactionId}
                                                  </Text>
                                              </View>

                                              <View style={styles.contentItem}>
                                                  <Text style={styles.subTitle}>
                                                      Estado del pago
                                                  </Text>

                                                  {product.status === '1' ? (
                                                      <View style={styles.itemResultBasic}>
                                                          <View style={styles.itemResultState}>
                                                              <Image
                                                                  style={styles.itemResultStateImg}
                                                                  src={ElipseGreenPNG}
                                                                  //   alt=""
                                                              />
                                                              <Text
                                                                  style={styles.textPayResultGreen}
                                                              >
                                                                  Completado
                                                              </Text>
                                                          </View>
                                                      </View>
                                                  ) : null}
                                                  {product.status === '2' ? (
                                                      <View style={styles.itemResultBasicArea4}>
                                                          <View style={styles.itemResultState}>
                                                              <Image
                                                                  style={styles.itemResultStateImg}
                                                                  src={ElipseYellowPNG}
                                                                  //   alt=""
                                                              />
                                                              <Text
                                                                  style={styles.textPayResultYellow}
                                                              >
                                                                  Pendiente de aplicar
                                                              </Text>
                                                          </View>
                                                      </View>
                                                  ) : null}
                                              </View>
                                          </View>
                                      </View>
                                  ))
                                : null}
                        </View>
                    ) : (
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
                                    <Text style={styles.textPayItem}>
                                        {transaction?.externalTransactionId}
                                    </Text>
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
export default PaymentsFaiPDF
