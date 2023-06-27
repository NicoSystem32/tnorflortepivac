import tw, { styled } from 'twin.macro'

import Select from 'react-select'

export const StyledDefaultSelect = styled(Select)`
    ${tw`mt-1`}

    & .select__control {
        ${tw`px-10 py-1 bg-[#00000029]`}
        border-end-start-radius: 0;
        border-end-end-radius: 0;
        box-shadow: 0 0 0 1px transparent;
        border-color: transparent;

        &:hover {
            border-color: transparent;
        }

        & .select__value-container {
            ${tw`px-5 bg-white rounded-[4px]`}

            & .select__input-container {
                ${tw`relative`}

                &::before {
                    ${tw`absolute w-5 right-0 h-[70%] flex justify-center items-center `}
                    ${tw`bg-no-repeat`}
                    content: '';
                    background-image: url(https://cavipetrolstorageaccount.blob.core.windows.net/assets/Icons/mini-search.svg);
                    background-size: contain;
                    top: calc(15%);
                }
            }
        }
    }

    & {
        & .select__menu {
            ${tw`z-10 mt-0 px-2`}
            border-start-start-radius: 0;
            border-start-end-radius: 0;

            & .select__menu-list {
                & .select__option {
                    ${tw`px-5`}
                    border-bottom:  1px solid black;
                }
            }
        }
    }
`
