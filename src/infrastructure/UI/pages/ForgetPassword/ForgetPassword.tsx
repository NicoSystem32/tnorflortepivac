import { useHistory, Link } from 'react-router-dom'
import { useSelector, messagesSelector } from '../../../selectors'

// Bootstrap
import { Modal, Form } from 'react-bootstrap'

// components
import { BreadcrumbApp, Button } from '../../components/includes'
import ValidateDocument from './inc/ValidateDocument'
import SelectOptionSend from './inc/SelectOptionSend'
import ValidateCode from './inc/ValidateCode'
import NewPassword from './inc/NewPassword'

// custom hooks
import { useReducerState } from './hooks'

// Images
import {
    PointsPNG,
    PointsSVG,
    ElipsePNG,
    ElipseDeskPNG,
    SemiCirclePNG,
    UserPhonePNG,
    SemiCircleSVG,
    ForgetPasswordPNG,
} from '../../utils/getImages'

// Icons
import { ArrowSVG, ReadySVG } from '../../utils/getIcons'

// Styles
import './forgetPassword.scss'

const ForgetPassword = (): JSX.Element => {
    const history = useHistory()
    const dispatchStep = useReducerState()[1]
    const [step] = useReducerState()
    const [{ showFinish, returnScreen }] = useReducerState()
    const messages = useSelector(messagesSelector)

    const callToServiceComingSoon = (): void => {
        dispatchStep({
            type: 'FINISHED',
            payload: {
                showFinish: false,
            },
        })
        history.push('/login')
    }

    const prevStep = (): void => {
        dispatchStep({
            type: 'GO_TO_STEP',
            payload: {
                step: step.currentStep - 1,
            },
        })
    }

    return (
        <div className="content-global-login">
            <img
                src={PointsPNG}
                alt="Servicio al asociado"
                srcSet={PointsSVG}
                className="points-img-top"
            />
            <div className="content-global-init">
                <Form id="form-recovery" className="form-forg-pass Step1">
                    <img src={ForgetPasswordPNG} alt="forget password" className="form-img-fp" />
                    <div className="content-breadcrumb-forget">
                        {returnScreen ? (
                            <BreadcrumbApp
                                breadcrumbs={[
                                    {
                                        text: 'Volver',
                                        active: false,
                                    },
                                ]}
                                onBack={() =>
                                    step.currentStep === 1 ? history.push('/login') : prevStep()
                                }
                            />
                        ) : (
                            <div className="empty-breadcrumbs"></div>
                        )}
                    </div>
                    {
                        {
                            1: <ValidateDocument />,
                            2: <SelectOptionSend />,
                            3: <ValidateCode />,
                            4: <NewPassword />,
                        }[step.currentStep]
                    }
                </Form>
            </div>
            <img src={ElipsePNG} alt="" className="elipse-img-top" />
            <img src={ElipseDeskPNG} alt="" className="elipse-img-desk" />
            <div className="pre-footer">
                <p className="title-pre-footer only-desk">
                    {messages.find((m) => m.name === 'popupContactoServicioCliente')?.title}
                </p>
                <p className="text-pre-footer only-desk">
                    {messages.find((m) => m.name === 'popupContactoServicioCliente')?.text}
                </p>
                <p className="title-pre-footer only-mob">
                    {messages.find((m) => m.name === 'popupContactoServicioClienteMobile')?.title}
                </p>
                <p className="text-pre-footer only-mob">
                    {messages.find((m) => m.name === 'popupContactoServicioClienteMobile')?.text}
                </p>
                <div id="content-customer-service" className="customer-pre-footer">
                    <img src={ArrowSVG} alt="" />
                    <Link to="/support">
                        {messages.find((m) => m.name === 'tituloServicioAsociado')?.text}
                    </Link>
                </div>
                <img
                    src={SemiCirclePNG}
                    srcSet={SemiCircleSVG}
                    alt=""
                    className="left-pre-footer"
                />
                <img src={UserPhonePNG} alt="" className="right-pre-footer" />
            </div>

            <Modal
                show={showFinish}
                onHide={callToServiceComingSoon}
                backdrop="static"
                keyboard={false}
                className="modal-contact-footer"
                centered
            >
                <Modal.Body>
                    <div className="content-video-login">
                        <img src={ReadySVG} alt="inactive clock" className="img-options-uer" />
                    </div>
                    <p className="title-modal-login">Todo listo</p>
                    <p className="text-modal-login space-normal">
                        Tu contraseña ha sido modificada con éxito
                    </p>
                    <div className="content-btn-recovery">
                        <Button
                            className="size-full"
                            variant="sub-dominant"
                            onClick={callToServiceComingSoon}
                        >
                            Continuar
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default ForgetPassword
