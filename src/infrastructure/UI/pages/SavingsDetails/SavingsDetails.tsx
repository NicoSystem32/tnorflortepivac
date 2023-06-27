// components
import { DangerAlert, SavingsDetailHead, TitleModule, SavingForm } from './inc'
import {
    BreadcrumbApp,
    ButtonsMovementDetail,
    DetailMovements,
    Loading,
    MobileDetailMovement,
    ModalConcept,
} from '../../components'
import { LayoutContent } from '../../transverse'

// Hooks
import { useSavingsDetail } from './hooks'
import { useButtonsContainer, useAppTour } from '../../hooks'

// Styles
import {
    SavingsDetailContainer,
    SavingDetailsHead,
    SavingDetailsFormContainer,
    SavingDetailsFormTitle,
    LoadingSavingContainer,
} from './savingsDetail-styles'

const SavingsDetails = (): JSX.Element => {
    const { showForm, handleOpenDetails, handleOpenMovements, showDetailMovement } =
        useButtonsContainer()
    const {
        // states
        show,
        setShow,
        isOther,
        item,
        breadcrumbs,
        loading,

        // handlers
        handleClose,
        handleContinue,
        redirection,
        nextStep,
        prevStep,
        onChangeOther,
        handleSubmit,
        handleChange,

        // new
        detail,
        showInputs,
        showErrors,
        errorText,
        isDisable,
        isDisableForm,
    } = useSavingsDetail()
    const [detailObj] = detail

    useAppTour()

    return (
        <LayoutContent>
            <SavingsDetailContainer>
                <BreadcrumbApp
                    breadcrumbs={breadcrumbs}
                    onBack={() => {
                        if (window.innerWidth < 670 && !showInputs) {
                            prevStep()
                        } else {
                            redirection('/savings-group')
                        }
                    }}
                />
                {loading ? (
                    <LoadingSavingContainer>
                        <Loading text="Aguarde un momento" />
                    </LoadingSavingContainer>
                ) : (
                    detailObj && (
                        <>
                            <SavingDetailsHead>
                                <TitleModule showInputs={showInputs} />
                                {detailObj.quotasPayable > 0 && (
                                    <DangerAlert quotes={detailObj.quotasPayable} />
                                )}
                            </SavingDetailsHead>
                            <SavingDetailsFormContainer>
                                <SavingsDetailHead
                                    {...detailObj}
                                    showInputs={showInputs}
                                    isMovementDetail={showForm}
                                />
                                {showInputs && showForm && (
                                    <>
                                        {isDisableForm && (
                                            <SavingDetailsFormTitle>
                                                Realizar pago
                                            </SavingDetailsFormTitle>
                                        )}
                                    </>
                                )}

                                {showForm ? (
                                    isDisableForm && (
                                        <SavingForm
                                            handleSubmit={handleSubmit}
                                            handleChange={handleChange}
                                            onChangeOther={onChangeOther}
                                            nextStep={nextStep}
                                            setShow={setShow}
                                            item={item}
                                            info={detailObj}
                                            isOther={isOther}
                                            showInputs={showInputs}
                                            showErrors={showErrors}
                                            errorText={errorText}
                                            isDisable={isDisable}
                                        />
                                    )
                                ) : (
                                    <MobileDetailMovement
                                        title={
                                            showDetailMovement.movement ? 'Movimientos' : 'Detalles'
                                        }
                                        flow="saving"
                                    />
                                )}

                                {showInputs && (
                                    <ButtonsMovementDetail
                                        handleOpenDetails={handleOpenDetails}
                                        handleOpenMovements={handleOpenMovements}
                                        showDetailMovement={showDetailMovement}
                                    />
                                )}
                            </SavingDetailsFormContainer>
                        </>
                    )
                )}

                <DetailMovements flow="saving" />

                <ModalConcept
                    show={show}
                    handleClose={handleClose}
                    handleContinue={handleContinue}
                />
            </SavingsDetailContainer>
        </LayoutContent>
    )
}
export default SavingsDetails
