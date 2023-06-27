import { RequestStates } from '../../http/typings/api'
import { fetchCreator, storeCreator, deleteCreator, updateCreator } from '../../http/creators'

const path = '/CreditCard'

export const tcRepository = {
    validateCRM: (types: RequestStates) =>
        storeCreator(types, '/CreditCardRequest/DataClientValidation'),
    validateUserState: (types: RequestStates) =>
        fetchCreator(types, `/CreditCardRequest/GetCreditCardRequest`),
    getQuoteTC: (types: RequestStates) => storeCreator(types, `${path}/GetQuoteTC/GetQuoteTC`),
    updateDataPerStepQuoteTC: (types: RequestStates) =>
        storeCreator(types, `${path}/UpdateDataPerStepQuoteTC/UpdateDataPerStepQuoteTC`),
    getDataPerStepQuoteTC: (types: RequestStates) =>
        storeCreator(types, `${path}/GetDataPerStepQuoteTC/GetDataPerStepQuoteTC`),
    SearchProductByIdentityNumber: (types: RequestStates) =>
        storeCreator(
            types,
            `/CreditCardProcess/SearchProductByIdentityNumber/SearchProductByIdentityNumber`
        ),
    PostStatusChangeTC: (types: RequestStates) =>
        storeCreator(types, `/CreditCardTransaction/StatusChange/StatusChange`),
    PostSendCodeOtpTC: (types: RequestStates) =>
        storeCreator(types, `/CreditCardTransaction/SendCodeOtpTC/SendCodeOtpTC`),
    PostValidateCodeOtpTC: (types: RequestStates) =>
        storeCreator(types, `/CreditCardTransaction/ValidateCodeOtpTC/ValidateCodeOtpTC`),
    sendCodeOtpCreditCard: (types: RequestStates) =>
        storeCreator(types, `/CreditCardTransaction/SendCodeOtpCreditCard/SendCodeOtpCreditCard`),
    validateCodeOtpCreditCard: (types: RequestStates, typeCode: string) =>
        storeCreator(
            types,
            `/CreditCardTransaction/ValidateCodeOtpCreditCard/ValidateCodeOtpCreditCard?TypeCode=${typeCode}`
        ),
    getNomenclator: (types: RequestStates) =>
        fetchCreator(types, `/Nomenclators/GetAllNomenclators`),
    getCreditCardFees: (types: RequestStates) => fetchCreator(types, `/Installments/GetAll`),
    getAllBuyWallet: (types: RequestStates) => fetchCreator(types, `/DebtPurchase/GetAllCards`),
    deleteBuyWalletById: (types: RequestStates, id: string | number) =>
        deleteCreator(types, `/DebtPurchase/DeleteCard?id=${id}`),
    createBuyWallet: (types: RequestStates) =>
        storeCreator(types, '/DebtPurchase/RegisterSingleCard'),
    getAllBanks: (types: RequestStates) => fetchCreator(types, `/Bank/GetAll`),
    updateBuyWallet: (types: RequestStates) => updateCreator(types, `/DebtPurchase/UpdateCard`),
    saveQuoteFees: (types: RequestStates, installmentId: string | number) =>
        storeCreator(
            types,
            `/DebtPurchaseProcess/SetInstallmentQuantity?installmentId=${installmentId}`
        ),
    getQuoteFeesSave: (types: RequestStates) =>
        fetchCreator(types, `/DebtPurchaseProcess/GetCurrentInstallmentQuantity`),
    getClientValidationCCRequest: (types: RequestStates) =>
        fetchCreator(types, `/CreditCardRequest/ClientValidationsCreditCardRequest`),
    saveTcContactInfo: (types: RequestStates) =>
        storeCreator(types, `/CreditCardRequest/SaveTcRequestContactInfo`),
    saveTcCivilStatusInfo: (types: RequestStates) =>
        storeCreator(types, `/CreditCardRequest/SaveTcRequestCivilStatusInfo`),
    saveTcEconomicInfo: (types: RequestStates) =>
        storeCreator(types, `/CreditCardRequest/SaveTcRequestEconomyInfo`),
    saveTcSelectedFee: (types: RequestStates) =>
        storeCreator(types, `/CreditCardRequest/SaveTcRequestSelectedFee`),
    saveInsurePolice: (types: RequestStates) =>
        storeCreator(types, `/CreditCardRequest/SaveRequestWithApplicationInsurancePolice`),
    getAllOffices: (types: RequestStates) =>
        fetchCreator(types, `/CreditCardRequest/OfficesCreditCardRequest`),
    notifyCompletion: (types: RequestStates) =>
        fetchCreator(types, '/DebtPurchaseProcess/CreateDebtPurchaseCore'),
    getPurchaseExtractFile: (types: RequestStates, filename: string, container: string) =>
        fetchCreator(
            types,
            `/ManagedContent/GetFileFromAzureStorage?filename=${filename}&container=${container}`,
            { responseType: 'arraybuffer' }
        ),
    saveTcConfig: (types: RequestStates) =>
        storeCreator(types, '/CreditCardRequest/SaveTcRequestDeliveryInfo'),
    saveTcSelectedFeeInsurability: (types: RequestStates) =>
        storeCreator(types, '/CreditCardRequest/SaveTcRequestSelectedFeeInsurability'),
    saveTcIdentificationPdf: (types: RequestStates) =>
        storeCreator(types, '/CreditCardRequest/SavePdfID'),
    getPortfolioPurchase: (types: RequestStates) =>
        fetchCreator(types, `/DebtPurchaseProcess/GetAllDebtPurchaseProcesses`),
    getCleanPortfolioPurchase: (types: RequestStates) =>
        fetchCreator(types, `/DebtPurchaseProcess/Cancel`),
}
