import tw, { styled } from 'twin.macro'

// styled components
import { StyledLoginForm } from '../LoginForm/loginForm-styles'

export const LoginFailedContainer = styled(StyledLoginForm)``

export const TitleLoginContent = styled.div`
    ${tw`pt-13 px-[5%] mb-12.5`}

    .title-login-failed {
        ${tw`font-montserrat font-semibold text-2xl text-black`}
    }
`

export const LoginTextInfo = styled.p`
    ${tw`font-montserrat font-normal text-base text-gray-custom-700 py-0 px-[5%] mb-3.5`}
`

export const CustomerServiceContent = styled.div`
    ${tw`flex pt-4 pb-0 px-[5%] gap-2.5`}

    a {
        ${tw`font-montserrat font-normal text-base text-dominant-dark no-underline`}
    }
`
