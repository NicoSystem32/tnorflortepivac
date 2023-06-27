import React from 'react'
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'
import LoginFailed from '../infrastructure/UI/components/LoginFailed/loginFailed'

describe('Pruebas en <LoginFailed />', () => {
    const wrapper = shallow(<LoginFailed />)

    test('debe de mostrar <LoginFailed /> correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('boton chatear debe redirigir correctamente', () => {
        expect(wrapper.find('#support-lf').prop('href')).toBe('/support')
    })
})
