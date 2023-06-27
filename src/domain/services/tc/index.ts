import { RequestStates } from '../../../infrastructure/http/typings/api'
// repositories
import { tcRepository } from '../../../infrastructure/repositories'

export const tcServices = {
    validateCRM: (types: RequestStates) => tcRepository.validateCRM(types),
    validateUserState: (types: RequestStates) => tcRepository.validateUserState(types),
    getQuoteTC: (types: RequestStates) => tcRepository.getQuoteTC(types),
    updateDataPerStepQuoteTC: (types: RequestStates) =>
        tcRepository.updateDataPerStepQuoteTC(types),
    getDataPerStepQuoteTC: (types: RequestStates) => tcRepository.getDataPerStepQuoteTC(types),
    SearchProductByIdentityNumber: (types: RequestStates) =>
        tcRepository.SearchProductByIdentityNumber(types),
    PostStatusChangeTC: (types: RequestStates) => tcRepository.PostStatusChangeTC(types),
    PostSendCodeOtpTC: (types: RequestStates) => tcRepository.PostSendCodeOtpTC(types),
    PostValidateCodeOtpTC: (types: RequestStates) => tcRepository.PostValidateCodeOtpTC(types),
    sendCodeOtpCreditCard: (types: RequestStates) => tcRepository.sendCodeOtpCreditCard(types),
    validateCodeOtpCreditCard: (types: RequestStates, typeCode: string) =>
        tcRepository.validateCodeOtpCreditCard(types, typeCode),
    getNomenclator: (types: RequestStates) => tcRepository.getNomenclator(types),
    getCreditCardFees: (types: RequestStates) => tcRepository.getCreditCardFees(types),
    getAllBuyWallet: (types: RequestStates) => tcRepository.getAllBuyWallet(types),
    deleteBuyWalletById: (types: RequestStates, id: string | number) =>
        tcRepository.deleteBuyWalletById(types, id),
    createBuyWallet: (types: RequestStates) => tcRepository.createBuyWallet(types),
    getAllBanks: (types: RequestStates) => tcRepository.getAllBanks(types),
    updateBuyWallet: (types: RequestStates) => tcRepository.updateBuyWallet(types),
    saveQuoteFees: (types: RequestStates, installmentId: string | number) =>
        tcRepository.saveQuoteFees(types, installmentId),
    getQuoteFeesSave: (types: RequestStates) => tcRepository.getQuoteFeesSave(types),
    getClientValidationCCRequest: (types: RequestStates) =>
        tcRepository.getClientValidationCCRequest(types),
    saveTcContactInfo: (types: RequestStates) => tcRepository.saveTcContactInfo(types),
    saveTcCivilStatusInfo: (types: RequestStates) => tcRepository.saveTcCivilStatusInfo(types),
    saveTcEconomicInfo: (types: RequestStates) => tcRepository.saveTcEconomicInfo(types),
    saveTcSelectedFee: (types: RequestStates) => tcRepository.saveTcSelectedFee(types),
    saveTcSelectedFeeInsurability: (types: RequestStates) =>
        tcRepository.saveTcSelectedFeeInsurability(types),
    saveInsurePolice: (types: RequestStates) => tcRepository.saveInsurePolice(types),
    getAllOffices: (types: RequestStates) => tcRepository.getAllOffices(types),
    notifyCompletion: (types: RequestStates) => tcRepository.notifyCompletion(types),
    getPurchaseExtractFile: (types: RequestStates, filename: string, container: string) =>
        tcRepository.getPurchaseExtractFile(types, filename, container),
    saveTcConfig: (types: RequestStates) => tcRepository.saveTcConfig(types),
    saveTcIdentificationPdf: (types: RequestStates) => tcRepository.saveTcIdentificationPdf(types),
    getPortfolioPurchase: (types: RequestStates) => tcRepository.getPortfolioPurchase(types),
    getCleanPortfolioPurchase: (types: RequestStates) =>
        tcRepository.getCleanPortfolioPurchase(types),
}
