import { ReactElement, FC } from 'react'

// components
import { CheckField } from '..'
import { Button } from '../../../../components'

// styles
import {
    ModalContent,
    ModalTitle,
    ModalText,
    Modal,
    ModalHeader,
    CtrButton,
    ModalFooter,
} from './personalDataModal-styles'

export interface PersonalDataModalProps {
    showOpenTdc: boolean
    handleClose: () => void
    onContinue: () => void
    disable: boolean
    onChangeCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void
    checked?: boolean
}

const PersonalDataModal: FC<PersonalDataModalProps> = ({
    showOpenTdc,
    handleClose,
    onContinue,
    disable,
    checked,
    onChangeCheck,
}): ReactElement => {
    return (
        <Modal show={showOpenTdc} onHide={handleClose} size="xl" keyboard={false} centered>
            <ModalHeader closeButton></ModalHeader>
            <ModalContent>
                <ModalTitle>
                    FONDO DE EMPLEADOS DE LOS TRABAJADORES Y PENSIONADOS DE ECOPETROL S.A.
                    CAVIPETROL, en adelante CAVIPETROL, mediante el presente reglamento establece
                    las condiciones, términos, obligaciones, derechos y servicios que rigen la
                    tarjeta de crédito cuyo titular será EL ASOCIADO, el cual solicitó la apertura
                    de un cupo de crédito rotativo en moneda legal colombiana (en adelante la
                    Tarjeta de Crédito) para lo cual las partes acuerdan lo siguiente:
                </ModalTitle>
                <ModalTitle>PRIMERA. - CUPO DE CRÉDITO</ModalTitle>
                <ModalText>
                    CAVIPETROL ha aprobado un cupo de crédito rotativo, cuyo monto en moneda legal,
                    le ha sido debidamente informado; este cupo será utilizado por el ASOCIADO
                    mediante la tarjeta de crédito que en virtud de estas condiciones CAVIPETROL le
                    entrega, para la adquisición de bienes y servicios en establecimientos afiliados
                    a la franquicia VISA, la realización de consultas, pago de facturas a través de
                    los canales habilitados por CAVIPETROL o los que a futuro habilite. CAVIPETROL
                    podrá en cualquier tiempo, basado en un análisis de riesgo, de manera permanente
                    o transitoria modificar, ampliar, suprimir, unificar o disminuir el cupo total o
                    el cupo disponible, de acuerdo con el comportamiento del mercado, la capacidad
                    económica del deudor, la disponibilidad de tesorería y las condiciones del
                    servicio, lo cual será informado previamente al ASOCIADO. Todo consumo realizado
                    por el ASOCIADO con su tarjeta de crédito bien sea en establecimientos afiliados
                    del país o realizados en el exterior, así como cualquier cobro administrativo
                    afectará el cupo otorgado por CAVIPETROL. Las unidades y transacciones
                    monetarias realizadas por EL ASOCIADO con la tarjeta de crédito se llamarán
                    “Utilizaciones”.
                </ModalText>

                <ModalTitle>PARÁGRAFO PRIMERO:</ModalTitle>
                <ModalText>
                    La mora en el pago frente a cualquier obligación por parte del ASOCIADO suspende
                    el derecho de uso de la Tarjeta de Crédito y faculta a CAVIPETROL para declarar
                    vencidos los plazos, exigir la cancelación inmediata de todas las sumas a cargo
                    del ASOCIADO, al cobro de los intereses moratorios sobre el saldo y/o a
                    interponer las demás acciones legales a que hubiera lugar, incluyendo el reporte
                    en centrales de información financiera y comercial. Se conviene que todo pago
                    que se reciba se aplicará en el siguiente orden: (i) comisiones; (ii) intereses
                    de mora; (iii) intereses corrientes; (iv) costos y/o gastos y; (v) capital. El
                    bloqueo o suspensión del cupo terminará una vez se efectúe el pago mínimo de la
                    tarjeta, salvo que se haya terminado el producto por mal manejo, en cuyo caso
                    deberá pagarse la totalidad del saldo. CAVIPETROL se reserva el derecho de
                    terminar el contrato de apertura de crédito que comporta la tarjeta de crédito
                    en cualquier momento si se presenta un mal manejo o comportamiento negativo de
                    los pagos del ASOCIADO.
                </ModalText>

                <ModalTitle>SEGUNDA. - EXCESO SOBRE EL CUPO.</ModalTitle>
                <ModalText>
                    El ASOCIADO no deberá sobrepasar en ningún caso el cupo de crédito de su
                    tarjeta. Sin embargo, en caso de que lo hubiere sobrepasado, deberá cancelar el
                    valor del exceso el cual será diferido en los términos de la transacción
                    efectuada y que produjo el uso en exceso.
                </ModalText>

                <ModalTitle>TERCERA. - ENTREGA DE TARJETA DE CRÉDITO.</ModalTitle>
                <ModalText>
                    CAVIPETROL entregará al ASOCIADO por el medio que este determine una tarjeta de
                    crédito de uso personal e intransferible, por ende, este no la podrá ceder a
                    ningún título, ni hacerse sustituir por terceros en el ejercicio de los derechos
                    o en el cumplimiento de las obligaciones que tanto la tarjeta como este
                    reglamento le imponen. Al recibir la tarjeta, el ASOCIADO asume el compromiso de
                    manejarla bajo su esfera de cuidado y custodia, así como evitar y no permitir
                    que terceras personas tengan acceso a ella y su clave secreta y darle un uso
                    adecuado, guardando siempre las precauciones necesarias que garanticen la
                    integridad y confidencialidad del producto.
                </ModalText>

                <ModalTitle>CUARTA. – COMPRAS CON TARJETA.</ModalTitle>
                <ModalText>
                    El establecimiento de comercio al que se le realiza el pago con la tarjeta de
                    crédito es el responsable de la calidad, cantidad, marca o cualquier otro
                    aspecto derivado de la compra, en virtud de la relación de consumo entre este y
                    el ASOCIADO. La tarjeta de crédito opera como un instrumento de pago electrónico
                    para realizar compras presenciales o no presenciales. Tratándose de compras
                    presenciales, el ASOCIADO presentará su tarjeta de crédito en los
                    establecimientos y cualquier otro documento que este le exija.
                </ModalText>

                <ModalTitle>QUINTA. - COMPRAS EN EL EXTERIOR.</ModalTitle>
                <ModalText>
                    Las tarjetas de crédito de CAVIPETROL se emiten con la funcionalidad de
                    utilización en el exterior debidamente habilitada en función de la franquicia
                    VISA. No obstante, el ASOCIADO deberá comunicarse a través del Contac center de
                    CAVIPETROL o los canales de comunicación que a futuro habilite para informar el
                    destino de su viaje y las fechas en que se encontrará fuera del país. Este
                    trámite de aviso debe hacerse antes del inicio del viaje, para evitar bloqueos
                    preventivos. En caso de la omisión de este aviso previo, producirá el bloqueo
                    preventivo del plástico, pudiendo ser desbloqueado por el ASOCIADO a través de
                    los medios dispuestos por CAVIPETROL para ello. Las transacciones que se
                    efectúen en el exterior serán cargadas a la tarjeta de crédito en pesos
                    colombianos de acuerdo con la tasa representativa del mercado vigente a la fecha
                    de la utilización. En todo caso, la utilización de la tarjeta fuera del
                    territorio nacional quedará sometida a la ley colombiana, a las regulaciones
                    oficiales en materia cambiaria y a las disposiciones del presente reglamento.
                    Las utilizaciones de la tarjeta en el exterior serán diferidas en las cuotas
                    máximas definidas por CAVIPETROL para estos efectos. Se acuerda que si las
                    autoridades competentes llegaren a suprimir o a expedir normas que impidan el
                    uso de la Tarjeta de Crédito en el exterior automáticamente ésta quedará fuera
                    de uso para tal efecto.
                </ModalText>

                <ModalTitle>SEXTA. – AVANCES.</ModalTitle>
                <ModalText>
                    En caso de que CAVIPETROL lo habilite, El ASOCIADO podrá obtener sumas de
                    efectivo con cargo al cupo de crédito utilizando la tarjeta de crédito en la red
                    de oficinas de CAVIPETROL o a través de cajeros automáticos habilitados o los
                    canales habilitados por el fondo para tal fin. Estos avances en efectivo
                    causarán intereses corrientes desde el mismo día de disposición del cupo y bajo
                    el plazo definido para transacciones de avances. La Tasa aplicable será la
                    vigente al momento de su realización. El avance como operación tendrá un costo
                    que será aplicado a la operación y descontado del cupo como utilización, lo cual
                    declara conocer EL ASOCIADO. La realización de avances contra el cupo aprobado
                    estará limitada por el valor autorizado para el producto la cual puede ser una
                    parte o la totalidad del cupo aprobado. La realización de avances requerirá el
                    uso concomitante de la tarjeta y clave personal, lo cual es conocido y aceptado
                    por EL ASOCIADO. Teniendo en cuenta esto, el uso de tales elementos constituirá
                    plena identificación y autenticación del ASOCIADO y será plena prueba de la
                    correcta y legal realización del respectivo avance, siendo esto reconocido y
                    aceptado por EL ASOCIADO.
                </ModalText>

                <ModalTitle>SEPTIMA. – UTILIZACIONES.</ModalTitle>
                <ModalText>
                    Cada utilización tiene estandarizado y estipulado un tope máximo según
                    disposiciones monetarias del cupo del crédito, por ende, el ASOCIADO podrá
                    diferir sus compras nacionales a una o más cuotas sin superar estos topes
                    definidos. Las utilizaciones por compras nacionales que sean diferidas a una
                    cuota no causarán intereses corrientes o remuneratorios
                </ModalText>

                <ModalTitle>OCTAVA. – DIFERIDOS.</ModalTitle>
                <ModalText>
                    El ASOCIADO determinará el plazo de las utilizaciones que realice con su tarjeta
                    de crédito dentro de los plazos fijados por CAVIPETROL. Mensualmente deberá
                    pagar el valor del pago mínimo que se indique en el extracto, el cual
                    discriminará el valor de la cuota a capital, intereses, costos asociados al
                    producto, seguros y demás cargos asociados al producto. Las transacciones
                    diferentes a compras serán diferidas a los plazos que para efectos CAVIPETROL
                    tenga establecido en sus políticas.
                </ModalText>

                <ModalTitle>NOVENA. - COSTOS Y COMISIONES.</ModalTitle>
                <ModalText>
                    CAVIPETROL cobrará por los servicios que preste en desarrollo del presente
                    reglamento, tales como costos de reexpedición (reemplazo de la tarjeta),
                    comisiones (cargos por avances en caso de ser habilitados, cargos por consultas
                    de saldos en cajeros automáticos, costo de declinación por transacciones cuando
                    dicha declinación sea por razones atribuibles al ASOCIADO), cuota de manejo (la
                    cual será cobrada siempre y cuando la tarjeta se encuentre activa y no cuente
                    con el beneficio de exoneración), seguro de Vida - Grupo Deudores que CAVIPETROL
                    contrata, con amparo de muerte o incapacidad total o permanente con el cual se
                    ampara el saldo insoluto de la deuda, estos costos y comisiones serán los
                    establecidos por CAVIPETROL o por los sistemas de tarjeta de crédito, los cuales
                    serán dados a conocer, previamente a su entrada en vigencia, conforme se
                    encuentra establecido en la normatividad correspondiente.
                </ModalText>

                <ModalTitle>DÉCIMA. - INTERESES CORRIENTES Y DE MORA.</ModalTitle>
                <ModalText>
                    CAVIPETROL establecerá tasas de interés corriente y de mora que en todo caso
                    serán fijadas sin sobrepasar los límites legalmente permitidos; las cuales serán
                    dadas a conocer, previamente a su entrada en vigor, conforme se encuentra
                    establecido en la normatividad correspondiente. En las compras, los intereses se
                    liquidarán sobre la base de capital de cada utilización y en las compras
                    internacionales, serán calculados sobre la conversión a pesos colombianos,
                    manteniéndose para ambos casos, la tasa vigente al momento de la compra durante
                    todo el plazo al que fue diferido. Para las moras, los intereses se calcularán
                    sobre el saldo vencido, cobrándose por cada día de mora una vez superada la
                    fecha límite de pago pactada en la tarjeta. El ASOCIADO podrá conocer en todo
                    momento las tasas vigentes en las publicaciones que hace el fondo en por medio
                    de sus canales de comunicación, en la red de oficinas o llamando al contact
                    center.
                </ModalText>

                <ModalText>
                    CAVIPETROL causará gastos de cobranza ante aquellas situaciones en que por la
                    altura de mora que presente la tarjeta de crédito se generen gastos por cobranza
                    jurídica o pre jurídica, por gestiones de recaudo como llamadas telefónicas,
                    telegramas, mensajes de texto, correos electrónicos, cartas o cualquier otro
                    mecanismo de comunicación. Las tasas de dichos cobros podrán ser consultadas en
                    cualquier momento en las oficinas de Cavipetrol a nivel nacional o en los demás
                    canales de comunicación habilitados para ello.
                </ModalText>

                <ModalTitle>DÉCIMA PRIMERA. - EXTRACTO DE LA TARJETA.</ModalTitle>
                <ModalText>
                    CAVIPETROL mensualmente, mediante un “extracto” liquidará las sumas que resulten
                    a cargo del ASOCIADO, por capital, intereses y demás conceptos a que haya lugar,
                    en virtud de las utilizaciones efectuadas por el ASOCIADO, las cuales deberá
                    cancelar dentro de los plazos y condiciones fijados sin que haya lugar a
                    requerimiento alguno. Los valores que se encuentren en mora deberán ser
                    cancelados inmediatamente. Así mismo, se evidenciará en todas las transacciones
                    y el detalle de estas para efectos de transparencia y conciliación financiera
                    por parte del ASOCIADO.
                </ModalText>

                <ModalText>
                    El extracto será enviado a la dirección física o electrónica que haya informado
                    el ASOCIADO al momento de su vinculación o actualización de datos. En efecto en
                    que el ASOCIADO no reciba su extracto, podrá solicitarlo para validar la
                    respectiva información acercándose a las oficinas de Cavipetrol a nivel nacional
                    o a través de los canales de comunicación habilitados por parte del fondo.
                </ModalText>

                <ModalText>
                    La ausencia de entrega del extracto no exime al ASOCIADO del pago y por ello
                    debe tener presente las fechas límites de pago para realizar este de manera
                    oportuna y evitar cobros por mora. El ASOCIADO podrá formular por escrito o
                    verbalmente cualquier objeción frente a su extracto, a través de cualquiera de
                    los canales de atención (oficinas, Contac center, entre otros) habilitados por
                    CAVIPETROL.
                </ModalText>

                <ModalTitle>DÉCIMA SEGUNDA. – CANALES DE PAGO.</ModalTitle>
                <ModalText>
                    CAVIPETROL pondrá a disposición de los ASOCIADOS los servicios de las cajas de
                    las oficinas del fondo a nivel nacional y los que a futuro se habiliten para que
                    realice los pagos mensuales de su tarjeta de crédito y mantenga el beneficio de
                    seguir usando su cupo de crédito, así como reportar un buen comportamiento
                    financiero en centrales de riesgo. En cualquier momento el ASOCIADO podrá
                    realizar abonos extraordinarios a su tarjeta de crédito sin ningún cobro o
                    penalidad, de forma que le permita liberar cupo de su tarjeta de crédito para
                    futuros usos. El ASOCIADO es responsable de notificar cualquier inconveniente
                    que tenga para realizar sus pagos.
                </ModalText>

                <ModalText>
                    Autorizo expresamente a CAVIPETROL para que en adelante de mi cuenta FAI se
                    debite en la fecha límite de pago el valor de mis cuotas de los créditos
                    adjudicados. Esta autorización se hace extensiva cuando se presente atraso o
                    mora en alguno de mis compromisos u obligaciones económicas o crediticias para
                    con el Fondo. Marque con una x Si ___ o No___.
                </ModalText>

                <ModalTitle>DÉCIMA TERCERA. - OBLIGACIONES DEL ASOCIADO.</ModalTitle>

                <ol>
                    <li>
                        <ModalText>
                            Firmar, previa verificación de su cuantía, el respectivo comprobante
                            (voucher) de la compra e identificarse plenamente ante el
                            establecimiento afiliado.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Efectuar, por su seguridad, en forma personal las utilizaciones a través
                            de los medios presenciales y no presenciales.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Acogerse a los plazos que concede CAVIPETROL y cancelar como mínimo el
                            monto que se le indique en el extracto.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Pagar a CAVIPETROL todas las sumas insolutas que resulten a su cargo,
                            aun en los eventos de encontrarse vencida o cancelada la tarjeta
                            decrédito
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Utilizar responsable y diligentemente los archivos, sistemas, programas
                            y aplicaciones que CAVIPETROL con carácter exclusivo, reservado o propio
                            de su actividad, utilice, posea o ponga a su disposición a efecto de
                            llevar a cabo la prestación de sus servicios en línea o vía “Internet”,
                            o cualquier otra red informática o desarrollo tecnológico que se
                            establezca en el futuro, ni a intervenir en el normal funcionamiento de
                            estos o disponer de ellos en cualquier forma.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Actualizar periódicamente los datos comerciales y de contacto por
                            cualquiera de los medios previstos por CAVIPETROL para tal fin,
                            cualquier cambio en los datos, cifras, así como a suministrar la
                            totalidad de los soportes documentales exigidos y a mantenerlos
                            actualizados tales como balances, declaración de renta, certificado de
                            ingresos y retenciones y demás a que haya lugar con una periodicidad
                            como mínimo anual
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Dar aviso de forma inmediata si no recibe el extracto; en caso de
                            silencio se presumirá que lo ha recibido.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Abstenerse de entregar información de transacciones, del producto o
                            cualquier otro dato sensible que ponga en riesgo la seguridad de su
                            tarjeta de crédito
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Estar al día con sus obligaciones estatutarias y crediticias contraídas
                            con CAVIPETROL para no perder los beneficios de su tarjeta.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Mantener la tarjeta de crédito y la clave bajo su custodia y
                            confidencialidad asegurando que terceras personas no tengan acceso a
                            ellas, así como realizar todas sus transacciones a través de canales
                            seguros.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Notificar a CAVIPETROL de manera inmediata sobre el hurto o extravío de
                            la tarjeta haciendo uso de los canales de comunicación establecidos.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Las demás que se deriven de normas expedidas a nivel nacional o
                            normatividad interna de CAVIPETROL, relacionadas con este tipo de
                            productos.
                        </ModalText>
                    </li>
                </ol>

                <ModalTitle>DÉCIMA CUARTA. – DERECHOS DEL ASOCIADO</ModalTitle>
                <ModalText>El ASOCIADO tiene derecho a:</ModalText>

                <ol>
                    <li>
                        <ModalText>
                            Recibir atención oportuna y respetuosa a todos sus requerimientos.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Recibir información clara, veraz y suficiente acerca del producto
                            adquirido.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Que las obligaciones de CAVIPETROL, derivadas del presente reglamento,
                            pagaré, carta de instrucciones y del funcionamiento propio del producto
                            sean plenamente cumplidas.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Presentar preguntas, quejas y reclamos y a que éstos sean respondidos de
                            forma eficaz y oportuna, de acuerdo con los reglamentos y procedimientos
                            establecidos para tal fin en CAVIPETROL.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Recibir información, por lo menos mensual, del estado de su obligación
                            para que pueda realizar oportunamente sus pagos, así como para presentar
                            las objeciones a que haya lugar a través de los canales dispuestos para
                            tal fin por CAVIPETROL.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Que sus datos confidenciales sean protegidos según la normatividad
                            vigente.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>Utilizar el cupo de su tarjeta de crédito.</ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Bloquear y ser atendido inmediatamente cuando no reconozca transacciones
                            que estén siendo o hayan sido realizadas con su tarjeta de crédito.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Que su plástico sea emitido nuevamente en caso de extravío, deterioro o
                            hurto y asumir los costos, en caso de que a ello haya lugar.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Denunciar anomalías o eventos sospechosos que detecte en la solicitud,
                            adquisición o goce del producto por parte de CAVIPETROL, sus
                            funcionarios o terceros.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Escoger el plazo para diferir su transacción y de no haber sido posible,
                            comunicarse con el Contac center de CAVIPETROL para solicitar la
                            modificación de ese término.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Los tarjetahabientes (asociados) según categoría podrán disfrutar
                            diferentes beneficios exclusivos de la franquicia VISA, los cuales
                            pueden ser consultados directamente en la página de www.visa.com.co.
                            Aplican condiciones y restricciones
                        </ModalText>
                    </li>
                </ol>

                <ModalTitle>DÉCIMA QUINTA. - OBLIGACIONES DE CAVIPETROL.</ModalTitle>
                <ModalText>Mediante el presente reglamento CAVIPETROL se obliga a:</ModalText>

                <ol>
                    <li>
                        <ModalText>
                            Remitir el extracto mensual de la tarjeta de crédito a la dirección
                            física o correo electrónico previamente indicado por el ASOCIADO
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Suministrar información clara, veraz y suficiente acerca del producto
                            adquirido.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Responder oportunamente las preguntas, quejas y reclamos del ASOCIADO de
                            acuerdo con los procedimientos definidos por CAVIPETROL para tal fin.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Prestar el servicio en condiciones de seguridad y confiabilidad.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Permitir el uso del cupo de crédito en las condiciones pactadas con el
                            ASOCIADO a menos que se presenten situaciones como mora o bloqueos.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Reponer el plástico dentro de los términos informados al ASOCIADO para
                            que éste pueda continuar disfrutando de su producto.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Informar acerca de cambios en tarifas o condiciones de tal forma que no
                            se interrumpa abruptamente el goce del producto.
                        </ModalText>
                    </li>
                </ol>

                <ModalTitle>DÉCIMA SEXTA. - PAGARÉ CON ESPACIOS EN BLANCO.</ModalTitle>
                <ModalText>
                    El ASOCIADO suscribirá un pagaré con espacios en blanco, de acuerdo con lo
                    establecido en el artículo 622 del código de comercio junto con una carta de
                    instrucciones para diligenciarlo como respaldo de las utilizaciones efectuadas.
                    El pagaré únicamente será diligenciado si el producto requiere ser judicializado
                    para su exigibilidad.
                </ModalText>

                <ModalTitle>DÉCIMA SEPTIMA. - EXTRAVIO O HURTO DE LA TARJETA.</ModalTitle>
                <ModalText>
                    Será obligación del ASOCIADO la custodia de la tarjeta y por tanto asume el
                    riesgo ante CAVIPETROL y ante terceros, hasta por la culpa levísima por
                    cualquier uso indebido que de ella se haga a causa de su negligencia o descuido.
                    En caso de extravío, hurto o robo de la tarjeta de crédito el ASOCIADO deberá
                    dar aviso telefónico inmediato a la línea de atención telefónica habilitada las
                    24 horas del día, los 7 días de la semana para que pueda ser bloqueado el
                    producto mientras es recuperado o hasta que el ASOCIADO tome la decisión de
                    reexpedirlo.
                </ModalText>

                <ModalTitle>DÉCIMA OCTAVA. – SOLICITUD DE INFORMACIÓN Y RECLAMACIONES.</ModalTitle>
                <ModalText>
                    Para solicitudes especiales y de solución inmediata como consultas, activaciones
                    de servicios, bloqueos, objeciones por las utilizaciones que considere no
                    corresponden con el producto o servicio solicitado, cobros y demás datos o
                    servicios asociados a la tarjeta de crédito, el ASOCIADO podrá solicitarla a
                    través de la red de oficinas a nivel nacional o los canales establecidos por el
                    fondo para estos efectos, en donde recibirá toda la información en los horarios
                    previamente establecidos y notificados por los diferentes canales dispuestos por
                    el fondo.
                </ModalText>

                <ModalTitle>DÉCIMA NOVENA. - SEGUROS.</ModalTitle>
                <ModalText>
                    CAVIPETROL pone a disposición del producto tarjeta de crédito el seguro de vida
                    deudores con amparo de muerte e incapacidad total y permanente ITP según las
                    políticas de crédito del fondo el cual se liquida de manera mensual sobre el
                    saldo insoluto de deuda del cupo de crédito y la cobertura por hurto y fraude,
                    este seguro será asumido por el ASOCIADO en sus cuotas mensuales. Las tarifas y
                    coberturas de este seguro las podrá consultar en los canales de contacto
                    dispuestos por CAVIPETROL.
                </ModalText>

                <ModalTitle>VIGESIMA. - DURACIÓN Y CAUSALES DE TERMINACIÓN.</ModalTitle>
                <ModalText>
                    El término de duración del contrato de Apertura de Crédito rotativo será
                    indefinido. No obstante, el vínculo podrá darse por terminado unilateralmente
                    por cualquiera de las partes, a saber: A) POR PARTE DEL ASOCIADO: podrá cancelar
                    la tarjeta de crédito en forma unilateral y por cualquier causa, sin que haya
                    lugar a indemnizaciones, mediante aviso escrito o llamada telefónica al Contac
                    center, canales en los cuales se le explicará y adelantará el proceso
                    correspondiente y que, en todo caso, estará sujeto al pago total de los saldos
                    que el ASOCIADO adeude por el producto. B)POR PARTE DE CAVIPETROL: podrá
                    terminar unilateralmente el vínculo comercial derivado de la tarjeta de crédito,
                    caso en el cual declarará de plazo vencido la totalidad de las deudas a cargo
                    del ASOCIADO y éste deberá restituir inmediatamente la tarjeta en los siguientes
                    casos:
                </ModalText>

                <ol>
                    <li>
                        <ModalText>
                            Incumplimiento de cualquiera de las obligaciones contraídas en virtud
                            del presente reglamento.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            El no pago dentro de los términos y condiciones establecidos en el
                            extracto mensual recibido por el ASOCIADO.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            En caso de muerte, incapacidad total o permanente, disolución,
                            liquidación e insolvencia del ASOCIADO.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>Por las causales establecidas en el pagaré.</ModalText>
                    </li>
                    <li>
                        <ModalText>
                            La inclusión del ASOCIADO en las denominadas listas vinculantes.
                        </ModalText>
                    </li>
                    <li>
                        <ModalText>
                            Si en cumplimiento de una norma legal, por orden de autoridad judicial o
                            administrativa, CAVIPETROL se viere obligado a terminar el vínculo
                            comercial derivado de la tarjeta de crédito
                        </ModalText>
                    </li>
                </ol>

                <ModalTitle>PARÁGRAFO PRIMERO.</ModalTitle>
                <ModalText>
                    Para la causal establecida en el numeral 5. el ASOCIADO conoce, entiende y
                    acepta de manera voluntaria e inequívoca, que CAVIPETROL en cumplimiento de su
                    obligación legal de prevenir y controlar el lavado de activos y la financiación
                    del terrorismo, y siguiendo la jurisprudencia de la Corte Constitucional sobre
                    la materia, por considerarlo una causal objetiva, podrá terminar el presente
                    contrato dando aplicación a los términos establecidos en ésta cláusula, cuando
                    su nombre haya sido incluido en la listas vinculantes, o en cualquier otra de
                    igual o similar naturaleza, de carácter nacional o internacional, en la que se
                    publiquen los datos de las personas condenadas o vinculadas por las autoridades
                    nacionales o internacionales, de manera directa o indirecta, con actividades
                    ilícitas, tales como narcotráfico, terrorismo, lavado de activos, tráfico de
                    estupefacientes, secuestro extorsivo y/o trata de personas, entre otras.
                </ModalText>

                <ModalTitle>
                    VIGESIMA PRIMERA. – TRATAMIENTO DE DATOS PERSONALES, PRIVACIDAD,
                    CONFIDENCIALIDAD Y REPORTE DE HABITOS DE PAGO.
                </ModalTitle>
                <ModalText>
                    La información que reporte el ASOCIADO, así como el tratamiento de datos
                    sensibles para prevención de fraudes, suplantaciones y similares será tratada
                    conforme a la política de privacidad, protección de datos personales y de
                    seguridad de CAVIPETROL, sustentadas según la autorización otorgada en los
                    formularios o documentos que se suscribieron con CAVIPETROL. Estas
                    autorizaciones estarán vigentes mientras el ASOCIADO tenga un producto o
                    servicio vigente con CAVIPETROL y por el tiempo adicional que exija la
                    normativa, o por la autorización por parte del ASOCIADO en los casos permitidos
                    por ley. EL ASOCIADO expresamente y de manera permanente autoriza a CAVIPETROL
                    para consultar, obtener, recolectar, almacenar, analizar, usar, reportar,
                    intercambiar, circular, suprimir o divulgar con carácter permanente a cualquier
                    operador de información, cualquier entidad del sector financiero, solidario o
                    real, la información financiera, dato personal, comercial, privado, semiprivado
                    o de cualquier naturaleza del ASOCIADO y frente a: (i) información acerca del
                    nacimiento, modificación, celebración y/o extinción de obligaciones directas,
                    contingentes o indirectas del asociado; (ii) información acerca del
                    incumplimiento de las obligaciones o de las que cualquiera de estas entidades
                    (entidades del sector financiero, solidario o real) adquiera a cargo del
                    ASOCIADO; (iii) cualquier novedad en relación con las obligaciones contraídas
                    por EL ASOCIADO para con Cavipetrol; o (iv) información referente al
                    endeudamiento, hábitos de pago y comportamiento crediticio con el FONDO y/o
                    terceros con el fin, entre otros de que sea incluido el nombre del ASOCIADO y su
                    documento de identificación en los registros de deudores morosos o con
                    referencias negativas, su endeudamiento, las operaciones y/o obligaciones
                    vigentes y las que adquiera o las que en el futuro llegare a celebrar cualquiera
                    que sea su naturaleza con CAVIPETROL, en cualquier operador o administrados de
                    banco de datos de información financiera o cualquier otra entidad similar o que
                    en el futuro se establezca y tenga por objeto la recopilación, procesamiento,
                    consulta y divulgación. La autorización faculta a Cavipetrol no sólo para
                    almacenar, reportar, procesar, analizar y divulgar la información a los
                    operadores de información, sino también para que Cavipetrol pueda solicitar y
                    consultar información sobre las relaciones comerciales del ASOCIADO con
                    terceros, con el sector real o financiero, el cumplimiento de sus obligaciones,
                    contratos, hábitos de pago, etc. y para que la información reportada pueda ser
                    actualizada, usada, almacenada y circularizada por el operador de información y
                    en general, del cumplimiento y manejo de los créditos y obligaciones del
                    ASOCIADO cualquiera que sea su naturaleza. Las partes convienen que esta
                    autorización comprende la información presente, pasada y futura referente al
                    manejo, estado, cumplimiento de las relaciones, contratos y servicios, hábitos
                    de pago, obligaciones y las deudas vigentes, vencidas sin cancelar, procesos, o
                    a la utilización indebida de los servicios financieros del ASOCIADO. Con base en
                    la presente autorización EL ASOCIADO autoriza a Cavipetrol para usar y analizar
                    la información derivada de los usos de la tarjeta de crédito, para efectos de
                    llevar a cabo la construcción de ofertas de valor para sus asociados, bien sea
                    directamente o a través de terceros que tengan la calidad de aliados o
                    contratistas de Cavipetrol.
                </ModalText>

                <ModalTitle>VIGESIMA SEGUNDA. – EXONERACIÓN DE RESPONSABILIDAD</ModalTitle>
                <ModalText>
                    CAVIPETROL con su producto de tarjeta de crédito, no responderá por
                    incumplimientos contractuales que sean consecuencia de hechos o actos que
                    constituyan fuerzas mayores o fortuitas, entendiéndose como acciones de
                    autoridades gubernamentales, acciones de un enemigo público, motines, actos de
                    naturaleza y otras causas fuera del control del fondo. Igualmente, CAVIPETROL no
                    responderá por perjuicios ocasionados por hechos de terceros imprevisibles o
                    irresistibles o imputables al ASOCIADO por el uso de la tarjeta de crédito
                </ModalText>

                <ModalTitle>VIGESIMA TERCERA. – COMUNICACIONES</ModalTitle>
                <ModalText>
                    El ASOCIADO recibirá información de notificaciones de transacciones,
                    promociones, novedades, cambios en la oferta o el producto mediante los canales
                    dispuestos por el fondo para tal fin como SMS, email, llamada telefónica,
                    mensajes de voz o cualquier otro medio. De igual forma, podrá llamar a los
                    teléfonos de atención al asociado a través del Contac center o ponerse en
                    contacto con cualquier representante de las oficinas a nivel nacional de
                    CAVIPETROL para informarse acerca de cualquiera de este tipo de información
                    descrita en este capítulo. De igual manera, podrá consultar todas las
                    condiciones o novedades aplicadas a su tarjeta de crédito directamente y
                    mediante los servicios de portal transaccional que dispone el fondo.
                </ModalText>

                <ModalTitle>VIGESIMA CUARTA. - MODIFICACIONES.</ModalTitle>
                <ModalText>
                    El presente reglamento podrá ser modificado, o sustituido, de lo cual CAVIPETROL
                    dará aviso al ASOCIADO por escrito, correo electrónico, publicación en las
                    carteleras o en la página web en cada oportunidad, por quince (15) días hábiles
                    para que el ASOCIADO pueda decidir, dentro de ese término, acerca de la
                    continuidad de la relación contractual teniendo la opción de rescindir el
                    reglamento sin que haya lugar a penalidad o cargo alguno, sin perjuicio del pago
                    de los saldos que el ASOCIADO deba cubrir a favor de CAVIPETROL en las
                    condiciones inicialmente pactadas. En el evento en que el ASOCIADO, dentro del
                    término indicado ya referido, no manifieste su inconformidad con la modificación
                    propuesta, se entenderá su aceptación tácita.
                </ModalText>

                <ModalTitle>
                    VIGESIMA QUINTA. - PERFECCIONAMIENTO Y ACEPTACIÓN DEL REGLAMENTO.
                </ModalTitle>
                <ModalText>
                    El presente Reglamento se perfecciona con la entrega de la tarjeta de crédito al
                    ASOCIADO y se entiende conocido y aceptado por éste, siempre que él haya
                    culminado exitosamente el proceso de activación del producto
                </ModalText>

                <ModalTitle>VIGESIMA SEXTA. - COMPENSACIÓN.</ModalTitle>
                <ModalText>
                    EL ASOCIADO autoriza expresa e irrevocablemente a CAVIPETROL para debitar o
                    cargar contra cualquier cuenta a la vista o cualquier depósito o suma que
                    individual, conjunta o alternativamente posea en CAVIPETROL, las suma que
                    llegare a adeudar EL ASOCIADO a CAVIPETROL por concepto de los usos de la
                    tarjeta de crédito, sus costos, intereses y gastos de cobro en caso de ser
                    necesario.
                </ModalText>

                <ModalTitle>VIGESIMA SÉPTIMA. - NORMAS DE SEGURIDAD.</ModalTitle>
                <ModalText>
                    El ASOCIADO se obliga a cumplir con los protocolos de seguridad del producto
                    aquí reglamentado, conociendo que el uso de la tarjeta y la clave es personal e
                    intransferible, por lo que cualquier vulneración al deber de custodia será
                    responsabilidad del ASOCIADO, así como los usos que se pudieran generar con
                    ocasión de la violación del deber de confidencialidad y reserva de dicha
                    información. En caso de hacer uso de medios electrónicos, EL ASOCIADO se
                    compromete a utilizar equipos propios, con antivirus actualizados y conexión
                    personal o propia. De igual manera conocer que no es recomendable hacer uso de
                    redes públicas para diligenciar información confidencial de su producto, en la
                    medida que puede verse expuesta a uso de parte de terceros, perdiendo así la
                    confidencialidad de esta. De igual manera, EL ASOCIADO se compromete a cumplir
                    las recomendaciones de seguridad que periódicamente publique CAVIPETROL a través
                    de los medios dispuestos para ello.
                </ModalText>

                <ModalTitle>VIGÉSIMA OCTAVA. - ACTIVACIÓN DE LA TARJETA.</ModalTitle>
                <ModalText>
                    La activación de la tarjeta de crédito estará sujeta a la firma y entrega de los
                    siguientes documentos por EL ASOCIADO: 1. Solicitud de tarjeta de crédito; 2.
                    Firma de pagaré y carta de instrucciones y; 3. Comprobante de entrega de la
                    tarjeta suscrito por EL ASOCIADO.
                </ModalText>

                <ModalTitle>VIGÉSIMA NOVENA. - CONOCIMIENTO INFORMADO.</ModalTitle>
                <ModalText>
                    El ASOCIADO declara que CAVIPETROL le ha puesto a disposición copia del presente
                    reglamento y por lo tanto manifiesta que lo ha leído detalladamente junto con
                    los demás documentos que den sustento al producto tarjeta de crédito, además
                    ratifica ha recibido información clara y completa sobre las características del
                    producto, sus condiciones, las consecuencias del incumplimiento, los
                    procedimientos y seguridades, los derechos y obligaciones, los riesgos que
                    conlleva y el incumplimiento de las obligaciones a su cargo, aceptándolos y
                    obligándose a su cumplimiento. Igualmente manifiesta que han sido puestas en su
                    conocimiento las tarifas, comisiones y costos por la utilización de los
                    servicios y entregadas las políticas de cobro perjudico y jurídico de CAVIPETROL
                    las cuales igualmente se pueden consultar en https://www.cavipetrol.com.
                </ModalText>

                <CheckField
                    viewTextLink="política de tratamiento de datos"
                    text="Autorizo a Cavipetrol a hacer uso de mis datos personales según la "
                    onClickLink={() => {
                        window.open(
                            'https://cavipetrolstorageaccount.blob.core.windows.net/assets/POLITICA DE TRATAMIENTO DE DATOS PERSONALES.pdf',
                            'WindowName',
                            'noopener'
                        )
                    }}
                    onChange={onChangeCheck}
                    checked={checked}
                />

                <CtrButton>
                    <Button
                        variant="sub-dominant"
                        type="submit"
                        extend
                        disabled={disable}
                        onClick={onContinue}
                    >
                        Continuar
                    </Button>
                </CtrButton>
            </ModalContent>
            <ModalFooter></ModalFooter>
        </Modal>
    )
}

export default PersonalDataModal
