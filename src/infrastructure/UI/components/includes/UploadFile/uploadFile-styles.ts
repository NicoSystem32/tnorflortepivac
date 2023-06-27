import tw, { styled } from 'twin.macro'

export const UploadFileCtr = styled.div`
    ${tw`my-10 flex flex-col lg:flex-row lg:items-center`}
`

export const UploadFileRight = styled.div`
    ${tw`py-4 px-2 w-full flex flex-col items-center lg:w-1/2`}
    ${tw`bg-[#FAFBFD] lg:bg-transparent`}
`

export const TextInstruction = styled.p`
    ${tw`text-center`}
`

export const UploadFileLeft = styled.div`
    ${tw`hidden p-0 lg:flex lg:w-1/2`}
`

export const ButtonsCtr = styled.div`
    ${tw`flex lg:justify-end my-5 w-full`}

    & button {
        ${tw`w-full lg:w-[200px]`}
    }
`

export const UploaderFileCtr = styled.div`
    ${tw`border-4 border-dashed border-[#42545347] w-[420px] `}
    ${tw`cursor-pointer flex flex-col items-center justify-between py-6 px-6`}
`

export const UploaderFileImg = styled.img`
    ${tw`w-[100px] mb-3`}
`

export const UploaderFileH4 = styled.h4`
    ${tw`font-montserrat font-semibold text-base text-[#425453] text-center`}
`

export const UploaderFileText = styled.p`
    ${tw`font-montserrat font-normal text-sm text-[#42545347]`}
`
