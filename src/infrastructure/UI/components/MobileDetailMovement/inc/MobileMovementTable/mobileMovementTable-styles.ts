import tw, { styled } from 'twin.macro'

export const MobileTableTitles = styled.div`
    ${tw`flex`}
`

export const MobileTableOption = styled.div`
    ${tw`w-1/2`}
    border-bottom: 1px solid #00000029;

    p {
        ${tw`my-2 font-helvetica font-normal text-sm text-[#707070]`}
    }
`

export const MobileTableRow = styled.div`
    ${tw`flex my-2`}
    border-bottom: 1px solid #00000029;
`

export const MobileTableTd = styled.div`
    ${tw`w-1/2 h-[60px] flex flex-col justify-center`}

    .concept {
        ${tw`m-0 font-normal font-helvetica py-1`}
    }

    & p {
        ${tw`m-0 font-bold font-montserrat py-1`}
    }
    & span {
        ${tw`font-bold font-montserrat py-1 text-[#55B948]`}
    }
`

export const MobileDetail = styled.section`
    ${tw`mb-4`}
`

interface MobileDetailTdProps {
    textColor?: string
}

export const MobileDetailTd = styled.div<MobileDetailTdProps>`
    ${tw`w-1/2 px-3`}
    &:last-child {
        border-left: 1px solid #e6e7e8;
    }

    & p {
        ${tw`m-0 py-2 font-helvetica font-normal text-sm`}
        color: ${(props) => (props.textColor ? props.textColor : '#F5A50B')}
    }

    & span {
        ${tw`block m-0 py-2 font-montserrat font-bold text-sm`}
    }
`
