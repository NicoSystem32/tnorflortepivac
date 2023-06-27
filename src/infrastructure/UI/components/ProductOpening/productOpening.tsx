import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Form, Modal, InputGroup, Breadcrumb } from 'react-bootstrap'

// Icons
import {
    ArrowCircleSVG,
    TimeSVG,
    MetroSVG,
    CashSVG,
    GraphSVG,
    CardSVG,
    IconAlertSVG,
    IconPayFaiSVG,
    IconMultiPNG,
} from '../../utils/getIcons'
import { IconPsePNG } from '../../utils/getImages'

import { formatValue, formatDecimalValue } from '../GlobalFuntions/globalFunction'
import { paymentService } from '../../../../domain/services/User.service'

import './productOpening.scss'
import { useAppTour } from '../../hooks'

const cdtValue = ''

const ProductOpening = (): JSX.Element => {
    const history = useHistory()
    const [show, setShow] = useState(false)
    const handleClose = (): void => setShow(false)
    const [showTerm, setShowTerm] = useState(false)
    const handleCloseTerm = (): void => setShowTerm(false)
    const [isDisabled, setDisabled] = useState(false)
    const state = useSelector((stateRef: any) => stateRef)
    const tokenSave = state.auth.token
    const total = state.products.total
    const [balanceFAI, setBalanceFAI] = useState('')
    const [isReady, setReady] = useState(false)
    const [item, setItem] = useState({ kindOfStand: '', another: 'another' })
    const [insertValue, setInsertValue] = useState<string>()
    const [selectedTerm, setSelectedOptionTerm] = useState<string>()
    const [selectedModality, setSelectedOptionModality] = useState<string>()
    const [isCheck, setCheck] = useState(false)
    const { kindOfStand } = item
    const { rideStep } = useAppTour()

    const redirections = (url: string): void => {
        history.push(url)
    }

    const handleChange = (e: any): void => {
        e.persist()

        setItem((prevState) => ({
            ...prevState,
            kindOfStand: e.target.value,
        }))
    }

    const handleSubmit = (e: any): void => {
        e.preventDefault()
        if (`${kindOfStand}` === 'pse') {
            console.log('in construction')
        }
    }

    const nextStep = (step: any): void => {
        const elementsStep1 = document.querySelector('.step1-product-open')
        const elementsStep2 = document.querySelector('.step2-product-open')
        const elementsStep3 = document.querySelector('.step3-product-open')
        if (step == 1) {
            elementsStep1?.classList.remove('not-display')
            elementsStep2?.classList.add('not-display')
            elementsStep3?.classList.add('not-display')
        } else if (step == 2) {
            elementsStep1?.classList.add('not-display')
            elementsStep2?.classList.remove('not-display')
            elementsStep3?.classList.add('not-display')
            setDisabled(false)
        } else {
            elementsStep1?.classList.add('not-display')
            elementsStep2?.classList.add('not-display')
            elementsStep3?.classList.remove('not-display')
        }
    }

    const lastStep = (): void => {
        nextStep(3)
        setShow(false)
    }

    const cancelOpenning = (): void => {
        nextStep(1)
        setShow(false)
        setShowTerm(false)
    }

    const changeInvestment = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInsertValue(event.target.value)
        if (
            event.target.value != '' &&
            selectedTerm != undefined &&
            selectedTerm != '0' &&
            selectedModality != undefined &&
            selectedModality != '0' &&
            isCheck
        ) {
            setReady(true)
        } else {
            setReady(false)
        }
    }

    const selectTermChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedOptionTerm(event.target.value)
        if (
            insertValue != '' &&
            insertValue != undefined &&
            event.target.value != undefined &&
            event.target.value != '0' &&
            selectedModality != undefined &&
            selectedModality != '0' &&
            isCheck
        ) {
            setReady(true)
        } else {
            setReady(false)
        }
    }

    const selectModalityChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedOptionModality(event.target.value)
        if (
            insertValue != '' &&
            insertValue != undefined &&
            selectedTerm != undefined &&
            selectedTerm != '0' &&
            event.target.value != '0' &&
            event.target.value != undefined &&
            isCheck
        ) {
            setReady(true)
        } else {
            setReady(false)
        }
    }

    const changeCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setCheck(event.target.checked)
        if (
            insertValue != '' &&
            insertValue != undefined &&
            selectedTerm != undefined &&
            selectedTerm != '0' &&
            selectedModality != undefined &&
            selectedModality != '0' &&
            event.target.checked
        ) {
            setReady(true)
        } else {
            setReady(false)
        }
    }

    useEffect(() => {
        paymentService
            .getHomePay('/api/Products/GetFaiAccountBalance/GetFaiAccountBalance', tokenSave)
            .then((response: any) => {
                if (response != undefined) {
                    setBalanceFAI(response.Data.BalanceTotal)
                } else {
                    redirections('/not-response')
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="main-content">
            <div className="content-sg content-sg-payment paymentsfai">
                <div className="section-breadcrumbs">
                    <Breadcrumb>
                        <Breadcrumb.Item
                            id="option-bread-home"
                            onClick={() => redirections('/home-wallet')}
                        >
                            Inicio
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>solicitud de productos</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="step1-product-open">
                    <a className="return-sg payments" onClick={() => redirections('/home-wallet')}>
                        <img src={ArrowCircleSVG} alt="" className="return-img" />
                        <p>Volver</p>
                    </a>
                    <div className="sect-title-dcto payments">
                        <div className="title-mob-sg">
                            <p className="title-info-sg">
                                ¿Qué producto<strong>&nbsp;deseas</strong>
                            </p>
                            <p className="title-info-sg">
                                <strong>solicitar?</strong>
                            </p>
                        </div>
                        <div className="title-desk-sg">
                            <p className="title-info-sg">
                                ¿Qué producto<strong>&nbsp;deseas</strong>
                            </p>
                            <p className="title-info-sg">
                                <strong>solicitar?</strong>
                            </p>
                        </div>
                    </div>
                    <div className="content-card-product-open">
                        <div className="card-product-open" onClick={() => nextStep(2)}>
                            <img src={CardSVG} alt="" className="return-img" />
                            <p className="title-card-op">Tarjetas de crédito</p>
                            <p className="text-card-op">
                                Una tarjeta pensada solo para ti, con beneficios increíbles.
                            </p>
                        </div>
                        <div
                            className="card-product-open"
                            onClick={() => {
                                nextStep(2)
                                rideStep(2)
                            }}
                            data-tour="investment-tdc"
                        >
                            <img src={GraphSVG} alt="" className="return-img" />
                            <p className="title-card-op">Inversiones TDC</p>
                            <p className="text-card-op">
                                Invierte tu dinero recibiendo intereses por el tiempo de permanencia
                                de tus recursos.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="step2-product-open not-display">
                    <a
                        className="return-sg payments"
                        onClick={() => nextStep(1)}
                        data-tour="investment-tdc-return"
                    >
                        <img src={ArrowCircleSVG} alt="" className="return-img" />
                        <p>Volver</p>
                    </a>
                    <div className="sect-title-dcto payments">
                        <div className="title-mob-sg">
                            <p className="title-info-sg">
                                Solicitud de<strong>&nbsp;TDC</strong>
                            </p>
                        </div>
                        <div className="title-desk-sg">
                            <p className="title-info-sg">
                                Solicitud de<strong>&nbsp;TDC</strong>
                            </p>
                        </div>
                    </div>
                    <Form
                        onSubmit={handleSubmit}
                        className="content-detail-cto payments product-open"
                    >
                        <div className="content-detail-po" data-tour="returns-tdc">
                            <p className="text-title-po">Rendimientos</p>
                            <div className="content-sub-po">
                                <p className="text-subtitle-po">
                                    Tasa efectiva<br></br>
                                    <strong className="text-value-po">6%</strong>
                                </p>
                                <p className="text-subtitle-po">
                                    Número de pagos<br></br>
                                    <strong className="text-value-po">12</strong>
                                </p>
                                <p className="text-subtitle-po">
                                    Rendimiento neto<br></br>
                                    <strong className="text-value-po">
                                        $ 3´000.000<sup className="sub-indice">.00</sup>
                                    </strong>
                                </p>
                            </div>
                        </div>
                        <div className="content-inputs-po" data-tour="create-tdc">
                            <Form.Group className="group-content" id="content-group-user">
                                <Form.Label className="group-label label-product-open">
                                    Valor de la inversión
                                </Form.Label>
                                <InputGroup id="input-group-user">
                                    <InputGroup.Text id="icon-user">
                                        <img src={CashSVG} alt="" className="icon-input" />
                                    </InputGroup.Text>
                                    <Form.Control
                                        id="input-cdt-value"
                                        placeholder="Ingresa un valor mínimo de $500.000"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        className="simple"
                                        onChange={changeInvestment}
                                        type="number"
                                    />
                                </InputGroup>
                                <div className="text-error-login">
                                    <p className="not-display" id="error-required-user">
                                        Campo obligatorio
                                    </p>
                                </div>
                            </Form.Group>
                            <Form.Group className="group-content" id="content-group-user">
                                <Form.Label className="group-label label-product-open">
                                    Plazo
                                </Form.Label>
                                <InputGroup id="input-group-user">
                                    <InputGroup.Text id="icon-user">
                                        <img src={TimeSVG} alt="" className="icon-input" />
                                    </InputGroup.Text>

                                    <Form.Select
                                        aria-label="Selecciona una opción"
                                        className="simple"
                                        onChange={selectTermChange}
                                    >
                                        <option value="0">Selecciona una opción</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </InputGroup>

                                <div className="text-error-login">
                                    <p className="not-display" id="error-length-user">
                                        Éste campo debe contener un mínimo de 4 caracteres y un
                                        máximo de 16
                                    </p>
                                    <p className="not-display" id="error-exits-user">
                                        Nombre de usuario no existe
                                    </p>
                                    <p className="not-display" id="error-required-user">
                                        Campo obligatorio
                                    </p>
                                </div>
                            </Form.Group>
                            <Form.Group className="group-content" id="content-group-user">
                                <Form.Label className="group-label label-product-open">
                                    ¿Desea recibir el pago periodico de rendimientos?
                                </Form.Label>
                                <div className="content-radio-open">
                                    <Form.Check
                                        className="radio-po"
                                        value="si"
                                        type="radio"
                                        aria-label="radio 3"
                                        label="Si"
                                        onChange={handleChange}
                                        checked={kindOfStand === 'si'}
                                    />
                                    <Form.Check
                                        className="radio-po"
                                        value="no"
                                        type="radio"
                                        aria-label="radio 3"
                                        label="No"
                                        onChange={handleChange}
                                        checked={kindOfStand === 'no'}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="group-content" id="content-group-user">
                                <Form.Label className="group-label label-product-open">
                                    Modalidad de rendimientos
                                </Form.Label>
                                <InputGroup id="input-group-user">
                                    <InputGroup.Text id="icon-user">
                                        <img src={MetroSVG} alt="" className="icon-input" />
                                    </InputGroup.Text>

                                    <Form.Select
                                        aria-label="Selecciona una opción"
                                        className="simple"
                                        onChange={selectModalityChange}
                                    >
                                        <option value="0">Selecciona una opción</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </InputGroup>

                                <div className="text-error-login">
                                    <p className="not-display" id="error-length-user">
                                        Éste campo debe contener un mínimo de 4 caracteres y un
                                        máximo de 16
                                    </p>
                                    <p className="not-display" id="error-exits-user">
                                        Nombre de usuario no existe
                                    </p>
                                    <p className="not-display" id="error-required-user">
                                        Campo obligatorio
                                    </p>
                                </div>
                            </Form.Group>
                        </div>
                        <Form.Group
                            className="mb-3 check-open-product"
                            controlId="formBasicCheckbox"
                        >
                            <Form.Check type="checkbox" label="" onChange={changeCheck} />
                            <p>
                                Confirmo haber leído y estar de acuerdo con los{' '}
                                <a className="conditions-po" onClick={() => setShowTerm(true)}>
                                    términos y condiciones de TDC.
                                </a>
                            </p>
                        </Form.Group>

                        <div className="content-btn-form payments-step2 content-btn-align-standar content-btn-fdcto btn-options-po">
                            {isReady ? (
                                <Button
                                    className="btn-form btn-global btn-rect"
                                    variant="primary"
                                    onClick={() => setShow(true)}
                                    data-tour="finish-tdc"
                                >
                                    Pagar TDC
                                </Button>
                            ) : (
                                <Button
                                    className="btn-form btn-global btn-rect"
                                    disabled
                                    variant="primary"
                                    type="submit"
                                    onClick={() => nextStep(3)}
                                    data-tour="finish-tdc"
                                >
                                    Pagar TDC
                                </Button>
                            )}
                            <Button
                                className="btn-modal-detail modal-btn-secundary"
                                variant="primary"
                                onClick={cancelOpenning}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className="step3-product-open not-display">
                    <a className="return-sg payments" onClick={() => nextStep(2)}>
                        <img src={ArrowCircleSVG} alt="" className="return-img" />
                        <p>Volver</p>
                    </a>
                    <div className="sect-title-dcto payments">
                        <div className="title-mob-sg">
                            <p className="title-info-sg">
                                Solicitud de<strong>&nbsp;TDC</strong>
                            </p>
                        </div>
                        <div className="title-desk-sg">
                            <p className="title-info-sg">
                                Solicitud de<strong>&nbsp;TDC</strong>
                            </p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="content-detail-cto payments product-open step3"
                    >
                        <p className="subtitle-product-open">
                            Selecciona el <strong>origen de los fondos</strong>
                        </p>
                        <p className="text-secundary-payment">
                            Recuerda que tu transacción puede estar sujeta a cobro del 4 x 1000, de
                            realizarse, podrás ver este cobro en los movimientos de tu cuenta FAI, o
                            tu banco emisor en el caso de que pagues por PSE.
                        </p>
                        <Form.Group controlId="kindOfStand">
                            <div className="content-option-pay-dcto payments open">
                                <div className="options-pay-dcto payments">
                                    <div className="tag-hw-new payments">Nuevo</div>
                                    <div className="content-radio-btn">
                                        <Form.Check
                                            className="radio-dcto payments"
                                            value="pse"
                                            type="radio"
                                            aria-label="radio 1"
                                            label=""
                                            onChange={handleChange}
                                            checked={kindOfStand === 'pse'}
                                        />
                                    </div>
                                    <div className="content-desc-card">
                                        <img
                                            src={IconPsePNG}
                                            alt=""
                                            className="return-img logo-pse"
                                        />
                                        <div>
                                            <p className="pay-card-title">Débito Bancario PSE</p>
                                            <p className="pay-card-text">PSE - ACH</p>
                                        </div>
                                    </div>
                                </div>
                                {balanceFAI < total ? (
                                    <div className="options-pay-dcto payments invalid-pay">
                                        <div className="content-radio-btn"></div>
                                        <div className="content-desc-card fai">
                                            <img
                                                src={IconPayFaiSVG}
                                                alt=""
                                                className="return-img"
                                            />
                                            <div>
                                                <p className="pay-card-title">Cuenta FAI</p>
                                                <p className="pay-card-text">
                                                    Saldo: $ {formatValue(balanceFAI, 1)}
                                                    <sup className="sub-indice">
                                                        {formatDecimalValue(balanceFAI, 1)}
                                                    </sup>
                                                </p>
                                                <div className="alert-not-money">
                                                    <img
                                                        src={IconAlertSVG}
                                                        alt=""
                                                        className="return-img"
                                                    />
                                                    <p className="mora">Saldo insuficiente</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="options-pay-dcto payments">
                                        <div className="content-radio-btn">
                                            <Form.Check
                                                className="radio-dcto payments"
                                                value="fai"
                                                type="radio"
                                                aria-label="radio 2"
                                                label=""
                                                onChange={handleChange}
                                                checked={kindOfStand === 'fai'}
                                            />
                                        </div>
                                        <div className="content-desc-card fai">
                                            <img
                                                src={IconPayFaiSVG}
                                                alt=""
                                                className="return-img"
                                            />
                                            <div>
                                                <p className="pay-card-title">Cuenta FAI</p>
                                                <p className="pay-card-text">
                                                    Saldo: $ {formatValue(balanceFAI, 1)}
                                                    <sup className="sub-indice">
                                                        {formatDecimalValue(balanceFAI, 1)}
                                                    </sup>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="options-pay-dcto payments">
                                    <div className="tag-hw-new payments">Nuevo</div>
                                    <div className="content-radio-btn">
                                        <Form.Check
                                            className="radio-dcto payments"
                                            value="multipay"
                                            type="radio"
                                            aria-label="radio 3"
                                            label=""
                                            onChange={handleChange}
                                            checked={kindOfStand === 'multipay'}
                                        />
                                    </div>
                                    <div className="content-desc-card">
                                        <img
                                            src={IconMultiPNG}
                                            alt=""
                                            className="return-img logo-pse"
                                        />
                                        <div>
                                            <p className="pay-card-title">Multipagos</p>
                                            <p className="pay-card-text">PSE + FAI</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form.Group>
                        <div className="content-btn-form payments-step2 content-btn-align-standar content-btn-fdcto">
                            {isDisabled ? (
                                <Button
                                    className="btn-form btn-global"
                                    disabled
                                    variant="primary"
                                    type="submit"
                                >
                                    Pagar TDC
                                </Button>
                            ) : (
                                <Button
                                    className="btn-form btn-global"
                                    variant="primary"
                                    type="submit"
                                >
                                    Pagar TDC
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    keyboard={false}
                    className="modal-contact-footer modal-center"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <div className="content-video-login">
                            <img src={GraphSVG} alt="" className="return-img" />
                        </div>
                        <p className="title-modal-login">Estás a punto de abrir un TDC</p>
                        <p className="text-modal-login">
                            Tu TDC será constituido al efectuar el pago por un valor de <br></br>
                            {formatValue(cdtValue, 1)}
                            <sup className="sub-indice">{formatDecimalValue(cdtValue, 1)}</sup>
                            <br></br>
                            <br></br>Te recomendamos validar que tienes los fondos suficientes antes
                            de continuar.
                        </p>
                        <div className="content-btndouble-modal">
                            <Button
                                className="btn-modal-detail modal-btn-secundary"
                                variant="primary"
                                onClick={cancelOpenning}
                            >
                                Cancelar
                            </Button>
                            <Button
                                className="btn-modal-detail modal-btn"
                                variant="primary"
                                onClick={lastStep}
                            >
                                Continuar
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal
                    show={showTerm}
                    onHide={handleCloseTerm}
                    keyboard={false}
                    className="modal-contact-footer modal-center modal-term"
                    aria-labelledby="contained-modal-title-vcenter"
                >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <p className="title-modal-login">
                            CONDICIONES GENERALES PARA EL CERTIFICADO DE AHORRO A TERMINO CAVIPETROL
                            – TDC DESMATERIALIZADO APERTURA{' '}
                        </p>
                        <p className="text-modal-login term">
                            El Certificado de Depósito de Ahorro a Término Cavipetrol - TDC o TDC es
                            un documento que acredita la existencia de un contrato de depósito de
                            dinero suscrito entre el Asociado y Cavipetrol, cuyo objeto es la
                            administración de los recursos depositados por los Asociados en el
                            Fondo, con el compromiso de que, vencido el plazo fijado entre las
                            partes, el Fondo devolverá estos recursos depositados junto con los
                            rendimientos causados a la tasa pactada, si es el caso.
                            <br></br>
                            El TDC se pacta de acuerdo con los plazos establecidos por Cavipetrol
                            para el mencionado producto, los cuales son consultados y aceptados por
                            el depositante al momento de la constitución del TDC.
                            <br></br>
                            Las tasas serán las que Cavipetrol tenga establecidas en el momento de
                            la constitución para cada uno de los plazos.
                            <br></br>
                            Cavipetrol expedirá un documento llamado “certificado”, como prueba de
                            la apertura del depósito, el cual no tiene la calidad de título valor,
                            pero enunciará las condiciones de tasa y plazo para el depósito
                            respectivo. Los ȚDC sólo podrán ser constituidos por vinculados a
                            Cavipetrol y a su favor.
                            <br></br>
                            El TDC es intransferible y NO NEGOCIABLE ni siquiera mediante cesión.
                            Cualquier violación de la presente condición conllevará la terminación
                            inmediata del contrato de deposito.
                            <br></br>
                            EL TDC sólo podrá ser redimido al vencimiento del plazo inicialmente
                            pactado, o de su renovación convenida o automática, y únicamente por el
                            titular o quien represente sus derechos
                            <br></br>
                            Para la devolución del TDC, el titular debe presentar a Cavipetrol el
                            certificado que le haya sido expedido en el momento de la constitución
                            (este puede ser consultado y descargado en la página transaccional de
                            Cavipetrol).
                            <br></br>
                            El TDC se renovará automáticamente en las mismas condiciones de plazo
                            pactadas inicialmente (90, 180 o 360 días) y la tasa de interés será la
                            vigente en el momento de prórroga.
                            <br></br>
                            El titular del TDC deberá escoger al momento de la constitución como
                            serán pagados los rendimientos, para lo cual, existirán las siguientes
                            modalidades:
                            <ul>
                                <li>Mensual</li>
                                <li>Bimensual</li>
                                <li>Trimestral</li>
                                <li>Semestral</li>
                                <li>Anual</li>
                            </ul>
                            <br></br>
                            Para la redención o liquidación del TDC se tiene como plazo máximo cinco
                            5 días hábiles siguientes al vencimiento del plazo inicialmente pactado
                            o de la renovación automática o convenida
                            <br></br>
                            Para cancelar el TDC sin sanción en la tasa de interés, esto es, al
                            finalizar el plazo por el cual fue constituido o de la renovación
                            acordada o automática, Cavipetrol pondrá a disposición del titular sus
                            oficinas, la generación de la liquidación del contrato e informará las
                            condiciones de este. En caso de que, el giro de los saldos a favor se
                            genere en cheque, por ningún motivo se generarán intereses desde la
                            fecha de giro del cheque de cancelación.
                            <br></br>
                            Los TDC son irredimibles antes del vencimiento del plazo por el cual
                            fueron constituidos. Sin embargo, en casos excepcionales puede aceptarse
                            por parte de CAVIPETROL una redención anticipada, tomando como base el
                            plazo transcurrido desde la constitución o renovación del TDC, y la tasa
                            de interés especial y especifica que se negocie para la redención
                            anticipada, según las políticas de CAVIPETROL.
                            <br></br>
                            En caso de fallecimiento del titular del TDC, estos valores le serán
                            entregados a quien legalmente acredite el derecho a recibir dichos
                            recursos de conformidad con la legislación vigente, en caso de que el
                            sustituto realice el proceso de continuidad para seguir como asociada de
                            Cavipetrol, el TDC quedarán asignados a este.
                            <br></br>
                            En caso de pérdida de la calidad como asociado, el TDC se cancelará
                            automáticamente una vez quede radicada la solicitud de desvinculación de
                            Cavipetrol o se materialice la causa por la cual se produce la pérdida
                            de la calidad de asociado.
                            <br></br>
                            Al realizar la apertura y constitución del TDC a través de la página
                            transaccional de Cavipetrol (www.cavipetrol.com), el asociado ha
                            aceptado expresa e irrevocablemente que conoce, entiende y está de
                            acuerdo con las presentes condiciones, lo cual ha quedado establecido
                            como condición expresa para la constitución del TDC.
                            <br></br>
                            La retención en la fuente se realizará al momento de efectuar el pago de
                            los rendimientos o su abono en cuenta y/o al momento de la cancelación
                            del TDC.
                            <br></br>
                            Aplicarán las demás Condiciones establecidas en el Reglamento General de
                            Captaciones de Cavipetrol, las cuales pueden ser consultadas
                            <a href="https://transacciones.cavipetrol.com/Portals/_DwPortal/documents/default/TAC03%20REGLAMENTO%20GENERAL%20DE%20CAPTACIONES%20V1.pdf">
                                &nbsp;aqui
                            </a>
                            <br></br>
                        </p>
                        <div className="content-btndouble-modal">
                            <Button
                                className="btn-modal-detail modal-btn-secundary"
                                variant="primary"
                                onClick={cancelOpenning}
                            >
                                Cancelar
                            </Button>
                            <Button
                                className="btn-modal-detail modal-btn"
                                variant="primary"
                                onClick={() => setShowTerm(false)}
                            >
                                Continuar
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}
export default ProductOpening
