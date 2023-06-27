import React from 'react'
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'
import ProblemsUser from '../infrastructure/UI/components/ProblemsUser/problemsUser'

describe('Pruebas en <ProblemsUser />', () => {
    const wrapper = shallow(<ProblemsUser />)

    test('debe de mostrar <ProblemsUser /> correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('boton chatear debe redirigir correctamente', () => {
        expect(wrapper.find('#forget-password-pu').prop('href')).toBe('/forget-password')
    })

    test('boton chatear debe redirigir correctamente', () => {
        expect(wrapper.find('#locked-user-pu').prop('href')).toBe(
            'https://transacciones.cavipetrol.com/DwPortalApp/Cavionline/UI/Web/bloqueado_m.aspx?tabID=417&mID=3411'
        )
    })

    test('boton chatear debe redirigir correctamente', () => {
        expect(wrapper.find('#new-user-pu').prop('href')).toBe(
            'https://transacciones.cavipetrol.com/DwPortalApp/Cavionline/UI/Web/x_crea0_m.aspx?tabID=417&mID=3411'
        )
    })

    test('boton chatear debe redirigir correctamente', () => {
        expect(wrapper.find('#support-pu').prop('href')).toBe('/support')
    })
})
