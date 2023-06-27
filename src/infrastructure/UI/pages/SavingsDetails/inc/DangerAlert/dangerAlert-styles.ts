import tw, { styled } from 'twin.macro'

export const DangerAlertContainer = styled.div`
    ${tw`relative flex gap-2.5 rounded-[10px] px-2.5 py-[15px] box-shadow[0px 3px 6px #00000029] border-top[5px solid var(--error-color)]`}

    grid-area: alertMora;
`

export const DangerLogo = styled.img`
    grid-area: iconCtf;
`

export const DangerTitle = styled.p`
    ${tw`m-0 text-base color[var(--text-opacity9)] font-bold font-montserrat`}
`

export const WrapperInfo = styled.div`
    ${tw`flex flex-col`}
`

export const DangerText = styled.p`
    ${tw`m-0 text-[12px] color[var(--text-opacity9)] font-normal font-helvetica`}
    ${tw`lg:text-base`}
`
