import { useHistory } from 'react-router-dom'
import { Button } from '../../components'

// Icons
import { Big404SVG } from '../../utils/getIcons'

// Styles
import { NotFoundContent, NotFoundContentImg, NotFoundContentInfo } from './notFound-styles'

const NotFound = (): JSX.Element => {
    // initial declarations
    const history = useHistory()

    const redirections = (url: string): void => {
        history.push(url)
    }

    return (
        <NotFoundContent>
            <NotFoundContentImg>
                <img className="img-not-found" src={Big404SVG} alt="Not found" />
            </NotFoundContentImg>
            <NotFoundContentInfo>
                <img src="" alt="" />
                <p className="title-404 content-position">
                    4<span className="text-yellow">0</span>4
                </p>
                <p className="subtitle-404">
                    Parece que esta página ahorró lo suficiente y se fue de vacaciones,
                    <strong>
                        {' '}
                        puede que esta página este en mantenimiento o haya sido eliminada,
                    </strong>{' '}
                    regresa al home e intenta mas tarde.
                </p>
                <div className="content-position">
                    <Button variant="sub-dominant" onClick={() => redirections('/home-wallet')}>
                        Volver al home
                    </Button>
                </div>
            </NotFoundContentInfo>
        </NotFoundContent>
    )
}
export default NotFound
