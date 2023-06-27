import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'

type Props = Omit<RouteProps, 'component'> & {
    component: NonNullable<RouteProps['component']>
}

export const PublicRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
    const { token } = useSelector((store: any) => store.auth)

    return (
        <Route
            {...rest}
            render={(props) => (token ? <Redirect to="/home-wallet" /> : <Component {...props} />)}
        />
    )
}
