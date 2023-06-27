import createSelector from '../createSelector'
import type { StoreApp } from '../../redux/store/store.interface'

export const messagesSelector = createSelector(
    (state: StoreApp) => state.manageContentReducer,
    (manage) => manage.messages
)

export const loginMessagesSelector = createSelector(
    (state: StoreApp) => state.manageContentReducer.messages,
    (messages) =>
        messages.filter((msg) =>
            ['popupLoginValidado', 'tituloServicioAsociado', 'comunicateServicioAsociado'].includes(
                msg.name
            )
        )
)

export const contactMessagesSelector = createSelector(
    (state: StoreApp) => state.manageContentReducer.messages,
    (messages) =>
        messages.filter((msg) =>
            [
                'telefonoBarrancabermeja',
                'telefonoBogota',
                'telefonoBucaramanga',
                'telefonoCali',
                'telefonoCartagena',
                'telefonoCucuta',
                'telefonoMedellin',
                'telefonoNeiva',
                'telefonoVillavicencio',
                'telefonoYopal',
                'telefonoOrito',
                'telefonoRestoPais',
                'chateaConNosotros',
                'escribenosWhatsapp',
                'envianosCorreo',
            ].includes(msg.name)
        )
)
