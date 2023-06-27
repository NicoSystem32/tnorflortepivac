// Components
import { BreadcrumbApp, Loading } from '../../components/includes'
import {
    DetailMovements,
    MobileDetailMovement,
    ButtonsMovementDetail,
    ModalConcept,
} from '../../components'
import { LayoutContent } from '../../transverse'
import { DetailForm, DetailHeader, TitleCreditDetail, CreditDetailModal, RefundAlert } from './inc'

//styles
import {
    CreditDetailContainer,
    CreditDetailFormContainer,
    CreditDetailFormTitle,
    CreditDetailsHead,
    LoadingContainer,
} from './creditDetail-styles'

// Hooks
import { useCreditDetail } from './hooks'
import { useAppTour, useButtonsContainer } from '../../hooks'

const CreditDetail = (): JSX.Element => {
    const { showForm, handleOpenDetails, handleOpenMovements, showDetailMovement } =
        useButtonsContainer()
    const {
        breadcrumbs,
        detail,
        showInput,
        show,
        showRefund,
        isLoading,
        prevStep,
        handleContinue,
        handleClose,
        handleCloseRefund,
        redirection,
    } = useCreditDetail()
    const [detailObj] = detail
    useAppTour()

    return (
        <LayoutContent>
            <CreditDetailContainer>
                <BreadcrumbApp
                    breadcrumbs={breadcrumbs}
                    onBack={() => {
                        if (window.innerWidth < 670 && !showInput) {
                            prevStep()
                        } else {
                            redirection('/credits-group')
                        }
                    }}
                />

                {/* Form */}
                {isLoading ? (
                    <LoadingContainer>
                        <Loading text="Aguarde un momento" />
                    </LoadingContainer>
                ) : (
                    !!detailObj && (
                        <>
                            <CreditDetailsHead>
                                <TitleCreditDetail
                                    showInput={showInput}
                                    title={detailObj.creditName}
                                />
                                {detailObj.refund > 0 && detailObj.refund !== null && (
                                    <RefundAlert refund={detailObj.refund} />
                                )}
                            </CreditDetailsHead>

                            <CreditDetailFormContainer>
                                {showInput && (
                                    <>
                                        <DetailHeader
                                            info={detailObj}
                                            isMovementDetail={showForm}
                                        />
                                        {showForm && (
                                            <CreditDetailFormTitle>
                                                Realizar pago
                                            </CreditDetailFormTitle>
                                        )}
                                    </>
                                )}

                                {showForm ? (
                                    <DetailForm detail={detailObj} />
                                ) : (
                                    <MobileDetailMovement
                                        title={
                                            showDetailMovement.movement ? 'Movimientos' : 'Detalles'
                                        }
                                        flow="credit"
                                    />
                                )}

                                {showInput && (
                                    <ButtonsMovementDetail
                                        handleOpenDetails={handleOpenDetails}
                                        handleOpenMovements={handleOpenMovements}
                                        showDetailMovement={showDetailMovement}
                                    />
                                )}
                            </CreditDetailFormContainer>
                        </>
                    )
                )}

                {/* Details and Movements */}
                <DetailMovements flow="credit" />

                <ModalConcept
                    show={show}
                    handleClose={handleClose}
                    handleContinue={handleContinue}
                />
                <CreditDetailModal showRefund={showRefund} handleCloseRefund={handleCloseRefund} />
            </CreditDetailContainer>
        </LayoutContent>
    )
}
export default CreditDetail
