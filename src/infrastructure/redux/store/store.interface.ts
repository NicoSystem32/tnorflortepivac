import {
    CardsConsolidatedState,
    CreditsConsolidatedState,
    SavingAvailableState,
    CreditsAvailableState,
    ManageState,
    ThemesState,
    DetailState,
    OnboardingState,
    MovementState,
    MovementDetailState,
    FaiAccountBalanceState,
    CreateTransactionState,
    TransactionState,
    TDCSettingState,
    TDCSimulateState,
    ValidateIVRState,
    SendCodeOtpState,
    SendAttachmentPaymentState,
    ValidateOtpState,
    LoginState,
    RefreshTokenState,
    VerifyUserState,
    CreateCreditCardState,
    ValidateCRMState,
    GetCreditCardsState,
    CreditCardPaymentState,
    SendCodeOtpTCState,
    ValidateCodeOtpTCState,
    StatusChangeTCState,
    CreditCardFeesState,
    GetAllBuyWalletState,
    DeleteBuyWalletByIdState,
    GetAllBanksState,
    CreateBuyWalletState,
    GetQuotesFeesSavedState,
    GetAllNomenclatorState,
    SendCodeOtpCreditCardState,
    ValidateCodeOtpCreditCardState,
    GetClientValidationCCRequestState,
    ValidateUserStateState,
    SaveTCContactState,
    GetAllOfficesState,
    SaveTCCivilStatusState,
    PortfolioPurchaseProcessState,
} from '../../../domain/models'

export interface StoreApp {
    cardsConsolidatedReducer: CardsConsolidatedState
    creditsConsolidatedReducer: CreditsConsolidatedState
    savingAvailableReducer: SavingAvailableState
    creditsAvailableReducer: CreditsAvailableState
    manageContentReducer: ManageState
    themeReducer: ThemesState
    detailReducer: DetailState
    onboardingReducer: OnboardingState
    movementsReducer: MovementState
    movementsDetailReducer: MovementDetailState
    faiAccountBalanceReducer: FaiAccountBalanceState
    createTransactionReducer: CreateTransactionState
    getTransactionReducer: TransactionState
    settingTDCReducer: TDCSettingState
    simulateTDCReducer: TDCSimulateState
    validateIVRReducer: ValidateIVRState
    sendCodeOtpReducer: SendCodeOtpState
    sendAttachmentPaymentReducer: SendAttachmentPaymentState
    validateOtpReducer: ValidateOtpState
    loginReducer: LoginState
    refreshTokenReducer: RefreshTokenState
    verifyUserReducer: VerifyUserState
    getDataPerStepReducer: CreateCreditCardState
    validateCRMReducer: ValidateCRMState
    getCreditCardsReducer: GetCreditCardsState
    creditCardPaymentReducer: CreditCardPaymentState
    sendCodeOtpTCReducer: SendCodeOtpTCState
    validateCodeOtpTCReducer: ValidateCodeOtpTCState
    statusChangeTCReducer: StatusChangeTCState
    getCreditCardFeesReducer: CreditCardFeesState
    getAllBuyWalletReducer: GetAllBuyWalletState
    deleteBuyWalletByIdReducer: DeleteBuyWalletByIdState
    getAllBanksReducer: GetAllBanksState
    createBuyWalletStateReducer: CreateBuyWalletState
    getQuotesFeesSavedReducer: GetQuotesFeesSavedState
    getNomenclatorReducer: GetAllNomenclatorState
    sendCodeOtpCreditCardReducer: SendCodeOtpCreditCardState
    validateCodeOtpCreditCardReducer: ValidateCodeOtpCreditCardState
    getClientValidationCCRequestReducer: GetClientValidationCCRequestState
    validateUserStateReducer: ValidateUserStateState
    saveTCContactReducer: SaveTCContactState
    getAllOfficesReducer: GetAllOfficesState
    saveTCCivilStatusReducer: SaveTCCivilStatusState
    portfolioPurchaseProcessReducer: PortfolioPurchaseProcessState

    products: any
    auth: any
}
