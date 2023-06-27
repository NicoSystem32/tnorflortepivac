import tw, { styled } from 'twin.macro'

export const StyledLoginToast = styled.div`
    ${tw`flex justify-center flex-wrap w-[90%] px-2.5 py-5 mt-12.5 mx-auto mb-0 rounded-xl border border-solid border-gray-custom-200 gap-[4%] bg-white`}
    box-shadow: 0 1px 3px 1px rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

    .text-options-user {
        ${tw`m-0 font-normal`}

        span {
            ${tw`text-[13px] font-semibold !text-black text-decoration[none] ml-1.5`}
        }
    }

    @media (max-width: 300px) {
        ${tw`gap-0 flex`}
        .text-options-user {
            ${tw`text-[10px]`}

            span {
                ${tw`text-[10px]`}
            }
        }
    }

    @media (min-width: 570px) and (max-width: 1180px) {
        ${tw`left-[20%] w-[80%]`}
    }

    @media (min-width: 1180px) {
        ${tw`hidden`}
    }
`
