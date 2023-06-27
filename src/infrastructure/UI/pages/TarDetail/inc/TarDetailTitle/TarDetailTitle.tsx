import {
    TarDetailTitleWrapper,
    TitleDeskContainer,
    TitleMobileContainer,
} from './tarDetailTitle-styles'

const TarDetailTitle = (): JSX.Element => {
    return (
        <TarDetailTitleWrapper>
            <TitleMobileContainer className="step2-not-see">
                <p>
                    Ahorro<strong>&nbsp;Programado</strong>
                </p>
            </TitleMobileContainer>
            <TitleDeskContainer>
                <p>
                    Ahorro<strong>&nbsp;Programado</strong>
                </p>
            </TitleDeskContainer>
            <TitleMobileContainer className="step2-see not-display">
                <p>
                    Ingresa otro<strong>&nbsp;valor a pagar&nbsp;</strong>
                </p>
            </TitleMobileContainer>
        </TarDetailTitleWrapper>
    )
}

export default TarDetailTitle
