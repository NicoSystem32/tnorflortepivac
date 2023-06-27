import tw, { styled } from 'twin.macro'
import { Form } from '../../../../components'

export const StyledLoginForm = styled(Form)`
    ${tw`relative w-[100%] mt-[1.563rem] pb-8 z-index[1] bg-white`}
    box-shadow: 0px 3px 6px ${({ theme }) => theme.colors['dark-custom'][300]};

    & .img-top {
        ${tw`absolute left-[2%] top-[-30px]`}
        content: ${({ theme }) => theme.images['form-login']};
    }

    @media (min-width: 570px) and (max-width: 1180px) {
        ${tw`w-[75%]`};
        & .img-top {
            ${tw`left-[-30px]`};
        }
    }

    @media (min-width: 1180px) and (max-width: 1400px) {
        ${tw`w-[425px]`};
        & .img-top {
            ${tw`left-[-30px]`};
        }
    }

    @media (min-width: 1400px) {
        ${tw`w-[425px]`};
        & .img-top {
            ${tw`left-[-30px]`};
        }
    }
`

export const FormHeader = styled.div`
    ${tw`pt-[53px] pl-[5%]`}

    & span {
        ${tw`flex text-dominant font-semibold text-[18px] text-decoration[none]`}

        & p {
            ${tw`!ml-[5px] text-black font-semibold text-[18px]`}
        }
    }

    & p {
        ${tw`m-0 text-black font-semibold text-[18px]`}
    }

    & span:hover {
        ${tw`!text-dominant`}
    }

    @media (max-width: 321px) {
        & span {
            & p {
                ${tw`!whitespace-normal`}
            }
        }
    }
`

export const ButtonContent = styled.div`
    ${tw`mx-auto mt-15  w-[90%]`}

    &.default {
        ${tw`block`}
    }

    @media (min-width: 571px) {
        ${tw`block w-52`}

        &.default {
            ${tw`hidden`}
        }
    }

    @media (min-width: 1180px) {
        ${tw`w-52`}
    }
`
