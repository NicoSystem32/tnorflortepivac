import tw, { styled } from 'twin.macro'

export const LoginContainer = styled.div`
    ${tw`relative`}

    .not-default {
        ${tw`hidden`}

        @media (min-width: 570px) and (max-width: 1180px) {
            ${tw`block`}
        }

        @media (min-width: 1180px) and (max-width: 1400px) {
            ${tw`block`}
        }

        @media (min-width: 1400px) {
            ${tw`block`}
        }
    }
`

export const ImgDots = styled.img`
    ${tw`absolute top-[-4%] right-[-5%] z-[-1]`}

    @media (min-width: 1180px) and (max-width: 1400px) {
        ${tw`absolute top-[-3%] left-[24%]`}
    }

    @media (min-width: 1400px) {
        ${tw`!absolute !top-[-30px] !left-[300px]`}
    }
`

export const LoginFormContainer = styled.div`
    ${tw`flex justify-center items-start my-[17%] mx-0`}

    @media (min-width: 1180px) {
        ${tw`justify-start my-20`}
    }

    @media (min-width: 1400px) {
        ${tw`!max-w-[1320px] my-20 mx-auto`}
        min-height: calc(100vh - 400px) !important;
    }
`

export const ForgetPasswordWrap = styled.div`
    ${tw`text-center mt-5`}

    a {
        ${tw`!text-decoration[underline] !mt-5 !text-[16px] !font-normal !text-sub-dominant`}
    }
`
