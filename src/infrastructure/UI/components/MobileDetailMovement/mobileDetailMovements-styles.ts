import tw, { styled } from 'twin.macro'

export const MobileContent = styled.section`
    ${tw`md:hidden`}
`

export const MobileTableTitle = styled.div`
    ${tw`flex justify-center items-center h-[50px] mb-2.5`}
    border-bottom: 4px solid var(--dominant-color-dark);

    p {
        ${tw`m-0 font-montserrat font-bold text-base`}
    }
`

export const MobileTableBody = styled.div`
    ${tw`flex flex-col`}
`
