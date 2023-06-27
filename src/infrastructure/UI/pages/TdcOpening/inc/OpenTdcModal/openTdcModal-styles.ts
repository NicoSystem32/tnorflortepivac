import tw, { styled } from 'twin.macro'

export const ModalContent = styled.div`
    ${tw`px-5 pb-5 pt-10 flex flex-col`}
`

export const ContainerButtons = styled.div`
    ${tw`gap-1 my-5 flex flex-col justify-between lg:flex-row-reverse`}

    & button {
        ${tw`w-full md:!w-[46%]`}
    }
`

export const ContainerHeader = styled.div`
    ${tw`flex justify-center items-center mb-3`}
`

export const ModalImage = styled.img`
    ${tw`w-16`}
`

export const ModalTitle = styled.h3`
    ${tw`font-montserrat font-semibold text-black text-[18px] text-center`}
`

export const ModalText = styled.p`
    ${tw`font-helvetica font-normal text-center text-[var(--header-botton-color)] text-sm `}
`
