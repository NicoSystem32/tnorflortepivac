import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '../redux/store/store'

import { RouterApp } from './routers/RouterApp'

import { appTheme } from './styles/app-theme'

// components
import { Layout, AppTour } from './transverse'
import { LoadingScreen } from './components'
import AppThemeProvider from './styles/AppThemeProvider'
import ManageProvider from './components/containers/ManageProvider'

import './App.css'

const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Suspense fallback={<LoadingScreen />}>
                        <ManageProvider>
                            <AppThemeProvider theme={appTheme} injectGlobal>
                                <AppTour disableScroll onClickMask={() => void 0}>
                                    <Layout>
                                        <RouterApp />
                                    </Layout>
                                </AppTour>
                            </AppThemeProvider>
                        </ManageProvider>
                    </Suspense>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App
