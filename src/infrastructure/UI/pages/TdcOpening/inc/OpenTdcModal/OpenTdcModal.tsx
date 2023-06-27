// components
import { Button, Modal } from '../../../../components'

// utils
import {
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'

// icons
import { GraphSVG } from '../../../../utils/getIcons'

// styles
import {
    ModalContent,
    ContainerButtons,
    ContainerHeader,
    ModalImage,
    ModalTitle,
    ModalText,
} from './openTdcModal-styles'

export interface OpenTdcModalProps {
    showOpenTdc: boolean
    handleClose?: () => void
    handleNext: ({
        numberOfPayments,
        effectiveRate,
        yieldBeforeRetention,
        periodRetention,
        netYield,
        yieldAfterRetention,
        ratePeriod,
    }: Record<string, number>) => void
    cdtValue: number
    parameters: {
        numberOfPayments: number
        effectiveRate: number
        yieldBeforeRetention: number
        periodRetention: number
        netYield: number
        yieldAfterRetention: number
        ratePeriod: number
    }
}

const OpenTdcModal: React.FC<OpenTdcModalProps> = ({
    showOpenTdc,
    handleClose,
    cdtValue,
    handleNext,
    parameters,
}): JSX.Element => {
    return (
        <Modal show={showOpenTdc} onHide={handleClose} keyboard={false} centered>
            <ModalContent>
                <ContainerHeader>
                    <ModalImage src={GraphSVG} alt="logo" />
                </ContainerHeader>
                <ModalTitle>Estás a punto de abrir un TDC</ModalTitle>
                <ModalText>Tu TDC será constituido al efectuar el pago por un valor de</ModalText>
                <ModalText>
                    ${formatValue(cdtValue, 1)}
                    <sup className="sub-indice">{formatDecimalValue(cdtValue, 1)}</sup>
                </ModalText>
                <ModalText>
                    Antes de continuar, recuerda validar que cuentas con los fondos suficientes.
                </ModalText>
                <ContainerButtons>
                    <Button
                        variant="sub-dominant"
                        extend
                        onClick={() => {
                            handleNext(parameters)
                        }}
                    >
                        Continuar
                    </Button>
                    <Button variant="outline-cancel" extend onClick={handleClose}>
                        Cancelar
                    </Button>
                </ContainerButtons>
            </ModalContent>
        </Modal>
    )
}

export default OpenTdcModal
