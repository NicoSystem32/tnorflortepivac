import tw, { styled } from 'twin.macro'

import { CheckInput } from '../../../../components/includes'

export const ContainerCheck = styled.div`
    ${tw`flex justify-between items-center mt-5`}
`

export const CheckInputTdc = styled(CheckInput)`
    ${tw`block !w-6 !h-6 mr-3 cursor-pointer`}
`

export const TermText = styled.p`
    ${tw`text-sm font-montserrat font-medium text-[#53595A] w-[94%] m-0`}
`

export const LinkTyC = styled.span`
    ${tw`pl-1 m-0 underline text-[var(--sub-dominant-color)] cursor-pointer`}
`
