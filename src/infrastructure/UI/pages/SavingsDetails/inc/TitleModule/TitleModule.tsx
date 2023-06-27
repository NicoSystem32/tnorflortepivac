import { TitleModuleContainer, TitleModuleDesk, TitleModuleMobile } from './titleModule-styles'

interface TitleModuleProps {
    showInputs: boolean
}

const TitleModule: React.FC<TitleModuleProps> = ({ showInputs }): JSX.Element => {
    return (
        <TitleModuleContainer>
            <TitleModuleMobile>
                {showInputs ? (
                    <span>
                        Aporte<strong>&nbsp;Cavipetrol</strong>
                    </span>
                ) : (
                    <span>
                        Ingresa otro<strong>&nbsp;valor a pagar</strong>
                    </span>
                )}
            </TitleModuleMobile>

            <TitleModuleDesk>
                Aporte<strong>&nbsp;Cavipetrol</strong>
            </TitleModuleDesk>
        </TitleModuleContainer>
    )
}

export default TitleModule
