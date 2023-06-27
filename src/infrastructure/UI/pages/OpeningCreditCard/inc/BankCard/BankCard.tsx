import { ReactElement, FC } from 'react'

// styles
import {
    BankCardCtr,
    BankCardField,
    BankCardFieldKey,
    BankCardFieldValue,
    BankCardIcon,
    BankCardLeft,
    BankCardRight,
    BankCardCtrIcon,
} from './bankCard-styles'

// icons
import { CloseCircleSVG, PenSVG } from '../../../../utils/getIcons'

// utils
import { formatValue } from '../../../../components/GlobalFuntions/globalFunction'

// models
import { BuyWallet } from '../../../../../../domain/models'

// selectors
import { getAllBanksSelector, useSelector } from '../../../../../selectors'

export interface BankCardProps {
    bank: BuyWallet
    onDelete?: (bank: BuyWallet) => void
    onEdit?: (bank: BuyWallet) => void
}

const BankCard: FC<BankCardProps> = ({ bank, onDelete, onEdit }): ReactElement => {
    const { banks } = useSelector(getAllBanksSelector)
    const nameBank = banks.find((item) => item.tcbId === bank.bankEntityId)

    return (
        <BankCardCtr key={bank.id}>
            <BankCardRight>
                <BankCardField>
                    <BankCardFieldKey>Banco de destino</BankCardFieldKey>
                    <BankCardFieldValue>
                        {nameBank ? nameBank.tcbNombre : 'No definido'}
                    </BankCardFieldValue>
                </BankCardField>
                <BankCardField>
                    <BankCardFieldKey>Valor a comprar</BankCardFieldKey>
                    <BankCardFieldValue>${formatValue(bank.purchaseAmount, 1)}</BankCardFieldValue>
                </BankCardField>
            </BankCardRight>
            <BankCardLeft>
                <BankCardCtrIcon
                    $borderLeft
                    onClick={() => {
                        if (onEdit) {
                            onEdit(bank)
                        }
                    }}
                >
                    <BankCardIcon src={PenSVG} alt="Edit" />
                </BankCardCtrIcon>
                <BankCardCtrIcon
                    onClick={() => {
                        if (onDelete) {
                            onDelete(bank)
                        }
                    }}
                >
                    <BankCardIcon src={CloseCircleSVG} alt="Close" />
                </BankCardCtrIcon>
            </BankCardLeft>
        </BankCardCtr>
    )
}

export default BankCard
