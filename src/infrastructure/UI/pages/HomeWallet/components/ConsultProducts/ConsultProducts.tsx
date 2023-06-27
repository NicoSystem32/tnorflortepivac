import { ConsultProductsContent } from './consultProducts-styles'

export const ConsultProducts = (): JSX.Element => {
    return (
        <ConsultProductsContent>
            <p className="title">Consulta productos</p>
            <p className="subtitle">
                Si quieres conocer más información sobre tus productos,
                <a
                    href="https://transacciones.cavipetrol.com/DwPortalApp/Cavionline/UI/Web/Login.aspx?ItemID=1&tabID=417&mID=3411"
                    target="_blank"
                    rel="noreferrer"
                >
                    ingresa al portal de consultas AQUÍ
                </a>
            </p>
        </ConsultProductsContent>
    )
}
