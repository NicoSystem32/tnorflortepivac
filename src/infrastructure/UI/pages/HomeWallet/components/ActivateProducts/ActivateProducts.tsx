import { ActivateProductsContent } from './activateProducts-styles'

export const ActivateProducts = (): JSX.Element => {
    return (
        <ActivateProductsContent>
            <div className="tag-new">Nuevo</div>
            <p className="title">Tu tarjeta ha sido aprobada</p>
            <p className="subtitle">
                Tu tarjeta Visa Cavi Gold ha sido aprobada, actívala para disfrutas sus beneficios
            </p>
            <a href="# " className="link">
                Activar tarjeta
            </a>
        </ActivateProductsContent>
    )
}
