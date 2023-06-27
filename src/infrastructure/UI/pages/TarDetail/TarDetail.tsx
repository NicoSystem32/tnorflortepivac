// components
import { TarDetailTitle, TarDetailAlert, TarDetailHead, TarDetailForm } from './inc'
import {
    BreadcrumbApp,
    ButtonsMovementDetail,
    DetailMovements,
    Loading,
    MobileDetailMovement,
    ModalConcept,
} from '../../components'
import { LayoutContent } from '../../transverse'

// utils
import { validateDateSavingsGroup } from '../../components/GlobalFuntions/globalFunction'

// hooks
import { useTarDetail } from './hooks'
import { useButtonsContainer } from '../../hooks'

// styles
import {
    LoadingTarContainer,
    TarDetailContainer,
    TitleContainer,
    TarDetailsFormContainer,
    TarFormTitle,
} from './tarDetail-styles'

const TarDetail = (): JSX.Element => {
    const { showForm, handleOpenDetails, handleOpenMovements, showDetailMovement } =
        useButtonsContainer()
    const {
        breadcrumbs,
        info,
        handleClose,
        show,
        setShow,
        handleChange,
        handleSubmit,
        handleContinue,
        loading,
        isDisable,
        prevStep,
    } = useTarDetail()

    const [detailObj] = info

    return (
        <LayoutContent>
            <TarDetailContainer>
                <BreadcrumbApp breadcrumbs={breadcrumbs} onBack={prevStep} />

                {loading ? (
                    <LoadingTarContainer>
                        <Loading text="Aguarde un momento" />
                    </LoadingTarContainer>
                ) : (
                    detailObj && (
                        <>
                            <TitleContainer>
                                <TarDetailTitle />
                                {validateDateSavingsGroup(detailObj.dueDate) && <TarDetailAlert />}
                            </TitleContainer>
                            <TarDetailsFormContainer>
                                <TarDetailHead detail={detailObj} showForm={showForm} />
                                {showForm ? (
                                    <>
                                        <TarFormTitle>Realizar pago</TarFormTitle>
                                        <TarDetailForm
                                            info={detailObj}
                                            handleSubmit={handleSubmit}
                                            handleChange={handleChange}
                                            setShow={setShow}
                                            isDisable={!isDisable}
                                        />
                                    </>
                                ) : (
                                    <MobileDetailMovement
                                        title={
                                            showDetailMovement.movement ? 'Movimientos' : 'Detalles'
                                        }
                                        flow="scheduledSavings"
                                    />
                                )}

                                <ButtonsMovementDetail
                                    handleOpenDetails={handleOpenDetails}
                                    handleOpenMovements={handleOpenMovements}
                                    showDetailMovement={showDetailMovement}
                                />
                            </TarDetailsFormContainer>
                        </>
                    )
                )}

                <DetailMovements flow="scheduledSavings" />

                <ModalConcept
                    show={show}
                    handleClose={handleClose}
                    handleContinue={handleContinue}
                />
            </TarDetailContainer>
        </LayoutContent>
    )
}
export default TarDetail
