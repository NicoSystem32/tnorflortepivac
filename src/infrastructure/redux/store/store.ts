import { createStore, applyMiddleware, compose, Dispatch } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reduxThunk from 'redux-thunk'

import MiddlewareApi from '../../http/middleware/middlewareApi'

import { appReducer } from './rootReducer'

const persistConfig = {
    key: 'v1',
    storage,
    keyPrefix: 'cavApp/',
    version: 1,
    blacklist: ['onboardingReducer'],
}

const middlewareAll = [reduxThunk, MiddlewareApi]

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedReducer = persistReducer(persistConfig, appReducer)
const store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(...middlewareAll)))
const persistor = persistStore(store)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppDispatch = Dispatch<any>
export { store, persistor }
