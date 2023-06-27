import { useSelector } from 'react-redux'
import { savingDetailImagesSelector } from '../../../../../selectors/products'
import {
    formatDateText,
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'
// Icons
import { IconSavingSVG } from '../../../../utils/getIcons'
import {
    SavingsDetailHeadDesk,
    SavingsDetailHeadMobile,
    SavingIDDeskContainer,
    SavingProperty,
    SavingIDMobileContainer,
    SavingPropertyMob,
    HeadContent,
    CardContent,
} from './savingDetailHead-styles'
interface SavingsDetailHeadProps {
    documentNumber: number | string
    balanceTotal: number | string
    quotasPayable: number | string
    delinquentBalance: number | string
    nextFeeValue: string | number
    nextPaymentDate: string
    showInputs: boolean
    isMovementDetail: boolean
}
const SavingsDetailHead: React.FC<SavingsDetailHeadProps> = ({
    documentNumber,
    balanceTotal,
    quotasPayable,
    delinquentBalance,
    nextFeeValue,
    nextPaymentDate,
    showInputs,
    isMovementDetail,
}): JSX.Element => {
    const { image } = useSelector(savingDetailImagesSelector(documentNumber))
    return (
        <>
            {showInputs && (
                <>
                    <SavingsDetailHeadMobile>
                        <SavingIDMobileContainer>
                            <img src={image ? image : IconSavingSVG} alt="logo" />
                            <div>
                                <p>Aportes</p>
                                <span>{documentNumber}</span>
                            </div>
                        </SavingIDMobileContainer>
                        {isMovementDetail ? (
                            <>
                                <SavingPropertyMob>
                                    <span>Saldo total</span>
                                    <p>
                                        $ {formatValue(balanceTotal, 1)}
                                        <sup>{formatDecimalValue(balanceTotal, 1)}</sup>
                                    </p>
                                </SavingPropertyMob>
                                {delinquentBalance > 0 ? (
                                    <SavingPropertyMob isMora>
                                        <span>Saldo en mora</span>
                                        <p>
                                            $ {formatValue(delinquentBalance, 1)}
                                            <sup>{formatDecimalValue(delinquentBalance, 1)}</sup>
                                        </p>
                                    </SavingPropertyMob>
                                ) : (
                                    <SavingPropertyMob>
                                        <span>Próxima cuota</span>
                                        <p>
                                            $ {formatValue(nextFeeValue, 1)}
                                            <sup>{formatDecimalValue(nextFeeValue, 1)}</sup>
                                        </p>
                                        {nextPaymentDate && (
                                            <p className="date">
                                                Para el {formatDateText(nextPaymentDate)}
                                            </p>
                                        )}
                                    </SavingPropertyMob>
                                )}
                            </>
                        ) : (
                            <HeadContent>
                                <CardContent>
                                    <span>Saldo total</span>
                                    <p>
                                        $ {formatValue(balanceTotal, 1)}
                                        <sup>{formatDecimalValue(balanceTotal, 1)}</sup>
                                    </p>
                                </CardContent>

                                {delinquentBalance > 0 ? (
                                    <CardContent isMora>
                                        <span>Saldo en mora</span>
                                        <p>
                                            $ {formatValue(delinquentBalance, 1)}
                                            <sup>{formatDecimalValue(delinquentBalance, 1)}</sup>
                                        </p>
                                    </CardContent>
                                ) : (
                                    <CardContent>
                                        <span>Próxima cuota</span>
                                        <p>
                                            $ {formatValue(nextFeeValue, 1)}
                                            <sup>{formatDecimalValue(nextFeeValue, 1)}</sup>
                                        </p>
                                        {nextPaymentDate && (
                                            <p className="date">
                                                {formatDateText(nextPaymentDate)}
                                            </p>
                                        )}
                                    </CardContent>
                                )}
                            </HeadContent>
                        )}
                    </SavingsDetailHeadMobile>
                    <SavingsDetailHeadDesk>
                        <SavingIDDeskContainer>
                            <img src={image ? image : IconSavingSVG} alt="logo" />
                            <div>
                                <p>Aportes</p>
                                <span>{documentNumber}</span>
                            </div>
                        </SavingIDDeskContainer>
                        <SavingProperty>
                            <p>
                                $ {formatValue(balanceTotal, 1)}
                                <sup>{formatDecimalValue(balanceTotal, 1)}</sup>
                            </p>
                            <span>Saldo total</span>
                        </SavingProperty>
                        {delinquentBalance > 0 ? (
                            <SavingProperty isMora>
                                <p>
                                    $ {formatValue(delinquentBalance, 1)}
                                    <sup>{formatDecimalValue(delinquentBalance, 1)}</sup>
                                </p>
                                <span>Saldo en mora</span>
                            </SavingProperty>
                        ) : (
                            <SavingProperty>
                                <p>
                                    $ {formatValue(nextFeeValue, 1)}
                                    <sup>{formatDecimalValue(nextFeeValue, 1)}</sup>
                                </p>
                                {nextPaymentDate && (
                                    <span>
                                        Próxima cuota para el {formatDateText(nextPaymentDate)}
                                    </span>
                                )}
                            </SavingProperty>
                        )}
                    </SavingsDetailHeadDesk>
                </>
            )}
        </>
    )
}
export default SavingsDetailHead
