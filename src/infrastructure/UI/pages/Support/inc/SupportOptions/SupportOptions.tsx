import { useSelector, contactMessagesSelector } from '../../../../../selectors'

// styled components
import { OptionsSupportContent, OptionSupport } from './supportOptions-styles'

// icons
import { MessageSupportSVG, WhatsappSVG, EmailSupportSVG } from '../../../../utils/getIcons'

const SupportOptions = (): React.ReactElement => {
    const messages = useSelector(contactMessagesSelector)

    return (
        <OptionsSupportContent>
            <OptionSupport
                id="support-chat"
                href="https://cavipetrol-level3col.nubitalk.com/ClickToInteract/chat.aspx?onecontactInstance=cavipetrol-level3col&motive=CHAT%20%E2%80%93%20BOT"
                target="_blank"
                rel="noreferrer"
            >
                <img
                    src={MessageSupportSVG}
                    alt="Servicio al asociado"
                    className="support-img chat"
                />
                <p className="text-support">
                    <strong>{messages.find((m) => m.name === 'chateaConNosotros')?.title} </strong>
                    {messages.find((m) => m.name === 'chateaConNosotros')?.text}
                </p>
            </OptionSupport>
            <OptionSupport
                id="support-whatsapp"
                href="https://api.whatsapp.com/send?phone=573219109204"
                target="_blank"
                rel="noreferrer"
            >
                <img src={WhatsappSVG} className="support-img whatsapp" alt="Whatsapp" />
                <p className="text-support">
                    <strong>{messages.find((m) => m.name === 'escribenosWhatsapp')?.title} </strong>
                    {messages.find((m) => m.name === 'escribenosWhatsapp')?.text}
                </p>
            </OptionSupport>
            <OptionSupport
                id="support-email"
                href="mailto:servicio.cliente@cavipetrol.com"
                target="_blank"
                rel="noreferrer"
            >
                <img src={EmailSupportSVG} alt="email support" className="support-img email" />
                <p className="text-support">
                    <strong>{messages.find((m) => m.name === 'envianosCorreo')?.title} </strong>
                    {messages.find((m) => m.name === 'envianosCorreo')?.text}
                </p>
            </OptionSupport>
        </OptionsSupportContent>
    )
}

export default SupportOptions
