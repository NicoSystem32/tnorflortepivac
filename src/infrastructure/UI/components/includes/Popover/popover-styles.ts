import Popover from 'react-bootstrap/Popover'
import tw, { styled } from 'twin.macro'

export const StyledPopover = styled(Popover)`
    ${tw`max-w-max w-auto bg-gray-custom-100 p-3.5 border-none rounded-[2.188rem]`}

    &.has-keyboard {
        ${tw`min-w-[31.25rem] sm:min-w-[38.75rem] lg:min-w-[43.75rem]`}
    }

    &&.is-slim {
        ${tw`p-1 rounded-global bg-gray-custom`}
    }

    &&.no-space {
        ${tw`p-0 rounded-none bg-gray-custom`}
    }

    /* right popover position */
    &.bs-popover-end {
        ${tw`ml-4 pl-6`}

        > .popover-arrow {
            ${tw`w-6 h-12 -left-6`}

            &::before {
                ${tw`border-r-gray-custom-100 border-[1.5rem] border-l-0`}
            }

            &::after {
                ${tw`border-r-gray-custom-100 border-[1.5rem] border-l-0`}
            }
        }

        &[data-popper-placement='right-start'] {
            ${tw`-mt-10`}
            > .popover-arrow {
                ${tw`mt-10`}
            }
        }
        &[data-popper-placement='right-end'] {
            ${tw`-mb-10`}
            > .popover-arrow {
                ${tw`-mt-10`}
            }
        }
    }

    /* bottom popover position */
    &.bs-popover-bottom,
    &.bs-popover-auto[data-popper-placement^='bottom'] {
        ${tw`mt-4 pt-6`}

        > .popover-arrow {
            ${tw`w-12 h-6 -top-6`}

            &::before {
                ${tw`border-b-gray-custom-100 border-[1.5rem] border-t-0`}
            }

            &::after {
                ${tw`border-b-gray-custom-100 border-[1.5rem] border-t-0`}
            }
        }
    }

    /* top popover position */
    &.bs-popover-top,
    &.bs-popover-auto[data-popper-placement^='top'] {
        ${tw`mb-4 pb-6`}

        > .popover-arrow {
            ${tw`w-12 h-6 -bottom-6`}

            &::before {
                ${tw`border-t-gray-custom-100 border-[1.5rem] border-b-0`}
            }

            &::after {
                ${tw`border-t-gray-custom-100 border-[1.5rem] border-b-0`}
            }
        }
    }

    /* left popover position */
    &.bs-popover-start {
        ${tw`mr-4 pr-6`}

        > .popover-arrow {
            ${tw`w-6 h-12 -right-6`}

            &::before {
                ${tw`border-l-gray-custom-100 border-[1.5rem] border-r-0`}
            }

            &::after {
                ${tw`border-l-gray-custom-100 border-[1.5rem] border-r-0`}
            }
        }

        &[data-popper-placement='left-start'] {
            ${tw`-mt-10`}
            > .popover-arrow {
                ${tw`mt-10`}
            }
        }
        &[data-popper-placement='left-end'] {
            ${tw`-mb-10`}
            > .popover-arrow {
                ${tw`-mt-10`}
            }
        }
    }

    .label-floating {
        ${tw`-bottom-8 left-0 font-helvetica font-normal text-gray-custom-700 text-base`}
    }
`
