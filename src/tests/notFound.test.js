import React from 'react'
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'
import NotFound from '../infrastructure/UI/components/NotFound/notFound'

describe('Pruebas en <NotFound />', () => {
    const wrapper = shallow(<NotFound />)

    test('debe de mostrar <NotFound /> correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
