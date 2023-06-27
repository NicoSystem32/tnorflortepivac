import tw, { styled } from 'twin.macro'

export const BankCardCtr = styled.div`
    ${tw`border border-solid border-[#C6CCCE] p-2 lg:p-4  flex flex-col lg:flex-row lg:justify-between lg:items-center`}
    ${tw`border-l-2 border-l-[#425453] rounded-[10px]`}
`

export const BankCardRight = styled.div`
    ${tw`flex flex-row justify-between items-center mb-5 lg:mb-0`}
`

export const BankCardLeft = styled.div`
    ${tw`h-10 flex flex-row lg:justify-between lg:items-center lg:w-20 lg:border-none`}
    ${tw`border border-transparent border-t border-solid border-t-[#C6CCCE]`}
`

export const BankCardField = styled.div`
    ${tw`lg:mr-10 lg:w-62.5`}
`

export const BankCardFieldKey = styled.p`
    ${tw`lg:m-0 font-helvetica text-[#425453] font-normal text-sm lg:text-base`}
`

export const BankCardFieldValue = styled.p`
    ${tw`m-0 font-montserrat text-sm lg:text-base`}
`

export interface BorderCtr {
    $borderLeft?: boolean
}

export const BankCardCtrIcon = styled.div<BorderCtr>`
    ${tw`w-1/2 flex justify-center items-center h-10 lg:ml-2 cursor-pointer`}
    ${tw`border border-transparent border-r border-solid lg:border-none`}

    ${({ $borderLeft }) => ($borderLeft ? tw`border-r-[#C6CCCE]` : tw`border-r-transparent`)}
`

export const BankCardIcon = styled.img`
    ${tw`cursor-pointer`}
`
