import tw, { styled } from 'twin.macro'

export const SixteenthStepWrapper = styled.section`
    ${tw`flex justify-center items-center py-2`}
`

export const SixteenthStepContent = styled.div`
    ${tw`p-5 lg:px-10 w-full max-w-[550px] lg:max-w-[924px] rounded-[10px] shadow-[0px 3px 6px #00000029]`}
`

export const CtrRowField = styled.div`
    ${tw`flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-3`}

    & > div {
        ${tw`w-full lg:w-1/2`}
    }
`

export const UploadLabel = styled.label`
    ${tw`!bg-[var(--approved-color-dark)] h-[50px] border-0 w-52 relative overflow-hidden`}
    ${tw`rounded cursor-pointer flex justify-center items-center`}
`

export const UploadInput = styled.input`
    ${tw`absolute top-0 left-0 w-0`}
    ${tw`hidden`}
`

export const UploadSpan = styled.span`
    ${tw`text-white`}
`

export const StyledFile = styled.ul`
    ${tw`px-3 py-1.5 rounded-[8px] my-1 list-none flex justify-between items-center shadow-[0px 3px 6px #00000029]`}
`

export const StyledFileItem = styled.li`
    ${tw`flex justify-between w-full`}
`

export const StyledFileAnchor = styled.a`
    ${tw``}
`

export const StyledFileText = styled.p`
    ${tw``}
`

export const StyledCardFileIcon = styled.img`
    ${tw`cursor-pointer`}
`
