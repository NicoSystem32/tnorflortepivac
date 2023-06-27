import { FormEvent, useState, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { Button, Loading, Toast } from '../../../../components'
import { useUpdateEffect } from 'usehooks-ts'

//icons
import { ACFSVG, Big404SVG, IconAlertSVG, IconPayFaiSVG } from '../../../../utils/getIcons'
import { IconPsePNG } from '../../../../utils/getImages'

// functions
import {
    formatValue,
    formatDecimalValue,
    formatValueNegative,
} from '../../../../components/GlobalFuntions/globalFunction'

// styles
import { ContentOptionCard, NotFoundOrigins, OptionPay, OptionsContent } from './fundsOrigin-styles'
import { PaymentsList, PaymentsOptions, TitlePayments } from '../../payments-styles'

// models
import { PaymentTransaction } from '../../../../../../domain/models'
// redux resources
import { createTransaction } from '../../../../../redux/transaction'
import {
    CreditCardPaymentSelector,
    parametersTDCSelector,
    transactionPSESelector,
} from '../../../../../selectors'

// hooks
import { IProduct, useAuth, useFormatSendData } from '../../../../hooks'
import { faiAccountExistSelector } from '../../../../../selectors/products'
import { parseStringToBoolean } from '../../../../utils/misc'

interface FundsOriginProps {
    validateStatus: (response: string, data: string) => void
}

// const tokenNew = ''
const enableMultiPayments = process.env.REACT_APP_MULTIPAYMENT_ENABLE as 'false' | 'true'

const FundsOrigin: React.FC<FundsOriginProps> = ({ validateStatus }): ReactElement => {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const [isDisabled, setDisabled] = useState(true)
    const [item, setItem] = useState({ kindOfStand: '', another: 'another' })
    const { kindOfStand } = item

    const { products: listProducts, total } = useSelector((stateRef: any) => stateRef.products)
    const { status, isLoading } = useSelector(transactionPSESelector)
    const stateAuth = useSelector((stateRef: any) => stateRef.auth)
    const {
        faiAccount: { balanceTotal: balanceFAI },
        loading: loadingFaiAccount,
    } = useSelector(faiAccountExistSelector)

    const tdcParameters = useSelector(parametersTDCSelector)
    const { dataPayment } = useSelector(CreditCardPaymentSelector)

    const { formatTransactionData } = useFormatSendData()
    const { callToRefreshToken, logout } = useAuth()

    useUpdateEffect(() => {
        if (!['200', '202', '203', '400', '401'].includes(status || '') && status !== null) {
            history.push('/not-response')
        }
    }, [status])

    const createObject = (): PaymentTransaction => {
        if (location?.state?.type === 'TDC') {
            let itemTDC: IProduct = {
                typeDocument: '',
                finishedNumber: '0',
                document: '0',
                description: 'tdc constitution',
                value: tdcParameters !== null ? tdcParameters.value.toFixed(2) : 0,
                typePay: 1,
                paymentMethodTdc: 'PSE',
                isTdc: 1,
                nameDocument: 'tdc',
            }

            if (tdcParameters !== null) {
                itemTDC = {
                    ...itemTDC,
                    term: tdcParameters.term,
                    rate: tdcParameters.rate,
                    normaTdc: tdcParameters.normaTdc,
                    isExpiration: tdcParameters.isExpiration,
                    modality: tdcParameters.modality,
                    paymentsNumber: tdcParameters.paymentsNumber,
                    yieldBeforeRetention: tdcParameters.yieldBeforeRetention,
                    periodRetention: tdcParameters.periodRetention,
                    yieldAfterRetention: tdcParameters.yieldAfterRetention,
                    netYield: tdcParameters.netYield,
                    modalityDays: tdcParameters.modalityDays,
                    ratePeriod: tdcParameters.ratePeriod,
                }
            }

            return formatTransactionData({
                productsList: [itemTDC],
                paymentMethod: 2,
                totalValue: tdcParameters !== null ? tdcParameters.value : 0,
            })
        }
        if (location?.state?.type === 'TC' && dataPayment !== null) {
            const itemTDC: IProduct = {
                typeDocument: dataPayment.idProduct,
                finishedNumber: dataPayment.lastFourDigits,
                document: '0',
                description: 'tc payment',
                value: dataPayment.value,
                typePay: dataPayment.typePay,
                paymentMethod: 'PSE',
                isTdc: 0,
                nameDocument: dataPayment.nameDocument,
                idProduct: dataPayment.idProduct,
                number: '1',
            }

            return formatTransactionData({
                productsList: [itemTDC],
                paymentMethod: 3,
                totalValue: dataPayment.value,
            })
        }
        return formatTransactionData({
            productsList: listProducts,
            paymentMethod: 2,
            totalValue: total,
        })
    }

    /* events handlers */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setDisabled(false)
        e.persist()

        setItem((prevState) => ({
            ...prevState,
            kindOfStand: e.target.value,
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const forwardState: { from?: string } = {}
        if (location.state?.type) forwardState.from = location.state?.type

        if (`${kindOfStand}` === 'pse') {
            handleSubmitBtn()
        }
        if (`${kindOfStand}` === 'fai') {
            history.push('/paymentsfai', forwardState)
        }
        if (`${kindOfStand}` === 'multi') {
            history.push('/multi-payments-tdc', forwardState)
        }
    }

    const handleSubmitBtn = (): void => {
        const body = createObject()
        callToRefreshToken(() => {
            dispatch(createTransaction(body))
        }, logout)
    }

    return (
        <PaymentsList>
            {(stateAuth.paymentPSE || balanceFAI !== null) && !loadingFaiAccount && (
                <>
                    <TitlePayments>
                        Selecciona el
                        <strong>&nbsp;origen de los fondos&nbsp;</strong>
                        <p>
                            Recuerda que tu transacción puede estar sujeta a cobro del 4 x 1000, de
                            realizarse, podrás ver este cobro en los movimientos de tu cuenta FAI
                            {stateAuth.paymentPSE && (
                                <span>
                                    , o de tu banco emisor en el caso de que pagues por PSE.
                                </span>
                            )}
                        </p>
                        <Toast>
                            <h4>Pago por PSE</h4>
                            <p>
                                Ten en cuenta seleccionar la opción "RETORNAR AL COMERCIO" una vez
                                termines tu proceso de pago en PSE, para que tu pago quede
                                correctamente; de lo contrario tendrás que esperar un lapso de 7
                                minutos para que tu pago sea efectivo.
                            </p>
                        </Toast>
                    </TitlePayments>
                    <form onSubmit={handleSubmit}>
                        <Form.Group controlId="kindOfStand">
                            <OptionsContent>
                                {stateAuth.paymentPSE && (
                                    <OptionPay>
                                        <span>Nuevo</span>
                                        <div className="radio-btn">
                                            <Form.Check
                                                className="radio"
                                                value="pse"
                                                type="radio"
                                                aria-label="radio 1"
                                                label=""
                                                onChange={handleChange}
                                                checked={kindOfStand === 'pse'}
                                            />
                                        </div>
                                        <ContentOptionCard>
                                            <img src={IconPsePNG} alt="" className="pse" />
                                            <div>
                                                <p className="title">Débito Bancario PSE</p>
                                                <p className="text">PSE - ACH</p>
                                            </div>
                                        </ContentOptionCard>
                                    </OptionPay>
                                )}
                                {balanceFAI !== null && (
                                    <OptionPay>
                                        <div className="radio-btn">
                                            <Form.Check
                                                className="radio"
                                                value="fai"
                                                type="radio"
                                                aria-label="radio 2"
                                                label=""
                                                onChange={handleChange}
                                                checked={kindOfStand === 'fai'}
                                                disabled={
                                                    location?.state?.type === 'TDC'
                                                        ? balanceFAI <
                                                          parseFloat(
                                                              tdcParameters?.value?.toFixed(2) || ''
                                                          )
                                                        : balanceFAI < formatValueNegative(total)
                                                }
                                            />
                                        </div>
                                        <ContentOptionCard>
                                            <img src={IconPayFaiSVG} alt="" />
                                            <div>
                                                <p className="title">Cuenta FAI</p>
                                                <p className="text">
                                                    Saldo: ${formatValue(balanceFAI ?? 0, 1)}
                                                    <sup>{formatDecimalValue(balanceFAI, 1)}</sup>
                                                </p>
                                                {(location?.state?.type === 'TDC'
                                                    ? balanceFAI <
                                                      parseFloat(
                                                          tdcParameters?.value?.toFixed(2) || ''
                                                      )
                                                    : balanceFAI < formatValueNegative(total)) && (
                                                    <p className="mora">
                                                        <img src={IconAlertSVG} alt="" />
                                                        Saldo insuficiente
                                                    </p>
                                                )}
                                            </div>
                                        </ContentOptionCard>
                                    </OptionPay>
                                )}
                                {parseStringToBoolean(enableMultiPayments) &&
                                    stateAuth.paymentPSE &&
                                    location?.state?.type === 'TDC' &&
                                    balanceFAI !== null && (
                                        <OptionPay>
                                            <span>Nuevo</span>
                                            <div className="radio-btn">
                                                <Form.Check
                                                    className="radio"
                                                    value="multi"
                                                    type="radio"
                                                    aria-label="radio 3"
                                                    label=""
                                                    onChange={handleChange}
                                                    checked={kindOfStand === 'multi'}
                                                    disabled={balanceFAI <= 0}
                                                />
                                            </div>
                                            <ContentOptionCard>
                                                <img src={ACFSVG} alt="" />
                                                <div>
                                                    <p className="title">Pago multibanco</p>
                                                    <p className="text">PSE + FAI</p>
                                                    {balanceFAI <= 0 && (
                                                        <p className="mora">
                                                            <img src={IconAlertSVG} alt="" />
                                                            Saldo insuficiente
                                                        </p>
                                                    )}
                                                </div>
                                            </ContentOptionCard>
                                        </OptionPay>
                                    )}
                            </OptionsContent>
                        </Form.Group>
                        <PaymentsOptions>
                            <Button
                                variant="outline-cancel"
                                onClick={() =>
                                    location?.state?.type === 'TDC'
                                        ? history.push('/tdc-opening')
                                        : history.push('/home-wallet')
                                }
                            >
                                Cancelar
                            </Button>
                            <Button
                                disabled={isDisabled || isLoading}
                                variant="sub-dominant"
                                type="submit"
                                isLoading={isLoading}
                            >
                                Pagar
                            </Button>
                        </PaymentsOptions>
                    </form>
                </>
            )}
            {balanceFAI === null && !stateAuth.paymentPSE && !loadingFaiAccount && (
                <NotFoundOrigins>
                    <div>
                        <h2>
                            Lo sentimos, en este momento{' '}
                            <span> no tienes opciones de pago disponibles</span>
                        </h2>
                        <img src={Big404SVG} alt="Not found" />
                    </div>
                    <div>
                        <Button
                            variant="sub-dominant"
                            onClick={() => history.push('/home-wallet')}
                            extend
                        >
                            Cancelar
                        </Button>
                    </div>
                </NotFoundOrigins>
            )}
            {loadingFaiAccount && <Loading />}
        </PaymentsList>
    )
}

export default FundsOrigin
