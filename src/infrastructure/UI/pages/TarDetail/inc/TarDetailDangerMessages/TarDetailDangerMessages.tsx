// components
import { AlertInformation } from '../../../../components'

// styles
import { DangerMessagesContainer } from './tarDetailDangerMessages-styles'

interface TarDetailDangerMessagesProps {
    alreadyProduct: boolean
    isBigger?: boolean
}

const TarDetailDangerMessages: React.FC<TarDetailDangerMessagesProps> = ({
    alreadyProduct,
    isBigger = false,
}): JSX.Element => {
    return (
        <DangerMessagesContainer>
            {isBigger && <AlertInformation isBigger />}
            {alreadyProduct && <AlertInformation />}
        </DangerMessagesContainer>
    )
}

export default TarDetailDangerMessages
