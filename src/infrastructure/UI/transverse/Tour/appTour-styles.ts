import tw, { styled } from 'twin.macro'
import { TourProvider } from '@reactour/tour'

export const StyledAppTour = styled(TourProvider)`
    --reactour-accent: ${({ theme }) => theme.colors.dominant.dark};

    && {
        ${tw`rounded-[5px] pt-5 px-4 lg:px-5 pb-5 lg:pb-7.5 max-w-[90vw]`}

        @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
            ${tw`max-w-[40rem]`}
        }
    }
`

export const StepContent = styled.section`
    ${tw`py-0 px-0 lg:px-5`}

    p {
        ${tw`font-helvetica font-normal text-base lg:text-xl text-gray-custom-900`}
    }

    .highlight-text {
        ${tw`text-sub-dominant`}
    }
`

export const StepTitle = styled.h2`
    ${tw`font-montserrat font-bold text-lg lg:text-xl text-gray-custom-900 lg:mt-4 lg:mb-6 my-3.5`}

    .sub-title {
        ${tw`text-dominant-dark`}
    }
`

export const ImgContent = styled.figure`
    ${tw`flex items-center justify-center my-0 mx-auto`}
`
