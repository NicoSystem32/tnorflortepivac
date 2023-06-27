// components
import { LayoutContent } from '../../transverse'
import { Publicity, Savings, Contributions, AccountFAI } from './inc'
import { BreadcrumbApp, Loading } from '../../components'

// Hooks
import { useSavingGroup } from './hooks'
import { useAppTour } from '../../hooks'

// Styles
import { ContainerSavingGroup, LoadingSavingGroupContainer } from './savingsGroup-styles'

const SavingsGroup = (): JSX.Element => {
    const {
        redirection,
        redirectionWithInfo,
        addPayment,
        listCards,
        loadingIn,
        validateExistence,
        breadcrumbs,
    } = useSavingGroup()
    useAppTour()

    return (
        <LayoutContent>
            <ContainerSavingGroup>
                <BreadcrumbApp
                    breadcrumbs={breadcrumbs}
                    onBack={() => redirection('/home-wallet')}
                />
                {loadingIn ? (
                    <LoadingSavingGroupContainer>
                        <Loading text="Aguarde un momento" />
                    </LoadingSavingGroupContainer>
                ) : (
                    <>
                        <Publicity redirection={redirection} />

                        <AccountFAI loadingIn={loadingIn} listCards={listCards} />

                        <Contributions
                            loadingIn={loadingIn}
                            listCards={listCards}
                            redirectionWithInfo={redirectionWithInfo}
                        />

                        <Savings
                            listCards={listCards}
                            loadingIn={loadingIn}
                            validateExistence={validateExistence}
                            redirectionWithInfo={redirectionWithInfo}
                            addPayment={addPayment}
                        />
                    </>
                )}
            </ContainerSavingGroup>
        </LayoutContent>
    )
}
export default SavingsGroup
