import { Payment } from '../../../../../../domain/models'
import {
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'
import { CreditUmbrellaSVG, ElipseGreenPNG, ElipseYellowPNG } from '../../../../utils/getIcons'
import { ProductDetail, ProductHead } from '../TransactionApproved/transactionApproved-styles'

interface ProductSummaryProps {
    product: Payment
}
const ProductSummary: React.FC<ProductSummaryProps> = ({ product }): JSX.Element => {
    if (product.isTdc === 1) {
        return (
            <>
                <ProductHead>
                    <p>Producto</p>
                    <div>
                        <img src={product.urlImage || CreditUmbrellaSVG} alt="" />
                        <p>TDC</p>
                    </div>
                </ProductHead>
                <ProductDetail>
                    <div>
                        <h3>Valor de la inversión</h3>
                        <p>
                            $ {formatValue(product.value, 1) || 0}
                            <sup>{formatDecimalValue(product.value, 1)}</sup>
                        </p>
                    </div>
                    <div>
                        <h3>Tasa de interés EA</h3>
                        <p>{(parseFloat(product.rate) * 100).toFixed(2) || 0}%</p>
                    </div>
                    <div>
                        <h3>Número de pagos</h3>
                        <p>{product.paymentsNumber || 0}</p>
                    </div>
                    <div>
                        <h3>Número título digital</h3>
                        <p>{product.tdcNumber || 0}</p>
                    </div>
                    <div>
                        <h3>Documento único</h3>
                        <p>{product.physicalNumber || 0}</p>
                    </div>
                    <div>
                        <h3>Modalidad de pagos</h3>
                        <p>{product.modality || 'Termino'}</p>
                    </div>
                </ProductDetail>
            </>
        )
    } else {
        return (
            <>
                <ProductHead>
                    <p>Producto</p>
                    <div>
                        <img src={product.urlImage || CreditUmbrellaSVG} alt="" />
                        <div>
                            <p>{product.nameDocument}</p>
                            <p>* {product.finishedNumber}</p>
                        </div>
                    </div>
                </ProductHead>
                <ProductDetail>
                    <div>
                        <h3>Valor recibido</h3>
                        <p>
                            $ {formatValue(product.value, 1) || 0}
                            <sup>{formatDecimalValue(product.value, 1)}</sup>
                        </p>
                    </div>
                    <div>
                        <h3>Soporte Contable</h3>
                        <p>{product.externalTransactionId || 0}</p>
                    </div>
                    <div>
                        <h3>Estado del pago</h3>
                        {product.status === '1' && (
                            <div>
                                <img src={ElipseGreenPNG} alt="" />
                                <p className="success">Completado</p>
                            </div>
                        )}
                        {product.status === '2' && (
                            <div>
                                <img src={ElipseYellowPNG} alt="" />
                                <p className="warning">Pendiente de aplicar</p>
                            </div>
                        )}
                    </div>
                </ProductDetail>
            </>
        )
    }
}
export default ProductSummary
