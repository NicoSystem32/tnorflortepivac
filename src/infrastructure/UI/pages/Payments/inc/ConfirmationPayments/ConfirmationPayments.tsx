import { Button } from '../../../../components'

//icons
import { Credit1SVG, RemoveSVG } from '../../../../utils/getIcons'
import { useDispatch, useSelector } from 'react-redux'
import { updatePayments } from '../../../../../redux/actions/paymentActions'

//functions
import {
    formatValue,
    formatDecimalValue,
    arrayRemoveEsp,
} from '../../../../components/GlobalFuntions/globalFunction'

//styles
import { PaymentsList, PaymentsOptions, TitlePayments } from '../../payments-styles'
import {
    PaymentsTable,
    TextTable,
    TitleTable,
    TotalValue,
    ValueTableMob,
} from './confirmationPayments-styles'
import { useReducerPayments } from '../../hooks'
import { useHistory } from 'react-router-dom'
interface ConfirmationPaymentsProps {
    props?: string
}

const ConfirmationPayments: React.FC<ConfirmationPaymentsProps> = (): JSX.Element => {
    const dispatch = useDispatch()
    const dispatchState = useReducerPayments()[1]
    const history = useHistory()

    const { products: listProducts, total } = useSelector((stateRef: any) => stateRef.products)

    function validateExistence(number: number): boolean {
        let isInto = false
        for (const itemArray of listProducts) {
            if (itemArray.number === number) {
                isInto = true
            }
        }
        return isInto
    }

    const removeItem = (number: number, finish: string): void => {
        let productArr = []
        if (listProducts !== undefined) {
            productArr = listProducts
        }
        const result = arrayRemoveEsp(productArr, number, finish)
        dispatch(updatePayments(result))
        validateExistence(number)
    }

    const nextStep = (): void => {
        dispatchState({ type: 'NEXT_STEP' })
    }

    return (
        <>
            <PaymentsList data-tour="payments">
                <TitlePayments>Confirma los pagos a realizar</TitlePayments>

                <PaymentsTable hover responsive data-tour="payments-mob">
                    <tbody>
                        {listProducts.length === 0 ? (
                            <tr className="not-elements">
                                <td>Listado de productos vacío</td>
                            </tr>
                        ) : (
                            listProducts.map((product: any) => (
                                <tr key={`${product.number}-${product.finishedNumber}`}>
                                    <td>
                                        <img src={Credit1SVG} alt="" />
                                    </td>
                                    <td>
                                        <TitleTable>Concepto</TitleTable>
                                        <TextTable>{product.name}</TextTable>
                                    </td>
                                    <td>
                                        <TitleTable>Número único</TitleTable>
                                        <TextTable>
                                            {product.number}-{product.finishedNumber}
                                        </TextTable>
                                    </td>
                                    <td>
                                        <TitleTable>Fecha oportuna de pago</TitleTable>
                                        <TextTable>{product.date}</TextTable>
                                    </td>
                                    <td>
                                        <TitleTable>Valor</TitleTable>
                                        <TextTable>
                                            $ {formatValue(product.value, 1)}
                                            <sup>{formatDecimalValue(product.value, 1)}</sup>
                                        </TextTable>
                                    </td>
                                    {/* mobile */}
                                    <td>
                                        <TitleTable>{product.name}</TitleTable>
                                        <TextTable>
                                            Número único: {product.number}-{product.finishedNumber}
                                        </TextTable>
                                        <ValueTableMob>
                                            $ {formatValue(product.value, 1)}
                                            <sup>{formatDecimalValue(product.value, 1)}</sup>
                                        </ValueTableMob>
                                    </td>
                                    {/* mobile */}
                                    <td>
                                        <img
                                            src={RemoveSVG}
                                            alt=""
                                            className="remove-item"
                                            onClick={() =>
                                                removeItem(product.number, product.finishedNumber)
                                            }
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </PaymentsTable>
                <TotalValue>
                    <p className="title">Total</p>
                    <p className="value">
                        $ {formatValue(total, 1)}
                        <sup>{formatDecimalValue(total, 1)}</sup>
                    </p>
                </TotalValue>
                <PaymentsOptions>
                    <Button
                        className="add-more"
                        variant="outline-cancel"
                        onClick={() => history.push('/home-wallet')}
                    >
                        Agregar más conceptos
                    </Button>
                    <Button
                        variant="sub-dominant"
                        disabled={listProducts.length === 0 ? true : false}
                        onClick={nextStep}
                    >
                        Pagar
                    </Button>
                </PaymentsOptions>
            </PaymentsList>
        </>
    )
}

export default ConfirmationPayments
