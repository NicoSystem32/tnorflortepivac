import tw, { styled } from 'twin.macro'

export const TableContainer = styled.table`
    ${tw`w-full h-16`}
`

export const THead = styled.thead`
    ${tw`border-b border-solid border-[#00000029] w-full`}

    & tr {
        ${tw`h-16`}

        & th {
            & h4 {
                ${tw`m-0 font-helvetica font-normal text-base text-gray-custom-500`}
            }
        }
    }
`

export const TBody = styled.tbody`
    ${tw`w-full`}

    & tr {
        ${tw`h-[72px] border-b border-solid border-[#00000029]`}

        & td {
            &:first-child {
                & p {
                    ${tw`font-normal font-helvetica py-1`}
                }
                & span {
                    ${tw`font-bold font-montserrat py-1`}
                }
            }
            & p {
                ${tw`m-0 font-montserrat font-bold text-base text-gray-custom-500`}
            }
        }
    }
`
interface TBodyProps {
    isDanger: boolean
}

export const ValueMovement = styled.span<TBodyProps>`
    ${tw`font-bold font-montserrat py-1`}
    color: ${(props) => (props.isDanger ? '#FB2F3D' : '#55B948')};

    & sup {
        ${tw`font-montserrat font-bold top-[-0.2rem] left-[0rem]`}
    }
`

export const PaginatorContainer = styled.div`
    ${tw`flex justify-center items-center my-2.5 py-2.5`}
`
