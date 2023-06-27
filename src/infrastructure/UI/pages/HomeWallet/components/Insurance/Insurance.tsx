import { InsuranceContent } from './insurance-styles'

export const Insurance = (): JSX.Element => {
    return (
        <InsuranceContent>
            <p className="">Seguros</p>
            <div className="content">
                <p className="title">Protege lo que más quieres</p>
                <p className="subtitle">
                    Solicita un seguro para proteger lo más importante en tu vida.
                </p>
                <a href="# " className="link-btn">
                    Solicitar
                </a>
            </div>
        </InsuranceContent>
    )
}
