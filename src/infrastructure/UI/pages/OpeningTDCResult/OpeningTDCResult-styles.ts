import tw, { styled } from 'twin.macro'
import { Button } from '../../components'

export const TDCResultContainer = styled.div`
    ${tw`m-0 mt-20 px-0 py-5 lg:flex justify-center min-h-[50vh]`}
`

export const OptionsShare = styled.div`
    ${tw`flex flex-row justify-between items-center px-0 py-2 lg:hidden`}
    ${tw``}

    & div {
        ${tw`flex flex-row items-center justify-start gap-2.5`}

        & img {
            ${tw`w-5.5`}
        }

        & p {
            ${tw`m-0 font-montserrat font-medium text-base`}
        }
    }
`

export const DetailHead = styled.div`
    ${tw``}
    & div {
        ${tw`flex flex-row items-center justify-start gap-5`}
        & img {
            ${tw`w-12`}
        }

        & div {
            ${tw`block`}
            & p {
                ${tw`hidden lg:block font-medium font-helvetica text-base m-0`}
            }
        }
    }

    & p {
        ${tw`lg:hidden block font-medium font-helvetica text-base m-0 mt-4`}
    }
`
export const TitleHead = styled.div`
    ${tw`text-lg font-montserrat font-black color[var(----text-opacity10)] m-0 lg:text-2xl`}
    & span {
        ${tw`color[var(--dominant-color-dark)]`}
    }
`
export const DetailBody = styled.div`
    ${tw`flex flex-col gap-3 mt-2.5`}

    ${tw`border-0 border-b border-solid border-[#00000029] pb-5`}
    &:last-child {
        ${tw`border-0 pb-0`}
    }

    & p {
        ${tw`text-base font-helvetica font-medium color[var(--dominant-color-dark)] m-0 my-2.5`}
    }

    & div {
        ${tw`flex lg:flex-row flex-col gap-2.5`}
        & div {
            ${tw`block m-0 mb-6 lg:min-w-[24%] lg:mb-0`}
            & h3 {
                ${tw`text-[15px] font-helvetica font-normal color[var(--text-opacity5)] mb-1`}
            }

            & p {
                ${tw`text-base font-montserrat font-medium color[var(--text-opacity9)] m-0`}
                sup {
                    ${tw`text-[0.7rem] top-[-0.2rem]`}
                }
            }
        }
    }

    & h4 {
        ${tw`font-helvetica font-normal text-sm color[var(----text-opacity10)] mt-2.5`}
    }
`
export const ButtonsShared = styled.div`
    ${tw`flex flex-row justify-around mt-4 mb-7`}
    a {
        ${tw`no-underline`}
    }
`
export const ButtonShared = styled(Button)`
    img {
        ${tw`w-[20px]`}
    }
    ${tw`flex flex-col items-center border-0 gap-1 h-auto`}

    & > p {
        ${tw`font-montserrat font-medium text-[12px] text-[var(--sub-dominant-color)] m-0`}
    }
`
