import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

import { LoadingScreen } from '../../components'
import IdleTimerContainer from '../../pages/Login/inc/IdleTimerContainer/idleTimerContainer'
import { Footer, FooterInit, Header, HeaderInit } from '..'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props): JSX.Element => {
    const [loading, setLoading] = useState(true)
    const { token } = useSelector((store: any) => store.auth)

    useLayoutEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    useEffect(() => {
        readTheme()
    })

    const readTheme = (): void => {
        const themeInitial = String(localStorage.getItem('themeMode'))
        const elementContainer = document.body
        elementContainer.removeAttribute('class')
        elementContainer.classList.add(themeInitial)
    }

    return (
        <main className="main-content">
            {token ? <Header /> : <HeaderInit />}
            {children}
            {loading && <LoadingScreen />}
            {token ? (
                <>
                    <Footer />
                    <IdleTimerContainer />
                </>
            ) : (
                <FooterInit />
            )}
        </main>
    )
}

export default Layout
