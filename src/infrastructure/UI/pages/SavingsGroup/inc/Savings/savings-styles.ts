import tw, { styled } from 'twin.macro'

export const TitleSaving = styled.p`
    ${tw`text-black font-montserrat font-normal text-base`}
`

export const SavingsContainer = styled.div`
    ${tw`grid grid-template-columns[100%] gap-[4%] pb-[8%]`}
    ${tw`md:grid-template-columns[48% 48%]`}
    ${tw`lg:grid-template-columns[31% 31% 31%] lg:gap-[3%] lg:pb-[4%]`}
`
export const CardContainer = styled.div`
    ${tw`relative block h-64 overflow-hidden box-shadow[0px 3px 6px #00000029] rounded-[10px] px-2.5 pt-2.5 pb-0 min-w-[342px]`}
`

export const CardHead = styled.div`
    ${tw`flex mb-5`}

    & img {
        ${tw`w-15 mr-3`}
    }

    & div {
        ${tw`flex flex-col justify-center items-start`}
        & p {
            ${tw`mx-0 mt-0 mb-2 text-base md:text-[18px] grid-area[titleCsr] font-montserrat font-bold text-black`}
        }

        & span {
            ${tw`m-0 text-base grid-area[numberCsr] font-helvetica font-normal text-black`}
        }
    }
`

export const ValueCTF = styled.p`
    ${tw`m-0 text-sm md:text-2xl grid-area[valueCtf] font-montserrat font-normal text-black`}

    & sup {
        ${tw`!top-[-0.3]`}
    }
`

export const TextCTF = styled.p`
    ${tw`mx-0 my-2  grid-area[textCtf] text-base font-helvetica font-normal text-black`}
`

export const TagCCG = styled.p`
    ${tw`mx-0 my-2 relative h-10`}

    & .to-complete {
        ${tw`absolute left-[-10px] bg-dominant text-base text-white py-0 pl-[15px] pr-[30px] border-radius[0 10px 10px 0] font-helvetica font-normal width[fit-content]`}
    }

    & .success {
        ${tw`text-white rounded-[10px] bg-[#55b948] py-[2px] px-[10px]`}
    }

    & .mora {
        ${tw`text-white rounded-[10px] bg-danger py-[2px] px-[10px]`}
    }
`

export const ButtonsContainer = styled.div`
    ${tw`absolute left-0 bottom-0 w-full grid h-[50px] grid-template-columns[50% 50%]`}
`

export const ButtonDefault = styled.button`
    ${tw`bg-transparent border-none text-sm md:text-base text-black font-montserrat font-normal py-2 px-0.5`}
    border-top: 1px solid var(--text-opacity2);

    &:hover {
        background-color: var(--text-opacity2);
    }
`

export const ButtonDisable = styled(ButtonDefault)`
    ${tw`!text-gray-custom-200`}
`
