import { useSelector } from 'react-redux'
// Icons
import { IconCreditSVG } from '../../../../utils/getIcons'

import {
    formatValue,
    formatDecimalValue,
    formatDateText,
} from '../../../../components/GlobalFuntions/globalFunction'

//components

//styles
import {
    DetailHeaderContainerDesk,
    DetailHeaderContainerMob,
    InfoHeader,
    TitleHeader,
    HeadContent,
} from './detailHeader-styles'

//models
import { Detail } from '../../../../../../domain/models'
import { creditDetailImagesSelector } from '../../../../../selectors/products'

interface DetailHeaderProps {
    info: Detail
    isMovementDetail: boolean
}

const DetailHeader: React.FC<DetailHeaderProps> = ({ info, isMovementDetail }): JSX.Element => {
    const { image } = useSelector(
        creditDetailImagesSelector(info.documentNumber, info.finishedNumber)
    )

    return (
        <>
            <DetailHeaderContainerMob>
                <TitleHeader>
                    <img src={image ? image : IconCreditSVG} alt="logo" />
                    <p className="title">{info.creditLineName}</p>
                    <p className="number">
                        {info.documentNumber}-{info.finishedNumber}
                    </p>
                </TitleHeader>
                {isMovementDetail ? (
                    <>
                        <InfoHeader>
                            <p className="text-info">Saldo total</p>
                            <p className="value-info">
                                $ {formatValue(info.balanceTotal, 1)}
                                <sup className="sub-indice">
                                    {formatDecimalValue(info.balanceTotal, 1)}
                                </sup>
                            </p>
                        </InfoHeader>
                        {info.delinquentBalance > 0 ? (
                            <InfoHeader>
                                <p className="text-info mora">Saldo en mora</p>
                                <p className="value-info mora">
                                    $ {formatValue(info.delinquentBalance, 1)}
                                    <sup className="sub-indice">
                                        {formatDecimalValue(info.delinquentBalance, 1)}
                                    </sup>
                                </p>
                            </InfoHeader>
                        ) : (
                            <InfoHeader>
                                <p className="text-info">Próxima cuota</p>
                                <p className="value-info">
                                    $ {formatValue(info.nextFeeValue, 1)}
                                    <sup className="sub-indice">
                                        {formatDecimalValue(info.nextFeeValue, 1)}
                                    </sup>
                                </p>
                                <p className="date-info">
                                    Para el {formatDateText(info.nextPaymentDate)}
                                </p>
                            </InfoHeader>
                        )}
                    </>
                ) : (
                    <HeadContent>
                        <InfoHeader>
                            <p className="text-info">Saldo Total</p>
                            <p className="value-info">
                                $ {formatValue(info.balanceTotal, 1)}
                                <sup className="sub-indice">
                                    {formatDecimalValue(info.balanceTotal, 1)}
                                </sup>
                            </p>
                        </InfoHeader>
                        {info.delinquentBalance > 0 ? (
                            <InfoHeader>
                                <p className="text-info">Saldo en mora</p>
                                <p className="value-info">
                                    $ {formatValue(info.delinquentBalance, 1)}
                                    <sup className="sub-indice">
                                        {formatDecimalValue(info.delinquentBalance, 1)}
                                    </sup>
                                </p>
                            </InfoHeader>
                        ) : (
                            <InfoHeader>
                                <p className="text-info">Próxima cuota</p>
                                <p className="value-info">
                                    $ {formatValue(info.nextFeeValue, 1)}
                                    <sup className="sub-indice">
                                        {formatDecimalValue(info.nextFeeValue, 1)}
                                    </sup>
                                </p>
                                <p className="date-info">{formatDateText(info.nextPaymentDate)}</p>
                            </InfoHeader>
                        )}
                    </HeadContent>
                )}
            </DetailHeaderContainerMob>
            <DetailHeaderContainerDesk>
                <TitleHeader>
                    <img src={image ? image : IconCreditSVG} alt="logo" />
                    <p className="title">{info.creditLineName}</p>
                    <p className="number">
                        {info.documentNumber}-{info.finishedNumber}
                    </p>
                </TitleHeader>
                <InfoHeader>
                    <p className="title">
                        $ {formatValue(info.balanceTotal, 1)}
                        <sup className="sub-indice">{formatDecimalValue(info.balanceTotal, 1)}</sup>
                    </p>
                    <p className="number">Saldo total</p>
                </InfoHeader>
                {info.delinquentBalance > 0 ? (
                    <InfoHeader>
                        <p className="title mora">
                            $ {formatValue(info.delinquentBalance, 1)}
                            <sup className="sub-indice">
                                {formatDecimalValue(info.delinquentBalance, 1)}
                            </sup>
                        </p>
                        <p className="number mora">Saldo en mora</p>
                    </InfoHeader>
                ) : (
                    <InfoHeader>
                        <p className="title">
                            $ {formatValue(info.nextFeeValue, 1)}
                            <sup className="sub-indice">
                                {formatDecimalValue(info.nextFeeValue, 1)}
                            </sup>
                        </p>
                        <p className="number">
                            Próxima cuota para el {formatDateText(info.nextPaymentDate)}
                        </p>
                    </InfoHeader>
                )}
            </DetailHeaderContainerDesk>
        </>
    )
}

export default DetailHeader
