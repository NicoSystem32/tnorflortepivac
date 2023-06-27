import tw, { styled } from 'twin.macro'
import { ProgressBar } from '../../../../components'

export const NewSessionFirstButton = styled.div`
    border: none;
    justify-content: start;
    padding-left: 35px;
    display: flex;
    padding: 0 0 20px 35px;
    gap: 10px;
    a {
        color: var(--dominant-color);
    }
    .modal-content {
        min-height: 525px;
    }
    @media (min-width: 1180px) and (max-width: 1400px) {
        .modal-content {
            min-height: 480px;
            min-width: 560px;
        }
    }
    @media (min-width: 1400px) {
        .modal-content {
            min-height: 480px;
            min-width: 560px;
        }
    }
`

export const InfoIVRContent = styled.div`
    ${tw`flex flex-col-reverse mt-5`}

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`flex-col m-0 p-0`}
    }
`

export const ExpirationCode = styled.div`
    ${tw`flex justify-center items-center mt-[4%] mb-[8%] py-0 px-[4%]`}

    p {
        ${tw`font-montserrat font-normal text-sm text-gray-custom-700 m-0`}
    }

    .text-percentage {
        ${tw`flex`}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`mt-[4%] justify-center p-0`}

        p {
            ${tw`text-base`}
        }
    }
`

export const ExpirationProgress = styled(ProgressBar)`
    ${tw`mr-[15px] w-11`}

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        ${tw`mr-5`}
    }
`

export const ButtonNewSession = styled.div`
    text-align: center;

    button {
        width: 100%;
        height: 50px;
        border-radius: 10px;
        background-color: var(--sub-dominant-color);
        border-color: transparent !important;
        font-family: var(--font-main-regular);
        color: var(--background-color);

        &:hover {
            background-color: var(--button-color-hover) !important;
        }
        &:disabled {
            color: var(--background-color);
            background-color: var(--sub-dominant-color-ligth) !important;
            pointer-events: none;
            opacity: 0.65;
        }
    }

    @media (min-width: 670px) and (max-width: 1180px) {
        button {
            width: 210px;
        }
    }

    @media (min-width: 1180px) and (max-width: 1450px) {
        button {
            width: 210px;
        }
    }

    @media (min-width: 1450px) {
        button {
            width: 210px;
        }
    }
`

export const TextDynamicCode = styled.div`
    margin-top: 4%;
    .link-dynamic-passw {
        ${tw`font-montserrat font-normal text-sm text-gray-custom-700 cursor-pointer`}

        @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
            ${tw`text-base`}
        }
    }
`
