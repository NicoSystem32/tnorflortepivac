import tw, { styled } from 'twin.macro'

export const DetailMovementContent = styled.section`
    ${tw`hidden`}
    ${tw`md:block md:my-12 md:p-5 md:min-h-[300px] md:box-shadow[0px 3px 6px #00000029] md:rounded-[10px]`}
`

export const Options = styled.nav`
    ${tw`md:flex md:justify-between md:items-center mb-1`}
`

interface OptionsProps {
    isActive?: boolean
}

export const Option = styled.div<OptionsProps>`
    ${tw`md:w-[48%] md:h-15 md:flex md:justify-center md:items-center cursor-pointer`}
    border-bottom:  ${(props) =>
        props.isActive ? '4px solid var(--dominant-color-dark)' : '4px solid #D7D8D9'};
`

export const OptionText = styled.h3<OptionsProps>`
    ${tw`m-0 font-montserrat font-normal text-base`}

    font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
`
