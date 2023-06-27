import tw, { styled } from 'twin.macro'

export const CtrNotificationOffice = styled.div`
    ${tw`flex flex-col mt-5 lg:px-8`}
`

export const OfficeTitle = styled.h4`
    ${tw`font-bold font-helvetica text-[15px]`}
`

export const LinkOffice = styled.p`
    ${tw`underline font-helvetica text-[15px] text-sub-dominant cursor-pointer`}
`

export const OfficeInformation = styled.div`
    ${tw`flex justify-start items-center mb-1`}
`

export const OfficeInformationCol = styled.div`
    ${tw`w-1/2 flex flex-col`}
`

export const OfficeInformationRow = styled.div`
    ${tw`flex flex-row items-center`}
`

export const OfficeInformationText = styled.p`
    ${tw`font-helvetica text-sm md:text-[15px] mb-1`}
`

export const OfficeInformationIcon = styled.img`
    ${tw`w-3 mr-1 lg:mr-3`}
`
