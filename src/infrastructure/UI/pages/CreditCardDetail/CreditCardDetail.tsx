/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CreditCardSelector } from '../../../selectors'
import { creditCardPaymentAction } from '../../../redux/tc/tc.actions'
import useQueryId from '../../hooks/useQueryId'

//components
import { LayoutContent } from '../../transverse'
import { BreadcrumbApp } from '../../components'
import CardDetail from './inc/CardDetail'
import Details from './inc/CardDetail/Details'
import CardOptions from './inc/CardOptions'
import MenuOptions from './inc/MenuOptions'
import MovementsCard from './inc/MovementsCard'
import PaymentCardForm from './inc/PaymentCardForm'
import InputMobile from './inc/PaymentCardForm/InputMobile'

//models
import { CardStates } from '../../../../domain/models'
import { StoreApp } from '../../../redux/store/store.interface'

//styles
import { CreditCardContainer, Option, Options, OptionText } from './creditCardDetail-styles'
import { portfolioPurchaseAction } from '../../../redux/portfolioPurchaseTC'

export interface FormPay {
    option: string
    other: string
}
export interface FormError {
    error: boolean
    message: string
}
const CreditCardDetail = (): JSX.Element => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(true)
    const [formPay, setFormPay] = useState<FormPay>({ option: '', other: '' })
    const [formError, setFormError] = useState<FormError>({ error: false, message: '' })
    const [showInput, setShowInput] = useState(false)
    const handleSelect = (active: boolean): void => {
        setIsActive(active)
    }
    const { id } = useQueryId()
    const { cardData: infoCard } = useSelector((store: StoreApp) =>
        CreditCardSelector(store, String(id))
    )

    useEffect(() => {
        initialValidations()
        dispatch(portfolioPurchaseAction())
    }, [])

    const initialValidations = (): void => {
        if (id === undefined || !infoCard || infoCard.lockType === CardStates.POR_ACTIVAR)
            history.push('/home-wallet')
    }

    const breadcrumbs = [
        {
            text: 'Inicio',
            active: false,
            onClick: () => {
                history.push('/home-wallet')
            },
        },
        {
            text: 'Tarjeta de crédito',
            active: false,
        },
        {
            text: `Tarjeta ${infoCard?.lastFourDigits}`,
            active: true,
        },
    ]
    const _onBack = (): void => {
        setShowInput(false)
        setFormPay({ option: '', other: '' })
        setFormError({ error: false, message: '' })
    }

    const setValue = (): number => {
        if (infoCard && formPay) {
            switch (formPay.option) {
                case 'minPay':
                    return infoCard.minimumPayment
                case 'totalPay':
                    return infoCard.totalPayment
                case 'other':
                    return parseFloat(formPay.other)
                default:
                    return 0
            }
        }
        return 0
    }

    const handleSubmit = (e?: FormEvent<HTMLFormElement>): void => {
        e?.preventDefault()
        if (infoCard && formPay) {
            dispatch(
                creditCardPaymentAction({
                    idProduct: infoCard.idProduct,
                    value: setValue(),
                    lastFourDigits: infoCard.lastFourDigits,
                    nameDocument: infoCard.nameCard,
                    typePay: formPay.option === 'totalPay' ? 1 : 0,
                })
            )
            history.push('/payments', { type: 'TC' })
            // history.push('/payments-result', { paymentType: 'FAI' })
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.currentTarget.name === 'option' && e.currentTarget.value !== 'other') {
            setFormPay({ option: e.currentTarget.value, other: '' })
            setFormError({ error: false, message: '' })
        } else {
            setFormPay({ ...formPay, [e.currentTarget.name]: e.currentTarget.value })
        }
        if (e.currentTarget.name === 'other') {
            let value = e.target.value
            value = value.replaceAll('.', '')
            value = value.replaceAll('´', '')
            // value = value.replace(',', '.')
            setFormPay({ ...formPay, other: value })
            // e.target.value = formatValue(value, 1)

            if (value !== '' && parseInt(value) < 10_000) {
                setFormError({ error: true, message: 'El valor mínimo de pago es de $10.000' })
            } else if (
                value !== '' &&
                infoCard !== undefined &&
                parseInt(value) > infoCard?.totalPayment
            ) {
                setFormError({
                    error: true,
                    message: `El valor a pagar debe ser menor o igual al pago total`,
                })
            } else {
                setFormError({
                    error: false,
                    message: '',
                })
            }
        }
    }
    return (
        <LayoutContent>
            {infoCard && (
                <>
                    <CreditCardContainer>
                        <div>
                            <BreadcrumbApp
                                breadcrumbs={breadcrumbs}
                                onBack={() =>
                                    !showInput ? history.push('/home-wallet') : _onBack()
                                }
                            />
                            {!showInput && (
                                <CardDetail
                                    setFormPay={setFormPay}
                                    formPay={formPay}
                                    setShowInput={setShowInput}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    formError={formError}
                                />
                            )}
                        </div>
                        <div>
                            <CardOptions
                                stateCard={infoCard.lockType}
                                quotaAvailable={infoCard.quotaAvailable}
                            />
                            <PaymentCardForm
                                setFormPay={setFormPay}
                                formPay={formPay}
                                setShowInput={setShowInput}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                formError={formError}
                            />
                            <MovementsCard />
                        </div>
                        <div>
                            {infoCard.lockType !== CardStates.BLOQUEO_PERDIDA_O_HURTO &&
                                !showInput && (
                                    <div className="movements-details">
                                        <Options>
                                            <Option
                                                isActive={isActive}
                                                onClick={() => handleSelect(true)}
                                            >
                                                <OptionText isActive={isActive}>
                                                    Movimientos
                                                </OptionText>
                                            </Option>
                                            {[
                                                CardStates.ACTIVA.toString(),
                                                CardStates.BLOQUEO_TEMPORAL.toString(),
                                                CardStates.EN_MORA.toString(),
                                            ].includes(infoCard.lockType) && (
                                                <Option
                                                    isActive={!isActive}
                                                    onClick={() => handleSelect(false)}
                                                >
                                                    <OptionText isActive={!isActive}>
                                                        Detalles
                                                    </OptionText>
                                                </Option>
                                            )}
                                        </Options>
                                        {isActive && <MovementsCard />}
                                        {!isActive && <Details infoCard={infoCard} />}
                                    </div>
                                )}
                            <MenuOptions
                                stateCard={infoCard.lockType}
                                quotaAvailable={infoCard.quotaAvailable}
                            />
                            {showInput && (
                                <InputMobile
                                    setFormPay={setFormPay}
                                    formPay={formPay}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    formError={formError}
                                />
                            )}
                            {infoCard.lockType === CardStates.BLOQUEO_PERDIDA_O_HURTO &&
                                !showInput && <MovementsCard />}
                        </div>
                    </CreditCardContainer>
                </>
            )}
        </LayoutContent>
    )
}
export default CreditCardDetail
