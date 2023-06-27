import { OverlayTrigger } from 'react-bootstrap'

// models
import { Detail } from '../../../../../../domain/models'

// icons
import icono from '../../../../assets/icons/info-tooltip.png'

// styles
import { TooltipCustom, ToolTipDetailContainer } from './toolTipDetail-styles'
interface ToolTipDetailsProps {
    info: Detail
    optionPay: string
}

const ToolTipDetail: React.FC<ToolTipDetailsProps> = ({
    info,
    optionPay,
    ...props
}): JSX.Element => {
    return (
        <ToolTipDetailContainer {...props}>
            <OverlayTrigger
                key="cuota"
                placement="left"
                overlay={
                    <TooltipCustom id="tooltip-cuota">
                        {optionPay === 'total' && (
                            <>
                                Tu total corresponde a:
                                {info.capital !== 0 && <p>capital: {info.capital}</p>}
                                {info.currentBankInterest !== 0 && (
                                    <p>interés corrientes: {info.currentBankInterest} </p>
                                )}
                                {info.delinquentBalance !== 0 && (
                                    <p>mora de cuotas: {info.delinquentBalance}</p>
                                )}
                                {info.defaultInterest !== 0 && (
                                    <p>interés de mora: {info.defaultInterest}</p>
                                )}
                                {info.otherAccountsPayable !== 0 && (
                                    <p>otras cuentas por cobrar: {info.otherAccountsPayable}</p>
                                )}
                                {info.insurance !== 0 && <p>seguros: {info.insurance}</p>}
                                {info.frozenInsurance !== 0 && (
                                    <p>seguros congelados: {info.frozenInsurance}</p>
                                )}
                                {info.frozenBankInterest !== 0 && (
                                    <p>intereses congelados: {info.frozenBankInterest}</p>
                                )}
                                {info.refund !== 0 && <p>reintegro: {info.refund}</p>}
                                {info.tradedInterests !== 0 && (
                                    <p>intereses negociados: {info.tradedInterests}</p>
                                )}
                            </>
                        )}
                        {optionPay === 'mora' && (
                            <>
                                Tu mora corresponde a:
                                {info.delinquentBalance !== 0 && (
                                    <p>mora de cuotas: {info.delinquentBalance}</p>
                                )}
                                {info.insurance !== 0 && <p>Seguros: {info.insurance}</p>}
                                {info.defaultInterest !== 0 && (
                                    <p>interés de mora: {info.defaultInterest}</p>
                                )}
                                {info.otherAccountsPayable !== 0 && (
                                    <p>otras cuentas por cobrar: {info.otherAccountsPayable}</p>
                                )}
                            </>
                        )}
                    </TooltipCustom>
                }
            >
                <img src={icono} alt="img-tooltip" className="tooltip-info" />
            </OverlayTrigger>
        </ToolTipDetailContainer>
    )
}

export default ToolTipDetail
