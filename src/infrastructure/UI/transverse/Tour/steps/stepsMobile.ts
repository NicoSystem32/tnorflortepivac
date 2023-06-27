import type { StepTypeExtended } from '@reactour/tour'

// helpers
import {
    mainContentStyles,
    openMobileNavMenu,
    hideMobileNavMenu,
    openWallet,
    closeWallet,
    addActionHint,
    removeActionHint,
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

/* steps for mobile */
export const overviewMobileSteps: StepTypeExtended[] = [
    {
        selector: '.main-content',
        content: StartStep,
        styles: mainContentStyles,
    },
    {
        selector: '[data-tour="menu-options-mob"]',
        content: MenuStep,
        action: hideMobileNavMenu,
    },
    {
        selector: '[data-tour="payments-opt-mob"]',
        mutationObservables: ['[data-tour="payments-opt-mob"]'],
        resizeObservables: ['[data-tour="payments-opt-mob"]'],
        content: PaymentsMenuStep,
        actionBeforeArrive: openMobileNavMenu,
    },
    {
        selector: '[data-tour="products-opt-mob"]',
        content: ProductsMenuStep,
        actionBeforeArrive: openMobileNavMenu,
    },
    {
        selector: '[data-tour="wallet-menu-mob"]',
        content: WalletMenuStep,
        action: hideMobileNavMenu,
    },
    {
        selector: '[data-tour="wallet-title"]',
        highlightedSelectors: ['[data-tour="wallet-title"]', '[data-tour="content-wallet-empty"]'],
        mutationObservables: ['[data-tour="wallet-title"]', '[data-tour="content-wallet-empty"]'],
        resizeObservables: ['[data-tour="wallet-title"]', '[data-tour="content-wallet-empty"]'],
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
        selector: '[data-tour="support-mob"]',
        content: SupportStep,
        actionBeforeArrive: openMobileNavMenu,
        actionAfter: hideMobileNavMenu,
    },
]

export const savingsGroupMobileSteps: StepTypeExtended[] = [
    {
        selector: '.main-content',
        content: SavingsGroupStep,
        styles: mainContentStyles,
    },
    {
        selector: '[data-tour="contributions"]',
        content: ContributionsStep,
        highlightedSelectors: [
            '[data-tour="contribution-card"]',
            '[data-tour="contributions-title"]',
        ],
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
        selector: '[data-tour="wallet-item"]',
        mutationObservables: ['[data-tour="wallet-item"]'],
        resizeObservables: ['[data-tour="wallet-item"]'],
        content: PaymentWalletStep,
        actionBeforeArrive: openWallet,
        actionAfter: closeWallet,
    },
]

export const creditGroupMobileSteps: StepTypeExtended[] = [
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
        selector: '[data-tour="credit-payment-opts-mob"]',
        content: CreditPaymentOptsStep,
    },
    {
        selector: '[data-tour="credit-payment-info-mob"]',
        content: CreditPaymentReview,
        highlightedSelectors: ['[data-tour="credit-payment-info"] img', '#tooltip-cuota'],
        mutationObservables: ['[data-tour="credit-payment-info"] img', '#tooltip-cuota'],
        resizeObservables: ['[data-tour="credit-payment-info"] img', '#tooltip-cuota'],
        actionBeforeArrive: () => {
            const elem = document.querySelector('[data-tour="credit-payment-info"] img')
            const event = new MouseEvent('mouseover', { bubbles: true })
            elem?.dispatchEvent(event)
        },
        actionAfter: () => {
            const elem = document.querySelector('[data-tour="credit-payment-info"] img')
            const event = new MouseEvent('mouseout', { bubbles: true })
            elem?.dispatchEvent(event)
        },
    },
]

export const productsOpeningMobileSteps: StepTypeExtended[] = [
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

export const firstPaymentMobileSteps: StepTypeExtended[] = [
    {
        selector: '[data-tour="fai-payment-amount"]',
        content: PaymentAmountStep,
        resizeObservables: ['[data-tour="fai-payment-amount"]'],
        mutationObservables: ['[data-tour="fai-payment-amount"]'],
    },
    {
        selector: '[data-tour="fai-ivr-key"]',
        content: IvrKeyStep,
        resizeObservables: ['[data-tour="fai-ivr-key"]'],
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
    },
]

export const savingsProductModifyMobileSteps: StepTypeExtended[] =
    Array.from(savingsGroupMobileSteps)
savingsProductModifyMobileSteps.splice(
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
