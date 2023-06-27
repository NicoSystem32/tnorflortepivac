import React from 'react'
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'
import HeaderInit from '../infrastructure/UI/transverse/Header/HeaderInit'

describe('Pruebas en <HeaderInit />', () => {
    const wrapper = shallow(<HeaderInit />)

    test('debe de mostrar <HeaderInit /> correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('el logo debe redirigir correctamente', () => {
        expect(wrapper.find('#logo').prop('href')).toBe('/login')
    })

    test('boton de soporte debe redirigir correctamente', () => {
        expect(wrapper.find('#support-hd').prop('href')).toBe('/support')
    })

    test('boton de olvido de contraseña debe redirigir correctamente', () => {
        expect(wrapper.find('#forget-password-hd').prop('href')).toBe('/forget-password')
    })

    test('boton chatear debe redirigir correctamente', () => {
        expect(wrapper.find('#unlocked-user-hd').prop('href')).toBe(
            'https://transacciones.cavipetrol.com/DwPortalApp/Cavionline/UI/Web/bloqueado_m.aspx?tabID=417&mID=3411'
        )
    })

    test('boton chatear debe redirigir correctamente', () => {
        expect(wrapper.find('#new-user-hd').prop('href')).toBe(
            'https://transacciones.cavipetrol.com/DwPortalApp/Cavionline/UI/Web/x_crea0_m.aspx?tabID=417&mID=3411'
        )
    })
})
