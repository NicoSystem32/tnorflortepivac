import React from 'react'
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'
import InternalServerError from '../infrastructure/UI/components/InternalServerError/internalServerError'

describe('Pruebas en <InternalServerError />', () => {
    const wrapper = shallow(<InternalServerError />)

    test('debe de mostrar <InternalServerError /> correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
