import tw, { styled } from 'twin.macro'
import { ProgressBar } from 'react-bootstrap'

export const ExpirationProgress = styled(ProgressBar)`
    position: relative !important;
    background-color: var(--text-opacity2) !important;
    width: 40px !important;
    height: 40px !important;
    border-radius: 50% 50% !important;
    &::before {
        position: absolute !important;
        content: '' !important;
        top: 11% !important;
        left: 10% !important;
        background-color: #fff !important;
        height: 76% !important;
        width: 80% !important;
        border-radius: 50% 50% !important;
    }
    //TODO

    ${tw`mr-[15px] w-11`}
    ${tw`lg:mr-5`}
`
