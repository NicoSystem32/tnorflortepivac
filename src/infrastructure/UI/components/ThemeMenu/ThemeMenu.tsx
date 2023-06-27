import { Theme } from '../../../../domain/models/ui'

// hooks
import { useThemeMenu } from './hook'

// Styles
import './thememenu.css'

const ThemeMenu = (): JSX.Element => {
    const { setActiveMenu, closeMenu, setMode, currentMode, menuToggleRef, menuRef, themes } =
        useThemeMenu()

    return (
        <div>
            <button
                ref={menuToggleRef}
                className="dropdown__toggle"
                onClick={() => setActiveMenu()}
            ></button>
            <div ref={menuRef} className="theme-menu">
                <h4>Configurar Temas</h4>
                <button className="theme-menu__close" onClick={() => closeMenu()}></button>
                <div className="theme-menu__select">
                    <span>Selecciona un tema</span>
                    <ul className="mode-list">
                        {themes.map((item: Theme) => (
                            <li key={`theme-${item.id}`} onClick={() => setMode(item)}>
                                <div
                                    className={`mode-list__color ${
                                        item.id === currentMode ? 'active' : ''
                                    }`}
                                >
                                    <i className={`bx bx-check ${item.class}`}></i>
                                </div>
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ThemeMenu
