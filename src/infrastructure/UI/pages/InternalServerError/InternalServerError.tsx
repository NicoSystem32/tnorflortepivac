import { LayoutContent } from '../../transverse'

// Icons
import { Big500SVG } from '../../utils/getIcons'

// Styles
import {
    InternalServerErrorContent,
    InternalServerErrorImg,
    InternalServerErrorInfo,
} from './internalServerError-styles'

const InternalServerError = (): JSX.Element => {
    return (
        <LayoutContent>
            <InternalServerErrorContent className="content-sg">
                <InternalServerErrorImg>
                    <img className="img-server-error" src={Big500SVG} alt="server error" />
                </InternalServerErrorImg>
                <InternalServerErrorInfo>
                    <p className="title-500">Algo salió mal</p>
                    <p className="subtitle-500">
                        En este momento no podemos procesar tu solicitud, por favor intenta de nuevo
                        más tarde, estamos trabajando para solucionarlo.
                    </p>
                </InternalServerErrorInfo>
            </InternalServerErrorContent>
        </LayoutContent>
    )
}
export default InternalServerError
