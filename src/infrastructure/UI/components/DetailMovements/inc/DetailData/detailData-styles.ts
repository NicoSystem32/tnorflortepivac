import tw, { styled } from 'twin.macro'

export const DetailContent = styled.section`
    ${tw`mt-4`}
`

export const Head = styled.div`
    ${tw`flex flex-row justify-between items-center my-2`}
`

export const Body = styled.div`
    ${tw`flex my-2`}
`

interface CardContentProps {
    width?: string
    padding?: string
    color?: string
}

export const CardContent = styled.div<CardContentProps>`
    width: ${(props) => (props.width ? props.width : '25%')};
    padding-left: ${(props) => (props.padding ? props.padding : '0')};

    & p {
        ${tw`m-0.5 font-helvetica font-normal text-sm`}
        color : ${(props) => (props.color ? props.color : 'black')}
    }

    & span {
        ${tw`m-0.5 font-montserrat font-bold text-[18px]`}

        & sup {
            ${tw`font-montserrat font-bold top-[-0.2rem] left-[0rem]`}
        }
    }
`

export const HorizontalLine = styled.div`
    ${tw`my-2 h-[3px] bg-[#D7D8D9]`}
`

export const VerticalLine = styled.div`
    ${tw`w-1 h-12`}
    border:  2px solid #D7D8D9;
`
