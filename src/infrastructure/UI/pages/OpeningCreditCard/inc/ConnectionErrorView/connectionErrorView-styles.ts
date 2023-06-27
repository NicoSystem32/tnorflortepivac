import tw, { styled } from 'twin.macro'

export const ConnectErrorWrapper = styled.section`
    ${tw`flex justify-center items-center py-2`}
`

export const ConnectErrorContent = styled.div`
    ${tw`p-5 flex flex-col items-center w-full max-w-[550px] rounded-[10px] shadow-[0px 3px 6px #00000029]`}
    ${tw`lg:p-10`}
`

export const ConnectErrorImage = styled.img`
    ${tw`w-32`}
`

export const ConnectErrorTitle = styled.h4`
    ${tw`font-montserrat my-10 text-center text-xl font-semibold`}
`

export const ConnectErrorCtrBtn = styled.div`
    ${tw`w-full flex justify-center lg:px-28`}
`
