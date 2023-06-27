import { Link } from 'react-router-dom'

import { StyledLoginToast } from './loginToast-styles'

// Icons
import { ForgotSVG } from '../../../../utils/getIcons'

export const LoginToast = (): JSX.Element => {
    return (
        <StyledLoginToast>
            <img src={ForgotSVG} alt="olvido de contraseña" />
            <Link to="/problems-user" className="text-options-user">
                Tengo problemas con mi <span>usuario</span>
            </Link>
        </StyledLoginToast>
    )
}
