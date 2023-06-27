// models
import { Detail } from '../../../../../../domain/models'

// utils
import {
    formatDate,
    formatDateComplete,
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'

// Icons
import { IconContributionsSVG } from '../../../../utils/getIcons'

//styles
import {
    TarHeadContainerDesk,
    TarHeadContainerMob,
    TitleHead,
    InfoHead,
    HeadDetailMovements,
} from './tarDetailHead-styles'

interface TarDetailHeadProps {
    detail: Detail
    showForm?: boolean
}

const TarDetailHead: React.FC<TarDetailHeadProps> = ({ detail, showForm }): JSX.Element => {
    return (
        <>
            <TarHeadContainerMob className="step2-not-see">
                <TitleHead>
                    <img src={IconContributionsSVG} alt="log" />
                    <p className="title">Fondo de ahorro recreativo</p>
                    <p className="number">{detail.documentNumber}</p>
                </TitleHead>
                {showForm ? (
                    <>
                        <InfoHead>
                            <p className="text-info">Saldo total</p>
                            <p className="value-info">
                                $ {formatValue(detail.balanceTotal, 1)}
                                <sup className="sub-indice">
                                    {formatDecimalValue(detail.balanceTotal, 1)}
                                </sup>
                            </p>
                        </InfoHead>
                        <InfoHead>
                            <p className="text-info">Próxima cuota</p>
                            <p className="value-info">
                                $ {formatValue(detail.nextFeeValue, 1)}
                                <sup className="sub-indice">
                                    {formatDecimalValue(detail.nextFeeValue, 1)}
                                </sup>
                            </p>
                            <p className="date-info">
                                Para el {formatDate(detail.nextPaymentDate)}
                            </p>
                        </InfoHead>
                        <InfoHead>
                            <p className="text-info blue-text">Fecha de vencimiento</p>
                            {detail.dueDate && (
                                <p className="value-info">{formatDateComplete(detail.dueDate)}</p>
                            )}
                        </InfoHead>
                    </>
                ) : (
                    <HeadDetailMovements>
                        <InfoHead>
                            <p className="text-info">Saldo total</p>
                            <p className="value-info">
                                $ {formatValue(detail.balanceTotal, 1)}
                                <sup className="sub-indice">
                                    {formatDecimalValue(detail.balanceTotal, 1)}
                                </sup>
                            </p>
                        </InfoHead>
                        <InfoHead>
                            <p className="text-info">Próxima cuota</p>
                            <p className="value-info">
                                $ {formatValue(detail.nextFeeValue, 1)}
                                <sup className="sub-indice">
                                    {formatDecimalValue(detail.nextFeeValue, 1)}
                                </sup>
                            </p>
                            <p className="date-info mora">
                                Para el {formatDate(detail.nextPaymentDate)}
                            </p>
                        </InfoHead>
                    </HeadDetailMovements>
                )}
            </TarHeadContainerMob>
            <TarHeadContainerDesk className="step2-not-see">
                <TitleHead>
                    <img src={IconContributionsSVG} alt="logo" />
                    <p className="title">Fondo de ahorro recreativo</p>
                    <p className="number">{detail.documentNumber}</p>
                </TitleHead>
                <InfoHead>
                    <p className="text-info">
                        $ {formatValue(detail.balanceTotal, 1)}
                        <sup className="sub-indice">
                            {formatDecimalValue(detail.balanceTotal, 1)}
                        </sup>
                    </p>
                    <p className="value-info">Saldo total</p>
                </InfoHead>
                <InfoHead>
                    <p className="text-info">
                        $ {formatValue(detail.nextFeeValue, 1)}
                        <sup className="sub-indice">
                            {formatDecimalValue(detail.nextFeeValue, 1)}
                        </sup>
                    </p>
                    <p className="value-info">
                        Próxima cuota para el {formatDate(detail.nextPaymentDate)}
                    </p>
                </InfoHead>
                {detail.dueDate && (
                    <InfoHead>
                        <p className="text-info">{formatDateComplete(detail.dueDate)}</p>
                        <p className="value-info blue-text">Fecha de vencimiento</p>
                    </InfoHead>
                )}
            </TarHeadContainerDesk>
        </>
    )
}

export default TarDetailHead
