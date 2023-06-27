import tw, { styled } from 'twin.macro'

interface ButtonsContentProps {
    btnOneActive?: boolean
    btnTwoActive?: boolean
}

export const ButtonsContent = styled.section<ButtonsContentProps>`
    ${tw`flex flex-col`}
    ${tw`md:hidden`}

    & button {
        ${tw`my-2.5 mx-0 py-3 border[1px solid var(--sub-dominant-color)] !outline-none !box-shadow[none]`}
    }

    & button:first-child {
        background-color: ${(props) =>
            props.btnOneActive ? 'var(--sub-dominant-color) !important' : 'white !important'};
        color: ${(props) =>
            props.btnOneActive ? 'white !important' : 'var(--sub-dominant-color) !important'};
    }

    & button:last-child {
        background-color: ${(props) =>
            props.btnTwoActive ? 'var(--sub-dominant-color) !important' : 'white !important'};
        color: ${(props) =>
            props.btnTwoActive ? 'white !important' : 'var(--sub-dominant-color) !important'};
    }
`
