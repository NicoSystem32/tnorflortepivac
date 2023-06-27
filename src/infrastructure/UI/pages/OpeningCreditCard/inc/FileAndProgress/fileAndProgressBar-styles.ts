import tw, { styled } from 'twin.macro'

// components
import { ProgressBar } from 'react-bootstrap'

export const StyledCardFile = styled.div`
    ${tw`px-3 py-1.5 rounded-[8px] my-1 flex justify-between items-center shadow-[0px 3px 6px #00000029]`}
`

export const StyledCardFileName = styled.span`
    ${tw`w-3/12`}
`

export const StyledCardFileIcon = styled.img`
    ${tw`cursor-pointer`}
`

export const CtrProgress = styled.div`
    ${tw`w-8/12 flex flex-row items-center`}
`

export const Progress = styled(ProgressBar)`
    ${tw`h-1.5 w-11/12 mr-2`}
`
