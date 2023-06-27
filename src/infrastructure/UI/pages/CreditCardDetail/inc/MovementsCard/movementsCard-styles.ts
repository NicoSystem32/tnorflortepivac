import tw, { styled } from 'twin.macro'
import { Form as FormBt, Table as TableBt } from 'react-bootstrap'
import {
    TableContainer as TableContainerOr,
    TBody as TBodyOr,
    THead as THeadOr,
} from '../../../../components/DetailMovements/inc/MovementTable/movementTable-styles'

export const MovementsCardContainer = styled.div`
    ${tw`w-full`}
    ${tw`lg:max-w-[670px] lg:box-shadow[0px 3px 6px #00000029] lg:rounded-[10px] px-0 py-[15px]`}
`

export const Form = styled(FormBt)``
export const FormSelect = styled(FormBt.Select)`
    ${tw`rounded-[10px] lg:w-[142px] w-1/2`}
    &:focus {
        ${tw`box-shadow[0px 0px #000000] border-[var(--text-opacity4)]`}
    }
`
export const MovementsHead = styled.div`
    ${tw`flex flex-row justify-between px-[20px] lg:gap-0 gap-[10px]`}

    & > h3 {
        ${tw`w-[290px] font-bold font-montserrat text-black text-sm m-0 lg:block hidden`}
    }
`

export const Table = styled(TableBt)``

export const TableContainer = styled(TableContainerOr)`
    ${tw`mt-5`}
    th,
    td {
        ${tw`px-[15px] py-[10px]`}
    }
`
export const TBody = styled(TBodyOr)`
    .head-month {
        ${tw`h-[40px]`}
        & > td {
            ${tw`bg-[var(--text-opacity1)]`}
            & > p {
                ${tw`color[var(--dominant-color-dark)] !font-medium`}
            }
        }
    }

    tr {
        ${tw`lg:h-[65px] min-h-[90px] border-t border-b-0 border-solid border-[#00000029]`}
        td {
            h5 {
                ${tw`font-helvetica font-medium text-xs m-0`}
            }
            h4 {
                ${tw`font-helvetica font-medium text-[13px] m-0`}
            }
            &:first-child {
                p {
                    ${tw`m-0 font-montserrat font-bold text-base p-0`}
                }
            }
        }
    }
`
export const THead = styled(THeadOr)`
    & tr {
        ${tw`border-t border-solid border-[#00000029] lg:table-row hidden`}
    }
`

export const ContentTable = styled.tr`
    ${tw`lg:table-row hidden`}
`
export const ContentTableMobile = styled.tr`
    ${tw`table-row lg:hidden`}
`

export const MessageBlock = styled.div`
    ${tw`p-3 flex flex-row gap-4 w-auto`}
    & > picture {
        ${tw`lg:w-[20%] w-[30%] flex justify-center items-center`}
        & > img {
            ${tw`w-[60px]`}
        }
    }
    & > div {
        ${tw`flex flex-col lg:gap-4 gap-2.5 lg:w-[80%] w-[70%]`}
        & > h2 {
            ${tw`font-medium font-montserrat lg:text-[14px] text-[16px] color[var(--text-opacity7)] m-0 text-center`}
        }
        & > h3 {
            ${tw`font-semibold font-montserrat lg:text-[18px] text-[16px] color[var(--text-opacity7)] m-0`}
        }
        & > p {
            ${tw`font-medium font-helvetica lg:text-[16px] text-[14px] color[var(--text-opacity8)] m-0`}

            & > a {
                ${tw`color[var(--sub-dominant-color)]`}
            }
        }
    }
`
export const MessageNotMovements = styled.h3`
    ${tw`font-medium font-montserrat lg:text-[14px] text-[16px] color[var(--text-opacity7)] m-0 text-center my-[5px]`}
`
