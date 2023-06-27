/* eslint-disable no-irregular-whitespace */

// styles
import {
    ModalContent,
    ModalTitle,
    ModalText,
    ModalList,
    ModalListItem,
    Modal,
    ModalHeader,
    ModalFooter,
} from './tycModal-styles'

export interface TyCModalProps {
    showOpenTdc: boolean
    handleClose: () => void
}

const TyCModal: React.FC<TyCModalProps> = ({ showOpenTdc, handleClose }): JSX.Element => {
    return (
        <Modal show={showOpenTdc} onHide={handleClose} size="lg" keyboard={false} centered>
            <ModalHeader closeButton></ModalHeader>
            <ModalContent>
                <ModalTitle>
                    CONDICIONES GENERALES PARA EL CERTIFICADO DE AHORRO A TERMINO CAVIPETROL – TDC
                    DESMATERIALIZADO APERTURA WEB
                </ModalTitle>
                <ModalText>
                    El Certificado de Depósito de Ahorro a Término Cavipetrol - TDC o TDC es un
                    documento que acredita la existencia de un contrato de depósito de dinero
                    suscrito entre el Asociado y Cavipetrol, cuyo objeto es la administración de los
                    recursos depositados por los Asociados en el Fondo, con el compromiso de que,
                    vencido el plazo fijado entre las partes, el Fondo devolverá estos recursos
                    depositados junto con los rendimientos causados a la tasa pactada, si es el
                    caso.
                </ModalText>
                <ModalText>
                    El TDC se pacta de acuerdo con los plazos establecidos por Cavipetrol para el
                    mencionado producto, los cuales son consultados y aceptados por el depositante
                    al momento de la constitución del TDC.
                </ModalText>
                <ModalText>
                    Las tasas serán las que Cavipetrol tenga establecidas en el momento de la
                    constitución para cada uno de los plazos.
                </ModalText>
                <ModalText>
                    Cavipetrol expedirá un documento llamado “certificado”, como prueba de la
                    apertura del depósito, el cual no tiene la calidad de título valor, pero
                    enunciará las condiciones de tasa y plazo para el depósito respectivo.
                </ModalText>
                <ModalText>
                    Los ȚDC sólo podrán ser constituidos por vinculados a Cavipetrol y a su favor.
                </ModalText>
                <ModalText>
                    El TDC es intransferible y NO NEGOCIABLE ni siquiera mediante cesión. Cualquier
                    violación de la presente condición conllevará la terminación inmediata del
                    contrato de depósito.
                </ModalText>
                <ModalText>
                    EL TDC sólo podrá ser redimido al vencimiento del plazo inicialmente pactado, o
                    de su renovación convenida o automática, y únicamente por el titular o quien
                    represente sus derechos
                </ModalText>
                <ModalText>
                    Para la devolución del TDC, el titular debe presentar a Cavipetrol el
                    certificado que le haya sido expedido en el momento de la constitución (este
                    puede ser consultado y descargado en la página transaccional de Cavipetrol).
                </ModalText>
                <ModalText>
                    El TDC se renovará automáticamente en las mismas condiciones de plazo pactadas
                    inicialmente (90, 180 o 360 días) y la tasa de interés será la vigente en el
                    momento de prórroga.
                </ModalText>
                <ModalText>
                    El titular del TDC deberá escoger al momento de la constitución como serán
                    pagados los rendimientos, para lo cual, existirán las siguientes modalidades:
                </ModalText>

                <ModalList>
                    <ModalListItem>
                        <ModalText mb>- Mensual</ModalText>
                    </ModalListItem>
                    <ModalListItem>
                        <ModalText mb>- Bimestral</ModalText>
                    </ModalListItem>
                    <ModalListItem>
                        <ModalText mb>- Trimestral</ModalText>
                    </ModalListItem>
                    <ModalListItem>
                        <ModalText mb>- Semestral</ModalText>
                    </ModalListItem>
                    <ModalListItem>
                        <ModalText mb>- Anual</ModalText>
                    </ModalListItem>
                    <ModalListItem>
                        <ModalText mb>- Vencimiento</ModalText>
                    </ModalListItem>
                </ModalList>

                <ModalText>
                    Para la redención o liquidación del TDC se tiene como plazo máximo cinco 5 días
                    hábiles siguientes al vencimiento del plazo inicialmente pactado o de la
                    renovación automática o convenida.
                </ModalText>
                <ModalText>
                    Para cancelar el TDC sin sanción en la tasa de interés, esto es, al finalizar el
                    plazo por el cual fue constituido o de la renovación acordada o automática,
                    Cavipetrol pondrá a disposición del titular sus oficinas, la generación de la
                    liquidación del contrato e informará las condiciones de este. En caso de que, el
                    giro de los saldos a favor se genere en cheque, por ningún motivo se generarán
                    intereses desde la fecha de giro del cheque de cancelación.
                </ModalText>
                <ModalText>
                    Los TDC son irredimibles antes del vencimiento del plazo por el cual fueron
                    constituidos. Sin embargo, en casos excepcionales puede aceptarse por parte de
                    CAVIPETROL una redención anticipada, tomando como base el plazo transcurrido
                    desde la constitución o renovación del TDC, y la tasa de interés especial y
                    especifica que se negocie para la redención anticipada, según las políticas de
                    CAVIPETROL.
                </ModalText>
                <ModalText>
                    En caso de fallecimiento del titular del TDC, estos valores le serán entregados
                    a quien legalmente acredite el derecho a recibir dichos recursos de conformidad
                    con la legislación vigente, en caso de que el sustituto realice el proceso de
                    continuidad para seguir como asociada de Cavipetrol, el TDC quedarán asignados a
                    este.
                </ModalText>
                <ModalText>
                    En caso de pérdida de la calidad como asociado, el TDC se cancelará
                    automáticamente una vez quede radicada la solicitud de desvinculación de
                    Cavipetrol o se materialice la causa por la cual se produce la pérdida de la
                    calidad de asociado.
                </ModalText>
                <ModalText>
                    Al realizar la apertura y constitución del TDC a través de la página
                    transaccional de Cavipetrol (www.cavipetrol.com), el asociado ha aceptado
                    expresa e irrevocablemente que conoce, entiende y está de acuerdo con las
                    presentes condiciones, lo cual ha quedado establecido como condición expresa
                    para la constitución del TDC.
                </ModalText>
                <ModalText>
                    La retención en la fuente se realizará al momento de efectuar el pago de los
                    rendimientos o su abono en cuenta y/o al momento de la cancelación del TDC.
                </ModalText>
                <ModalText>
                    Aplicarán las demás Condiciones establecidas en el Reglamento General de
                    Captaciones de Cavipetrol, las cuales pueden ser consultadas{' '}
                    <a
                        target="_black"
                        href="https://transacciones.cavipetrol.com/Portals/_DwPortal/documents/default/TAC-003%20REGLAMENTO%20GENERAL%20DE%20CAPTACIONES%20V1.pdf"
                    >
                        aquí
                    </a>
                    .
                </ModalText>
            </ModalContent>
            <ModalFooter></ModalFooter>
        </Modal>
    )
}

export default TyCModal
