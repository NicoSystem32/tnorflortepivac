import type { StepTypeExtended } from '@reactour/tour'

// helpers
import {
    mainContentStyles,
    openDesktopNavbar,
    hideDesktopNavbar,
    addActionHint,
    removeActionHint,
    openWallet,
    closeWallet,
} from '../helpers'

// onboarding steps components
import {
    // home wallet
    StartStep,
    MenuStep,
    PaymentsMenuStep,
    ProductsMenuStep,
    WalletMenuStep,
    EmptyWalletStep,
    OpenProductStep,
    CreditsAvailableStep,
    ProductsAvailableStep,
    CreditCardsStep,
    SupportStep,
    // savings group & detail
    SavingsGroupStep,
    ContributionsStep,
    SavingsPaymentOptsStep,
    SavingsAddPaymentsStep,
    PaymentWalletStep,
    // credit group & detail
    CreditGroupStep,
    CreditStep,
    CreditPaymentOptsStep,
    CreditPaymentReview,
    // opening products & investment TDC
    ProductsOpeningStep,
    InvestmentTDCStep,
    CreateInvestmentStep,
    ReturnsInvestmentStep,
    FinishInvestmentStep,
    // payment FAI & multipayment
    PaymentAmountStep,
    IvrKeyStep,
    ConfirmIvrKeyStep,
    FAIDynamicKeyStep,
    // modify savings product
    SavingsPaymentModify,
} from '../inc'

export const overviewSteps: StepTypeExtended[] = [
    {
        selector: '.main-content',
        content: StartStep,
        styles: mainContentStyles,
    },
    {
        selector: '[data-tour="menu-options"]',
        content: MenuStep,
    },
    {
        selector: '[data-tour="payments-opt"]',
        highlightedSelectors: ['#content-header-payment', '[data-tour="payments-opt"]'],
        resizeObservables: ['#content-header-payment', '[data-tour="payments-opt"]'],
        content: PaymentsMenuStep,
        action: openDesktopNavbar,
        actionAfter: hideDesktopNavbar,
    },
    {
        selector: '[data-tour="products-opt"]',
        highlightedSelectors: ['#content-header-products', '[data-tour="products-opt"]'],
        resizeObservables: ['#content-header-products', '[data-tour="products-opt"]'],
        content: ProductsMenuStep,
        action: openDesktopNavbar,
        actionAfter: hideDesktopNavbar,
    },
    {
        selector: '[data-tour="wallet-menu"]',
        content: WalletMenuStep,
    },
    {
        selector: '[data-tour="wallet"]',
        mutationObservables: ['[data-tour="wallet"]'],
        resizeObservables: ['[data-tour="wallet"]'],
        content: EmptyWalletStep,
        actionBeforeArrive: openWallet,
        actionAfter: closeWallet,
    },
    {
        selector: '[data-tour="get-products"]',
        content: OpenProductStep,
    },
    {
        selector: '[data-tour="credits-available"]',
        content: CreditsAvailableStep,
    },
    {
        selector: '[data-tour="products-available"]',
        content: ProductsAvailableStep,
    },
    {
        selector: '[data-tour="credit-cards"]',
        content: CreditCardsStep,
    },
    {
        selector: '[data-tour="support"]',
        content: SupportStep,
    },
]

export const savingsGroupSteps: StepTypeExtended[] = [
    {
        selector: '.main-content',
        content: SavingsGroupStep,
        styles: mainContentStyles,
    },
    {
        selector: '[data-tour="contributions"]',
        content: ContributionsStep,
        highlightedSelectors: ['[data-tour="contribution-card"]'],
        action: addActionHint,
        actionAfter: removeActionHint,
    },
    {
        selector: '[data-tour="saving-payment-opts"]',
        content: SavingsPaymentOptsStep,
        mutationObservables: ['[data-tour="saving-payment-opts"]'],
        resizeObservables: ['[data-tour="saving-payment-opts"]'],
        action: addActionHint,
        actionAfter: removeActionHint,
    },
    {
        selector: '[data-tour="add-savings-to-payments"]',
        content: SavingsAddPaymentsStep,
    },
    {
        selector: '[data-tour="wallet"]',
        mutationObservables: ['[data-tour="wallet"]'],
        resizeObservables: ['[data-tour="wallet"]'],
        content: PaymentWalletStep,
        actionBeforeArrive: openWallet,
        actionAfter: closeWallet,
    },
]

export const creditGroupSteps: StepTypeExtended[] = [
    {
        selector: '.main-content',
        content: CreditGroupStep,
        styles: mainContentStyles,
    },
    {
        selector: '[data-tour="credit-overview"]:first-of-type',
        content: CreditStep,
        action: addActionHint,
        actionAfter: removeActionHint,
    },
    {
        selector: '[data-tour="credit-payment-opts"]',
        content: CreditPaymentOptsStep,
    },
    {
        selector: '[data-tour="credit-payment-info"] img',
        content: CreditPaymentReview,
        highlightedSelectors: ['#tooltip-cuota'],
        mutationObservables: ['#tooltip-cuota'],
        resizeObservables: ['#tooltip-cuota'],
        actionBeforeArrive: (elem) => {
            const event = new MouseEvent('mouseover', { bubbles: true })
            elem?.dispatchEvent(event)
        },
        actionAfter: (elem) => {
            const event = new MouseEvent('mouseout', { bubbles: true })
            elem?.dispatchEvent(event)
        },
    },
]

export const productsOpeningSteps: StepTypeExtended[] = [
    {
        selector: '.main-content',
        content: ProductsOpeningStep,
        styles: mainContentStyles,
    },
    {
        selector: '[data-tour="investment-tdc"]',
        mutationObservables: ['[data-tour="investment-tdc"]'],
        content: InvestmentTDCStep,
    },
    {
        selector: '[data-tour="create-tdc"]',
        mutationObservables: ['[data-tour="create-tdc"]'],
        resizeObservables: ['[data-tour="create-tdc"]'],
        highlightedSelectors: [
            '[data-tour="tdc-investment-field"]',
            '[data-tour="tdc-term-field"]',
            '[data-tour="tdc-modality-check"]',
            '[data-tour="tdc-modality-field"]',
        ],
        content: CreateInvestmentStep,
    },
    {
        selector: '[data-tour="tdc-simulator"]',
        content: ReturnsInvestmentStep,
    },
    {
        selector: '[data-tour="finish-tdc"]',
        content: FinishInvestmentStep,
    },
]

export const firstPaymentSteps: StepTypeExtended[] = [
    {
        selector: '[data-tour="fai-payment-amount"]',
        content: PaymentAmountStep,
    },
    {
        selector: '[data-tour="fai-ivr-key"]',
        content: IvrKeyStep,
        highlightedSelectors: ['[data-tour="fai-ivr-key"]', '[data-tour="fai-digit-keyboard"]'],
        resizeObservables: ['[data-tour="fai-ivr-key"]', '[data-tour="fai-digit-keyboard"]'],
        mutationObservables: ['[data-tour="fai-ivr-key"]', '[data-tour="fai-digit-keyboard"]'],
        action: (elem) => {
            const ivrField = elem?.querySelector<HTMLInputElement>('#ivr-field')
            ivrField?.focus()
        },
    },
    {
        selector: '[data-tour="confirm-fai-ivr"]',
        content: ConfirmIvrKeyStep,
    },
    {
        selector: '[data-tour="fai-dynamic-key"]',
        resizeObservables: ['[data-tour="fai-dynamic-key"]'],
        mutationObservables: ['[data-tour="fai-dynamic-key"]'],
        content: FAIDynamicKeyStep,
        styles: {
            maskArea: (base, state) => ({
                ...base,
                x: state && (state?.x as number) - 600,
            }),
        },
    },
]

export const savingsProductModifySteps: StepTypeExtended[] = Array.from(savingsGroupSteps)
savingsProductModifySteps.splice(
    2,
    2,
    ...[
        {
            selector: '[data-tour="saving-payment-opts"]',
            content: SavingsPaymentModify,
            mutationObservables: ['[data-tour="saving-payment-opts"]'],
            resizeObservables: ['[data-tour="saving-payment-opts"]'],
        },
    ]
)
