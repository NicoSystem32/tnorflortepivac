import tw, { styled } from 'twin.macro'
import {
    Option as OptionOr,
    Options as OptionsOr,
    OptionText as OptionTextOr,
} from '../../components/DetailMovements/detailMovements-styles'
export const CreditCardContainer = styled.div`
    ${tw`mt-20 mb-4 flex flex-col lg:flex-row gap-5`}
    & > div {
        ${tw`mt-5 flex flex-col gap-5`}
    }

    & > div:nth-child(2) {
        ${tw`hidden lg:flex`}
    }
    & > div:nth-child(3) {
        ${tw`lg:hidden mt-2`}
        & .movements-details {
            ${tw`box-shadow[0px 3px 6px #00000029] rounded-[10px] gap-2`}
        }
    }
`

export const Option = styled(OptionOr)`
    ${tw`w-[48%] h-12 flex justify-center items-center`}
`
export const Options = styled(OptionsOr)`
    ${tw`flex flex-row justify-between m-2`}
`
export const OptionText = styled(OptionTextOr)``
