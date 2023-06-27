import tw, { styled } from 'twin.macro'

export const SavingsDetailHeadDesk = styled.div`
    ${tw`hidden my-2.5 mx-0`}
    ${tw`md:flex md:justify-between md:items-center`}
`

export const SavingIDDeskContainer = styled.div`
    ${tw`flex justify-center items-center`}

    & img {
        ${tw`mr-5 w-[50px]`}
    }

    & p {
        ${tw`text-[18px] font-montserrat font-bold text-black m-0`}
    }

    span {
        ${tw`text-base font-helvetica font-normal text-black m-0`}
    }
`

interface SavingPropertyProps {
    isMora?: boolean
}

export const SavingProperty = styled.div<SavingPropertyProps>`
    ${tw`flex flex-col lg:mr-20`}

    & p {
        ${tw`text-[18px] font-montserrat font-bold text-black m-0`}
        color: ${(props) => props.isMora && 'var(--error-color)'};

        & sup {
            ${tw`!top-[-0.35em] !text-[0.65em]`}
        }
    }
    & span {
        ${tw`text-base font-helvetica font-normal text-black m-0`}
        color: ${(props) => props.isMora && 'var(--error-color)'};
    }
`

export const SavingsDetailHeadMobile = styled.div`
    ${tw`flex pb-2.5 flex-col gap-2.5 mb-[30px]`}
    ${tw`md:hidden`}
    border-bottom: 1px solid var(--text-opacity5);
`

export const SavingIDMobileContainer = styled.div`
    ${tw`flex justify-start items-center`}

    & img {
        ${tw`mr-5 w-[60px]`}
    }

    & p {
        ${tw`text-[18px] font-montserrat font-bold text-black m-0`}
    }

    span {
        ${tw`text-base font-helvetica font-normal text-black m-0`}
    }
`

export const SavingPropertyMob = styled.div<CardContentProps>`
    ${tw`flex flex-col`}

    p {
        ${tw`text-[22px] font-montserrat font-normal m-0`}

        sup {
            ${tw`!top-[-0.35em] !text-[0.65em]`}
        }

        color: ${(props) => (props.isMora ? 'var(--error-color)' : '#000000')};
    }

    span {
        ${tw`text-sm font-helvetica font-normal  m-0`}
        color: ${(props) => (props.isMora ? 'var(--error-color)' : 'var(--dominant-color)')}
    }

    .date {
        ${tw`text-sm font-helvetica font-normal my-2.5 mx-0`}
        color: var(--footer-color);
    }
`

export const HeadContent = styled.div`
    display: flex;
    justify-content: space-between;

    & div:first-child {
        width: 55%;
    }

    & div:last-child {
        width: 45%;
    }
`

interface CardContentProps {
    isMora?: boolean
}

export const CardContent = styled.div<CardContentProps>`
    & span {
        ${tw`block font-helvetica font-normal text-sm mb-2`}
        color: ${(props) => (props.isMora ? 'var(--error-color)' : 'var(--dominant-color)')}
    }

    & p {
        ${tw`m-0`}
        color: ${(props) => (props.isMora ? 'var(--error-color)' : 'var(--footer-color)')}
    }

    & .date {
        ${tw`m-0 text-[12px] text-[var(--footer-color)] font-helvetica font-normal`}
    }
`
