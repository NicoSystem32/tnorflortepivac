import tw, { styled } from 'twin.macro'

export const LayoutContent = styled.div`
    ${tw`px-5 md:px-4 xl:px-0 mx-auto`}
    max-width: ${(props) => props.theme['content-max-width']};
`
