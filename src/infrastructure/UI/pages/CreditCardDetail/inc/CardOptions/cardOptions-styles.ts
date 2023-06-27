import tw, { styled } from 'twin.macro'

export const CardOptionsContainer = styled.div`
    ${tw`lg:flex flex-row gap-2 justify-end hidden flex-wrap`}/* & > div {
        ${tw`flex flex-col items-center gap-1 w-[90px]`}
        & > div {
            ${tw`w-[45px] h-[45px] flex items-center justify-center bg-[var(--header-botton-color)] rounded-full`}
            .small {
                ${tw`w-[15px]`}
            }
            .normal {
                ${tw`w-[22px]`}
            }
        }
        & > h3 {
            ${tw`font-helvetica font-normal text-[14px] leading-none color[var(--header-botton-color)] text-center`}
        }
    }
    & > div:hover {
        ${tw`cursor-pointer`}
        & > div {
            ${tw`bg-[var(--sub-dominant-color)]`}
        }
        & > h3 {
            ${tw`color[var(--sub-dominant-color)]`}
        }
    } */
`

interface OptionsProps {
    isDisable?: boolean
}

export const OptionButton = styled.div<OptionsProps>`
    ${tw`flex flex-col items-center gap-1 w-[90px]`}
    & > div {
        ${tw`w-[45px] h-[45px] flex items-center justify-center bg-[var(--header-botton-color)] rounded-full`}
        background-color: ${(props) =>
            !props.isDisable ? 'var(--header-botton-color)' : 'var(--text-opacity4)'};
        .small {
            ${tw`w-[15px]`}
            opacity: ${(props) => (!props.isDisable ? 1 : 0.7)};
        }
        .normal {
            ${tw`w-[22px]`}
            opacity: ${(props) => (!props.isDisable ? 1 : 0.7)};
        }
    }
    & > h3 {
        ${tw`font-helvetica font-normal text-[14px] leading-none color[var(--header-botton-color)] text-center`}
        color: ${(props) =>
            !props.isDisable ? 'var(--header-botton-color)' : 'var(--text-opacity4)'};
    }
    &:hover {
        cursor: ${(props) => (!props.isDisable ? 'pointer' : 'auto')};
        /* ${tw`cursor-pointer`} */
        & > div {
            background-color: ${(props) =>
                !props.isDisable ? 'var(--sub-dominant-color)' : 'var(--text-opacity4)'};
            /* ${tw`bg-[var(--sub-dominant-color)]`} */
        }
        & > h3 {
            /* ${tw`color[var(--sub-dominant-color)]`} */
            color: ${(props) =>
                !props.isDisable ? 'var(--sub-dominant-color)' : 'var(--text-opacity4)'};
        }
    }
`
