import tw, { styled } from 'twin.macro'
import { TitleHead } from '../../OpeningTDCResult-styles'

export const TitleHeadTDC = styled(TitleHead)`
    ${tw`hidden lg:block lg:mt-7.5`}
`

export const DetailContent = styled.div`
    ${tw`w-full rounded-[10px] lg:shadow-[0px 3px 6px var(--shadow-color)] lg:p-7.5 lg:pb-5 mb-7 lg:mt-5`}
    ${tw`shadow-none px-0 py-5`}
`

export const ProductContent = styled.div`
    ${tw`w-full rounded-[10px] shadow-[0px 3px 6px var(--shadow-color)] p-3.5 lg:p-7.5 lg:py-5`}
    ${tw`flex flex-col lg:flex-row items-start lg:items-center justify-start lg:gap-0 gap-4`}
`

export const ProductHead = styled.div`
    /* ${tw`lg:text-center`} */
    ${tw`lg:w-3/12 lg:pr-[10px]`}

    & p {
        ${tw`lg:block hidden text-[15px] font-helvetica font-normal color[var(--text-opacity5)] mb-2.5`}
    }

    & div {
        ${tw`flex flex-row items-center gap-1.5`}
        & img {
            ${tw`w-[47px]`}
        }

        & > p {
            ${tw`block text-lg font-montserrat font-medium color[var(--text-opacity9)] m-0`}
        }
        & > div {
            ${tw`flex flex-col gap-1 items-start`}
            & > p {
                ${tw`block text-lg font-montserrat font-medium color[var(--text-opacity9)] m-0`}
                &:last-child {
                    ${tw`text-sm`}
                }
            }
        }
    }
`
export const ProductDetail = styled.div`
    ${tw`lg:w-9/12`}
    ${tw`flex flex-wrap flex-col lg:flex-row w-full gap-6 lg:gap-9`}

    div {
        ${tw`lg:min-w-[28.5%]`}
        & > div {
            ${tw`flex flex-row items-center gap-2`}
            & > img {
                ${tw`w-[12px]`}
            }
            & > .success {
                ${tw`color[var(--approved-color-dark)]`}
            }
            & > .warning {
                ${tw`color[var(--dominant-color-dark)]`}
            }
        }
    }

    h3 {
        ${tw`text-[15px] font-helvetica font-normal color[var(--text-opacity5)] mb-1`}
    }
    p {
        ${tw`text-base font-montserrat font-medium color[var(--text-opacity9)] m-0`}
    }
    sup {
        ${tw`text-[0.7rem] top-[-0.2rem] font-montserrat font-medium color[var(--text-opacity9)]`}
    }
`

export const ButtonOptions = styled.div`
    ${tw`flex flex-col items-center gap-5 justify-between `}
    ${tw`lg:gap-0 lg:flex-row lg:p-7.5 mt-6 lg:mt-2`}

    & > div:first-child {
        ${tw`flex flex-row gap-5`}
        a {
            ${tw`no-underline`}
        }

        button {
            ${tw`font-montserrat font-normal text-base`}
            color: var(--sub-dominant-color) !important;
            ${tw`w-auto hidden lg:flex flex-row gap-2 items-center justify-center border[none]`}
        }
        & > button:first-child {
            ${tw`flex`}
        }

        img {
            ${tw`w-[20px]`}
        }
    }
    & > div:last-child {
        ${tw`flex flex-row gap-5 lg:w-auto w-full`}
    }
`

export const InformationProducts = styled.div`
    ${tw`flex flex-col gap-1.5`}
    & > h3 {
        ${tw`font-montserrat font-normal text-base color[var(--text-modal1)]`}
    }
    & > p {
        ${tw`font-helvetica font-medium text-sm text-black`}
        & > span {
            ${tw`font-bold`}
        }
    }
`
