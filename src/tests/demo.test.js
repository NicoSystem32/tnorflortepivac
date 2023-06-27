import '@testing-library/jest-dom'
import { shallow } from 'enzyme'
import HeaderInit from '../infrastructure/UI/transverse/Header/HeaderInit'
import FooterInit from '../infrastructure/UI/transverse/Footer/FooterInit'

describe('Pruebas en <HeaderInit />', () => {
    test('debe de mostrar <HeaderInit /> correctamente', () => {
        const wrapper = shallow(<HeaderInit />)

        expect(wrapper).toMatchSnapshot()
    })
})

describe('Pruebas en <FooterInit />', () => {
    test('debe de mostrar <FooterInit /> correctamente', () => {
        const wrapper = shallow(<FooterInit />)

        expect(wrapper).toMatchSnapshot()
    })
})
