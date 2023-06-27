import { Link } from 'react-router-dom'

// models
import { CardsConsolidate } from '../../../../../../domain/models'

// styled components
import { CreditsProductsContent } from './creditsProducts-styles'

// icons
import { Credit1SVG } from '../../../../utils/getIcons'

interface CreditsProductsProps {
    card: CardsConsolidate
}

export const CreditsProducts: React.FC<CreditsProductsProps> = ({ card }): JSX.Element => {
    return (
        <CreditsProductsContent data-tour="credits-available">
            <p className="title">Créditos</p>
            <div className="card-content" data-tour="card-credits-available">
                {parseInt(card.quotaspayable.toString()) > 0 &&
                    parseInt(card.quotaspayable.toString()) < 540 && (
                        <div className="tag">{card.quotaspayable} días en mora</div>
                    )}
                {parseInt(card.quotaspayable.toString()) > 540 && (
                    <div className="tag">+540 días en mora</div>
                )}
                <div className="img-section">
                    <img src={Credit1SVG} alt="crédito" className="" />
                    <p className="title-card">{card.title}</p>
                </div>
                <p className="subtitle-card">{card.description}</p>
                <Link className="link-btn" to="/credits-group">
                    Conoce tus créditos
                </Link>
            </div>
        </CreditsProductsContent>
    )
}
