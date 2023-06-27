import {
    // Eps interfaces
    CardsConsolidatedState,
    CreditsConsolidatedState,
    SavingAvailableState,
    CreditsAvailableState,
    DetailState,
    MovementState,
    MovementDetailState,
    FaiAccountBalanceState,
    // action interfaces
    CardsConsolidatedActionShape,
    DetailActionShape,
    CreditConsolidatedActionShape,
    SavingAvailableActionShape,
    CreditsAvailableActionShape,
    MovementActionShape,
    MovementDetailActionShape,
    FaiAccountBalanceActionShape,
} from '../../../domain/models'
import {
    CARDS_CONSOLIDATED,
    CREDITS_CONSOLIDATED,
    CREDITS_AVAILABLE,
    SAVING_AVAILABLE,
    DETAIL,
    FAI_ACCOUNT_BALANCE,
    MOVEMENTS,
    MOVEMENTS_DETAIL,
} from './products.types'

const initialCardsConsolidatedState: CardsConsolidatedState = {
    cards: [],
    loading: false,
    error: {},
}

export const cardsConsolidatedReducer = (
    state = initialCardsConsolidatedState,
    action: CardsConsolidatedActionShape
): CardsConsolidatedState => {
    switch (action.type) {
        case CARDS_CONSOLIDATED.SUCCESS:
            return {
                ...state,
                cards: action.payload.data,
                loading: false,
                error: {},
            }
        case CARDS_CONSOLIDATED.REQUEST:
            return { ...state, loading: true, error: {} }
        case CARDS_CONSOLIDATED.FAILURE:
            return {
                ...state,
                loading: false,
                cards: initialCardsConsolidatedState.cards,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialCreditsConsolidatedState: CreditsConsolidatedState = {
    credits: [],
    loading: false,
    error: {},
}

export const creditsConsolidatedReducer = (
    state = initialCreditsConsolidatedState,
    action: CreditConsolidatedActionShape
): CreditsConsolidatedState => {
    switch (action.type) {
        case CREDITS_CONSOLIDATED.SUCCESS:
            return {
                ...state,
                credits: action.payload.data,
                loading: false,
                error: {},
            }
        case CREDITS_CONSOLIDATED.REQUEST:
            return { ...state, loading: true, error: {} }
        case CREDITS_CONSOLIDATED.FAILURE:
            return {
                ...state,
                loading: false,
                credits: initialCreditsConsolidatedState.credits,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialSavingAvailableState: SavingAvailableState = {
    saving: [],
    loading: false,
    error: {},
}

export const savingAvailableReducer = (
    state = initialSavingAvailableState,
    action: SavingAvailableActionShape
): SavingAvailableState => {
    switch (action.type) {
        case SAVING_AVAILABLE.SUCCESS:
            return {
                ...state,
                saving: action.payload.data,
                loading: false,
                error: {},
            }
        case SAVING_AVAILABLE.REQUEST:
            return { ...state, loading: true, error: {} }
        case SAVING_AVAILABLE.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialDetailState: DetailState = {
    detail: [],
    loading: false,
    error: {},
}

export const detailReducer = (
    state = initialDetailState,
    action: DetailActionShape
): DetailState => {
    switch (action.type) {
        case DETAIL.SUCCESS:
            return {
                ...state,
                detail: action.payload.data,
                loading: false,
                error: {},
            }
        case DETAIL.REQUEST:
            return { ...state, loading: true, error: {} }
        case DETAIL.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialCreditsAvailableState: CreditsAvailableState = {
    credits: [],
    loading: false,
    error: {},
}

export const creditsAvailableReducer = (
    state = initialCreditsAvailableState,
    action: CreditsAvailableActionShape
): CreditsAvailableState => {
    switch (action.type) {
        case CREDITS_AVAILABLE.SUCCESS:
            return {
                ...state,
                credits: action.payload.data,
                loading: false,
                error: {},
            }
        case CREDITS_AVAILABLE.REQUEST:
            return { ...state, loading: true, error: {} }
        case CREDITS_AVAILABLE.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialMovementsState: MovementState = {
    movements: [],
    loading: false,
    error: {},
}

export const movementsReducer = (
    state = initialMovementsState,
    action: MovementActionShape
): MovementState => {
    switch (action.type) {
        case MOVEMENTS.SUCCESS:
            return {
                ...state,
                movements: action.payload.data,
                loading: false,
                error: {},
            }
        case MOVEMENTS.REQUEST:
            return { ...state, loading: true, error: {} }
        case MOVEMENTS.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialMovementsDetailState: MovementDetailState = {
    details: [],
    loading: false,
    error: {},
}

export const movementsDetailReducer = (
    state = initialMovementsDetailState,
    action: MovementDetailActionShape
): MovementDetailState => {
    switch (action.type) {
        case MOVEMENTS_DETAIL.SUCCESS:
            return {
                ...state,
                details: action.payload.data,
                loading: false,
                error: {},
            }
        case MOVEMENTS_DETAIL.REQUEST:
            return { ...state, loading: true, error: {} }
        case MOVEMENTS_DETAIL.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialFaiAccountBalanceState: FaiAccountBalanceState = {
    faiAccount: {
        creditName: '',
        creditLineName: '',
        productDocumentNumber: '',
        finishedNumber: 0,
        balanceTotal: 0,
        typeDocumentProduct: '',
        idProduct: '',
        urlImageProduct: '',
    },
    loading: false,
    error: {},
}

export const faiAccountBalanceReducer = (
    state = initialFaiAccountBalanceState,
    action: FaiAccountBalanceActionShape
): FaiAccountBalanceState => {
    switch (action.type) {
        case FAI_ACCOUNT_BALANCE.SUCCESS:
            return {
                ...state,
                faiAccount: action.payload.data,
                loading: false,
                error: {},
            }
        case FAI_ACCOUNT_BALANCE.REQUEST:
            return { ...state, loading: true, error: {} }
        case FAI_ACCOUNT_BALANCE.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
