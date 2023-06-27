import tw, { styled } from 'twin.macro'
import { Link } from 'react-router-dom'

export const CardQuotaRejectedWrapper = styled.section`
    ${tw`flex justify-center items-center py-2`}
`

export const CardQuotaRejectedContent = styled.div`
    ${tw`p-5 lg:px-10 w-full max-w-[550px] lg:max-w-[600px] rounded-[10px] shadow-[0px 3px 6px #00000029]`}
`

export const StyledCardQuotaRejected = styled.div`
    ${tw`p-5 w-full max-w-[450px] rounded-[10px] shadow-[0px 3px 6px #00000029]`}
    ${tw`lg:p-7.5 lg:max-w-[530px]`}
`

export const ExceptionImg = styled.img`
    ${tw`w-28 mb-7.5`}
`

export const ExceptionImage = styled.img`
    ${tw`mr-5`}
`

export const ExceptionCtr = styled.div`
    ${tw`flex flex-col items-center`}

    & button {
        ${tw`px-15`}
    }
`

export const ExceptionNavigateLink = styled(Link)`
    ${tw`w-full flex`}
    text-decoration: none;
`
