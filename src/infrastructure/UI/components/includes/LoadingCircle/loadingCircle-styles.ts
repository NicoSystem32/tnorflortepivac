import tw, { styled } from 'twin.macro'
import { keyframes } from 'styled-components/macro'

const loadingEllipsis = keyframes`
    0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`

/* loadingCircle container */
export const LoaderCircle = styled.div`
    font-size: 10px;
    margin: 5% auto;
    text-indent: -9999em;
    width: 7em;
    height: 7em;
    border-radius: 50%;
    background: #2bb3e7;
    background: -moz-linear-gradient(left, #2bb3e7 10%, rgba(255, 255, 255, 0) 42%);
    background: -webkit-linear-gradient(left, #2bb3e7 10%, rgba(255, 255, 255, 0) 42%);
    background: -o-linear-gradient(left, #2bb3e7 10%, rgba(255, 255, 255, 0) 42%);
    background: -ms-linear-gradient(left, #2bb3e7 10%, rgba(255, 255, 255, 0) 42%);
    background: linear-gradient(to right, #2bb3e7 10%, rgba(255, 255, 255, 0) 42%);
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    &:before {
        width: 50%;
        height: 50%;
        background: #2bb3e7;
        border-radius: 100% 0 0 0;
        position: absolute;
        top: 0;
        left: 0;
        content: '';
    }
    &:after {
        background: #fff;
        width: 75%;
        height: 75%;
        border-radius: 50%;
        content: '';
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    &:nth-child(1) {
        left: 8px;
        animation: ${loadingEllipsis} 0.6s infinite;
    }
`

export const LoadingCircleContainer = styled.div`
    ${tw`w-full h-[1rem]`}
`
