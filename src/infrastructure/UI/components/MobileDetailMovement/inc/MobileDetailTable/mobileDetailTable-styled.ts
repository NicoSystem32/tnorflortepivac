import tw, { styled } from 'twin.macro'

export const MobileDetail = styled.section`
    ${tw`mb-4`}
`

export const MobileDetailRow = styled.div`
    ${tw`flex`}
`

interface MobileDetailTdProps {
    textColor?: string
    borderBottom?: boolean
}

export const MobileDetailTd = styled.div<MobileDetailTdProps>`
    ${tw`w-1/2 px-3`}
    border-bottom: ${(props) => (props.borderBottom ? '' : '1px solid #E6E7E8')};
    &:last-child {
        border-left: 1px solid #e6e7e8;
    }

    & p {
        ${tw`m-0 py-2 font-helvetica font-normal text-sm`}
        color: ${(props) => (props.textColor ? props.textColor : 'var(--dominant-color)')}
    }

    & span {
        ${tw`block m-0 py-2 font-montserrat font-bold text-sm`}
        & sup {
            ${tw`font-montserrat font-bold top-[-0.2rem] left-[0rem]`}
        }
    }
`
