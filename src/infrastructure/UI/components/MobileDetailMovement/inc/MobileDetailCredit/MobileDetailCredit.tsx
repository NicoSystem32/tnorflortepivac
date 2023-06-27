import { Dispatch, SetStateAction } from 'react'
import { Pagination as PaginationBs } from 'react-bootstrap'

// models
import { MovementDetail } from '../../../../../../domain/models'

// utils
import {
    formatDateComplete,
    formatDecimalValue,
    formatValue,
} from '../../../GlobalFuntions/globalFunction'

// components
import { Pagination } from '../../../includes'

// styles
import {
    MobileDetail,
    MobileDetailRow,
    MobileDetailTd,
} from '../MobileDetailTable/mobileDetailTable-styled'

interface MobileDetailCreditProps {
    detail: MovementDetail[]
    countPage: number
    addCount: () => void
    removeCount: () => void
    setCountPage: Dispatch<SetStateAction<number>>
}

const MobileDetailCredit: React.FC<MobileDetailCreditProps> = ({
    detail,
    countPage,
    addCount,
    removeCount,
    setCountPage,
}): JSX.Element => {
    return (
        <>
            <MobileDetail>
                <MobileDetailRow>
                    <MobileDetailTd>
                        <p>Fecha de inicio</p>
                        <span>{formatDateComplete(detail[countPage - 1].creditStartDate)}</span>
                    </MobileDetailTd>
                    <MobileDetailTd>
                        <p>Periodo</p>
                        <span>{detail[countPage - 1].creditPeriod}</span>
                    </MobileDetailTd>
                </MobileDetailRow>
                <MobileDetailRow>
                    <MobileDetailTd>
                        <p>Cuotas pactadas</p>
                        <span>{detail[countPage - 1].creditQuotasAgreed}</span>
                    </MobileDetailTd>
                    <MobileDetailTd>
                        <p>Cuotas faltantes</p>
                        <span>{detail[countPage - 1].creditFeesMissing}</span>
                    </MobileDetailTd>
                </MobileDetailRow>
                <MobileDetailRow>
                    <MobileDetailTd>
                        <p>Valor cuota</p>
                        <span>
                            $ {formatValue(detail[countPage - 1].creditValueQuota, 1)}
                            <sup>
                                {formatDecimalValue(detail[countPage - 1].creditValueQuota, 1)}
                            </sup>
                        </span>
                    </MobileDetailTd>
                    <MobileDetailTd>
                        <p>Tasa</p>
                        <span>
                            {(parseFloat(detail[countPage - 1].creditRate) * 100).toFixed(2)}%
                        </span>
                    </MobileDetailTd>
                </MobileDetailRow>
            </MobileDetail>

            {detail.length > 1 && (
                <Pagination onNext={addCount} onPrev={removeCount}>
                    {detail.map((_, i) => (
                        <PaginationBs.Item
                            key={_.uniqueDocument}
                            active={countPage === i + 1}
                            onClick={() => {
                                setCountPage(i + 1)
                            }}
                        >
                            {i + 1}
                        </PaginationBs.Item>
                    ))}
                </Pagination>
            )}
        </>
    )
}

export default MobileDetailCredit
