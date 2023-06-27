import tw, { styled } from 'twin.macro'

export const ExceptionCtrImage = styled.div`
    ${tw`w-14 flex items-center`}
`

export const ExceptionImage = styled.img`
    ${tw`mr-5`}
`

export const MoraCard = styled.div`
    ${tw`border border-solid border-[#707070] w-full my-3 p-6 rounded-[10px] relative h-[148px] overflow-hidden`}
`

export const MoraCardTop = styled.div`
    ${tw`flex items-center pb-5`}
    border-bottom:  1px solid #E6E7E8;

    & h4 {
        ${tw`-mt-2 mb-1`}
    }

    & p {
        ${tw`my-1 font-montserrat text-xl`}
    }
`

export const MoraCardTopRight = styled.div`
    ${tw`w-full`}
`

export const MoraCardBottom = styled.div`
    ${tw`absolute bottom-0 right-0 left-0 h-13 flex justify-center items-center cursor-pointer`}
    ${tw`hover:bg-[#E6E7E8]`}

    & p {
        ${tw`my-1 font-montserrat text-base text-center w-full h-full flex justify-center items-center`}
    }
`
