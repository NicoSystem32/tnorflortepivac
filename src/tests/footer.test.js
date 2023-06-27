import React from 'react'
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'
import FooterInit from '../infrastructure/UI/transverse/Footer/FooterInit'

describe('Pruebas en <FooterInit />', () => {
    const wrapper = shallow(<FooterInit />)

    test('debe de mostrar <FooterInit /> correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('boton de red social instagram debe redirigir correctamente', () => {
        expect(wrapper.find('#instagram-ft').prop('href')).toBe(
            'https://www.instagram.com/cavipetrol_oficial/'
        )
    })
    test('boton de red social facebook debe redirigir correctamente', () => {
        expect(wrapper.find('#facebook-ft').prop('href')).toBe(
            'https://www.facebook.com/Cavipetrol'
        )
    })
    test('boton de red social twitter debe redirigir correctamente', () => {
        expect(wrapper.find('#twitter-ft').prop('href')).toBe('https://twitter.com/Cavipetrol')
    })

    test('boton de red social linkedin debe redirigir correctamente', () => {
        expect(wrapper.find('#linkedin-ft').prop('href')).toBe(
            'https://www.linkedin.com/company/fondo-de-empleados-cavipetrol/'
        )
    })
})
