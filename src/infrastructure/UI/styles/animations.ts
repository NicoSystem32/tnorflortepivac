import { css } from 'styled-components/macro'

export const ringsWaveAnimation = (): ReturnType<typeof css> => css`
    @keyframes ringsWave {
        from {
            border: 1px ${({ theme }) => theme.colors['sub-dominant'].DEFAULT} solid;
            opacity: 1;
            width: 6px;
            height: 6px;
            border-radius: 6px;
        }
        to {
            border: 2px ${({ theme }) => theme.colors['sub-dominant'].DEFAULT} solid;
            opacity: 0;
            width: 40px;
            height: 40px;
            border-radius: 48px;
        }
    }

    .rings-waves-animation {
        &::before,
        &::after {
            content: '';
            display: block;
            position: absolute;
            box-sizing: border-box;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: auto;
            animation: 1s linear infinite ringsWave;
            transform: translateX(5.5em);
        }

        &:after {
            animation-delay: 0.5s;
        }
    }
`
