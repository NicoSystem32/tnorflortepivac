import tw, { styled } from 'twin.macro'

export const CardCreditFAIContainer = styled.div`
    ${tw`w-full rounded-[10px] p-4  grid-template-rows[22% 18% 15% 27% 18%]`}
    ${tw`grid grid-template-columns[25% 75%] grid-template-areas['iconCtf titleCtf' 'iconCtf numberCtf' '. .' '. valueCtf' '. textCtf']`}
    ${tw`sm:!w-[500px]`}
    ${tw`lg:py-8 lg:px-6 lg:grid-template-columns[20% 34% 46%] lg:grid-template-rows[50% 50%]`}
    /* ${tw`sm:!w-[454px]`}
    ${tw`lg:!w-[455px] lg:py-8 lg:px-6 lg:grid-template-columns[12% 30% 58%] lg:grid-template-rows[50% 50%]`} */
    ${tw`lg:grid-template-areas['iconCtf titleCtf valueCtf' 'iconCtf numberCtf textCtf']`}
    border: 1px solid var(--text-opacity5);

    & img {
        ${tw`grid-area[iconCtf] w-[60px]`}
    }

    & .title-ctf {
        ${tw`grid-area[titleCtf] font-montserrat font-bold text-black m-0 text-[18px]`}
    }

    & .number-ctf {
        ${tw`grid-area[numberCtf] font-helvetica font-normal text-black m-0 text-base`}
    }

    & .value-ctf {
        ${tw`grid-area[valueCtf] font-montserrat font-normal text-black m-0 text-base md:text-2xl`}
    }
`

export const RedirectMessage = styled.p`
    ${tw`block mt-4 text-dark-custom-700 text-sm font-helvetica font-normal`}
    & a {
        ${tw`!text-sub-dominant !underline`}
    }
`
