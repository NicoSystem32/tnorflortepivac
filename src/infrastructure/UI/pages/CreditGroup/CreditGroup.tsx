// Components
import { BreadcrumbApp } from '../../components/includes'
import { Publicity, Contributions } from './inc'
import { LayoutContent } from '../../transverse'

// hooks
import { useCreditGroup } from './hooks'
import { useAppTour } from '../../hooks'

// styles
import { CreditGroupContainer } from './creditGroup-styles'

const CreditGroup = (): JSX.Element => {
    const {
        listCards,
        loading,
        breadcrumbs,
        validateDateCreditGroup,
        redirectionWithInfo,
        redirection,
    } = useCreditGroup()
    useAppTour()

    return (
        <LayoutContent>
            <CreditGroupContainer>
                <BreadcrumbApp
                    breadcrumbs={breadcrumbs}
                    onBack={() => redirection('/home-wallet')}
                />
                <Publicity />

                <Contributions
                    loading={loading}
                    listCards={listCards}
                    validateDateCreditGroup={validateDateCreditGroup}
                    redirectionWithInfo={redirectionWithInfo}
                />
            </CreditGroupContainer>
        </LayoutContent>
    )
}
export default CreditGroup
