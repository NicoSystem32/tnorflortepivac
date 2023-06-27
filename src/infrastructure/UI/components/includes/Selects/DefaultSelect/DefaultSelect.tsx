import { ReactElement, FC } from 'react'
import { StylesConfig } from 'react-select'
import type { Props } from 'react-select'

import { StyledDefaultSelect } from './defaultSelect-styles'

export type DefaultSelectProps = Props

const DefaultSelect: FC<DefaultSelectProps> = ({
    options,
    isSearchable = true,
    defaultMenuIsOpen = true,
    onChange,
}): ReactElement => {
    const customStyles: StylesConfig<unknown> = {
        indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
        indicatorsContainer: (styles) => ({ ...styles, display: 'none' }),
    }

    return (
        <StyledDefaultSelect
            options={options}
            isSearchable={isSearchable}
            defaultMenuIsOpen={defaultMenuIsOpen}
            classNamePrefix="select"
            styles={customStyles}
            placeholder="Busqueda"
            onChange={onChange}
        />
    )
}

export default DefaultSelect
