import type { StepTypeExtended } from '@reactour/tour'
import { dispatchEventType } from '../../../utils/misc'

export const tourStyles = {
    overlayColor: '#204F57',
    overlayOpacity: '0.5',
}

export const mainContentStyles: StepTypeExtended['styles'] = {
    maskWrapper: (base) => ({
        ...base,
        opacity: tourStyles.overlayOpacity,
        color: tourStyles.overlayColor,
    }),
    maskArea: (base) => ({
        ...base,
        width: '0px',
        height: '0px',
    }),
}

export const openDesktopNavbar = (elem: Element | null): void => {
    dispatchEventType(elem, 'click', { bubbles: true })
}

export const hideDesktopNavbar = (): void => {
    const navbarElm = document.querySelector('[data-tour="nav-menu-content"]')
    const event = new MouseEvent('mouseout', { bubbles: true })
    navbarElm?.dispatchEvent(event)
}

export const openMobileNavMenu = (): void => {
    const btnElem = document.querySelector('[data-tour="menu-options-mob"]')
    dispatchEventType(btnElem, 'click', { bubbles: true })
}

export const hideMobileNavMenu = (): void => {
    const elem = document.querySelector('[data-tour="menu-options-mob-cls"]')

    if (elem) {
        const btnClose = elem.querySelector('.btn-close')
        dispatchEventType(btnClose, 'click', { bubbles: true })
    }
}

export const openWallet = (): void => {
    const elem = document.querySelector('[data-tour="wallet"]')

    if (!elem) {
        const btnElem = document.querySelector('#btn-open-wallet')
        dispatchEventType(btnElem, 'click', { bubbles: true })
    }
}

export const closeWallet = (): void => {
    const elem = document.querySelector('[data-tour="wallet"]')

    if (elem) {
        const btnClose = elem.querySelector('.btn-close')
        dispatchEventType(btnClose, 'click', { bubbles: true })
    }
}

export const addActionHint = (elem: Element | null): void => {
    const btnAct = elem?.querySelector('[data-tour-hint]')
    btnAct?.classList.add('rings-waves-animation')
}

export const removeActionHint = (elem: Element | null): void => {
    const btnAct = elem?.querySelector('[data-tour-hint]')
    btnAct?.classList.remove('rings-waves-animation')
}
