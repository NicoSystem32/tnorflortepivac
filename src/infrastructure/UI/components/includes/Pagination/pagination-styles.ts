import tw, { styled } from 'twin.macro'
import { Pagination as PaginationBs } from 'react-bootstrap'

export const PaginationContainer = styled.div`
    ${tw`flex justify-center items-center`}
`

export const PaginationApp = styled(PaginationBs)`
    ${tw`mt-5`}

    & .page-item {
        ${tw`w-[30px] h-[30px] flex justify-center items-center overflow-hidden`}
    }

    & li {
        ${tw`border-bottom[2px solid #FFFFFF]`}
    }

    .active {
        ${tw`border-bottom[2px solid var(--dominant-color-dark)]`}
    }

    .active .page-link {
        ${tw`text-black border-none !bg-white`}
    }

    & li .page-link {
        ${tw`block text-black font-montserrat font-bold !bg-transparent border-none`}
        &:hover {
            ${tw`!bg-transparent`}
        }
    }

    & li:first-child a,
    li:last-child a {
        ${tw`block text-dominant-dark rounded-[50%] text-[30px] pb-2.5`}
        &:hover {
            ${tw`!bg-dominant-dark text-white rounded-[50%]`}
        }
    }

    & li:first-child,
    li:last-child {
        ${tw`rounded-[50%]`}
    }
`
