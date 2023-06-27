import { Table } from 'react-bootstrap'
import tw, { styled } from 'twin.macro'

export const TotalValue = styled.div`
    ${tw`grid grid-template-columns[15% 85%] grid-template-areas['textTotal valueTotal'] py-6 px-0 border-top[1px solid var(--text-opacity10)] items-center`}

    ${tw`lg:flex lg:w-[25%] lg:ml-auto lg:flex-col lg:items-start lg:border[none]`}

    p {
        ${tw`m-0`}
    }

    .title {
        ${tw`font-montserrat font-medium text-xl m-0 grid-area[textTotal]`}
        ${tw`lg:text-[16px] lg:ml-[15%]`}
    }

    .value {
        ${tw`font-montserrat font-bold text-xl text-[var(--dominant-color-dark)] text-right grid-area[valueTotal]`}
        ${tw`lg:text-[22px] lg:ml-[15%] lg:text-left`}

        sub {
            ${tw`top-[-0.35em] text-[.65em]`}
        }
    }
`
export const PaymentsTable = styled(Table)`
    tbody {
        ${tw`w-[100%]`}
    }
    td {
        ${tw`pt-4 bg-transparent box-shadow[none] border-bottom-width[0px] h-[100%]`}
    }

    tr {
        ${tw`p-2 bg-[var(--bs-table-bg)] shadow-[inset 0 0 0 9999px var(--bs-table-accent-bg)] border-bottom-width[1px]`}
    }

    .not-elements {
        ${tw`text-xl font-montserrat font-medium`}
    }

    .remove-item {
        ${tw`cursor-pointer`}
    }

    td:nth-child(1),
    td:nth-child(7) {
        ${tw`flex justify-center items-center h-[80px]`}
    }
    td:nth-child(6) {
        ${tw`lg:hidden`}
    }

    td:nth-child(2),
    td:nth-child(3),
    td:nth-child(4),
    td:nth-child(5) {
        ${tw`hidden lg:table-cell`}
    }
`

export const TitleTable = styled.p`
    ${tw`text-base font-montserrat font-bold w-[185] whitespace-nowrap text-overflow[ellipsis] overflow-hidden color[var(----text-opacity10)] m-0`}
    ${tw`lg:font-helvetica lg:font-medium lg:color[var(--dominant-color-dark)] m-0`}
`

export const TextTable = styled.p`
    ${tw`text-sm font-helvetica font-medium color[var(--text-opacity9)] m-0`}
    ${tw`lg:text-base lg:font-montserrat lg:font-semibold lg:color[var(----text-opacity10)] lg:m-0`}
`
export const ValueTableMob = styled.p`
    ${tw`text-base font-montserrat font-bold color[var(--dominant-color-dark)] m-0`}
`
