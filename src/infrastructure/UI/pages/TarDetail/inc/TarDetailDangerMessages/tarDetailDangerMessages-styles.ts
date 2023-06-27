import tw, { styled } from 'twin.macro'

export const DangerMessagesContainer = styled.div`
    ${tw`grid-area[alertDetail]`}
`

export const ContentAlertOne = styled.div`
    ${tw`background-color[var(--alert-second)] flex rounded-[10px] min-h-[65px] gap-[15px] justify-center items-center`}
    ${tw`mx-0 mt-[25px] mb-[50px] py-[5px] px-5`}
    ${tw`lg:gap-[25px] lg:m-0 lg:py-0 lg:px-5`}

    p {
        ${tw`m-0 color[var(--text-modal1)] text-sm font-helvetica font-normal`}
        ${tw`lg:text-base 2xl:text-[18px]`}
    }
`
