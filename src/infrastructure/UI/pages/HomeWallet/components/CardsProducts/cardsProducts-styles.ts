import { Dropdown as DropdownBt } from 'react-bootstrap'
import tw, { styled } from 'twin.macro'
import { ButtonCTF as ButtonCTFOr } from '../../../CreditGroup/inc/Contributions/contributions-styles'

export const CardsProductsContent = styled.div`
    ${tw`lg:w-[360px] min-h-[250px] w-full`}
    & > p {
        ${tw`font-montserrat font-normal text-base`}
    }
`
export const Dropdown = styled(DropdownBt)`
    .btn-primary.dropdown-toggle {
        ${tw`color[white] bg-white border-none`}
    }
    .dropdown-toggle::after {
        content: none;
    }
    .btn-primary {
        ${tw`color[white] bg-white border-none`}
    }
    .btn-primary.dropdown-toggle:focus {
        ${tw`shadow-none`}
    }
    .dropdown-menu {
        ${tw`box-shadow[0px 2px 4px 2px #00000029] rounded-[10px] border-none px-1.5`}
    }
`
export const CardHeader = styled.div`
    ${tw`flex flex-row justify-between mb-3`}
    & > div:first-child {
        ${tw`flex flex-row lg:gap-5 gap-4 w-[calc(100% - 108px);]`}
        & > img {
            ${tw`w-[42px]`}
        }
        & > div {
            ${tw`w-full`}
            & > h3 {
                ${tw`w-full font-montserrat font-bold text-lg text-black m-0 leading-5 mb-1.5 overflow-hidden whitespace-nowrap text-overflow[ellipsis]`}
            }
            & > h4 {
                ${tw`w-full font-helvetica font-medium text-base text-black m-0 overflow-hidden whitespace-nowrap text-overflow[ellipsis]`}
            }
        }
    }
`

export const CreditCardContainer = styled.div`
    ${tw`flex flex-col justify-between box-shadow[0px 3px 6px #00000029] rounded-[10px] relative w-auto min-h-[225px]`}
    & > div:first-child {
        ${tw`p-[20px] pb-[0] pr-0`}
    }

    .dots-menu {
        ${tw`w-6 opacity-50`}
    }
    .value {
        ${tw`m-0 text-xl text-black font-montserrat font-normal`}
    }
    .subtitle {
        ${tw`m-0 text-black font-helvetica font-normal text-[14px] mb-2`}
    }
    /* .link-section {
        ${tw`pr-[20px]`}
    } */

    .link-btn {
        ${tw`p-0 pt-3 pb-3 flex justify-center items-center cursor-pointer text-center text-[16px] text-black font-montserrat font-normal text-decoration[none]`}
        border-top: 1px solid #e6e7e8;
    }
`
export const ButtonCTF = styled(ButtonCTFOr)`
    ${tw`relative`}
`
