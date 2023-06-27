import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Models
import { Theme } from '../../../../../domain/models'
import { StoreApp } from '../../../../redux/store/store.interface'

// Actions
import { setModeAction } from '../../../../redux/ui'

const clickOutsideRef = (contentRef: any, toggleRef: any): void => {
    document.addEventListener('mousedown', (e) => {
        if (toggleRef.current && toggleRef.current.contains(e.target)) {
            contentRef.current.classList.toggle('active')
        } else {
            if (contentRef.current && !contentRef.current.contains(e.target)) {
                contentRef.current.classList.remove('active')
            }
        }
    })
}

export const useThemeMenu = (): Record<string, any> => {
    const menuRef = useRef<HTMLDivElement>(null)
    const menuToggleRef = useRef<HTMLButtonElement>(null)
    const { themes, theme } = useSelector((store: StoreApp) => store.themeReducer)

    clickOutsideRef(menuRef, menuToggleRef)

    const setActiveMenu = (): void => menuRef.current?.classList.add('active')
    const closeMenu = (): void => menuRef.current?.classList.remove('active')

    const [currentMode, setCurrentMode] = useState('dark')

    const dispatch = useDispatch()

    const setMode = (mode: Theme): void => {
        setCurrentMode(mode.id)
        localStorage.setItem('themeMode', mode.class)
        dispatch(setModeAction(mode))
        setInitialTheme(mode.class)
    }

    const setInitialTheme = (themeInitial: string): void => {
        const globalContent = document.querySelector('body')
        globalContent!.removeAttribute('class')
        globalContent!.classList.add(themeInitial)
    }

    useEffect(() => {
        const themeClass = themes.find((e) => e.class === localStorage.getItem('themeMode'))
        // setInitialTheme(localStorage.getItem('themeMode'))
        setInitialTheme(theme.class)
        if (themeClass) setCurrentMode(themeClass.id)
    }, [])

    return {
        setActiveMenu,
        closeMenu,
        setMode,
        currentMode,
        menuToggleRef,
        menuRef,
        themes,
    }
}
