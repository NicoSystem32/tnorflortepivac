import { Link } from 'react-router-dom'

// models
import { CardsConsolidate } from '../../../../../../domain/models'

// styled components
import { SavingProductsContent } from './savingProducts-styles'

// icons
import { CarGifSVG } from '../../../../utils/getIcons'

interface SavingProductsProps {
    card: CardsConsolidate
}

export const SavingProducts: React.FC<SavingProductsProps> = ({ card }): JSX.Element => {
    return (
        <SavingProductsContent data-tour="products-available">
            <p className="title">Productos de ahorro (Captaciones)</p>
            <div className="card-content" data-tour="card-products-available">
                {card.quotaspayable > 0 && (
                    <div className="tag">{card.quotaspayable} días en mora</div>
                )}
                <div className="img-content">
                    <img src={CarGifSVG} alt="paquete" />
                    <p className="card-title">{card.title}</p>
                </div>
                <p className="card-subtitle">{card.description}</p>
                <Link className="link-btn" to="/savings-group">
                    Conoce tus productos
                </Link>
            </div>
        </SavingProductsContent>
    )
}
