// styled components
import { LayoutContent } from '../../transverse/Layout/layout-styles'
import { SupportContainer, TitleSupportContent } from './support-styles'

// custom components
import Contact from './inc/Contact'
import SupportOptions from './inc/SupportOptions'

const Support = (): JSX.Element => {
    return (
        <LayoutContent>
            <SupportContainer>
                <TitleSupportContent>
                    <p className="title-support">
                        ¿Cómo te <strong className="title-support-hight">podemos ayudar?</strong>
                    </p>
                </TitleSupportContent>

                <SupportOptions />

                <Contact />
            </SupportContainer>
        </LayoutContent>
    )
}
export default Support
