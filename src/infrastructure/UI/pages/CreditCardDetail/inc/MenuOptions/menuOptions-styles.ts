import tw, { styled } from 'twin.macro'
import { Dropdown as DropdownBt } from 'react-bootstrap'

export const MenuOptionsContainer = styled.div`
    ${tw`lg:hidden fixed bottom-0 left-0 bg-white w-[100vw] h-[60px] flex items-center px-2`}
    ${tw`box-shadow[0px -3px 4px #00000029] rounded-t-[10px]`}
`

export const OptionsContainer = styled.div`
    ${tw`w-full h-[38px] flex flex-row gap-2 justify-between my-0`}
`

export const Dropdown = styled(DropdownBt)`
    ${tw`w-full h-full`}
    .btn-primary.dropdown-toggle {
        ${tw`color[white] bg-white border-none`}
    }
    .dropdown-toggle::after {
        content: none;
    }
    .btn-primary {
        ${tw`color[white] bg-white border-none p-0 w-full h-full`}
        & > div {
            ${tw`flex flex-col gap-1 justify-between items-center h-full`}
            & > h3 {
                ${tw`w-[90%] m-0 font-helvetica font-normal text-[10px] leading-none color[var(--header-botton-color)] text-center`}
            }
        }
    }
    .btn-primary.dropdown-toggle:focus {
        ${tw`shadow-none`}
    }
    .dropdown-menu {
        ${tw`box-shadow[0px 1px 4px 2px #00000029] rounded-[10px] border-none px-1.5 `}/* transform: translate3d(0px, -50px, 0px) !important; */
    }
    .dropdown-item {
        ${tw`text-center`}
    }
`

interface OptionsProps {
    isDisable?: boolean
}

export const OptionButton = styled.div<OptionsProps>`
    ${tw`w-[25%]  flex flex-col gap-1 items-center justify-between border-0 border-r-2 border-solid border-[#00000029]`}
    &:last-child {
        ${tw`border-r-0`}
    }
    & > div {
        opacity: ${(props) => (!props.isDisable ? 1 : 0.4)};
        ${tw`flex items-center justify-center`}
        .small {
            ${tw`w-[12px]`}
        }
        .normal {
            ${tw`w-[18px]`}
        }
    }
    & > h3 {
        opacity: ${(props) => (!props.isDisable ? 1 : 0.4)};
        ${tw`w-[90%] m-0 font-helvetica font-normal text-[10px] leading-none color[var(--header-botton-color)] text-center`}
    }
`
