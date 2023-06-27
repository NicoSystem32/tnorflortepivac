import React from 'react'
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'
import Support from '../infrastructure/UI/components/Support/Support'

describe('Pruebas en <Support />', () => {
    const wrapper = shallow(<Support />)

    test('debe de mostrar <Support /> correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('boton chatear debe redirigir correctamente', () => {
        expect(wrapper.find('#support-chat').prop('href')).toBe(
            'https://cavipetrol-level3col.nubitalk.com/ClickToInteract/chat.aspx?onecontactInstance=cavipetrol-level3col&motive=CHAT%20%E2%80%93%20BOT'
        )
    })

    test('boton whatsApp debe redirigir correctamente', () => {
        expect(wrapper.find('#support-whatsapp').prop('href')).toBe(
            'https://api.whatsapp.com/send?phone=573219109204'
        )
    })

    test('boton email debe redirigir correctamente', () => {
        expect(wrapper.find('#support-email').prop('href')).toBe(
            'mailto:servicio.cliente@cavipetrol.com'
        )
    })
})
