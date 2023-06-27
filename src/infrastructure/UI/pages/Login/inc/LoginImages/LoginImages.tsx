import {
    StyleImgElipse,
    StyleImgElipseDesk,
    StyleImgNetworks,
    StyleImgWomen,
} from './loginImages-styles'

// Images
import { ElipsePNG, NetworksPNG, ElipseDeskPNG, WomenPNG } from '../../../../utils/getImages'

const LoginImages = (): JSX.Element => {
    return (
        <>
            <StyleImgElipse src={ElipsePNG} alt="Elipse" />
            <StyleImgElipseDesk src={ElipseDeskPNG} alt="ElipseDesk" />
            <StyleImgNetworks src={NetworksPNG} alt="Networks" />
            <StyleImgWomen src={WomenPNG} alt="Women" />
        </>
    )
}

export default LoginImages
