import { Switch, Route, Redirect } from 'react-router-dom'

// route components
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

// entry pages components
import { ProblemsUser } from '../components'

import {
    TarDetail,
    Login,
    PaymentsFAI,
    PaymentFaiResult,
    NotFound,
    InternalServerError,
    HomeWallet,
    Support,
    SavingsGroup,
    SavingsDetail,
    CreditGroup,
    CreditDetail,
    Payments,
    PaymentsResult,
    ProductsOpening,
    TdcOpening,
    MultiPaymentsTDC,
    OpeningCreditCard,
    ForgetPassword,
    CreditCardDetail,
    ActivateCard,
    PortfolioPurchase,
} from '../pages'

// utils
import { parseStringToBoolean } from '../utils/misc'

// contexts
import createStepProvider from '../pages/PaymentsFAI/context/StepProvider'
import createStepMultiTDCProvider from '../pages/MultiPaymentsTDC/context/StepProvider'
import createStateProvider from '../pages/ForgetPassword/context/StateProvider'
import { LoginStateProvider } from '../pages/Login/context/LoginState'
import createPaymentsProvider from '../pages/Payments/context/PaymentsState'
import { CreditDetailStateProvider } from '../pages/CreditDetail/context/CreditDetailState'
import createActivateCardProvider from '../pages/ActivateCard/context/ActivateCardState'
import React from 'react'

const FaiStepProvider = createStepProvider()
const MultiPaymentsTDCStepProvider = createStepMultiTDCProvider()
const PaymentsProvider = createPaymentsProvider()
const ForgetStateProvider = createStateProvider()
const ActivateCardProvider = createActivateCardProvider()

// -- enableTDC --
const enableTDC = process.env.REACT_APP_TDC_ENABLE as 'false' | 'true'
const enableCreditCard = process.env.REACT_APP_CREDIT_CARD_ENABLE as 'false' | 'true'

// Render functions
const ActivateCardComponent = (): JSX.Element => (
    <ActivateCardProvider>
        <ActivateCard />
    </ActivateCardProvider>
)

const PaymentsComponent = (): JSX.Element => (
    <PaymentsProvider>
        <Payments />
    </PaymentsProvider>
)

const CreditDetailComponent = (): JSX.Element => (
    <CreditDetailStateProvider>
        <CreditDetail />
    </CreditDetailStateProvider>
)

const ForgetPasswordComponent = (): JSX.Element => (
    <ForgetStateProvider>
        <ForgetPassword />
    </ForgetStateProvider>
)

const LoginComponent = (): JSX.Element => (
    <LoginStateProvider>
        <Login />
    </LoginStateProvider>
)

const PaymentsFAIComponent = (): JSX.Element => (
    <FaiStepProvider>
        <PaymentsFAI />
    </FaiStepProvider>
)

const MultiPaymentsTDCComponent = (): JSX.Element => (
    <MultiPaymentsTDCStepProvider>
        <MultiPaymentsTDC />
    </MultiPaymentsTDCStepProvider>
)
export const RouterApp = (): JSX.Element => {
    return (
        <Switch>
            {/* Public Routes */}
            <PublicRoute path="/login" component={LoginComponent} />
            <PublicRoute exact path="/problems-user" component={ProblemsUser} />
            <PublicRoute exact path="/forget-password" component={ForgetPasswordComponent} />
            <PublicRoute exact path="/support" component={Support} />
            <Route exact path="/not-response" component={InternalServerError} />

            {/* Private Routes */}
            <PrivateRoute exact path="/home-wallet" component={HomeWallet} />
            <PrivateRoute exact path="/savings-group" component={SavingsGroup} />
            <PrivateRoute exact path="/savings-detail" component={SavingsDetail} />
            <PrivateRoute exact path="/credits-group" component={CreditGroup} />
            <PrivateRoute exact path="/credits-detail" component={CreditDetailComponent} />
            <PrivateRoute exact path="/tar-detail" component={TarDetail} />
            <PrivateRoute exact path="/product-opening" component={ProductsOpening} />
            {parseStringToBoolean(enableTDC) && (
                <PrivateRoute exact path="/tdc-opening" component={TdcOpening} />
            )}
            <PrivateRoute exact path="/support-private" component={Support} />
            <PrivateRoute exact path="/payments" component={PaymentsComponent} />
            <PrivateRoute exact path="/payments-result" component={PaymentsResult} />
            <PrivateRoute exact path="/multi-payments-tdc" component={MultiPaymentsTDCComponent} />
            <PrivateRoute exact path="/paymentsfai" component={PaymentsFAIComponent} />
            <PrivateRoute exact path="/paymentsfai-result" component={PaymentFaiResult} />

            {parseStringToBoolean(enableCreditCard) && (
                <PrivateRoute exact path="/credit-card-opening" component={OpeningCreditCard} />
            )}
            {parseStringToBoolean(enableCreditCard) && (
                <PrivateRoute exact path="/portfolio-purchase" component={PortfolioPurchase} />
            )}
            {parseStringToBoolean(enableCreditCard) && (
                <PrivateRoute exact path="/credit-card-detail" component={CreditCardDetail} />
            )}
            {parseStringToBoolean(enableCreditCard) && (
                <PrivateRoute exact path="/activate-card" component={ActivateCardComponent} />
            )}

            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact children={<Redirect to="/login" />} />
            <Route path="/*" exact children={<Redirect to="/not-found" />} />
        </Switch>
    )
}
