import React from 'react'
import {
    TitleCreditDetailContainer,
    TitleCreditDetailDesk,
    TitleCreditDetailMobile,
} from './titleCreditDetail-styles'

interface TitleCreditDetailProps {
    showInput: boolean
    title: string
}

const TitleCreditDetail: React.FC<TitleCreditDetailProps> = ({ showInput, title }): JSX.Element => {
    // const { }
    return (
        <>
            <TitleCreditDetailContainer>
                <TitleCreditDetailMobile>
                    {showInput ? (
                        <span>
                            Crédito {title}
                            <strong>&nbsp;</strong>
                        </span>
                    ) : (
                        <span>
                            Ingresa otro<strong>&nbsp;valor a pagar</strong>
                        </span>
                    )}
                </TitleCreditDetailMobile>

                <TitleCreditDetailDesk>
                    Crédito {title}
                    <strong>&nbsp;</strong>
                </TitleCreditDetailDesk>
            </TitleCreditDetailContainer>
        </>
    )
}

export default TitleCreditDetail
