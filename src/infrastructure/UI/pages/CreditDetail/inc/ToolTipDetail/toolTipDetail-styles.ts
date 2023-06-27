import { styled } from 'twin.macro'
import { Tooltip } from 'react-bootstrap'

export const ToolTipDetailContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;

    @media (min-width: 670px) and (max-width: 1180px) {
        align-items: start;
        padding-top: 20px;
    }

    @media (min-width: 1180px) and (max-width: 1450px) {
        align-items: start;
        padding-top: 20px;
    }

    @media (min-width: 1450px) {
        align-items: start;
        padding-top: 20px;
    }

    .tooltip-info {
        display: block;
        border: none !important;
        width: 16px;
        height: 16px;
    }
`

export const TooltipCustom = styled(Tooltip)`
    .tooltip-inner {
        padding: 12px;
        text-align: start;
        & > p {
            margin-bottom: 3px;
        }
    }
`
