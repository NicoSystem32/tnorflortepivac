import { useSelector, contactMessagesSelector } from '../../../../../selectors'

// styled components
import { ContactContent, TitleContactContent, ContactNumbersContent } from './contact-styles'

// icons
import { PhoneSVG } from '../../../../utils/getIcons'

const Contact = (): React.ReactElement => {
    const messages = useSelector(contactMessagesSelector)

    return (
        <ContactContent>
            <TitleContactContent>
                <img src={PhoneSVG} alt="Sucursal telefónica" className="support-img chat" />
                <p className="text-support">
                    <strong>Sucursal telefónica &nbsp;</strong>Cavipetrol
                </p>
            </TitleContactContent>

            <ContactNumbersContent className="sect1">
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoBarrancabermeja')?.title}
                </p>
                <p className="number">
                    {messages.find((m) => m.name === 'telefonoBarrancabermeja')?.text}
                </p>
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoCali')?.title}
                </p>
                <p className="number">{messages.find((m) => m.name === 'telefonoCali')?.text}</p>
            </ContactNumbersContent>
            <ContactNumbersContent className="sect2">
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoMedellin')?.title}
                </p>
                <p className="number">
                    {messages.find((m) => m.name === 'telefonoMedellin')?.text}
                </p>
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoYopal')?.title}
                </p>
                <p className="number">{messages.find((m) => m.name === 'telefonoYopal')?.text}</p>
            </ContactNumbersContent>
            <ContactNumbersContent className="sect3">
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoBogota')?.title}
                </p>
                <p className="number">{messages.find((m) => m.name === 'telefonoBogota')?.text}</p>
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoCartagena')?.title}
                </p>
                <p className="number">
                    {messages.find((m) => m.name === 'telefonoCartagena')?.text}
                </p>
            </ContactNumbersContent>
            <ContactNumbersContent className="sect4">
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoNeiva')?.title}
                </p>
                <p className="number">{messages.find((m) => m.name === 'telefonoNeiva')?.text}</p>
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoOrito')?.title}
                </p>
                <p className="number">{messages.find((m) => m.name === 'telefonoOrito')?.text}</p>
            </ContactNumbersContent>
            <ContactNumbersContent className="sect5">
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoBucaramanga')?.title}
                </p>
                <p className="number">
                    {messages.find((m) => m.name === 'telefonoBucaramanga')?.text}
                </p>
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoCucuta')?.title}
                </p>
                <p className="number">{messages.find((m) => m.name === 'telefonoCucuta')?.text}</p>
            </ContactNumbersContent>
            <ContactNumbersContent className="sect6">
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoVillavicencio')?.title}
                </p>
                <p className="number">
                    {messages.find((m) => m.name === 'telefonoVillavicencio')?.text}
                </p>
                <p className="title-number-special">
                    {messages.find((m) => m.name === 'telefonoRestoPais')?.title}
                </p>
                <p className="number">
                    {messages.find((m) => m.name === 'telefonoRestoPais')?.text}
                </p>
            </ContactNumbersContent>

            <ContactNumbersContent className="sect1-mobile">
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoBarrancabermeja')?.title}
                </p>
                <p className="number">
                    {messages.find((m) => m.name === 'telefonoBarrancabermeja')?.text}
                </p>
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoBucaramanga')?.title}
                </p>
                <p className="number">
                    {messages.find((m) => m.name === 'telefonoBucaramanga')?.text}
                </p>
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoCartagena')?.title}
                </p>
                <p className="number">
                    {messages.find((m) => m.name === 'telefonoCartagena')?.text}
                </p>
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoMedellin')?.title}
                </p>
                <p className="number">
                    {messages.find((m) => m.name === 'telefonoMedellin')?.text}
                </p>
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoVillavicencio')?.title}
                </p>
                <p className="number">
                    {messages.find((m) => m.name === 'telefonoVillavicencio')?.text}
                </p>
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoOrito')?.title}
                </p>
                <p className="number">{messages.find((m) => m.name === 'telefonoOrito')?.text}</p>
            </ContactNumbersContent>
            <ContactNumbersContent className="sect2-mobile">
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoBogota')?.title}
                </p>
                <p className="number">{messages.find((m) => m.name === 'telefonoBogota')?.text}</p>
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoCali')?.title}
                </p>
                <p className="number">{messages.find((m) => m.name === 'telefonoCali')?.text}</p>
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoCucuta')?.title}
                </p>
                <p className="number">{messages.find((m) => m.name === 'telefonoCucuta')?.text}</p>
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoNeiva')?.title}
                </p>
                <p className="number">{messages.find((m) => m.name === 'telefonoNeiva')?.text}</p>
                <p className="title-number">
                    {messages.find((m) => m.name === 'telefonoYopal')?.title}
                </p>
                <p className="number">{messages.find((m) => m.name === 'telefonoYopal')?.text}</p>
                <p className="title-number-special">
                    {messages.find((m) => m.name === 'telefonoRestoPais')?.title}
                </p>
                <p className="number">
                    {messages.find((m) => m.name === 'telefonoRestoPais')?.text}
                </p>
            </ContactNumbersContent>
        </ContactContent>
    )
}

export default Contact
